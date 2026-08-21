/* FWG, Client Area — Phase 2. Dashboard is now real: every number on it
   comes from GET /api/trades/dashboard, which itself is computed only from
   the authenticated user's own rows (see backend/services/tradeService.js —
   every query there is scoped by user_id from the session, never a value
   the client could supply). Backtesting/Trading Journal/Performance/Trading
   Plan stay placeholders; only "backtesting" was explicitly excluded from
   this phase, but building full journal/performance pages is its own future
   phase — the dashboard's own equity curve, stats, and recent-trades table
   already surface everything the Phase 2 spec asked for. */

function fwgFormatJoinDate(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleDateString([], { year:'numeric', month:'long', day:'numeric' }); }
  catch (e) { return ''; }
}
function fwgFormatMoney(n) {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  const sign = n < 0 ? '-' : '';
  return `${sign}$${Math.abs(n).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}`;
}
function fwgFormatPct(n, decimals) {
  if (n === null || n === undefined || !Number.isFinite(n)) return '—';
  return `${n.toFixed(decimals===undefined?1:decimals)}%`;
}
function fwgFormatShortDate(d) {
  if (!d) return '—';
  try { return new Date(d).toLocaleDateString([], { year:'numeric', month:'short', day:'numeric' }); }
  catch (e) { return '—'; }
}

function ClientStatCard({ label, value, accent }) {
  return <KitCard padding="18px">
    <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,marginBottom:'8px'}}>{label}</div>
    <div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:700,color:accent||'var(--text-primary)'}}>{value}</div>
  </KitCard>;
}

/* Unlike the public site's decorative EquityCurve (Visuals.jsx, hardcoded
   sample data for marketing pages), this one only ever renders whatever
   equity-curve points the API actually computed from real trades. */
function ClientEquityCurve({ points, height }) {
  const h = height || 220;
  const width = 680;
  if (!points || points.length < 2) return null;
  const balances = points.map(p=>p.balance);
  const max = Math.max(...balances), min = Math.min(...balances);
  const range = (max - min) || 1;
  const stepX = width/(points.length-1);
  const xy = points.map((p,i)=>[i*stepX, h-8-((p.balance-min)/range)*(h-28)]);
  const line = xy.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${h} L0 ${h} Z`;
  const positive = points[points.length-1].balance >= points[0].balance;
  const stroke = positive ? 'var(--bullish)' : 'var(--bearish)';
  const gid = 'client-eq-'+Math.round(width);
  return (
    <svg viewBox={`0 0 ${width} ${h}`} width="100%" style={{display:'block'}} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={positive?'rgba(19,185,120,0.28)':'rgba(228,71,74,0.28)'}/>
          <stop offset="100%" stopColor={positive?'rgba(19,185,120,0)':'rgba(228,71,74,0)'}/>
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75].map((g,i)=>(<line key={i} x1="0" x2={width} y1={h*g} y2={h*g} stroke="var(--border-subtle)" strokeWidth="1"/>))}
      <path d={area} fill={`url(#${gid})`}/>
      <path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={xy[xy.length-1][0]} cy={xy[xy.length-1][1]} r="4.5" fill={stroke}/>
      <circle cx={xy[xy.length-1][0]} cy={xy[xy.length-1][1]} r="9" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

function ClientFieldLabel({ children }) {
  return <label style={{fontSize:'var(--text-xs)',fontWeight:600,letterSpacing:'var(--ls-wide)',textTransform:'uppercase',color:'var(--text-tertiary)',marginBottom:'8px',display:'block'}}>{children}</label>;
}
const CLIENT_INPUT_STYLE = {width:'100%',background:'var(--surface-inset)',border:'1px solid var(--border-default)',borderRadius:'var(--radius-md)',padding:'12px 13px',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)',outline:'none'};

function ClientSegmented({ value, onChange, options }) {
  return <div style={{display:'flex',gap:'8px'}}>
    {options.map(o=>{
      const on = o===value;
      return <button key={o} type="button" onClick={()=>onChange(o)}
        style={{flex:1,padding:'11px',borderRadius:'var(--radius-md)',cursor:'pointer',fontSize:'var(--text-sm)',fontWeight:700,
          border:`1px solid ${on?'var(--border-gold)':'var(--border-default)'}`,
          background:on?'var(--accent-soft-bg)':'var(--surface-inset)',color:on?'var(--text-gold)':'var(--text-secondary)',transition:'var(--transition-base)'}}>
        {o}
      </button>;
    })}
  </div>;
}

function ClientTradeModal({ onClose, onSaved }) {
  const [f, setF] = React.useState({ date: new Date().toISOString().slice(0,10), symbol:'', direction:'Buy', entry:'', exit:'', result:'Win', riskReward:'', pnl:'' });
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trades`, {
        method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) { setError(data.message || 'Something went wrong. Please try again.'); return; }
      onSaved();
    } catch (err) {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div onClick={onClose} className="fwg-modal-overlay" style={{position:'fixed',inset:0,zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'var(--gutter)',background:'rgba(4,5,8,0.8)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)'}}>
      <div onClick={e=>e.stopPropagation()} className="fwg-modal-card" style={{position:'relative',width:'min(520px,100%)',maxHeight:'88vh',overflowY:'auto',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',padding:'clamp(24px,4vw,36px)'}}>
        <button onClick={onClose} aria-label="Close" type="button"
          style={{position:'absolute',top:'16px',right:'16px',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',background:'rgba(10,12,17,0.6)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
          <Icon name="x" size={17}/>
        </button>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-xl)',margin:'0 0 20px'}}>Add trade</h2>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Date</ClientFieldLabel><input required type="date" style={CLIENT_INPUT_STYLE} value={f.date} onChange={set('date')}/></div>
            <div><ClientFieldLabel>Symbol</ClientFieldLabel><input required type="text" placeholder="EUR/USD" style={CLIENT_INPUT_STYLE} value={f.symbol} onChange={set('symbol')}/></div>
          </div>
          <div>
            <ClientFieldLabel>Direction</ClientFieldLabel>
            <ClientSegmented value={f.direction} onChange={v=>setF(s=>({...s,direction:v}))} options={['Buy','Sell']}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Entry price</ClientFieldLabel><input required type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.entry} onChange={set('entry')}/></div>
            <div><ClientFieldLabel>Exit price</ClientFieldLabel><input required type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.exit} onChange={set('exit')}/></div>
          </div>
          <div>
            <ClientFieldLabel>Result</ClientFieldLabel>
            <ClientSegmented value={f.result} onChange={v=>setF(s=>({...s,result:v}))} options={['Win','Loss','Breakeven']}/>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Risk/reward (optional)</ClientFieldLabel><input type="number" step="any" placeholder="e.g. 2.5" style={CLIENT_INPUT_STYLE} value={f.riskReward} onChange={set('riskReward')}/></div>
            <div><ClientFieldLabel>Profit / loss ($)</ClientFieldLabel><input required type="number" step="any" placeholder="Negative for a loss" style={CLIENT_INPUT_STYLE} value={f.pnl} onChange={set('pnl')}/></div>
          </div>
          {error && (
            <div style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'13px 16px',borderRadius:'var(--radius-md)',background:'var(--bearish-bg)',border:'1px solid rgba(228,71,74,0.32)'}}>
              <Icon name="alert-triangle" size={17} color="var(--bearish)" style={{flexShrink:0,marginTop:'2px'}}/>
              <span style={{fontSize:'var(--text-xs)',lineHeight:1.6,color:'var(--text-secondary)'}}>{error}</span>
            </div>
          )}
          <KitButton as="button" type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>{submitting?'Saving…':'Save trade'}</KitButton>
        </form>
      </div>
    </div>
  );
}

function ClientDashboardPage() {
  const user = useClientUser();
  const firstName = (user && user.fullName ? user.fullName.split(' ')[0] : 'there');
  const [state, setState] = React.useState({ status: 'loading', stats: null });
  const [modalOpen, setModalOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trades/dashboard`, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setState({ status: 'ready', stats: data.stats });
      else setState({ status: 'error', stats: null });
    } catch (err) {
      setState({ status: 'error', stats: null });
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  const quickActions = [
    ['play', 'Start Backtest', '/client/backtesting', false],
    ['plus-circle', 'Add Journal Entry', null, true],
    ['trending-up', 'View Performance', '/client/performance', false],
    ['clipboard-list', 'Trading Plan', '/client/trading-plan', false],
  ];

  const stats = state.stats;

  return <React.Fragment>
    <div style={{marginBottom:'28px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 8px'}}>Welcome back, {firstName}</h1>
      <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0}}>Here's how your trading is going.</p>
    </div>

    {state.status === 'loading' && (
      <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading your dashboard…</div></KitCard>
    )}

    {state.status === 'error' && (
      <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load your dashboard right now. Please refresh the page.</div></KitCard>
    )}

    {state.status === 'ready' && !stats.hasTrades && (
      <KitCard>
        <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'48px 20px',gap:'16px'}}>
          <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
            <Icon name="line-chart" size={24} color="var(--text-gold)"/>
          </div>
          <div>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-lg)',margin:'0 0 8px'}}>No trades yet</h2>
            <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0,maxWidth:'44ch'}}>Once you log your first trade, your account stats, equity curve, and history will show up here — nothing is shown until it's real.</p>
          </div>
          <KitButton as="button" type="button" onClick={()=>setModalOpen(true)} variant="primary" iconLeft={<Icon name="plus" size={16}/>}>Add your first trade</KitButton>
        </div>
      </KitCard>
    )}

    {state.status === 'ready' && stats.hasTrades && (
      <React.Fragment>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'20px'}} className="fwg-grid-4">
          <ClientStatCard label="Account balance" value={fwgFormatMoney(stats.accountBalance)} />
          <ClientStatCard label="Total trades" value={stats.totalTrades} />
          <ClientStatCard label="Win rate" value={fwgFormatPct(stats.winRate)} accent={stats.winRate!=null?(stats.winRate>=50?'var(--bullish)':'var(--bearish)'):undefined} />
          <ClientStatCard label="Profit / loss" value={fwgFormatMoney(stats.profitLoss)} accent={stats.profitLoss>=0?'var(--bullish)':'var(--bearish)'} />
          <ClientStatCard label="Avg risk/reward" value={stats.avgRiskReward!=null?`1 : ${stats.avgRiskReward.toFixed(2)}`:'—'} />
          <ClientStatCard label="Max drawdown" value={fwgFormatPct(stats.maxDrawdownPct)} accent={stats.maxDrawdownPct>0?'var(--bearish)':undefined} />
          <ClientStatCard label="Current streak" value={stats.currentStreak.count?`${stats.currentStreak.count} ${stats.currentStreak.type}`:'—'} accent={stats.currentStreak.type==='Win'?'var(--bullish)':stats.currentStreak.type==='Loss'?'var(--bearish)':undefined}/>
        </div>

        <KitCard padding="0" style={{overflow:'hidden',marginBottom:'20px'}}>
          <div style={{padding:'18px 20px',borderBottom:'1px solid var(--border-subtle)'}}>
            <span style={{fontFamily:'var(--font-body)',fontWeight:700,fontSize:'var(--text-sm)'}}>Equity curve</span>
          </div>
          <div style={{padding:'18px'}}><ClientEquityCurve points={stats.equityCurve}/></div>
        </KitCard>

        <KitCard padding="0" style={{overflow:'hidden',marginBottom:'20px'}}>
          <div style={{padding:'18px 20px',borderBottom:'1px solid var(--border-subtle)'}}>
            <span style={{fontFamily:'var(--font-body)',fontWeight:700,fontSize:'var(--text-sm)'}}>Recent trades</span>
          </div>
          <div className="fwg-tablewrap">
            <div style={{minWidth:'640px'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'var(--text-sm)'}}>
                <thead>
                  <tr>
                    {['Date','Symbol','Direction','Entry','Exit','Result','R:R'].map(h=>(
                      <th key={h} style={{textAlign:'left',padding:'11px 16px',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',background:'var(--surface-inset)'}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stats.recentTrades.map(t=>(
                    <tr key={t.id}>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',color:'var(--text-secondary)'}}>{fwgFormatShortDate(t.date)}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700}}>{t.symbol}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',color:t.direction==='Buy'?'var(--bullish)':'var(--bearish)',fontWeight:600}}>{t.direction}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.entry}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.exit}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700,color:t.result==='Win'?'var(--bullish)':t.result==='Loss'?'var(--bearish)':'var(--text-tertiary)'}}>{t.result}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.riskReward!=null?`1:${t.riskReward.toFixed(1)}`:'—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </KitCard>
      </React.Fragment>
    )}

    <div style={{marginTop:'8px'}}>
      <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'14px'}}>Quick actions</div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px'}} className="fwg-grid-4">
        {quickActions.map(([icon,label,href,isModal])=>{
          const inner = <React.Fragment>
            <Icon name={icon} size={20} color="var(--text-gold)"/>
            <div style={{fontSize:'var(--text-sm)',fontWeight:700,marginTop:'10px'}}>{label}</div>
          </React.Fragment>;
          return isModal
            ? <button key={label} type="button" onClick={()=>setModalOpen(true)} style={{textAlign:'left',background:'none',border:'none',padding:0,cursor:'pointer',font:'inherit',color:'inherit'}}>
                <KitCard interactive padding="18px">{inner}</KitCard>
              </button>
            : <a key={label} href={href} style={{textDecoration:'none'}}>
                <KitCard interactive padding="18px">{inner}</KitCard>
              </a>;
        })}
      </div>
    </div>

    {modalOpen && <ClientTradeModal onClose={()=>setModalOpen(false)} onSaved={()=>{ setModalOpen(false); load(); }} />}
  </React.Fragment>;
}

function ClientBacktestingPage() {
  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Backtesting</h1>
    <ClientComingSoon icon="line-chart" title="Backtesting engine" description="Test your strategies against historical price data. This is being built next — check back soon." />
  </React.Fragment>;
}

function ClientJournalPage() {
  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Trading Journal</h1>
    <ClientComingSoon icon="book-open" title="Your trading journal" description="A dedicated log-and-review view for every trade — for now, add trades from the Dashboard's Quick Actions. A full journal page is coming soon." />
  </React.Fragment>;
}

function ClientPerformancePage() {
  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Performance</h1>
    <ClientComingSoon icon="trending-up" title="Your performance" description="A deeper breakdown of your results beyond the Dashboard's overview. Coming soon." />
  </React.Fragment>;
}

function ClientTradingPlanPage() {
  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Trading Plan</h1>
    <ClientComingSoon icon="clipboard-list" title="Your trading plan" description="Document your rules, risk limits, and strategy in one place tied to your account. Coming soon." />
  </React.Fragment>;
}

function ClientSettingsPage() {
  const user = useClientUser();
  const [balance, setBalance] = React.useState(user && user.startingBalance != null ? String(user.startingBalance) : '');
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    setSaving(true); setError(''); setSaved(false);
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trades/starting-balance`, {
        method: 'PUT', credentials: 'include', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startingBalance: balance === '' ? null : balance }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) { setError(data.message || 'Could not save. Please try again.'); return; }
      setSaved(true);
    } catch (err) {
      setError("Couldn't reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Settings</h1>
    <KitCard>
      <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
        <div>
          <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Full name</div>
          <div style={{fontSize:'var(--text-md)',color:'var(--text-primary)',fontWeight:600}}>{user ? user.fullName : '—'}</div>
        </div>
        <div style={{borderTop:'1px solid var(--border-subtle)',paddingTop:'18px'}}>
          <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Email</div>
          <div style={{fontSize:'var(--text-md)',color:'var(--text-primary)',fontWeight:600}}>{user ? user.email : '—'}</div>
        </div>
        <div style={{borderTop:'1px solid var(--border-subtle)',paddingTop:'18px'}}>
          <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Member since</div>
          <div style={{fontSize:'var(--text-md)',color:'var(--text-primary)',fontWeight:600}}>{user ? fwgFormatJoinDate(user.createdAt) : '—'}</div>
        </div>
      </div>
    </KitCard>

    <div style={{marginTop:'20px'}}>
      <KitCard>
        <form onSubmit={handleSave} style={{display:'flex',flexDirection:'column',gap:'14px'}}>
          <div>
            <ClientFieldLabel>Starting account balance</ClientFieldLabel>
            <p style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)',margin:'0 0 10px',lineHeight:1.6}}>Used to calculate your current Account Balance on the Dashboard. Leave blank if you'd rather not track a balance.</p>
            <input type="number" step="any" min="0" placeholder="e.g. 10000" style={CLIENT_INPUT_STYLE} value={balance} onChange={e=>setBalance(e.target.value)}/>
          </div>
          {error && (
            <div style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'13px 16px',borderRadius:'var(--radius-md)',background:'var(--bearish-bg)',border:'1px solid rgba(228,71,74,0.32)'}}>
              <Icon name="alert-triangle" size={17} color="var(--bearish)" style={{flexShrink:0,marginTop:'2px'}}/>
              <span style={{fontSize:'var(--text-xs)',lineHeight:1.6,color:'var(--text-secondary)'}}>{error}</span>
            </div>
          )}
          {saved && <div style={{fontSize:'var(--text-xs)',color:'var(--bullish)',fontWeight:600}}>Saved.</div>}
          <div><KitButton as="button" type="submit" variant="secondary" disabled={saving}>{saving?'Saving…':'Save balance'}</KitButton></div>
        </form>
      </KitCard>
    </div>
    <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'16px'}}>Profile editing and password changes are coming in a future update.</p>
  </React.Fragment>;
}

Object.assign(window,{ClientDashboardPage,ClientBacktestingPage,ClientJournalPage,ClientPerformancePage,ClientTradingPlanPage,ClientSettingsPage});

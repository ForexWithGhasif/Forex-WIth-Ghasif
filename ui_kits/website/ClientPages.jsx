/* FWG, Client Area — Dashboard, Trading Journal, Performance, Settings, and
   the Backtesting workspace shell. Every number anywhere in this file comes
   from a fetch scoped to the signed-in user (see backend/services/trade*
   Service.js — every query there filters by user_id from the session, never
   a client-supplied value), so there is nothing fake/hardcoded to display. */

const CHECKLIST_ITEMS = [
  ['marketStructure','Market Structure'],
  ['liquidity','Liquidity'],
  ['setupConfirmation','Setup Confirmation'],
  ['entry','Entry'],
  ['stopLoss','Stop Loss'],
  ['takeProfit','Take Profit'],
  ['risk','Risk'],
  ['newsCheck','News Check'],
  ['planFollowed','Trading Plan Followed'],
];

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
   points the API actually computed from real trades. Reused for both the
   equity curve and (inverted color logic) the drawdown curve. */
function ClientLineChart({ points, valueKey, height, invert }) {
  const h = height || 220;
  const width = 680;
  if (!points || points.length < 2) return null;
  const values = points.map(p=>p[valueKey]);
  const max = Math.max(...values), min = Math.min(...values);
  const range = (max - min) || 1;
  const stepX = width/(points.length-1);
  const xy = points.map((p,i)=>[i*stepX, h-8-((p[valueKey]-min)/range)*(h-28)]);
  const line = xy.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${h} L0 ${h} Z`;
  const positive = invert ? values[values.length-1] <= values[0] : values[values.length-1] >= values[0];
  const stroke = positive ? 'var(--bullish)' : 'var(--bearish)';
  const gid = 'client-lc-'+Math.round(width)+valueKey;
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
function ClientEquityCurve({ points, height }) { return <ClientLineChart points={points} valueKey="balance" height={height}/>; }

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

function ClientErrorBanner({ message }) {
  if (!message) return null;
  return <div style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'13px 16px',borderRadius:'var(--radius-md)',background:'var(--bearish-bg)',border:'1px solid rgba(228,71,74,0.32)'}}>
    <Icon name="alert-triangle" size={17} color="var(--bearish)" style={{flexShrink:0,marginTop:'2px'}}/>
    <span style={{fontSize:'var(--text-xs)',lineHeight:1.6,color:'var(--text-secondary)'}}>{message}</span>
  </div>;
}

function ClientSelect({ value, onChange, options, placeholder }) {
  return <select value={value} onChange={e=>onChange(e.target.value)} style={{...CLIENT_INPUT_STYLE, cursor:'pointer'}}>
    <option value="">{placeholder}</option>
    {options.map(o=>(<option key={o.value} value={o.value}>{o.label}</option>))}
  </select>;
}

/* Add/edit trade — used by the Dashboard's "Add Journal Entry" quick action
   and the Trading Journal page itself. Fetches the user's own accounts and
   plans just to populate the two link dropdowns (also user-scoped). */
function ClientTradeModal({ onClose, onSaved }) {
  const [f, setF] = React.useState({
    date: new Date().toISOString().slice(0,10), symbol:'', direction:'Buy', entry:'', exit:'',
    stopLoss:'', takeProfit:'', result:'Win', riskReward:'', riskPercent:'', rMultiple:'', pnl:'',
    strategy:'', notes:'', accountId:'', tradingPlanId:'',
  });
  const [checklist, setChecklist] = React.useState({});
  const [accounts, setAccounts] = React.useState([]);
  const [plans, setPlans] = React.useState([]);
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.value }));

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = 'hidden';
    (async () => {
      try {
        const [aRes, pRes] = await Promise.all([
          fetch(`${window.FWG_API_BASE}/api/trading-accounts`, { credentials:'include' }),
          fetch(`${window.FWG_API_BASE}/api/trading-plans`, { credentials:'include' }),
        ]);
        const aData = await aRes.json().catch(()=>({})); const pData = await pRes.json().catch(()=>({}));
        if (aRes.ok && aData.success) setAccounts(aData.accounts);
        if (pRes.ok && pData.success) setPlans(pData.plans);
      } catch (err) {}
    })();
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
        body: JSON.stringify({ ...f, checklist }),
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
      <div onClick={e=>e.stopPropagation()} className="fwg-modal-card" style={{position:'relative',width:'min(620px,100%)',maxHeight:'88vh',overflowY:'auto',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',padding:'clamp(24px,4vw,36px)'}}>
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
          <div><ClientFieldLabel>Direction</ClientFieldLabel><ClientSegmented value={f.direction} onChange={v=>setF(s=>({...s,direction:v}))} options={['Buy','Sell']}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px'}} className="fwg-grid-3">
            <div><ClientFieldLabel>Entry</ClientFieldLabel><input required type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.entry} onChange={set('entry')}/></div>
            <div><ClientFieldLabel>Stop loss</ClientFieldLabel><input type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.stopLoss} onChange={set('stopLoss')}/></div>
            <div><ClientFieldLabel>Take profit</ClientFieldLabel><input type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.takeProfit} onChange={set('takeProfit')}/></div>
          </div>
          <div><ClientFieldLabel>Exit</ClientFieldLabel><input required type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.exit} onChange={set('exit')}/></div>
          <div><ClientFieldLabel>Result</ClientFieldLabel><ClientSegmented value={f.result} onChange={v=>setF(s=>({...s,result:v}))} options={['Win','Loss','Breakeven']}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px'}} className="fwg-grid-3">
            <div><ClientFieldLabel>Risk %</ClientFieldLabel><input type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.riskPercent} onChange={set('riskPercent')}/></div>
            <div><ClientFieldLabel>Planned R:R</ClientFieldLabel><input type="number" step="any" placeholder="e.g. 2.5" style={CLIENT_INPUT_STYLE} value={f.riskReward} onChange={set('riskReward')}/></div>
            <div><ClientFieldLabel>R multiple</ClientFieldLabel><input type="number" step="any" placeholder="Actual" style={CLIENT_INPUT_STYLE} value={f.rMultiple} onChange={set('rMultiple')}/></div>
          </div>
          <div><ClientFieldLabel>Profit / loss ($)</ClientFieldLabel><input required type="number" step="any" placeholder="Negative for a loss" style={CLIENT_INPUT_STYLE} value={f.pnl} onChange={set('pnl')}/></div>
          <div><ClientFieldLabel>Strategy</ClientFieldLabel><input type="text" placeholder="e.g. Liquidity sweep + FVG" style={CLIENT_INPUT_STYLE} value={f.strategy} onChange={set('strategy')}/></div>
          <div><ClientFieldLabel>Notes</ClientFieldLabel><textarea rows={3} style={{...CLIENT_INPUT_STYLE, resize:'vertical'}} value={f.notes} onChange={set('notes')}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Trading account</ClientFieldLabel><ClientSelect value={f.accountId} onChange={v=>setF(s=>({...s,accountId:v}))} placeholder="None" options={accounts.map(a=>({value:String(a.id),label:a.name}))}/></div>
            <div><ClientFieldLabel>Trading plan</ClientFieldLabel><ClientSelect value={f.tradingPlanId} onChange={v=>setF(s=>({...s,tradingPlanId:v}))} placeholder="None" options={plans.map(p=>({value:String(p.id),label:p.session}))}/></div>
          </div>
          <div>
            <ClientFieldLabel>Pre-trade checklist</ClientFieldLabel>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}} className="fwg-grid-2">
              {CHECKLIST_ITEMS.map(([key,label])=>(
                <label key={key} style={{display:'flex',alignItems:'center',gap:'8px',padding:'9px 11px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)',fontSize:'var(--text-xs)',color:'var(--text-secondary)',cursor:'pointer'}}>
                  <input type="checkbox" checked={!!checklist[key]} onChange={e=>setChecklist(s=>({...s,[key]:e.target.checked}))}/>
                  {label}
                </label>
              ))}
            </div>
          </div>
          <ClientErrorBanner message={error}/>
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

function ClientJournalPage() {
  const [state, setState] = React.useState({ status: 'loading', trades: [] });
  const [modalOpen, setModalOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trades`, { credentials: 'include' });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) setState({ status: 'ready', trades: data.trades });
      else setState({ status: 'error', trades: [] });
    } catch (err) {
      setState({ status: 'error', trades: [] });
    }
  }, []);
  React.useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try {
      await fetch(`${window.FWG_API_BASE}/api/trades/${id}`, { method: 'DELETE', credentials: 'include' });
      load();
    } catch (err) {}
  };

  return <React.Fragment>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Trading Journal</h1>
      <KitButton as="button" type="button" onClick={()=>setModalOpen(true)} variant="primary" iconLeft={<Icon name="plus" size={16}/>}>Add trade</KitButton>
    </div>

    {state.status === 'loading' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading your journal…</div></KitCard>}
    {state.status === 'error' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load your journal right now. Please refresh the page.</div></KitCard>}

    {state.status === 'ready' && state.trades.length === 0 && (
      <ClientComingSoon icon="book-open" title="No trades logged yet" description="Every trade you add — manual or from a completed backtest — will show up here with full detail, checklist, and notes." />
    )}

    {state.status === 'ready' && state.trades.length > 0 && (
      <KitCard padding="0" style={{overflow:'hidden'}}>
        <div className="fwg-tablewrap">
          <div style={{minWidth:'980px'}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'var(--text-sm)'}}>
              <thead>
                <tr>
                  {['Date','Symbol','Dir','Entry','SL','TP','Exit','Result','Risk %','R','P/L','Strategy',''].map(h=>(
                    <th key={h} style={{textAlign:'left',padding:'10px 14px',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',background:'var(--surface-inset)',whiteSpace:'nowrap'}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.trades.map(t=>(
                  <tr key={t.id}>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',color:'var(--text-secondary)',whiteSpace:'nowrap'}}>{fwgFormatShortDate(t.date)}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700}}>{t.symbol}{t.source==='backtest' && <span style={{marginLeft:'6px'}}><KitBadge tone="neutral" mono>BT</KitBadge></span>}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',color:t.direction==='Buy'?'var(--bullish)':'var(--bearish)',fontWeight:600}}>{t.direction}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.entry}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',color:'var(--text-tertiary)'}}>{t.stopLoss ?? '—'}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',color:'var(--text-tertiary)'}}>{t.takeProfit ?? '—'}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.exit}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700,color:t.result==='Win'?'var(--bullish)':t.result==='Loss'?'var(--bearish)':'var(--text-tertiary)'}}>{t.result}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.riskPercent!=null?`${t.riskPercent}%`:'—'}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.rMultiple!=null?`${t.rMultiple}R`:'—'}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',fontWeight:700,color:t.pnl>=0?'var(--bullish)':'var(--bearish)'}}>{fwgFormatMoney(t.pnl)}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',color:'var(--text-tertiary)',maxWidth:'160px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{t.strategy || '—'}</td>
                    <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)'}}>
                      <button type="button" onClick={()=>handleDelete(t.id)} aria-label="Delete trade" style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',display:'inline-flex'}}>
                        <Icon name="trash-2" size={15}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </KitCard>
    )}

    {modalOpen && <ClientTradeModal onClose={()=>setModalOpen(false)} onSaved={()=>{ setModalOpen(false); load(); }} />}
  </React.Fragment>;
}

function ClientPerformancePage() {
  const [range, setRange] = React.useState({ from:'', to:'' });
  const [state, setState] = React.useState({ status:'loading', stats:null });

  const load = React.useCallback(async () => {
    setState(s=>({ ...s, status:'loading' }));
    try {
      const params = new URLSearchParams();
      if (range.from) params.set('from', range.from);
      if (range.to) params.set('to', range.to);
      const res = await fetch(`${window.FWG_API_BASE}/api/trades/performance?${params}`, { credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.success) setState({ status:'ready', stats: data.stats });
      else setState({ status:'error', stats:null });
    } catch (err) {
      setState({ status:'error', stats:null });
    }
  }, [range.from, range.to]);

  React.useEffect(() => { load(); }, [load]);

  const stats = state.stats;

  return <React.Fragment>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:'20px',flexWrap:'wrap',gap:'14px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Performance</h1>
      <div style={{display:'flex',gap:'10px',alignItems:'flex-end',flexWrap:'wrap'}}>
        <div><ClientFieldLabel>From</ClientFieldLabel><input type="date" style={CLIENT_INPUT_STYLE} value={range.from} onChange={e=>setRange(s=>({...s,from:e.target.value}))}/></div>
        <div><ClientFieldLabel>To</ClientFieldLabel><input type="date" style={CLIENT_INPUT_STYLE} value={range.to} onChange={e=>setRange(s=>({...s,to:e.target.value}))}/></div>
      </div>
    </div>

    {state.status === 'loading' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading your performance…</div></KitCard>}
    {state.status === 'error' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load performance data right now. Please refresh the page.</div></KitCard>}

    {state.status === 'ready' && !stats.hasTrades && (
      <ClientComingSoon icon="trending-up" title="No performance data yet" description="Once you have trades in this date range, a full breakdown — equity curve, drawdown, monthly results, and more — will appear here." />
    )}

    {state.status === 'ready' && stats.hasTrades && (
      <React.Fragment>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'14px',marginBottom:'20px'}} className="fwg-grid-4">
          <ClientStatCard label="Total trades" value={stats.totalTrades} />
          <ClientStatCard label="Win rate" value={fwgFormatPct(stats.winRate)} accent={stats.winRate!=null&&stats.winRate>=50?'var(--bullish)':'var(--bearish)'} />
          <ClientStatCard label="Net P/L" value={fwgFormatMoney(stats.netPnl)} accent={stats.netPnl>=0?'var(--bullish)':'var(--bearish)'} />
          <ClientStatCard label="Profit factor" value={stats.profitFactor!=null?stats.profitFactor.toFixed(2):'—'} />
          <ClientStatCard label="Avg R" value={stats.avgR!=null?`${stats.avgR.toFixed(2)}R`:'—'} />
          <ClientStatCard label="Max drawdown" value={fwgFormatPct(stats.maxDrawdownPct)} accent={stats.maxDrawdownPct>0?'var(--bearish)':undefined} />
          <ClientStatCard label="Best trade" value={stats.bestTrade?fwgFormatMoney(stats.bestTrade.pnl):'—'} accent="var(--bullish)" />
          <ClientStatCard label="Worst trade" value={stats.worstTrade?fwgFormatMoney(stats.worstTrade.pnl):'—'} accent="var(--bearish)" />
          <ClientStatCard label="Winning streak" value={`${stats.longestWinStreak}`} accent="var(--bullish)" />
          <ClientStatCard label="Losing streak" value={`${stats.longestLossStreak}`} accent="var(--bearish)" />
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}} className="fwg-grid-2">
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{padding:'16px 18px',borderBottom:'1px solid var(--border-subtle)'}}><span style={{fontWeight:700,fontSize:'var(--text-sm)'}}>Equity curve</span></div>
            <div style={{padding:'16px'}}><ClientLineChart points={stats.equityCurve} valueKey="balance" height={180}/></div>
          </KitCard>
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{padding:'16px 18px',borderBottom:'1px solid var(--border-subtle)'}}><span style={{fontWeight:700,fontSize:'var(--text-sm)'}}>Drawdown curve</span></div>
            <div style={{padding:'16px'}}><ClientLineChart points={stats.drawdownCurve} valueKey="drawdownPct" height={180} invert/></div>
          </KitCard>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}} className="fwg-grid-3">
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border-subtle)'}}><span style={{fontWeight:700,fontSize:'var(--text-xs)',textTransform:'uppercase',letterSpacing:'0.08em'}}>Monthly</span></div>
            <div style={{padding:'8px 0'}}>
              {stats.monthly.map(m=>(
                <div key={m.month} style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',fontSize:'var(--text-xs)'}}>
                  <span style={{color:'var(--text-tertiary)'}}>{m.month}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:700,color:m.pnl>=0?'var(--bullish)':'var(--bearish)'}}>{fwgFormatMoney(m.pnl)}</span>
                </div>
              ))}
            </div>
          </KitCard>
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border-subtle)'}}><span style={{fontWeight:700,fontSize:'var(--text-xs)',textTransform:'uppercase',letterSpacing:'0.08em'}}>By symbol</span></div>
            <div style={{padding:'8px 0'}}>
              {stats.bySymbol.map(s=>(
                <div key={s.symbol} style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',fontSize:'var(--text-xs)'}}>
                  <span style={{fontWeight:700}}>{s.symbol}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:700,color:s.pnl>=0?'var(--bullish)':'var(--bearish)'}}>{fwgFormatMoney(s.pnl)}</span>
                </div>
              ))}
            </div>
          </KitCard>
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border-subtle)'}}><span style={{fontWeight:700,fontSize:'var(--text-xs)',textTransform:'uppercase',letterSpacing:'0.08em'}}>By strategy</span></div>
            <div style={{padding:'8px 0'}}>
              {stats.byStrategy.map(s=>(
                <div key={s.strategy} style={{display:'flex',justifyContent:'space-between',padding:'8px 16px',fontSize:'var(--text-xs)'}}>
                  <span style={{color:'var(--text-secondary)',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:'140px'}}>{s.strategy}</span>
                  <span style={{fontFamily:'var(--font-mono)',fontWeight:700,color:s.pnl>=0?'var(--bullish)':'var(--bearish)'}}>{fwgFormatMoney(s.pnl)}</span>
                </div>
              ))}
            </div>
          </KitCard>
        </div>
      </React.Fragment>
    )}
  </React.Fragment>;
}

/* Backtesting: structure/UI only for now (per spec) — the replay engine
   connects to a real historical-data provider next; nothing on this page
   fabricates candles or prices in the meantime. */
/* ---------- Backtesting: sample historical data + replay engine ----------
   The rest of this file only ever renders numbers pulled from a user-scoped
   fetch (see the banner at the top) — backtesting is the deliberate
   exception, since replaying history is the entire point of a backtester.
   The candles below are a seeded, deterministic synthetic random walk, NOT
   real market prices. Every place this data reaches the UI says "Sample
   data" so nobody mistakes a backtest run here for validation against real
   history. Closed trades save into the same `trades` table the Journal
   reads (source: 'backtest') — that column and the Journal's "BT" badge
   were already built for exactly this (see tradeService.js, ClientPages2.jsx). */

const BT_SYMBOLS = [
  { value:'XAUUSD', label:'XAU/USD', base:2350.00, decimals:2 },
  { value:'EURUSD', label:'EUR/USD', base:1.0850, decimals:5 },
  { value:'GBPUSD', label:'GBP/USD', base:1.2680, decimals:5 },
];
const BT_TIMEFRAMES = [
  { value:'M15', label:'15m', mins:15,   vol:0.09 },
  { value:'H1',  label:'1H',  mins:60,   vol:0.16 },
  { value:'H4',  label:'4H',  mins:240,  vol:0.30 },
  { value:'D1',  label:'1D',  mins:1440, vol:0.55 },
];
const BT_PREROLL = 60;
const BT_REPLAY_LEN = 220;
const BT_SPEEDS = [1,2,4,8];

function fwgHashSeed(str) {
  let h = 2166136261;
  for (let i=0;i<str.length;i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function fwgMulberry32(seed) {
  let t = seed;
  return function() {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
/* Deterministic per symbol+timeframe — the same "history" reappears on every
   reload (a stable sample dataset) while still differing across symbols. */
function fwgGenerateSampleCandles(symbolMeta, tf, count) {
  const rand = fwgMulberry32(fwgHashSeed(symbolMeta.value+'|'+tf.value));
  const stepSec = tf.mins*60;
  const nowSec = Math.floor(Date.now()/1000/stepSec)*stepSec;
  let price = symbolMeta.base;
  let vol = tf.vol * symbolMeta.base * 0.0022;
  const candles = [];
  for (let i=count-1; i>=0; i--) {
    const time = nowSec - i*stepSec;
    vol = Math.max(vol*0.92 + rand()*symbolMeta.base*0.0006*tf.vol, symbolMeta.base*0.00015);
    const open = price;
    let hi=open, lo=open, cur=open;
    for (let k=0;k<5;k++) { cur += (rand()-0.5)*vol*0.7; hi=Math.max(hi,cur); lo=Math.min(lo,cur); }
    cur += (rand()-0.5)*vol*0.9;
    hi = Math.max(hi,cur); lo = Math.min(lo,cur);
    const close = cur;
    candles.push({
      time, volume: Math.round(180+rand()*760),
      open:+open.toFixed(symbolMeta.decimals), high:+hi.toFixed(symbolMeta.decimals),
      low:+lo.toFixed(symbolMeta.decimals), close:+close.toFixed(symbolMeta.decimals),
    });
    price = close;
  }
  return candles;
}
function fwgVolBar(c) { return { time:c.time, value:c.volume, color: c.close>=c.open ? 'rgba(47,208,138,0.5)' : 'rgba(242,112,111,0.5)' }; }
function fwgComputePnl(direction, entry, price, size) { return (direction==='Buy' ? (price-entry) : (entry-price)) * size; }
function fwgMaxDrawdownFromEquity(points) {
  if (points.length < 2) return 0;
  let peak = points[0].balance, max = 0;
  for (const p of points) { if (p.balance>peak) peak = p.balance; if (peak>0) { const dd=((peak-p.balance)/peak)*100; if (dd>max) max=dd; } }
  return max;
}
function fwgBuildTradeRecord(pos, closeIndex, exitPrice, pnl, tag, dataset, symbolMeta, seq) {
  const riskDist = pos.sl!=null ? Math.abs(pos.entry-pos.sl) : null;
  const rMultiple = riskDist ? +(((pos.direction==='Buy'?(exitPrice-pos.entry):(pos.entry-exitPrice))/riskDist).toFixed(2)) : null;
  const plannedRR = (riskDist && pos.tp!=null) ? +((Math.abs(pos.tp-pos.entry)/riskDist).toFixed(2)) : null;
  const candle = dataset[closeIndex];
  return {
    id:'t'+seq, closeIndex, date:new Date(candle.time*1000).toISOString().slice(0,10),
    symbol:symbolMeta.label, direction:pos.direction, entry:pos.entry, exit:exitPrice,
    stopLoss:pos.sl, takeProfit:pos.tp, size:pos.size,
    result: pnl>0?'Win':pnl<0?'Loss':'Breakeven', riskReward:plannedRR, rMultiple, pnl:+pnl.toFixed(2), closedBy:tag,
  };
}

/* Isolates the imperative lightweight-charts instance from React's render
   cycle: created once on mount, then mutated via .setData()/.update() from
   the parent's own effects instead of being torn down on every state change. */
function ClientBacktestChartCanvas({ chartApiRef }) {
  const containerRef = React.useRef(null);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el || !window.LightweightCharts) return;
    const cs = getComputedStyle(document.documentElement);
    const col = (name, fallback) => { const v = cs.getPropertyValue(name).trim(); return v || fallback; };
    const bullish = col('--bullish','#2FD08A'), bearish = col('--bearish','#F2706F');
    const textTertiary = col('--text-tertiary','#828AA0');
    const borderSubtle = col('--border-subtle','rgba(255,255,255,0.06)');
    const borderDefault = col('--border-default','rgba(255,255,255,0.10)');

    const chart = window.LightweightCharts.createChart(el, {
      width: el.clientWidth, height: 440,
      layout: { background:{ type:'solid', color:'transparent' }, textColor:textTertiary, fontSize:11 },
      grid: { vertLines:{ color:borderSubtle }, horzLines:{ color:borderSubtle } },
      rightPriceScale: { borderColor:borderDefault },
      timeScale: { borderColor:borderDefault, timeVisible:true, secondsVisible:false },
      crosshair: { mode: window.LightweightCharts.CrosshairMode.Normal },
    });
    const candleSeries = chart.addCandlestickSeries({ upColor:bullish, downColor:bearish, borderVisible:false, wickUpColor:bullish, wickDownColor:bearish });
    candleSeries.priceScale().applyOptions({ scaleMargins:{ top:0.08, bottom:0.24 } });
    const volumeSeries = chart.addHistogramSeries({ priceFormat:{ type:'volume' }, priceScaleId:'', color:borderDefault });
    volumeSeries.priceScale().applyOptions({ scaleMargins:{ top:0.82, bottom:0 } });

    chartApiRef.current = { chart, candleSeries, volumeSeries };
    const ro = new ResizeObserver(entries => { const w = entries[0].contentRect.width; if (w>0) chart.applyOptions({ width:w }); });
    ro.observe(el);
    return () => { ro.disconnect(); chart.remove(); chartApiRef.current = null; };
  }, []);

  return <div ref={containerRef} style={{width:'100%',height:'440px'}}/>;
}

function ClientBacktestingPage() {
  const [symbolValue, setSymbolValue] = React.useState('XAUUSD');
  const [tfValue, setTfValue] = React.useState('H1');
  const [startingBalance, setStartingBalance] = React.useState('10000');
  const [riskPct, setRiskPct] = React.useState('1');
  const [accounts, setAccounts] = React.useState([]);
  const [accountId, setAccountId] = React.useState('');
  const [linkedStats, setLinkedStats] = React.useState(null);

  const [cursor, setCursor] = React.useState(BT_PREROLL);
  const [playing, setPlaying] = React.useState(false);
  const [speed, setSpeed] = React.useState(1);

  const [position, setPosition] = React.useState(null);
  const [sizeInput, setSizeInput] = React.useState('1000');
  const [slInput, setSlInput] = React.useState('');
  const [tpInput, setTpInput] = React.useState('');
  const [closedTrades, setClosedTrades] = React.useState([]);
  const [savedIds, setSavedIds] = React.useState({});
  const [savingId, setSavingId] = React.useState(null);

  const chartApiRef = React.useRef(null);
  const tradeSeqRef = React.useRef(0);

  const symbolMeta = BT_SYMBOLS.find(s=>s.value===symbolValue);
  const tfMeta = BT_TIMEFRAMES.find(t=>t.value===tfValue);
  const dataset = React.useMemo(() => fwgGenerateSampleCandles(symbolMeta, tfMeta, BT_PREROLL+BT_REPLAY_LEN), [symbolValue, tfValue]);
  const atEnd = cursor >= dataset.length-1;

  React.useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${window.FWG_API_BASE}/api/trading-accounts`, { credentials:'include' });
        const data = await res.json().catch(()=>({}));
        if (res.ok && data.success) setAccounts(data.accounts);
      } catch (err) {}
    })();
  }, []);

  /* Picking a real trading account here isn't just a label on saved trades:
     it seeds this session from that account's actual live balance (starting
     balance + every real trade already tagged to it) and its own risk %, so
     "trade on multiple accounts" means each account's backtests continue
     from where that account really stands, not an arbitrary number. */
  React.useEffect(() => {
    if (!accountId) { setLinkedStats(null); return; }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${window.FWG_API_BASE}/api/trading-accounts/${accountId}/stats`, { credentials:'include' });
        const data = await res.json().catch(()=>({}));
        if (cancelled || !res.ok || !data.success) return;
        setLinkedStats(data.stats);
        setStartingBalance(String(data.stats.accountBalance));
        if (data.stats.riskPerTradePct != null) setRiskPct(String(data.stats.riskPerTradePct));
      } catch (err) {}
    })();
    return () => { cancelled = true; };
  }, [accountId]);

  // New symbol/timeframe = a fresh session: reset replay, position, and log.
  React.useEffect(() => {
    setCursor(BT_PREROLL); setPlaying(false); setPosition(null); setClosedTrades([]);
    const api = chartApiRef.current;
    if (api) {
      const visible = dataset.slice(0, BT_PREROLL);
      api.candleSeries.setData(visible);
      api.volumeSeries.setData(visible.map(fwgVolBar));
      api.chart.timeScale().fitContent();
    }
  }, [dataset]);

  function revealTo(targetIndex) {
    const api = chartApiRef.current;
    const to = Math.max(0, Math.min(targetIndex, dataset.length-1));
    if (to === cursor) return;
    if (to < cursor) {
      const visible = dataset.slice(0, to+1);
      if (api) { api.candleSeries.setData(visible); api.volumeSeries.setData(visible.map(fwgVolBar)); }
      setPosition(pos => (pos && pos.openIndex>to) ? null : pos);
      setClosedTrades(list => list.filter(t=>t.closeIndex<=to));
      setCursor(to);
      return;
    }
    let pos = position;
    const newClosed = [];
    for (let i=cursor+1; i<=to; i++) {
      const candle = dataset[i];
      if (api) { api.candleSeries.update(candle); api.volumeSeries.update(fwgVolBar(candle)); }
      if (pos) {
        let hit = null;
        if (pos.sl!=null) { const h = pos.direction==='Buy' ? candle.low<=pos.sl : candle.high>=pos.sl; if (h) hit = { price:pos.sl, tag:'Stop loss' }; }
        if (!hit && pos.tp!=null) { const h = pos.direction==='Buy' ? candle.high>=pos.tp : candle.low<=pos.tp; if (h) hit = { price:pos.tp, tag:'Take profit' }; }
        if (hit) {
          const pnl = fwgComputePnl(pos.direction, pos.entry, hit.price, pos.size);
          tradeSeqRef.current += 1;
          newClosed.push(fwgBuildTradeRecord(pos, i, hit.price, pnl, hit.tag, dataset, symbolMeta, tradeSeqRef.current));
          pos = null;
        }
      }
    }
    if (newClosed.length) setClosedTrades(list => [...list, ...newClosed]);
    setPosition(pos);
    setCursor(to);
  }

  React.useEffect(() => {
    if (!playing || atEnd) { if (atEnd) setPlaying(false); return; }
    const id = setTimeout(() => revealTo(cursor+1), 900/speed);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, atEnd, cursor, speed, position, dataset]);

  function openPosition(dir) {
    if (position) return;
    const entryPrice = dataset[cursor].close;
    const size = Math.max(1, Number(sizeInput)||1);
    setPosition({ direction:dir, entry:entryPrice, size, sl: slInput===''?null:Number(slInput), tp: tpInput===''?null:Number(tpInput), openIndex:cursor });
  }
  function manualClose() {
    if (!position) return;
    const exitPrice = dataset[cursor].close;
    const pnl = fwgComputePnl(position.direction, position.entry, exitPrice, position.size);
    tradeSeqRef.current += 1;
    setClosedTrades(list => [...list, fwgBuildTradeRecord(position, cursor, exitPrice, pnl, 'Manual', dataset, symbolMeta, tradeSeqRef.current)]);
    setPosition(null);
  }
  function suggestSize() {
    const sl = Number(slInput);
    if (slInput==='' || !Number.isFinite(sl)) return;
    const price = dataset[cursor].close;
    const dist = Math.abs(price-sl);
    if (dist<=0) return;
    const riskAmount = (Number(startingBalance)||0) * (Number(riskPct)||0) / 100;
    setSizeInput(String(Math.max(1, Math.round(riskAmount/dist))));
  }
  async function saveTradeToJournal(trade) {
    setSavingId(trade.id);
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trades`, {
        method:'POST', credentials:'include', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          date:trade.date, symbol:trade.symbol, direction:trade.direction, entry:trade.entry, exit:trade.exit,
          stopLoss:trade.stopLoss, takeProfit:trade.takeProfit, result:trade.result, riskReward:trade.riskReward,
          rMultiple:trade.rMultiple, pnl:trade.pnl, accountId: accountId||null, source:'backtest',
          notes:`Backtesting session — ${symbolMeta.label} ${tfMeta.label}, sample data, closed by ${trade.closedBy}.`,
        }),
      });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.success) setSavedIds(s=>({...s,[trade.id]:true}));
    } catch (err) {} finally { setSavingId(null); }
  }

  const currentPrice = dataset[cursor].close;
  const realized = closedTrades.reduce((s,t)=>s+t.pnl, 0);
  const unrealized = position ? fwgComputePnl(position.direction, position.entry, currentPrice, position.size) : 0;
  const balance = (Number(startingBalance)||0) + realized;
  const equityPoints = React.useMemo(() => {
    const base = Number(startingBalance)||0;
    let running = base;
    const pts = [{ balance: base }];
    for (const t of [...closedTrades].sort((a,b)=>a.closeIndex-b.closeIndex)) { running += t.pnl; pts.push({ balance: running }); }
    return pts;
  }, [closedTrades, startingBalance]);
  const maxDrawdownPct = fwgMaxDrawdownFromEquity(equityPoints);

  return <React.Fragment>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',marginBottom:'20px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Backtesting</h1>
      <KitBadge tone="neutral" mono>Sample data — not real market prices</KitBadge>
    </div>

    <KitCard padding="0" style={{overflow:'hidden',marginBottom:'20px'}}>
      <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border-subtle)',display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',gap:'10px',flexWrap:'wrap',alignItems:'center'}}>
          <select value={symbolValue} onChange={e=>setSymbolValue(e.target.value)} style={{...CLIENT_INPUT_STYLE,width:'auto',cursor:'pointer'}}>
            {BT_SYMBOLS.map(s=>(<option key={s.value} value={s.value}>{s.label}</option>))}
          </select>
          <div style={{display:'flex',gap:'6px'}}>
            {BT_TIMEFRAMES.map(tf=>{
              const on = tf.value===tfValue;
              return <button key={tf.value} type="button" onClick={()=>setTfValue(tf.value)}
                style={{padding:'9px 14px',borderRadius:'var(--radius-md)',cursor:'pointer',fontSize:'var(--text-xs)',fontWeight:700,
                  border:`1px solid ${on?'var(--border-gold)':'var(--border-default)'}`,
                  background:on?'var(--accent-soft-bg)':'var(--surface-inset)',color:on?'var(--text-gold)':'var(--text-secondary)'}}>
                {tf.label}
              </button>;
            })}
          </div>
        </div>
        <div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-md)',fontWeight:700}}>{currentPrice.toFixed(symbolMeta.decimals)}</div>
      </div>

      <ClientBacktestChartCanvas chartApiRef={chartApiRef}/>

      <div style={{padding:'14px 18px',borderTop:'1px solid var(--border-subtle)',display:'flex',gap:'10px',alignItems:'center',flexWrap:'wrap'}}>
        <button type="button" onClick={()=>revealTo(BT_PREROLL)} title="Back to start"
          style={{width:'38px',height:'38px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer'}}>
          <Icon name="skip-back" size={16}/>
        </button>
        <button type="button" onClick={()=>setPlaying(p=>!p)} disabled={atEnd} title={playing?'Pause':'Play'}
          style={{width:'38px',height:'38px',borderRadius:'var(--radius-md)',background:playing?'var(--accent-soft-bg)':'var(--surface-inset)',border:`1px solid ${playing?'var(--border-gold)':'var(--border-default)'}`,color:playing?'var(--text-gold)':'var(--text-secondary)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:atEnd?'not-allowed':'pointer',opacity:atEnd?0.5:1}}>
          <Icon name={playing?'pause':'play'} size={16}/>
        </button>
        <button type="button" onClick={()=>{ setPlaying(false); revealTo(cursor+1); }} disabled={atEnd} title="Step forward one candle"
          style={{width:'38px',height:'38px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:atEnd?'not-allowed':'pointer',opacity:atEnd?0.5:1}}>
          <Icon name="skip-forward" size={16}/>
        </button>
        <select value={speed} onChange={e=>setSpeed(Number(e.target.value))} style={{...CLIENT_INPUT_STYLE,width:'auto',cursor:'pointer'}}>
          {BT_SPEEDS.map(s=>(<option key={s} value={s}>{s}x</option>))}
        </select>
        <input type="range" min={BT_PREROLL} max={dataset.length-1} value={cursor} onChange={e=>{ setPlaying(false); revealTo(Number(e.target.value)); }}
          style={{flex:1,minWidth:'140px',accentColor:'var(--accent)'}}/>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-muted)',whiteSpace:'nowrap'}}>{cursor-BT_PREROLL+1} / {dataset.length-BT_PREROLL}</span>
      </div>

      <div style={{padding:'14px 18px',borderTop:'1px solid var(--border-subtle)',display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'12px',background:'var(--surface-inset)'}} className="fwg-grid-3">
        <div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Account balance</div><div style={{fontFamily:'var(--font-mono)',fontWeight:700}}>{fwgFormatMoney(balance)}</div></div>
        <div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Realized P/L</div><div style={{fontFamily:'var(--font-mono)',fontWeight:700,color:realized>0?'var(--bullish)':realized<0?'var(--bearish)':'var(--text-primary)'}}>{fwgFormatMoney(realized)}</div></div>
        <div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,marginBottom:'4px'}}>Unrealized P/L</div><div style={{fontFamily:'var(--font-mono)',fontWeight:700,color:unrealized>0?'var(--bullish)':unrealized<0?'var(--bearish)':'var(--text-primary)'}}>{position?fwgFormatMoney(unrealized):'—'}</div></div>
      </div>
    </KitCard>

    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}} className="fwg-grid-2">
      <KitCard>
        <div style={{fontSize:'var(--text-xs)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--text-muted)',marginBottom:'14px'}}>Trade controls</div>
        <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
          <div>
            <ClientFieldLabel>Trading account (optional)</ClientFieldLabel>
            <ClientSelect value={accountId} onChange={setAccountId} placeholder="Don't link an account — use custom balance below" options={accounts.map(a=>({value:String(a.id),label:a.name}))}/>
            {linkedStats && <p style={{fontSize:'var(--text-2xs)',color:'var(--text-tertiary)',margin:'8px 0 0',lineHeight:1.5}}>
              Linked to <strong style={{color:'var(--text-gold)'}}>{linkedStats.name}</strong> — using its live balance ({fwgFormatMoney(linkedStats.accountBalance)} from {linkedStats.totalTrades} real trade{linkedStats.totalTrades===1?'':'s'}). Trades you save from this session add to that same balance.
            </p>}
            {linkedStats && linkedStats.maxDrawdownLimitPct!=null && maxDrawdownPct>linkedStats.maxDrawdownLimitPct && (
              <p style={{fontSize:'var(--text-2xs)',color:'var(--bearish)',fontWeight:700,margin:'8px 0 0',lineHeight:1.5}}>
                This session's drawdown ({fwgFormatPct(maxDrawdownPct)}) has breached {linkedStats.name}'s {linkedStats.maxDrawdownLimitPct}% max drawdown limit.
              </p>
            )}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Starting balance{accountId?' (from account)':''}</ClientFieldLabel><input type="number" style={CLIENT_INPUT_STYLE} value={startingBalance} onChange={e=>setStartingBalance(e.target.value)} disabled={!!accountId}/></div>
            <div><ClientFieldLabel>Risk %{accountId?' (from account)':''}</ClientFieldLabel><input type="number" style={CLIENT_INPUT_STYLE} value={riskPct} onChange={e=>setRiskPct(e.target.value)} disabled={!!accountId}/></div>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            <KitButton as="button" type="button" variant="emerald" fullWidth disabled={!!position} onClick={()=>openPosition('Buy')}>Buy</KitButton>
            <button type="button" disabled={!!position} onClick={()=>openPosition('Sell')}
              style={{flex:1,display:'inline-flex',alignItems:'center',justifyContent:'center',padding:'12px 22px',borderRadius:'var(--radius-md)',fontWeight:700,fontSize:'var(--text-sm)',cursor:position?'not-allowed':'pointer',
                background:'var(--bearish-bg)',color:'var(--bearish)',border:'1px solid rgba(228,71,74,0.32)',opacity:position?0.5:1}}>
              Sell
            </button>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}} className="fwg-grid-2">
            <input type="number" step="any" placeholder="Stop loss" style={CLIENT_INPUT_STYLE} value={slInput} onChange={e=>setSlInput(e.target.value)} disabled={!!position}/>
            <input type="number" step="any" placeholder="Take profit" style={CLIENT_INPUT_STYLE} value={tpInput} onChange={e=>setTpInput(e.target.value)} disabled={!!position}/>
          </div>
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            <input type="number" placeholder="Position size (units)" style={CLIENT_INPUT_STYLE} value={sizeInput} onChange={e=>setSizeInput(e.target.value)} disabled={!!position}/>
            <button type="button" onClick={suggestSize} disabled={!!position || slInput===''} title="Size from risk % and stop distance"
              style={{flexShrink:0,padding:'12px 14px',borderRadius:'var(--radius-md)',fontSize:'var(--text-xs)',fontWeight:700,cursor:(!!position||slInput==='')?'not-allowed':'pointer',
                background:'var(--surface-inset)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',opacity:(!!position||slInput==='')?0.5:1,whiteSpace:'nowrap'}}>
              Suggest size
            </button>
          </div>
          {position && <div style={{padding:'12px 14px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px'}}>
            <span style={{fontSize:'var(--text-xs)',color:position.direction==='Buy'?'var(--bullish)':'var(--bearish)',fontWeight:700}}>{position.direction} @ {position.entry.toFixed(symbolMeta.decimals)}</span>
            <KitButton as="button" type="button" variant="secondary" size="sm" onClick={manualClose}>Close</KitButton>
          </div>}
        </div>
      </KitCard>
      <KitCard>
        <div style={{fontSize:'var(--text-xs)',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--text-muted)',marginBottom:'14px'}}>Session stats</div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
          <ClientStatCard label="Balance" value={fwgFormatMoney(balance)} />
          <ClientStatCard label="Realized P/L" value={fwgFormatMoney(realized)} accent={realized>0?'var(--bullish)':realized<0?'var(--bearish)':undefined} />
          <ClientStatCard label="Trades closed" value={closedTrades.length} />
          <ClientStatCard label="Max drawdown" value={fwgFormatPct(maxDrawdownPct)} accent={maxDrawdownPct>0?'var(--bearish)':undefined} />
        </div>
      </KitCard>
    </div>

    <KitCard padding="0" style={{overflow:'hidden'}}>
      <div style={{padding:'18px 20px',borderBottom:'1px solid var(--border-subtle)'}}>
        <span style={{fontFamily:'var(--font-body)',fontWeight:700,fontSize:'var(--text-sm)'}}>Session trades</span>
      </div>
      {!closedTrades.length
        ? <div style={{padding:'32px 20px',textAlign:'center',fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>No trades closed yet this session.</div>
        : <div className="fwg-tablewrap">
            <div style={{minWidth:'720px'}}>
              <table style={{width:'100%',borderCollapse:'collapse',fontSize:'var(--text-sm)'}}>
                <thead><tr>
                  {['Direction','Entry','Exit','Result','P/L','Closed by',''].map(h=>(
                    <th key={h} style={{textAlign:'left',padding:'11px 16px',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',background:'var(--surface-inset)'}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {[...closedTrades].reverse().map(t=>(
                    <tr key={t.id}>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700,color:t.direction==='Buy'?'var(--bullish)':'var(--bearish)'}}>{t.direction}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.entry.toFixed(symbolMeta.decimals)}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{t.exit.toFixed(symbolMeta.decimals)}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700,color:t.result==='Win'?'var(--bullish)':t.result==='Loss'?'var(--bearish)':'var(--text-tertiary)'}}>{t.result}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',color:t.pnl>0?'var(--bullish)':t.pnl<0?'var(--bearish)':'var(--text-primary)'}}>{fwgFormatMoney(t.pnl)}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)',color:'var(--text-tertiary)'}}>{t.closedBy}</td>
                      <td style={{padding:'11px 16px',borderBottom:'1px solid var(--border-subtle)'}}>
                        {savedIds[t.id]
                          ? <KitBadge tone="neutral" mono>Saved</KitBadge>
                          : <button type="button" onClick={()=>saveTradeToJournal(t)} disabled={savingId===t.id}
                              style={{padding:'6px 12px',borderRadius:'var(--radius-sm)',fontSize:'var(--text-xs)',fontWeight:700,cursor:savingId===t.id?'not-allowed':'pointer',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',color:'var(--text-gold)'}}>
                              {savingId===t.id?'Saving…':'Save to journal'}
                            </button>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>}
    </KitCard>
    <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'16px'}}>Chart data is a deterministic sample random walk generated for this workspace — it is not real market history, so results here don't validate a strategy against real trading. Trades you save go into your real Trading Journal tagged "BT".</p>
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
          <ClientErrorBanner message={error}/>
          {saved && <div style={{fontSize:'var(--text-xs)',color:'var(--bullish)',fontWeight:600}}>Saved.</div>}
          <div><KitButton as="button" type="submit" variant="secondary" disabled={saving}>{saving?'Saving…':'Save balance'}</KitButton></div>
        </form>
      </KitCard>
    </div>
    <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'16px'}}>Profile editing and password changes are coming in a future update.</p>
  </React.Fragment>;
}

Object.assign(window,{ClientDashboardPage,ClientJournalPage,ClientPerformancePage,ClientBacktestingPage,ClientSettingsPage});

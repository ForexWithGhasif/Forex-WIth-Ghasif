/* FWG, Client Area — Trading Accounts, Trading Plan, Markets, Economic
   Calendar. Accounts/Plans are fully user-scoped CRUD against the backend
   (backend/services/tradingAccountService.js, tradingPlanService.js — every
   query filtered by user_id). Markets reuses the same official TradingView
   widget already embedded on the homepage (see Sections2.jsx's LiveMarkets)
   plus the existing real /api/market-prices feed; Calendar reuses the
   existing real /api/economic-calendar backend. Nothing here is new fake
   data — both endpoints already power real, tested features elsewhere. */

function ClientAccountModal({ account, onClose, onSaved }) {
  const [f, setF] = React.useState({
    name: account ? account.name : '',
    startingBalance: account ? String(account.startingBalance) : '',
    riskPerTradePct: account && account.riskPerTradePct != null ? String(account.riskPerTradePct) : '',
    maxDrawdownPct: account && account.maxDrawdownPct != null ? String(account.maxDrawdownPct) : '',
  });
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
    setSubmitting(true); setError('');
    try {
      const url = account ? `${window.FWG_API_BASE}/api/trading-accounts/${account.id}` : `${window.FWG_API_BASE}/api/trading-accounts`;
      const res = await fetch(url, {
        method: account ? 'PUT' : 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
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
      <div onClick={e=>e.stopPropagation()} className="fwg-modal-card" style={{position:'relative',width:'min(460px,100%)',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',padding:'clamp(24px,4vw,36px)'}}>
        <button onClick={onClose} aria-label="Close" type="button"
          style={{position:'absolute',top:'16px',right:'16px',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',background:'rgba(10,12,17,0.6)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
          <Icon name="x" size={17}/>
        </button>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-xl)',margin:'0 0 20px'}}>{account?'Edit account':'New trading account'}</h2>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div><ClientFieldLabel>Account name</ClientFieldLabel><input required type="text" placeholder="e.g. Live FTMO 100k" style={CLIENT_INPUT_STYLE} value={f.name} onChange={set('name')}/></div>
          <div><ClientFieldLabel>Starting balance</ClientFieldLabel><input required type="number" step="any" min="0" style={CLIENT_INPUT_STYLE} value={f.startingBalance} onChange={set('startingBalance')}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Risk per trade %</ClientFieldLabel><input type="number" step="any" min="0" style={CLIENT_INPUT_STYLE} value={f.riskPerTradePct} onChange={set('riskPerTradePct')}/></div>
            <div><ClientFieldLabel>Max drawdown %</ClientFieldLabel><input type="number" step="any" min="0" style={CLIENT_INPUT_STYLE} value={f.maxDrawdownPct} onChange={set('maxDrawdownPct')}/></div>
          </div>
          <ClientErrorBanner message={error}/>
          <KitButton as="button" type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>{submitting?'Saving…':(account?'Save changes':'Create account')}</KitButton>
        </form>
      </div>
    </div>
  );
}

function ClientTradingAccountsPage() {
  const [state, setState] = React.useState({ status:'loading', accounts:[] });
  const [modal, setModal] = React.useState(null); // null | 'new' | account object
  const [stats, setStats] = React.useState({}); // accountId -> computed stats from trades tagged to it

  const loadStats = React.useCallback(async (id) => {
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trading-accounts/${id}/stats`, { credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.success) setStats(s => ({ ...s, [id]: data.stats }));
    } catch (err) {}
  }, []);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trading-accounts`, { credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.success) {
        setState({ status:'ready', accounts: data.accounts });
        data.accounts.forEach(a => loadStats(a.id));
      }
      else setState({ status:'error', accounts:[] });
    } catch (err) { setState({ status:'error', accounts:[] }); }
  }, [loadStats]);
  React.useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try { await fetch(`${window.FWG_API_BASE}/api/trading-accounts/${id}`, { method:'DELETE', credentials:'include' }); load(); }
    catch (err) {}
  };

  return <React.Fragment>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Trading Accounts</h1>
      <KitButton as="button" type="button" onClick={()=>setModal('new')} variant="primary" iconLeft={<Icon name="plus" size={16}/>}>New account</KitButton>
    </div>

    {state.status === 'loading' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading your accounts…</div></KitCard>}
    {state.status === 'error' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load your accounts right now. Please refresh the page.</div></KitCard>}
    {state.status === 'ready' && state.accounts.length === 0 && (
      <ClientComingSoon icon="wallet" title="No trading accounts yet" description="Create one to track a starting balance, risk-per-trade limit, and max drawdown separate from your main account." />
    )}

    {state.status === 'ready' && state.accounts.length > 0 && (
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}} className="fwg-grid-3">
        {state.accounts.map(a=>{
          const s = stats[a.id];
          const balance = s ? s.accountBalance : a.startingBalance;
          const breach = s && s.hasTrades && a.maxDrawdownPct!=null && s.maxDrawdownPct > a.maxDrawdownPct;
          return <KitCard key={a.id}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'14px'}}>
              <div style={{width:'40px',height:'40px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                <Icon name="wallet" size={18} color="var(--text-gold)"/>
              </div>
              <div style={{display:'flex',gap:'6px'}}>
                <button type="button" onClick={()=>setModal(a)} aria-label="Edit account" style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-tertiary)'}}><Icon name="pencil" size={15}/></button>
                <button type="button" onClick={()=>handleDelete(a.id)} aria-label="Delete account" style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-tertiary)'}}><Icon name="trash-2" size={15}/></button>
              </div>
            </div>
            <div style={{fontSize:'var(--text-md)',fontWeight:700,marginBottom:'10px'}}>{a.name}</div>
            <div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:700,marginBottom:'6px'}}>{fwgFormatMoney(balance)}</div>
            <div style={{fontSize:'var(--text-xs)',marginBottom:'10px',color:'var(--text-tertiary)'}}>
              {!s && 'Loading performance…'}
              {s && !s.hasTrades && 'No trades logged yet'}
              {s && s.hasTrades && (
                <span style={{color:s.profitLoss>=0?'var(--bullish)':'var(--bearish)',fontWeight:700}}>
                  {s.profitLoss>=0?'+':''}{fwgFormatMoney(s.profitLoss)}
                </span>
              )}
              {s && s.hasTrades && <span> · {s.totalTrades} trade{s.totalTrades===1?'':'s'}{s.winRate!=null?` · ${fwgFormatPct(s.winRate,0)} win rate`:''}</span>}
            </div>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {a.riskPerTradePct!=null && <KitBadge tone="neutral" mono>Risk {a.riskPerTradePct}%</KitBadge>}
              {a.maxDrawdownPct!=null && <KitBadge tone={breach?'bear':'neutral'} mono>{breach?'Over limit — ':'Max DD '}{a.maxDrawdownPct}%</KitBadge>}
            </div>
          </KitCard>;
        })}
      </div>
    )}

    {modal && <ClientAccountModal account={modal==='new'?null:modal} onClose={()=>setModal(null)} onSaved={()=>{ setModal(null); load(); }} />}
  </React.Fragment>;
}

function ClientPlanModal({ onClose, onSaved }) {
  const [f, setF] = React.useState({ session:'', symbols:'', strategy:'', entryRules:'', slRules:'', tpRules:'', riskPercent:'', maxDailyLoss:'', maxTrades:'', noTradeConditions:'' });
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
    setSubmitting(true); setError('');
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trading-plans`, {
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
      <div onClick={e=>e.stopPropagation()} className="fwg-modal-card" style={{position:'relative',width:'min(560px,100%)',maxHeight:'88vh',overflowY:'auto',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',padding:'clamp(24px,4vw,36px)'}}>
        <button onClick={onClose} aria-label="Close" type="button"
          style={{position:'absolute',top:'16px',right:'16px',width:'36px',height:'36px',borderRadius:'50%',cursor:'pointer',background:'rgba(10,12,17,0.6)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
          <Icon name="x" size={17}/>
        </button>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-xl)',margin:'0 0 20px'}}>New trading plan</h2>
        <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Session name</ClientFieldLabel><input required type="text" placeholder="e.g. London breakout" style={CLIENT_INPUT_STYLE} value={f.session} onChange={set('session')}/></div>
            <div><ClientFieldLabel>Symbols</ClientFieldLabel><input type="text" placeholder="EUR/USD, XAU/USD" style={CLIENT_INPUT_STYLE} value={f.symbols} onChange={set('symbols')}/></div>
          </div>
          <div><ClientFieldLabel>Strategy</ClientFieldLabel><textarea required rows={2} style={{...CLIENT_INPUT_STYLE,resize:'vertical'}} value={f.strategy} onChange={set('strategy')}/></div>
          <div><ClientFieldLabel>Entry rules</ClientFieldLabel><textarea rows={2} style={{...CLIENT_INPUT_STYLE,resize:'vertical'}} value={f.entryRules} onChange={set('entryRules')}/></div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
            <div><ClientFieldLabel>Stop-loss rules</ClientFieldLabel><textarea rows={2} style={{...CLIENT_INPUT_STYLE,resize:'vertical'}} value={f.slRules} onChange={set('slRules')}/></div>
            <div><ClientFieldLabel>Take-profit rules</ClientFieldLabel><textarea rows={2} style={{...CLIENT_INPUT_STYLE,resize:'vertical'}} value={f.tpRules} onChange={set('tpRules')}/></div>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'14px'}} className="fwg-grid-3">
            <div><ClientFieldLabel>Risk %</ClientFieldLabel><input type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.riskPercent} onChange={set('riskPercent')}/></div>
            <div><ClientFieldLabel>Max daily loss</ClientFieldLabel><input type="number" step="any" style={CLIENT_INPUT_STYLE} value={f.maxDailyLoss} onChange={set('maxDailyLoss')}/></div>
            <div><ClientFieldLabel>Max trades/day</ClientFieldLabel><input type="number" step="1" style={CLIENT_INPUT_STYLE} value={f.maxTrades} onChange={set('maxTrades')}/></div>
          </div>
          <div><ClientFieldLabel>No-trade conditions</ClientFieldLabel><textarea rows={2} placeholder="e.g. No trading 30 min before/after high-impact news" style={{...CLIENT_INPUT_STYLE,resize:'vertical'}} value={f.noTradeConditions} onChange={set('noTradeConditions')}/></div>
          <ClientErrorBanner message={error}/>
          <KitButton as="button" type="submit" variant="primary" size="lg" fullWidth disabled={submitting}>{submitting?'Saving…':'Save plan'}</KitButton>
        </form>
      </div>
    </div>
  );
}

function ClientTradingPlanPage() {
  const [state, setState] = React.useState({ status:'loading', plans:[] });
  const [modalOpen, setModalOpen] = React.useState(false);

  const load = React.useCallback(async () => {
    try {
      const res = await fetch(`${window.FWG_API_BASE}/api/trading-plans`, { credentials:'include' });
      const data = await res.json().catch(()=>({}));
      if (res.ok && data.success) setState({ status:'ready', plans: data.plans });
      else setState({ status:'error', plans:[] });
    } catch (err) { setState({ status:'error', plans:[] }); }
  }, []);
  React.useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try { await fetch(`${window.FWG_API_BASE}/api/trading-plans/${id}`, { method:'DELETE', credentials:'include' }); load(); }
    catch (err) {}
  };

  return <React.Fragment>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'20px',flexWrap:'wrap',gap:'12px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Trading Plan</h1>
      <KitButton as="button" type="button" onClick={()=>setModalOpen(true)} variant="primary" iconLeft={<Icon name="plus" size={16}/>}>New plan</KitButton>
    </div>

    {state.status === 'loading' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading your plans…</div></KitCard>}
    {state.status === 'error' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load your plans right now. Please refresh the page.</div></KitCard>}
    {state.status === 'ready' && state.plans.length === 0 && (
      <ClientComingSoon icon="clipboard-list" title="No trading plans yet" description="Document your rules, risk limits, and no-trade conditions once — then link any journal entry back to the plan you followed." />
    )}

    {state.status === 'ready' && state.plans.length > 0 && (
      <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
        {state.plans.map(p=>(
          <KitCard key={p.id}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'14px',marginBottom:'10px'}}>
              <div>
                <div style={{fontSize:'var(--text-md)',fontWeight:700}}>{p.session}</div>
                {p.symbols && <div style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)',marginTop:'2px'}}>{p.symbols}</div>}
              </div>
              <button type="button" onClick={()=>handleDelete(p.id)} aria-label="Delete plan" style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-muted)',flexShrink:0}}><Icon name="trash-2" size={16}/></button>
            </div>
            <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:'0 0 12px',lineHeight:1.6}}>{p.strategy}</p>
            <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
              {p.riskPercent!=null && <KitBadge tone="neutral" mono>Risk {p.riskPercent}%</KitBadge>}
              {p.maxDailyLoss!=null && <KitBadge tone="neutral" mono>Max daily loss {p.maxDailyLoss}</KitBadge>}
              {p.maxTrades!=null && <KitBadge tone="neutral" mono>Max {p.maxTrades} trades/day</KitBadge>}
            </div>
          </KitCard>
        ))}
      </div>
    )}

    {modalOpen && <ClientPlanModal onClose={()=>setModalOpen(false)} onSaved={()=>{ setModalOpen(false); load(); }} />}
  </React.Fragment>;
}

/* Markets: the same official TradingView Advanced Chart widget already
   proven on the homepage (Sections2.jsx's LiveMarkets), plus a real ticker
   row from the existing /api/market-prices feed. No new data source, no
   simulated prices. */
function ClientMarketsPage() {
  const containerRef = React.useRef(null);
  const idRef = React.useRef('fwg-client-tv-' + Math.random().toString(36).slice(2));
  const [ticks, setTicks] = React.useState([]);

  React.useEffect(() => {
    let cancelled = false;
    function init() {
      if (cancelled || !containerRef.current || !window.TradingView) return;
      new window.TradingView.widget({
        autosize: true, symbol: 'FX:EURUSD', interval: 'D', timezone: 'Etc/UTC',
        theme: 'dark', style: '1', locale: 'en', toolbar_bg: '#131722',
        enable_publishing: false, allow_symbol_change: true, hide_side_toolbar: false,
        withdateranges: true, details: false, hotlist: false, calendar: false,
        container_id: idRef.current,
      });
    }
    let pollId;
    if (window.TradingView) init();
    else pollId = setInterval(() => { if (window.TradingView) { clearInterval(pollId); init(); } }, 150);

    (async () => {
      try {
        const res = await fetch(`${window.FWG_API_BASE}/api/market-prices`);
        const data = await res.json().catch(()=>({}));
        if (!cancelled && res.ok && data.success) setTicks(data.data);
      } catch (err) {}
    })();

    return () => { cancelled = true; clearInterval(pollId); };
  }, []);

  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Markets</h1>
    <KitCard padding="0" style={{overflow:'hidden',marginBottom:'20px'}}>
      <div style={{padding:'14px 16px',borderBottom:'1px solid var(--border-subtle)',display:'flex',gap:'10px',overflowX:'auto'}}>
        {ticks.map(t=>(
          <div key={t.pair} style={{display:'flex',alignItems:'center',gap:'8px',padding:'8px 14px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-subtle)',flexShrink:0}}>
            <span style={{fontWeight:700,fontSize:'var(--text-xs)'}}>{t.pair}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)'}}>{t.price}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-2xs)',color:t.dir==='up'?'var(--bullish)':'var(--bearish)'}}>{t.dir==='up'?'▲':'▼'} {t.chg}</span>
          </div>
        ))}
      </div>
      <div style={{height:'600px',background:'#131722'}}>
        <div ref={containerRef} id={idRef.current} style={{width:'100%',height:'100%'}}/>
      </div>
    </KitCard>
  </React.Fragment>;
}

/* Economic Calendar: reuses the existing, already-live /api/economic-calendar
   backend (built earlier for the public Tools page) — same real data,
   new client-area presentation. */
function ClientCalendarPage() {
  const [state, setState] = React.useState({ status:'loading', events:[] });

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${window.FWG_API_BASE}/api/economic-calendar`);
        const data = await res.json().catch(()=>({}));
        if (cancelled) return;
        if (res.ok && data.success) setState({ status:'ready', events: data.data });
        else setState({ status:'error', events:[] });
      } catch (err) { if (!cancelled) setState({ status:'error', events:[] }); }
    })();
    return () => { cancelled = true; };
  }, []);

  const impactTone = (impact) => impact==='high' ? 'bear' : impact==='medium' ? 'gold' : 'neutral';

  /* The free FairEconomy feed (economicCalendarService.js) only ever returns
     the current week — there's no lastweek/nextweek variant available
     without a paid provider — so "every week" here means this grouping
     re-forms automatically as the feed rolls over week to week, not that
     past/future weeks are browsable. */
  const groups = React.useMemo(() => {
    const byDay = new Map();
    for (const ev of state.events) {
      if (!ev.dateTime) continue;
      const d = new Date(ev.dateTime);
      const key = d.toDateString();
      if (!byDay.has(key)) byDay.set(key, { date: d, events: [] });
      byDay.get(key).events.push(ev);
    }
    return [...byDay.values()].sort((a,b) => a.date - b.date);
  }, [state.events]);
  const todayKey = new Date().toDateString();

  return <React.Fragment>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:'12px',marginBottom:'20px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:0}}>Economic Calendar</h1>
      <KitBadge tone="neutral" mono>Live — this week, refreshes automatically</KitBadge>
    </div>

    {state.status === 'loading' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'var(--text-sm)'}}>Loading the calendar…</div></KitCard>}
    {state.status === 'error' && <KitCard><div style={{padding:'40px',textAlign:'center',color:'var(--text-secondary)',fontSize:'var(--text-sm)'}}>Couldn't load the calendar right now. Please refresh the page.</div></KitCard>}
    {state.status === 'ready' && groups.length === 0 && <ClientComingSoon icon="calendar-days" title="No events found" description="Check back shortly for upcoming economic events." />}

    {state.status === 'ready' && groups.length > 0 && (
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        {groups.map(g=>{
          const isToday = g.date.toDateString()===todayKey;
          return <KitCard key={g.date.toDateString()} padding="0" style={{overflow:'hidden', border: isToday?'1px solid var(--border-gold)':undefined}}>
            <div style={{padding:'14px 18px',borderBottom:'1px solid var(--border-subtle)',display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap',background:isToday?'var(--accent-soft-bg)':'var(--surface-inset)'}}>
              <span style={{fontWeight:700,fontSize:'var(--text-sm)',color:isToday?'var(--text-gold)':'var(--text-primary)'}}>
                {g.date.toLocaleDateString([], { weekday:'long', month:'long', day:'numeric' })}
              </span>
              {isToday && <KitBadge tone="gold" mono>Today</KitBadge>}
              <span style={{marginLeft:'auto',fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>{g.events.length} event{g.events.length===1?'':'s'}</span>
            </div>
            <div className="fwg-tablewrap">
              <div style={{minWidth:'700px'}}>
                <table style={{width:'100%',borderCollapse:'collapse',fontSize:'var(--text-sm)'}}>
                  <thead>
                    <tr>
                      {['Time','Currency','Event','Impact','Previous','Forecast','Actual'].map(h=>(
                        <th key={h} style={{textAlign:'left',padding:'10px 14px',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)'}}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {g.events.map(ev=>(
                      <tr key={ev.id}>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',color:'var(--text-secondary)',whiteSpace:'nowrap'}}>{new Date(ev.dateTime).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontWeight:700}}>{ev.currency}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)'}}>{ev.title}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)'}}>{ev.impact ? <KitBadge tone={impactTone(ev.impact)} mono>{ev.impact}</KitBadge> : '—'}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',color:'var(--text-tertiary)'}}>{ev.previous || '—'}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)',color:'var(--text-tertiary)'}}>{ev.forecast || '—'}</td>
                        <td style={{padding:'10px 14px',borderBottom:'1px solid var(--border-subtle)',fontFamily:'var(--font-mono)'}}>{ev.actual || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </KitCard>;
        })}
      </div>
    )}
  </React.Fragment>;
}

Object.assign(window,{ClientTradingAccountsPage,ClientTradingPlanPage,ClientMarketsPage,ClientCalendarPage});

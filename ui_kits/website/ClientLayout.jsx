/* FWG, Client Area shared chrome — sidebar + top nav + auth gate.
   Route "protection" here is a client-side redirect for UX (no flash of
   protected content), but the real protection is server-side: this only
   renders once /api/auth/me succeeds against the httpOnly session cookie,
   and any real data these pages fetch later would need that same cookie
   checked server-side again — the frontend redirect alone is not the
   security boundary. */

const ClientUserContext = React.createContext(null);
function useClientUser() { return React.useContext(ClientUserContext); }

const CLIENT_NAV = [
  ['dashboard', 'Dashboard', 'layout-dashboard', '/client/dashboard'],
  ['accounts', 'Trading Accounts', 'wallet', '/client/accounts'],
  ['journal', 'Trading Journal', 'book-open', '/client/journal'],
  ['performance', 'Performance', 'trending-up', '/client/performance'],
  ['plan', 'Trading Plan', 'clipboard-list', '/client/trading-plan'],
  ['markets', 'Markets', 'globe', '/client/markets'],
  ['calendar', 'Economic Calendar', 'calendar-days', '/client/calendar'],
  ['settings', 'Settings', 'settings', '/client/settings'],
];

function ClientLayout({ active, children }) {
  const [state, setState] = React.useState({ status: 'checking', user: null });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${window.FWG_API_BASE}/api/auth/me`, { credentials: 'include' });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok && data.success && data.user) setState({ status: 'authenticated', user: data.user });
        else window.location.href = '/signin';
      } catch (err) {
        if (!cancelled) window.location.href = '/signin';
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleLogout = async () => {
    try { await fetch(`${window.FWG_API_BASE}/api/auth/signout`, { method: 'POST', credentials: 'include' }); } catch (err) {}
    window.location.href = '/signin';
  };

  if (state.status !== 'authenticated') {
    return (
      <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg-base)'}}>
        <span style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>Checking your session…</span>
      </div>
    );
  }

  const initial = (state.user.fullName || 'U').trim()[0].toUpperCase();

  return (
    <div style={{minHeight:'100vh',background:'var(--bg-base)',display:'flex',flexDirection:'column'}}>
      <header style={{position:'sticky',top:0,zIndex:60,display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'14px var(--gutter)',background:'var(--surface-glass)',backdropFilter:'blur(var(--blur-md))',WebkitBackdropFilter:'blur(var(--blur-md))',borderBottom:'1px solid var(--border-subtle)'}}>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <button className="fwg-client-menu-btn" onClick={()=>setMobileOpen(o=>!o)} aria-label="Toggle menu" aria-expanded={mobileOpen}
            style={{width:'38px',height:'38px',alignItems:'center',justifyContent:'center',borderRadius:'var(--radius-md)',background:'var(--surface-card)',border:'1px solid var(--border-default)',color:'var(--text-primary)',cursor:'pointer'}}>
            <Icon name={mobileOpen?'x':'menu'} size={19}/>
          </button>
          <a href="/" style={{display:'flex',alignItems:'center'}} aria-label="Forex With Ghasif home">
            <img src="/assets/fwg-logo.png" alt="Forex With Ghasif" style={{height:'32px',width:'auto'}}/>
          </a>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
          <a href="/" className="fwg-hide-mobile" style={{fontSize:'var(--text-xs)',fontWeight:600,color:'var(--text-tertiary)',textDecoration:'none'}}>Back to website</a>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <div style={{width:'34px',height:'34px',flexShrink:0,borderRadius:'50%',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'#1a1405',fontWeight:800,fontFamily:'var(--font-display)',fontSize:'var(--text-sm)'}}>{initial}</div>
            <span className="fwg-hide-mobile" style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--text-primary)'}}>{state.user.fullName}</span>
          </div>
          <button onClick={handleLogout} aria-label="Sign out"
            style={{display:'inline-flex',alignItems:'center',gap:'7px',padding:'9px 14px',borderRadius:'var(--radius-md)',cursor:'pointer',
              background:'var(--surface-card)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',fontSize:'var(--text-xs)',fontWeight:700,transition:'var(--transition-base)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-default)';e.currentTarget.style.color='var(--text-secondary)';}}>
            <Icon name="log-out" size={15}/> <span className="fwg-hide-mobile">Sign out</span>
          </button>
        </div>
      </header>

      {mobileOpen && <div onClick={()=>setMobileOpen(false)} className="fwg-client-backdrop"/>}

      <div style={{display:'flex',flex:1,alignItems:'stretch'}}>
        <aside className={`fwg-client-sidebar${mobileOpen?' fwg-client-sidebar-open':''}`}
          style={{width:'240px',flexShrink:0,borderRight:'1px solid var(--border-subtle)',padding:'24px 14px',display:'flex',flexDirection:'column',gap:'4px'}}>
          {CLIENT_NAV.map(([id,label,icon,href])=>{
            const on = active===id;
            return <a key={id} href={href}
              style={{display:'flex',alignItems:'center',gap:'12px',padding:'12px 14px',borderRadius:'var(--radius-md)',fontSize:'var(--text-sm)',fontWeight:600,textDecoration:'none',
                color:on?'var(--text-gold)':'var(--text-secondary)',background:on?'var(--accent-soft-bg)':'transparent',border:`1px solid ${on?'var(--border-gold)':'transparent'}`}}>
              <Icon name={icon} size={18}/> {label}
            </a>;
          })}
        </aside>

        <main style={{flex:1,minWidth:0,padding:'32px var(--gutter)'}}>
          <div style={{maxWidth:'var(--container-lg)',margin:'0 auto'}}>
            <ClientUserContext.Provider value={state.user}>{children}</ClientUserContext.Provider>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Simple placeholder-card used by the not-yet-built client pages. */
function ClientComingSoon({ icon, title, description }) {
  return (
    <KitCard>
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'40px 20px',gap:'16px'}}>
        <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
          <Icon name={icon} size={24} color="var(--text-gold)"/>
        </div>
        <div>
          <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-lg)',margin:'0 0 8px'}}>{title}</h2>
          <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0,maxWidth:'44ch'}}>{description}</p>
        </div>
        <KitBadge tone="gold" mono>Coming soon</KitBadge>
      </div>
    </KitCard>
  );
}

Object.assign(window,{ClientLayout,ClientComingSoon,useClientUser});

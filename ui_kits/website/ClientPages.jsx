/* FWG, Client Area — Phase 1 pages. Dashboard and Settings show real
   account data; Backtesting/Trading Journal/Performance are placeholders
   for now per the phased build ("do not build the backtesting engine yet"). */

function fwgFormatJoinDate(iso) {
  if (!iso) return '';
  try { return new Date(iso).toLocaleDateString([], { year:'numeric', month:'long', day:'numeric' }); }
  catch (e) { return ''; }
}

function ClientDashboardPage() {
  const user = useClientUser();
  const firstName = (user && user.fullName ? user.fullName.split(' ')[0] : 'there');
  const quickLinks = [
    ['line-chart', 'Backtesting', 'Test strategies against historical data.', '/client/backtesting'],
    ['book-open', 'Trading Journal', 'Log and review your trades.', '/client/journal'],
    ['trending-up', 'Performance', 'Track your results over time.', '/client/performance'],
  ];
  return <React.Fragment>
    <div style={{marginBottom:'28px'}}>
      <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 8px'}}>Welcome back, {firstName}</h1>
      <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0}}>This is your client area. More tools are on the way — here's what's coming.</p>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'16px'}} className="fwg-grid-3">
      {quickLinks.map(([icon,title,desc,href])=>(
        <a key={title} href={href} style={{textDecoration:'none'}}>
          <KitCard interactive>
            <div style={{width:'42px',height:'42px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
              <Icon name={icon} size={19} color="var(--text-gold)"/>
            </div>
            <div style={{fontSize:'var(--text-md)',fontWeight:700,color:'var(--text-primary)',marginBottom:'6px'}}>{title}</div>
            <div style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)',lineHeight:1.5}}>{desc}</div>
          </KitCard>
        </a>
      ))}
    </div>
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
    <ClientComingSoon icon="book-open" title="Your trading journal" description="Log trades, review outcomes, and build a record tied to your account. Coming in a future update." />
  </React.Fragment>;
}

function ClientPerformancePage() {
  return <React.Fragment>
    <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'var(--ls-tight)',margin:'0 0 20px'}}>Performance</h1>
    <ClientComingSoon icon="trending-up" title="Your performance" description="A personal breakdown of your results once the trading journal is connected. Coming soon." />
  </React.Fragment>;
}

function ClientSettingsPage() {
  const user = useClientUser();
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
    <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'16px'}}>Profile editing and password changes are coming in a future update.</p>
  </React.Fragment>;
}

Object.assign(window,{ClientDashboardPage,ClientBacktestingPage,ClientJournalPage,ClientPerformancePage,ClientSettingsPage});

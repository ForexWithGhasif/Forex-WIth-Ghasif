/* FWG, shared site chrome: routed Nav, Footer, page-layout helpers, theme.
   Real multi-page navigation via <a href> to sibling .html files. */

function Container({children,style}) {
  return <div style={{maxWidth:'var(--container-xl)',margin:'0 auto',padding:'0 var(--gutter)',...style}}>{children}</div>;
}
function Section({id,children,style}) {
  return <section id={id} style={{padding:'var(--section-y) 0',position:'relative',...style}}>{children}</section>;
}
function Head({kicker,title,lead,align='left',as='h2'}) {
  const c=align==='center'; const Tag=as;
  return <div style={{display:'flex',flexDirection:'column',gap:'14px',alignItems:c?'center':'flex-start',textAlign:c?'center':'left',marginBottom:'var(--space-7)'}}>
    {kicker&&<KitKicker>{kicker}</KitKicker>}
    <Tag style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:0,maxWidth:'20ch'}}>{title}</Tag>
    {lead&&<p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'60ch'}}>{lead}</p>}
  </div>;
}

const NAV = [
  ['Home','/'],['About','/about'],['Services','/services'],
  ['Performance','/performance'],['Pricing','/pricing'],['Blog','/blog'],['Contact','/contact'],
];

function Nav({ active, theme, onToggleTheme }) {
  const [scrolled,setScrolled]=React.useState(false);
  const [open,setOpen]=React.useState(false);
  React.useEffect(()=>{
    const f=()=>setScrolled(window.scrollY>16);
    window.addEventListener('scroll',f,{passive:true}); f();
    return ()=>window.removeEventListener('scroll',f);
  },[]);
  return (
    <header style={{position:'sticky',top:0,zIndex:60,padding:'12px var(--gutter)',
      background:scrolled||open?'var(--surface-glass)':'transparent',
      backdropFilter:scrolled||open?'blur(var(--blur-md))':'none',WebkitBackdropFilter:scrolled||open?'blur(var(--blur-md))':'none',
      borderBottom:`1px solid ${scrolled||open?'var(--border-subtle)':'transparent'}`,
      transition:'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'}}>
      <nav style={{maxWidth:'var(--container-xl)',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px'}}>
        <a href="/" aria-label="Forex With Ghasif home" style={{display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}>
          <img src="/assets/fwg-logo.png" alt="Forex With Ghasif" style={{height:'40px',width:'auto'}}/>
        </a>
        <div className="fwg-navlinks" style={{display:'flex',alignItems:'center',gap:'2px'}}>
          {NAV.map(([label,href])=>{
            const on=active===label.toLowerCase();
            return <a key={label} href={href} aria-current={on?'page':undefined}
              style={{position:'relative',padding:'8px 13px',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:600,
                color:on?'var(--text-gold)':'var(--text-secondary)',borderRadius:'var(--radius-sm)',transition:'var(--transition-color)'}}
              onMouseEnter={e=>{if(!on)e.currentTarget.style.color='var(--text-primary)';}}
              onMouseLeave={e=>{if(!on)e.currentTarget.style.color='var(--text-secondary)';}}>
              {label}
              {on&&<span style={{position:'absolute',left:'13px',right:'13px',bottom:'1px',height:'2px',borderRadius:'2px',background:'var(--grad-gold-soft)'}}/>}
            </a>;
          })}
        </div>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <button onClick={onToggleTheme} aria-label="Toggle theme"
            style={{width:'40px',height:'40px',display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:'var(--radius-md)',
              background:'var(--surface-card)',border:'1px solid var(--border-default)',color:'var(--text-secondary)',cursor:'pointer',transition:'var(--transition-base)'}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-default)';e.currentTarget.style.color='var(--text-secondary)';}}>
            <Icon name={theme==='dark'?'sun':'moon'} size={18}/>
          </button>
          <span className="fwg-hide-mobile"><KitButton as="a" href="/pricing" variant="primary" size="sm" iconRight={<Icon name="arrow-up-right" size={16}/>}>Join VIP</KitButton></span>
          <button className="fwg-menu-btn" onClick={()=>setOpen(o=>!o)} aria-label="Menu" aria-expanded={open}
            style={{display:'none',width:'40px',height:'40px',alignItems:'center',justifyContent:'center',borderRadius:'var(--radius-md)',
              background:'var(--surface-card)',border:'1px solid var(--border-default)',color:'var(--text-primary)',cursor:'pointer'}}>
            <Icon name={open?'x':'menu'} size={20}/>
          </button>
        </div>
      </nav>
      {open&&(
        <div className="fwg-mobile-menu" style={{maxWidth:'var(--container-xl)',margin:'12px auto 4px',display:'flex',flexDirection:'column',gap:'2px'}}>
          {NAV.map(([label,href])=>{
            const on=active===label.toLowerCase();
            return <a key={label} href={href} style={{padding:'13px 14px',borderRadius:'var(--radius-md)',fontFamily:'var(--font-body)',fontSize:'var(--text-md)',fontWeight:600,
              color:on?'var(--text-gold)':'var(--text-secondary)',background:on?'var(--accent-soft-bg)':'transparent'}}>{label}</a>;
          })}
          <div style={{padding:'10px 4px 6px'}}><KitButton as="a" href="/pricing" variant="primary" fullWidth>Join VIP Signals</KitButton></div>
        </div>
      )}
    </header>
  );
}

/* Reusable inner-page hero band, carries each page's H1 for SEO. */
function PageHero({ kicker, title, lead, badge }) {
  return (
    <section style={{position:'relative',overflow:'hidden',padding:'calc(var(--space-9) + 12px) var(--gutter) var(--space-8)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--hero-glow)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',WebkitMaskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',opacity:0.5,pointerEvents:'none'}}/>
      <div style={{position:'relative',maxWidth:'var(--container-lg)',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'18px',textAlign:'center'}}>
        {kicker&&<KitBadge tone="gold" dot>{kicker}</KitBadge>}
        <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',lineHeight:1.04,letterSpacing:'var(--ls-tighter)',margin:0,maxWidth:'16ch'}}>{title}</h1>
        {lead&&<p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'58ch'}}>{lead}</p>}
      </div>
    </section>
  );
}

function useTheme() {
  const [theme,setTheme]=React.useState(()=>{ try{return localStorage.getItem('fwg-theme')||'dark';}catch(e){return 'dark';} });
  React.useEffect(()=>{ document.documentElement.setAttribute('data-theme',theme); try{localStorage.setItem('fwg-theme',theme);}catch(e){} },[theme]);
  React.useEffect(()=>{ if(window.lucide) window.lucide.createIcons(); });
  return [theme,()=>setTheme(t=>t==='dark'?'light':'dark')];
}

/* Scroll-reveal wrapper */
function Reveal({children}) {
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const el=ref.current; if(!el) return;
    const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('fwg-reveal');io.unobserve(e.target);}});},{threshold:0.06,rootMargin:'0px 0px -6% 0px'});
    Array.from(el.children).forEach(c=>io.observe(c));
    return ()=>io.disconnect();
  },[]);
  return <div ref={ref}>{children}</div>;
}

/* Full page wrapper: Nav + content + Footer + theme wiring. */
function Layout({ active, children }) {
  const [theme,toggle]=useTheme();
  return (
    <React.Fragment>
      <Nav active={active} theme={theme} onToggleTheme={toggle} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
}

Object.assign(window,{Container,Section,Head,Nav,PageHero,useTheme,Reveal,Layout});

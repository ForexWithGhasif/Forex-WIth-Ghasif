/* FWG, shared site chrome: routed Nav, Footer, page-layout helpers, theme.
   Real multi-page navigation via <a href> to sibling .html files. */

function Container({children,style}) {
  return <div style={{maxWidth:'var(--container-xl)',margin:'0 auto',padding:'0 var(--gutter)',...style}}>{children}</div>;
}
function Section({id,children,style,...rest}) {
  return <section id={id} style={{padding:'var(--section-y) 0',position:'relative',...style}} {...rest}>{children}</section>;
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
  ['Performance','/performance'],['Learn','/learning-hub'],['Course','/course'],['Tools','/tools'],['Pricing','/pricing'],['Blog','/blog'],['Contact','/contact'],
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
    <header style={{position:'sticky',top:'38px',zIndex:60,padding:'12px var(--gutter)',
      background:scrolled||open?'var(--surface-glass)':'transparent',
      backdropFilter:scrolled||open?'blur(var(--blur-md))':'none',WebkitBackdropFilter:scrolled||open?'blur(var(--blur-md))':'none',
      borderBottom:`1px solid ${scrolled||open?'var(--border-subtle)':'transparent'}`,
      transition:'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'}}>
      <nav style={{maxWidth:'var(--container-xl)',margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'20px'}}>
        <a href="/" aria-label="Forex With Ghasif home" style={{display:'flex',alignItems:'center',gap:'12px',flexShrink:0}}
          onClick={()=>{ try{ sessionStorage.setItem('fwg-force-offer','1'); }catch(e){} }}>
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
          <span className="fwg-hide-mobile"><KitButton as="a" href={(window.FWG_SOCIAL||{}).whatsappCommunity} target="_blank" rel="noopener noreferrer" variant="primary" size="sm" iconRight={<Icon name="arrow-up-right" size={16}/>}>Join Free Community</KitButton></span>
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
          <div style={{padding:'10px 4px 6px'}}><KitButton as="a" href="/pricing" variant="primary" fullWidth>View Pricing</KitButton></div>
        </div>
      )}
    </header>
  );
}

/* Reusable inner-page hero band, carries each page's H1 for SEO. Centered
   pill-badge treatment by default (original layout); pass align="left" for
   the kicker-line + left-aligned variant instead. */
function PageHero({ kicker, title, lead, badge, align='center' }) {
  const centered = align==='center';
  return (
    <section style={{position:'relative',overflow:'hidden',padding:'calc(var(--space-9) + 12px) var(--gutter) var(--space-8)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--hero-glow)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',WebkitMaskImage:'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',opacity:0.5,pointerEvents:'none'}}/>
      <div style={{position:'relative',maxWidth:'var(--container-lg)',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:centered?'center':'flex-start',gap:'18px',textAlign:centered?'center':'left'}}>
        {kicker&&(centered ? <KitBadge tone="gold" dot>{kicker}</KitBadge> : <KitKicker>{kicker}</KitKicker>)}
        <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',lineHeight:1.04,letterSpacing:'var(--ls-tighter)',margin:0,maxWidth:centered?'16ch':'18ch'}}>{title}</h1>
        {lead&&<p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'58ch'}}>{lead}</p>}
        {badge&&<KitBadge tone="solid" mono>{badge}</KitBadge>}
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
/* Scroll-reveal wrapper. Each direct child fades/eases in once it scrolls
   into view. Direction defaults to "up"; set a child's `data-reveal`
   attribute to "down" | "left" | "right" for variety (e.g. <Section
   data-reveal="left">). A small index-based stagger (capped) gives
   successive children a slight, premium-feeling delay rather than
   popping in simultaneously. */
function Reveal({children}) {
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const el=ref.current; if(!el) return;
    const io=new IntersectionObserver((es)=>{es.forEach((e,i)=>{
      if(e.isIntersecting){
        const dir=e.target.getAttribute('data-reveal')||'up';
        e.target.style.animationDelay=Math.min(i*70,280)+'ms';
        e.target.classList.add('fwg-reveal-'+dir);
        io.unobserve(e.target);
      }
    });},{threshold:0.06,rootMargin:'0px 0px -6% 0px'});
    Array.from(el.children).forEach(c=>io.observe(c));
    return ()=>io.disconnect();
  },[]);
  return <div ref={ref}>{children}</div>;
}

/* Site-wide promo bar above the nav, announcing the Pro Bundle's limited-time
   price cut. Reuses the exact marquee technique Ticker (Visuals.jsx) already
   uses: the message list is duplicated once so animating to -50% loops
   seamlessly. The CTA sits outside the scrolling track so it never moves. */
function PromoBar() {
  const product = (window.FWG_PRODUCTS||[]).find(p=>p.id==='bundle');
  if(!product || !product.originalPrice) return null;
  const savePct = Math.round((1 - parseFloat(product.price.replace('$','')) / parseFloat(product.originalPrice.replace('$',''))) * 100);
  const msg = `Special offer: Forex Trader Pro Bundle now ${product.price}/mo (was ${product.originalPrice}/mo) — save ${savePct}%`;
  const items = Array.from({length:4},()=>msg);
  const row = items.concat(items);
  return (
    <div style={{position:'sticky',top:0,zIndex:70,background:'var(--grad-gold-soft)'}}>
      <div style={{maxWidth:'var(--container-xl)',margin:'0 auto',padding:'0 var(--gutter)',display:'flex',alignItems:'center',gap:'16px',height:'38px'}}>
        <div style={{flex:1,minWidth:0,overflow:'hidden',maskImage:'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 6%,#000 94%,transparent)'}}>
          <div style={{display:'inline-flex',gap:'64px',whiteSpace:'nowrap',animation:'fwgmarquee 42s linear infinite',willChange:'transform'}}>
            {row.map((m,i)=>(
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:'8px',fontFamily:'var(--font-body)',fontWeight:700,fontSize:'var(--text-xs)',color:'var(--accent-contrast)'}}>
                <Icon name="zap" size={13} color="var(--accent-contrast)"/>{m}
              </span>
            ))}
          </div>
        </div>
        <a href="/pricing#pro-bundle" style={{flexShrink:0,padding:'6px 14px',borderRadius:'var(--radius-pill)',background:'var(--accent-contrast)',color:'var(--gold-highlight)',fontFamily:'var(--font-body)',fontWeight:800,fontSize:'var(--text-2xs)',letterSpacing:'0.02em',whiteSpace:'nowrap',textDecoration:'none'}}>
          Claim Offer →
        </a>
      </div>
    </div>
  );
}

/* One-shot confetti burst in brand colors only (gold/cream/emerald, no
   rainbow), fired once when the popup mounts. Pure CSS transition: particles
   start pinned at the origin point, then on the next frame we flip their
   transform/opacity to randomized end values and let the transition animate
   the burst — no keyframes needed. Skipped entirely under reduced-motion. */
function ConfettiBurst() {
  const [burst,setBurst]=React.useState(false);
  const reduced = React.useMemo(()=>{
    try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; }
  },[]);
  const particles = React.useMemo(()=>{
    const colors=['var(--gold-400)','var(--gold-highlight)','var(--emerald-400)','var(--ivory-100)'];
    return Array.from({length:28},(_,i)=>{
      const angle = Math.random()*Math.PI*2;
      const dist = 80+Math.random()*160;
      return {
        id:i,
        x: Math.cos(angle)*dist,
        y: Math.sin(angle)*dist - 30,
        rot: (Math.random()-0.5)*360,
        size: 5+Math.random()*6,
        radius: i%3===0 ? '50%' : '2px',
        color: colors[i%colors.length],
        delay: Math.random()*100,
      };
    });
  },[]);
  React.useEffect(()=>{
    if(reduced) return;
    const raf=requestAnimationFrame(()=>requestAnimationFrame(()=>setBurst(true)));
    return ()=>cancelAnimationFrame(raf);
  },[reduced]);
  if(reduced) return null;
  return (
    <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',overflow:'hidden',borderRadius:'inherit'}}>
      {particles.map(p=>(
        <span key={p.id} style={{
          position:'absolute', left:'50%', top:'22%',
          width:p.size, height:p.size, borderRadius:p.radius, background:p.color,
          transform: burst ? `translate(${p.x}px, ${p.y}px) rotate(${p.rot}deg)` : 'translate(0,0) rotate(0deg)',
          opacity: burst ? 0 : 1,
          transition: `transform 950ms cubic-bezier(0.22,1,0.36,1) ${p.delay}ms, opacity 950ms ease-out ${p.delay}ms`,
        }}/>
      ))}
    </div>
  );
}

/* Floating WhatsApp button: a real link (not a JS-driven button), since it's
   genuine navigation to an external URL — that keeps it correctly keyboard-
   and screen-reader-accessible for free. Reuses window.FWG_SOCIAL.whatsapp,
   the site's one existing WhatsApp link, rather than hardcoding the number
   again here. */
function fwgPrefersReducedMotion(){
  try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; }
}
function FloatingWhatsApp() {
  const href = (window.FWG_SOCIAL||{}).whatsapp;
  if(!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Contact us on WhatsApp"
      className="fwg-wa-fab"
      style={{position:'fixed',right:'24px',bottom:'24px',zIndex:240,width:'56px',height:'56px',borderRadius:'50%',
        display:'inline-flex',alignItems:'center',justifyContent:'center',textDecoration:'none',
        background:'var(--surface-card-solid)',border:'1px solid var(--border-strong)',boxShadow:'var(--shadow-lg)',
        transition:'transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'}}
      onMouseEnter={e=>{ if(!fwgPrefersReducedMotion()) e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor='#25D366'; e.currentTarget.style.boxShadow='0 0 0 3px rgba(37,211,102,0.16), var(--shadow-lg)'; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='var(--border-strong)'; e.currentTarget.style.boxShadow='var(--shadow-lg)'; }}>
      <SocialGlyph name="whatsapp" size={26} style={{color:'#25D366'}}/>
      <span className="fwg-fab-tooltip">Chat on WhatsApp</span>
    </a>
  );
}

/* Offer popup: shows once per browser session (sessionStorage flag), not on
   every internal page navigation — since this is a multi-page site (every
   nav link is a real reload), showing it on every single click was the bug
   being fixed here. Closing the tab/browser clears the flag, so a fresh
   visit later still sees it. */
function OfferPopup() {
  const [show,setShow]=React.useState(false);
  const product = (window.FWG_PRODUCTS||[]).find(p=>p.id==='bundle');
  React.useEffect(()=>{
    /* Three ways this can fire:
       - "reload" navigation (F5 / refresh button) — always show, every time.
       - the logo link sets a one-shot force flag before navigating — always
         show once, then the flag is consumed.
       - a normal internal link click — show only once per browser session. */
    let isReload=false;
    try{
      const nav=performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
      if(nav) isReload = nav.type==='reload';
      else if(performance.navigation) isReload = performance.navigation.type===1;
    }catch(e){}
    let forced=false;
    try{
      forced = sessionStorage.getItem('fwg-force-offer')==='1';
      if(forced) sessionStorage.removeItem('fwg-force-offer');
    }catch(e){}
    let alreadySeen=false;
    try{ alreadySeen = sessionStorage.getItem('fwg-offer-seen')==='1'; }catch(e){}
    if(!isReload && !forced && alreadySeen) return;
    const t=setTimeout(()=>{
      setShow(true);
      try{ sessionStorage.setItem('fwg-offer-seen','1'); }catch(e){}
    },1400);
    return ()=>clearTimeout(t);
  },[]);
  React.useEffect(()=>{
    if(!show) return;
    const onKey=(e)=>{ if(e.key==='Escape') setShow(false); };
    document.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prev; };
  },[show]);
  if(!show || !product) return null;
  const savePct = product.originalPrice ? Math.round((1 - parseFloat(product.price.replace('$','')) / parseFloat(product.originalPrice.replace('$',''))) * 100) : null;
  return (
    <div onClick={()=>setShow(false)} className="fwg-modal-overlay"
      style={{position:'fixed',inset:0,zIndex:300,display:'flex',alignItems:'center',justifyContent:'center',padding:'var(--gutter)',
        background:'rgba(4,5,8,0.8)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)'}}>
      <div onClick={(e)=>e.stopPropagation()} className="fwg-modal-card"
        style={{position:'relative',width:'min(460px,100%)',overflow:'hidden',background:'linear-gradient(165deg, rgba(214,175,67,0.14), var(--surface-card-solid))',
          border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',boxShadow:'var(--glow-gold-md), var(--shadow-xl)',
          padding:'clamp(30px,5vw,44px)',textAlign:'center'}}>
        <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
        <ConfettiBurst/>
        <button onClick={()=>setShow(false)} aria-label="Close offer"
          style={{position:'absolute',top:'16px',right:'16px',zIndex:2,width:'38px',height:'38px',borderRadius:'50%',cursor:'pointer',
            background:'rgba(10,12,17,0.6)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',
            display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'var(--transition-base)'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-strong)';e.currentTarget.style.color='var(--text-primary)';}}>
          <Icon name="x" size={18}/>
        </button>
        <div style={{position:'relative'}}>
          <KitBadge tone="bull" dot>{product.offerBadge||'Limited-time offer'}</KitBadge>
          <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',lineHeight:1.1,letterSpacing:'-0.02em',color:'var(--text-primary)',margin:'16px 0 8px'}}>
            Forex Trader Pro Bundle
          </h2>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 20px'}}>
            The complete Masterclass, Premium Signals, and 1:1 Mentorship, all in one membership.
          </p>
          <div style={{display:'flex',alignItems:'baseline',justifyContent:'center',gap:'10px',marginBottom:'8px',flexWrap:'wrap'}}>
            {product.originalPrice && <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',color:'var(--text-muted)',textDecoration:'line-through'}}>{product.originalPrice}/mo</span>}
            <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-4xl)',letterSpacing:'-0.02em',color:'var(--text-primary)'}}>{product.price}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>/month</span>
          </div>
          {savePct!=null && <div style={{marginBottom:'24px'}}><KitBadge tone="bull" mono>Save {savePct}% today</KitBadge></div>}
          <KitButton as="a" href={product.href} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" fullWidth
            iconRight={<Icon name="arrow-up-right" size={18}/>}>
            Claim This Offer
          </KitButton>
          <div style={{marginTop:'10px'}}>
            <KitButton as="a" href="/pricing#pro-bundle" variant="secondary" size="md" fullWidth onClick={()=>setShow(false)}>
              View Offer Details
            </KitButton>
          </div>
          <button onClick={()=>setShow(false)} type="button"
            style={{marginTop:'14px',background:'transparent',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:'var(--text-xs)',textDecoration:'underline'}}>
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

/* Full page wrapper: promo bar + Nav + content + Footer + offer popup + theme wiring. */
function Layout({ active, children }) {
  const [theme,toggle]=useTheme();
  /* Content renders client-side after Babel/React mount, so a cross-page link
     like /pricing#pro-bundle lands before that id exists in the DOM, and the
     browser's native hash-jump silently does nothing. Retry for a generous
     window (in-browser Babel transpilation of a heavy page can genuinely take
     several seconds), then do one corrective non-smooth pass shortly after in
     case late-loading images/fonts reflowed the layout under the target. */
  React.useEffect(()=>{
    if(!window.location.hash) return;
    const id=window.location.hash.slice(1);
    let cancelled=false;
    let correctionTimer=null;
    const scrollNow=(smooth)=>{
      const el=document.getElementById(id);
      if(!el) return false;
      el.scrollIntoView({behavior:smooth?'smooth':'auto',block:'start'});
      return true;
    };
    let attempts=0;
    const iv=setInterval(()=>{
      attempts++;
      const found=scrollNow(true);
      if(cancelled || found || attempts>60){
        clearInterval(iv);
        if(found) correctionTimer=setTimeout(()=>{ if(!cancelled) scrollNow(false); },700);
      }
    },200);
    return ()=>{ cancelled=true; clearInterval(iv); if(correctionTimer) clearTimeout(correctionTimer); };
  },[]);
  /* .fwg-app-in fades+rises the whole app in as soon as React mounts (see
     site.css) — this div is a fresh DOM node each page load, created only
     once the static #root preloader (index.html etc.) gets replaced, so the
     animation always plays right at that handoff instead of content just
     appearing. */
  return (
    <div className="fwg-app-in">
      <PromoBar />
      <Nav active={active} theme={theme} onToggleTheme={toggle} />
      <main>{children}</main>
      <Footer />
      <OfferPopup />
      <FloatingWhatsApp />
    </div>
  );
}

Object.assign(window,{Container,Section,Head,Nav,PageHero,useTheme,Reveal,Layout});

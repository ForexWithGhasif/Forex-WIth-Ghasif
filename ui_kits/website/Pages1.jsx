/* FWG, Home, About, Services pages (compose shared blocks + bespoke sections). */

/* ---- shared small pieces ---- */
function FeatureCheck({children}) {
  return <div style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
    <Icon name="check" size={16} color="var(--text-gold)" style={{marginTop:'2px',flexShrink:0}}/>
    <span style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',lineHeight:1.5}}>{children}</span>
  </div>;
}

/* ============================ HOME ============================ */
function ServicesPreview() {
  const s=[
    ['book-open','Forex Masterclass','A 12-module course, live on Zoom, from fundamentals to backtesting. $29 one-time.','/course'],
    ['bell-ring','Premium Signals','Structured market analysis and trade ideas with entry, stop and target. $9/month.','/pricing'],
    ['graduation-cap','1:1 Trading Mentorship','Personalised coaching, trade-plan reviews, and direct mentor access. $20/month.','/pricing'],
  ];
  return <Section><Container>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'20px',marginBottom:'var(--space-7)',flexWrap:'wrap'}}>
      <Head kicker="What we do" title="Everything you need to trade with an edge" />
      <KitButton as="a" href="/services" variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>View all services</KitButton>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
      {s.map(([ic,t,d,href])=>(
        <a key={t} href={href} style={{display:'block'}}>
          <KitCard interactive>
            <div style={{width:'48px',height:'48px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'16px'}}>
              <Icon name={ic} size={22} color="var(--text-gold)"/>
            </div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',fontWeight:600,margin:'0 0 8px'}}>{t}</h3>
            <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 14px'}}>{d}</p>
            <span style={{display:'inline-flex',alignItems:'center',gap:'6px',color:'var(--text-gold)',fontSize:'var(--text-sm)',fontWeight:700}}>Explore <Icon name="arrow-right" size={15}/></span>
          </KitCard>
        </a>
      ))}
    </div>
  </Container></Section>;
}

function IntroBand() {
  const memberCount=useLiveMemberCount();
  return <Section style={{background:'var(--bg-elevated)'}} data-reveal="left"><Container>
    <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
      <div>
        <KitKicker>Who we are</KitKicker>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'18ch'}}>
          A serious trading company, not a signal group.
        </h2>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 22px',maxWidth:'52ch'}}>
          Forex With Ghasif is an education-led trading brand built on transparency and discipline. We publish our results, teach the reasoning behind every trade, and measure success by how consistent, and independent, our members become.
        </p>
        <KitButton as="a" href="/about" variant="secondary" iconRight={<Icon name="arrow-right" size={16}/>}>Our story &amp; philosophy</KitButton>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
        {[['78.4%','Avg win rate'],[`${memberCount}+`,'Active members'],['1+ year','Trading the markets'],['1:3.2','Avg reward-to-risk']].map(([v,l])=>(
          <KitCard key={l} padding="20px"><KitStat value={v} label={l} /></KitCard>
        ))}
      </div>
    </div>
  </Container></Section>;
}

/* Free Backtesting slider — full-width cinematic background-image banner
   directly under Hero. Auto-advance is the primary interaction (dots are a
   secondary, click-to-jump affordance); the timer is paused on hover/focus
   and skipped entirely under prefers-reduced-motion (no auto-changing
   content for those users). All 4 slides are stacked and crossfaded via
   opacity — swapping a single element's background-image can't crossfade on
   its own — so each slide's own image and text transition together. No
   card/border/glass container behind the text: just the photo, a dark
   gradient for legibility, and the text directly on top, per spec. */
const FREE_BT_SLIDER_MS = 6000;
const FREE_BT_SLIDES = [
  { image:'/assets/img/home-slider-pakistan.png', emoji:'🇵🇰', headline:'Pakistan’s First Dedicated Free Backtesting Client Portal', line:'A dedicated trading workspace built for Pakistani traders, at no cost.' },
  { image:'/assets/img/home-slider-multi-asset.png', emoji:'📊', headline:'Backtest Your Trading Strategies — Completely Free', line:'Put your setups to the test before you risk a single dollar.' },
  { image:'/assets/img/home-slider-replay.png', emoji:'🔄', headline:'Replay Historical Markets & Practice Your Setups', line:'Rewind price action and rehearse your entries and exits, risk-free.' },
  { image:'/assets/img/home-slider-multi-asset.png', emoji:'📈', headline:'Backtest Multiple Trading Assets Without Expensive Subscriptions', line:'Forex, gold, and more, no paywalls, no hidden fees.' },
];

function FreeBacktestingSlider() {
  const [active,setActive] = React.useState(0);
  const [paused,setPaused] = React.useState(false);
  const reduced = React.useMemo(()=>{
    try{ return window.matchMedia('(prefers-reduced-motion: reduce)').matches; }catch(e){ return false; }
  },[]);

  React.useEffect(()=>{
    if(reduced || paused) return;
    const id = setInterval(()=> setActive(i=>(i+1)%FREE_BT_SLIDES.length), FREE_BT_SLIDER_MS);
    return ()=>clearInterval(id);
  },[reduced,paused]);

  return <Section data-reveal="up" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}
    style={{padding:0,overflow:'hidden',height:'clamp(460px,46vw,700px)'}}>
    {FREE_BT_SLIDES.map((slide,i)=>(
      <div key={i} aria-hidden={i!==active} style={{position:'absolute',inset:0,
        backgroundImage:`url(${slide.image})`,backgroundSize:'cover',backgroundPosition:'center',
        opacity:i===active?1:0,transition:reduced?'none':'opacity 900ms ease-in-out',pointerEvents:i===active?'auto':'none'}}>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg, rgba(4,5,8,0.92) 0%, rgba(4,5,8,0.68) 38%, rgba(4,5,8,0.28) 68%, rgba(4,5,8,0.1) 100%)'}}/>
        <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, rgba(4,5,8,0.35) 0%, transparent 22%, transparent 78%, rgba(4,5,8,0.4) 100%)'}}/>
        <Container style={{position:'relative',height:'100%'}}>
          <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'flex-start',gap:'14px',maxWidth:'560px'}}>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',lineHeight:1.15,letterSpacing:'var(--ls-tight)',color:'var(--text-primary)',margin:0,textShadow:'0 2px 18px rgba(0,0,0,0.55)'}}>
              <span style={{marginRight:'10px'}}>{slide.emoji}</span>{slide.headline}
            </h2>
            <p style={{fontSize:'var(--text-md)',color:'var(--text-secondary)',margin:0,maxWidth:'48ch',textShadow:'0 2px 12px rgba(0,0,0,0.6)'}}>{slide.line}</p>
            <KitBadge tone="solid" mono>100% FREE</KitBadge>
            <div style={{marginTop:'8px'}}>
              <KitButton as="a" href="/client/dashboard" variant="primary" size="lg" iconRight={<Icon name="arrow-right" size={18}/>}>Enter Client Portal</KitButton>
            </div>
          </div>
        </Container>
      </div>
    ))}
    <div style={{position:'absolute',left:0,right:0,bottom:'22px',display:'flex',justifyContent:'center',gap:'8px',zIndex:2}}>
      {FREE_BT_SLIDES.map((_,i)=>(
        <button key={i} type="button" aria-label={`Go to slide ${i+1}`} onClick={()=>setActive(i)}
          style={{width:i===active?'22px':'8px',height:'8px',borderRadius:'var(--radius-pill)',border:'none',cursor:'pointer',padding:0,
            background:i===active?'var(--grad-gold-soft)':'rgba(255,255,255,0.4)',transition:'all var(--dur-base) var(--ease-out)'}}/>
      ))}
    </div>
  </Section>;
}

function HomePage() {
  return <React.Fragment>
    <Hero />
    <Reveal>
      <FreeBacktestingSlider />
      <TrustBar />
      <ServicesPreview />
      <IntroBand />
      <Testimonials />
      <LiveMarkets />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ ABOUT ============================ */
function FounderPhoto({ratio='4/5', src='/assets/founder.png', objectPosition='top center'}) {
  return <div style={{position:'relative',aspectRatio:ratio,borderRadius:'var(--radius-2xl)',overflow:'hidden',border:'1px solid var(--border-gold)',boxShadow:'var(--glow-gold-sm), var(--shadow-lg)'}}>
    <img src={src} alt="Ghasif, Founder of Forex With Ghasif" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition}}/>
    <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, transparent 55%, rgba(4,5,8,0.82))'}}/>
    <div style={{position:'absolute',top:'18px',left:'18px'}}><KitBadge tone="gold" dot>Founder</KitBadge></div>
    <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'24px'}}>
      <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-xl)',letterSpacing:'-0.01em',color:'var(--text-primary)'}}>Ghasif</div>
      <div style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--text-gold)',marginTop:'2px'}}>Founder &amp; Head Trader</div>
    </div>
  </div>;
}

function AboutPage() {
  const mv=[
    ['target','Our mission','Make disciplined, risk-first trading accessible, and turn members into confident, independent traders rather than dependent followers.'],
    ['eye','Our vision','To be the most trusted name in forex education: known for transparency, consistency, and putting students’ long-term growth first.'],
    ['scale','Our values','Honesty over hype. Process over prediction. Risk management before profit. Education at the center of everything.'],
  ];
  return <React.Fragment>
    <PageHero kicker="About us" title="The story behind Forex With Ghasif"
      lead="A premium forex education brand built to bring institutional discipline and radical transparency to everyday traders." />
    <Reveal>
      <Section data-reveal="left"><Container>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-8)',alignItems:'stretch'}} className="fwg-hero-grid">
          <FounderPhoto ratio="1/1" />
          <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <KitKicker>Our story</KitKicker>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'18ch'}}>
              Built on transparency, not promises.
            </h2>
            <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 14px'}}>
              Forex With Ghasif began with a simple frustration: an industry full of screenshots, hype, and get-rich-quick promises, and very little honest teaching. We set out to build the opposite.
            </p>
            <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 14px'}}>
              Today we’re a community of over 50 traders learning to read the markets with structure and discipline. Every signal is explained. Every result, wins and losses, is logged. The goal isn’t to make you depend on us; it’s to make you a consistent trader who no longer needs to.
            </p>
            <p style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'var(--text-xl)',lineHeight:1.35,color:'var(--text-primary)',margin:'8px 0 0'}}>
              “We’re not here to keep you dependent, we’re here to make you independent.”
            </p>
          </div>
        </div>
      </Container></Section>

      {/* Founder */}
      <Section data-reveal="right"><Container>
        <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
          <div>
            <KitKicker>Meet the founder</KitKicker>
            <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'18ch'}}>
              A trader who teaches the way he wished he’d been taught.
            </h2>
            <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 14px'}}>
              Ghasif has spent years trading the currency and metals markets through every condition, and just as long teaching others to do it with structure. His approach is unglamorous on purpose: define your risk, wait for your setup, and let consistency compound.
            </p>
            <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 20px'}}>
              He mentors every member personally at the highest tier, reviews trade plans, and leads the weekly live sessions where the analysis becomes real decisions in real time.
            </p>
            <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
              <KitButton as="a" href="/contact" variant="primary" iconRight={<Icon name="arrow-up-right" size={16}/>}>Work with Ghasif</KitButton>
              <KitButton as="a" href="/performance" variant="secondary">See the results</KitButton>
            </div>
          </div>
          <div style={{position:'relative'}}>
            <FounderPhoto src="/assets/founder-portrait.png" objectPosition="center 22%" />
          </div>
        </div>
      </Container></Section>

      <Section style={{background:'var(--bg-elevated)'}}><Container>
        <Head align="center" kicker="What drives us" title="Mission, vision &amp; values" />
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
          {mv.map(([ic,t,d])=>(
            <KitCard key={t} interactive>
              <div style={{width:'48px',height:'48px',borderRadius:'var(--radius-md)',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'16px',boxShadow:'var(--inset-gold-hi)'}}>
                <Icon name={ic} size={22} color="#1a1405"/>
              </div>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',fontWeight:600,margin:'0 0 8px'}}>{t}</h3>
              <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
            </KitCard>
          ))}
        </div>
      </Container></Section>

      <About />
      <TrustBar />
    </Reveal>
  </React.Fragment>;
}

/* ============================ SERVICES ============================ */
function ServiceRow({ icon, name, blurb, points, badge, href, ctaLabel, reverse, img }) {
  const content = (
    <div style={{padding:'var(--space-7)',order:reverse?2:1}}>
      <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
        <div style={{width:'48px',height:'48px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
          <Icon name={icon} size={22} color="var(--text-gold)"/>
        </div>
        {badge&&<KitBadge tone="gold">{badge}</KitBadge>}
      </div>
      <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.01em'}}>{name}</h3>
      <p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:'0 0 18px',maxWidth:img?'46ch':'60ch'}}>{blurb}</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'22px'}} className="fwg-grid-2">
        {points.map(p=><FeatureCheck key={p}>{p}</FeatureCheck>)}
      </div>
      <KitButton as="a" href={href||'/pricing'} variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>{ctaLabel||'Learn more'}</KitButton>
    </div>
  );
  /* Not every product has a photo (no stock asset exists for the course yet) —
     rather than show a broken image or a mismatched photo, image-less rows
     render as a single full-width column instead of the usual split layout. */
  if(!img){
    return <KitCard padding="0" style={{overflow:'hidden'}}>{content}</KitCard>;
  }
  return <KitCard padding="0" style={{overflow:'hidden'}}>
    <div style={{display:'grid',gridTemplateColumns:reverse?'0.9fr 1.1fr':'1.1fr 0.9fr',gap:0,alignItems:'stretch'}} className="fwg-service-grid">
      {content}
      <div style={{order:reverse?1:2,minHeight:'260px',position:'relative',overflow:'hidden',borderLeft:reverse?'none':'1px solid var(--border-subtle)',borderRight:reverse?'1px solid var(--border-subtle)':'none'}}>
        <LazyImg src={img} alt={name} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:reverse?'linear-gradient(90deg, rgba(10,12,17,0.55), transparent 60%)':'linear-gradient(270deg, rgba(10,12,17,0.55), transparent 60%)'}}/>
      </div>
    </div>
  </KitCard>;
}

function ServicesPage() {
  const services=[
    {icon:'book-open',name:'Forex Masterclass',badge:'$29 one-time',href:'/course',ctaLabel:'View course',blurb:'A structured, 12-module course delivered live on Zoom, from market fundamentals through strategy development, risk management, psychology, and backtesting.',
      points:['12 structured modules','Risk-management framework','Trading psychology lessons','Backtesting & demo trading']},
    {icon:'bell-ring',name:'Premium Signals',badge:'$9/month',img:'/assets/img/service-signals.jpg',blurb:'Structured market analysis and trade ideas for members who want additional market guidance, each with an entry area, stop-loss, and target levels.',
      points:['Market analysis','Entry, stop & target levels','Gold & major pairs','Private alerts']},
    {icon:'graduation-cap',name:'1:1 Trading Mentorship',badge:'$20/month',img:'/assets/img/service-mentorship.jpg',blurb:'Personalised coaching and accountability for traders who want direct guidance developing a structured trading process.',
      points:['Personal trade-plan reviews','2× monthly 1:1 calls','Trading psychology coaching','Direct mentor access']},
    {icon:'line-chart',name:'Market Analysis',img:'/assets/img/service-analysis.jpg',blurb:'Daily briefings, economic-calendar reads, and weekly deep dives that give you the context behind every move, included with Premium Signals and Mentorship.',
      points:['Pre-session outlooks','Key levels & bias','Weekly structure breakdowns','Trade-along commentary']},
    {icon:'shield-check',name:'Risk Management Training',img:'/assets/img/service-risk.jpg',blurb:'The discipline that actually separates traders who last from those who blow up: position sizing, drawdown control, and psychology. Core to the Masterclass and Mentorship.',
      points:['Position-sizing frameworks','Drawdown control','Trading psychology','Personal risk plan']},
    {icon:'users',name:'Free Community',badge:'$0',href:'/pricing',ctaLabel:'Join free',img:'/assets/img/service-community.jpg',blurb:'A private, moderated community with educational market analysis and example trade setups, free to join, always.',
      points:['Educational market analysis','Weekly market review','Example trade setups','Community access']},
  ];
  return <React.Fragment>
    <PageHero kicker="Our services" title="Built to make you a complete trader"
      lead="Signals, mentorship, analysis, and the risk discipline that ties them together, choose the depth of support that fits where you are." />
    <Reveal>
      <Section><Container>
        <Reveal>
          <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
            {services.map((s,i)=>(
              <div key={s.name} data-reveal={i%2===1?'right':'left'}><ServiceRow {...s} reverse={i%2===1} /></div>
            ))}
          </div>
        </Reveal>
      </Container></Section>
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{HomePage,AboutPage,ServicesPage,FeatureCheck});

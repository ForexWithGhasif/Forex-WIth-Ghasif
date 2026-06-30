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
    ['bell-ring','VIP Forex Signals','3-5 high-conviction signals daily with full entry, stop and target.'],
    ['graduation-cap','Trading Mentorship','1:1 and group coaching that builds you into an independent trader.'],
    ['line-chart','Market Analysis','Daily briefings and deep dives so you understand every move.'],
  ];
  return <Section><Container>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'20px',marginBottom:'var(--space-7)',flexWrap:'wrap'}}>
      <Head kicker="What we do" title="Everything you need to trade with an edge" />
      <KitButton as="a" href="/services" variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>View all services</KitButton>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
      {s.map(([ic,t,d])=>(
        <a key={t} href="/services" style={{display:'block'}}>
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
  return <Section style={{background:'var(--bg-elevated)'}}><Container>
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

function HomePage() {
  return <React.Fragment>
    <Hero />
    <Reveal>
      <TrustBar />
      <ServicesPreview />
      <IntroBand />
      <Testimonials />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ ABOUT ============================ */
function FounderPhoto({ratio='4/5'}) {
  return <div style={{position:'relative',aspectRatio:ratio,borderRadius:'var(--radius-2xl)',overflow:'hidden',border:'1px solid var(--border-gold)',boxShadow:'var(--glow-gold-sm), var(--shadow-lg)'}}>
    <img src="/assets/founder.png" alt="Ghasif, Founder of Forex With Ghasif" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',objectPosition:'top center'}}/>
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
      <Section><Container>
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

      {/* Founder */}
      <Section><Container>
        <div style={{display:'grid',gridTemplateColumns:'0.8fr 1.2fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
          <div style={{position:'relative'}}>
            <FounderPhoto />
          </div>
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
        </div>
      </Container></Section>

      <About />
      <TrustBar />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ SERVICES ============================ */
function ServiceRow({ icon, name, blurb, points, badge, href, reverse, img }) {
  return <KitCard padding="0" style={{overflow:'hidden'}}>
    <div style={{display:'grid',gridTemplateColumns:reverse?'0.9fr 1.1fr':'1.1fr 0.9fr',gap:0,alignItems:'stretch'}} className="fwg-service-grid">
      <div style={{padding:'var(--space-7)',order:reverse?2:1}}>
        <div style={{display:'flex',alignItems:'center',gap:'12px',marginBottom:'16px'}}>
          <div style={{width:'48px',height:'48px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
            <Icon name={icon} size={22} color="var(--text-gold)"/>
          </div>
          {badge&&<KitBadge tone="gold">{badge}</KitBadge>}
        </div>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,margin:'0 0 10px',letterSpacing:'-0.01em'}}>{name}</h3>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:'0 0 18px',maxWidth:'46ch'}}>{blurb}</p>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'22px'}} className="fwg-grid-2">
          {points.map(p=><FeatureCheck key={p}>{p}</FeatureCheck>)}
        </div>
        <KitButton as="a" href={href||'/pricing'} variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>Learn more</KitButton>
      </div>
      <div style={{order:reverse?1:2,minHeight:'260px',position:'relative',overflow:'hidden',borderLeft:reverse?'none':'1px solid var(--border-subtle)',borderRight:reverse?'1px solid var(--border-subtle)':'none'}}>
        <LazyImg src={img} alt={name} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
        <div style={{position:'absolute',inset:0,background:reverse?'linear-gradient(90deg, rgba(10,12,17,0.55), transparent 60%)':'linear-gradient(270deg, rgba(10,12,17,0.55), transparent 60%)'}}/>
      </div>
    </div>
  </KitCard>;
}

function ServicesPage() {
  const services=[
    {icon:'bell-ring',name:'VIP Forex Signals',badge:'Most popular',img:'/assets/img/service-signals.jpg',blurb:'Institutional-grade trade ideas delivered in real time, each with a full plan and the reasoning behind it, so every signal also teaches.',
      points:['3-5 signals daily','Entry, stop & target','Real-time app & Instagram alerts','Gold, indices & major pairs']},
    {icon:'graduation-cap',name:'Trading Mentorship',img:'/assets/img/service-mentorship.jpg',blurb:'Structured 1:1 and group coaching that takes you from the fundamentals to a repeatable, independent trading process.',
      points:['Personal trade-plan reviews','2× monthly 1:1 calls','Weekly live sessions','Direct access to Ghasif']},
    {icon:'line-chart',name:'Market Analysis',img:'/assets/img/service-analysis.jpg',blurb:'Daily briefings, economic-calendar reads, and weekly deep dives that give you the context behind every move.',
      points:['Pre-session outlooks','Key levels & bias','Weekly structure breakdowns','Trade-along commentary']},
    {icon:'shield-check',name:'Risk Management Training',img:'/assets/img/service-risk.jpg',blurb:'The discipline that actually separates traders who last from those who blow up: position sizing, drawdown control, and psychology.',
      points:['Position-sizing frameworks','Drawdown control','Trading psychology','Personal risk plan']},
    {icon:'users',name:'Community Support',img:'/assets/img/service-community.jpg',blurb:'A private, moderated community of serious traders: accountability, shared setups, and answers when you need them.',
      points:['Private member community','Accountability & reviews','Setup sharing','Responsive support']},
  ];
  return <React.Fragment>
    <PageHero kicker="Our services" title="Built to make you a complete trader"
      lead="Signals, mentorship, analysis, and the risk discipline that ties them together, choose the depth of support that fits where you are." />
    <Reveal>
      <Section><Container>
        <div style={{display:'flex',flexDirection:'column',gap:'18px'}}>
          {services.map((s,i)=><ServiceRow key={s.name} {...s} reverse={i%2===1} />)}
        </div>
      </Container></Section>
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{HomePage,AboutPage,ServicesPage,FeatureCheck});

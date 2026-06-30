/* FWG, primary content blocks (Container/Section/Head come from Layout.jsx). */

function TrustBar() {
  const memberCount=useLiveMemberCount();
  const items=[['shield-check','Risk-first framework'],['candlestick-chart','Live trade breakdowns'],['users',`${memberCount}+ traders`],['graduation-cap','Mentor-led education'],['bell-ring','Real-time alerts']];
  return <Section style={{padding:'var(--space-7) 0'}}><Container>
    <div style={{display:'flex',flexWrap:'wrap',gap:'18px 40px',alignItems:'center',justifyContent:'space-between',opacity:0.92}} className="fwg-trustbar">
      {items.map(([ic,t])=>(<div key={t} style={{display:'flex',alignItems:'center',gap:'10px',color:'var(--text-tertiary)'}}>
        <Icon name={ic} size={18} color="var(--text-gold)"/>
        <span style={{fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:600,letterSpacing:'0.01em'}}>{t}</span>
      </div>))}
    </div>
    <div style={{height:'1px',background:'var(--divider-gold)',marginTop:'var(--space-7)'}}/>
  </Container></Section>;
}

function WhyChoose() {
  const f=[
    ['target','Precision over noise','Every call ships with exact entry, stop-loss, and targets, plus the reasoning, so you learn while you trade.'],
    ['shield-check','Risk-first by design','We size positions around capital protection. Discipline is the edge; survival compounds returns.'],
    ['radio','Real-time delivery','Signals and market alerts land the moment setups confirm, synced across Instagram, the app, and email.'],
    ['line-chart','Transparent track record','Wins and losses logged publicly. No cherry-picking, no fantasy screenshots, no hype.'],
    ['graduation-cap','Built to make you independent','The goal isn’t dependence on signals, it’s turning you into a confident, self-sufficient trader.'],
    ['headset','Mentor access','Direct guidance from Ghasif and senior traders through reviews, calls, and a private community.'],
  ];
  return <Section id="why"><Container>
    <Head kicker="Why choose us" title="A trading edge you can actually follow"
      lead="Forex With Ghasif is built on transparency, discipline, and education, the opposite of the get-rich-quick noise that fills this industry." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:'18px'}} className="fwg-grid-3">
      {f.map(([ic,t,d])=>(
        <KitCard key={t} interactive>
          <div style={{width:'46px',height:'46px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'16px'}}>
            <Icon name={ic} size={22} color="var(--text-gold)"/>
          </div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',fontWeight:600,margin:'0 0 8px',letterSpacing:'-0.01em'}}>{t}</h3>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

function About() {
  const principles=[
    ['Capital preservation first','We never risk more than a defined fraction of the account. Protecting downside is what keeps you in the game long enough to win.'],
    ['Process over prediction','We don’t predict the market, we react to confirmed structure with a repeatable, rules-based plan.'],
    ['Patience is a position','The best trade is often no trade. We wait for A-grade setups instead of forcing the market.'],
  ];
  return <Section id="about" data-reveal="left"><Container>
    <div style={{display:'grid',gridTemplateColumns:'0.9fr 1.1fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
      <div>
        <KitKicker>About Forex With Ghasif</KitKicker>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'16ch'}}>
          A mentor, not a hype machine.
        </h2>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:'0 0 16px'}}>
          Ghasif has spent years trading the currency and metals markets and teaching others to do the same with structure and discipline. Forex With Ghasif exists to give serious traders an honest, education-led path to consistency.
        </p>
        <p style={{fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'var(--text-xl)',lineHeight:1.35,color:'var(--text-primary)',margin:'0 0 22px'}}>
          “Discipline is the edge. Everything else is <span style={{color:'var(--text-gold)'}}>noise.</span>”
        </p>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',alignItems:'center'}}>
          <a href={(window.FWG_SOCIAL||{}).instagram} target="_blank" rel="noopener noreferrer" aria-label="Follow Forex With Ghasif on Instagram"
            style={{display:'inline-flex',alignItems:'center',gap:'10px',padding:'11px 18px',borderRadius:'var(--radius-md)',
              background:'transparent',border:'1px solid var(--border-gold)',color:'var(--text-gold)',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:700,transition:'var(--transition-base)'}}
            onMouseEnter={e=>{e.currentTarget.style.background='var(--accent-soft-bg)';}}
            onMouseLeave={e=>{e.currentTarget.style.background='transparent';}}>
            <SocialGlyph name="instagram" size={18}/> Follow on Instagram
          </a>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
        <KitKicker style={{marginBottom:'2px'}}>Our trading philosophy</KitKicker>
        {principles.map(([t,d],i)=>(
          <KitCard key={t} interactive padding="20px">
            <div style={{display:'flex',gap:'16px'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:600,color:'var(--text-gold)',minWidth:'34px'}}>{String(i+1).padStart(2,'0')}</span>
              <div>
                <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,margin:'0 0 6px'}}>{t}</h3>
                <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
              </div>
            </div>
          </KitCard>
        ))}
      </div>
    </div>
  </Container></Section>;
}

function Signals() {
  const incl=['3-5 high-conviction signals daily','Exact entry, stop-loss & take-profit','Full reasoning on every trade','Real-time Instagram & app alerts','Weekly live market review','Major-pairs, gold & indices coverage'];
  return <Section id="signals" style={{background:'var(--bg-elevated)'}}><Container>
    <div style={{display:'grid',gridTemplateColumns:'1fr 0.85fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
      <div>
        <Head kicker="VIP Signals" title="Signals you can trust and learn from"
          lead="No black-box alerts. Every VIP signal comes with the full trade plan and the logic behind it, so each trade sharpens your own edge." />
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'24px'}} className="fwg-grid-2">
          {incl.map(t=>(<div key={t} style={{display:'flex',gap:'10px',alignItems:'flex-start'}}>
            <Icon name="check" size={16} color="var(--text-gold)" style={{marginTop:'2px',flexShrink:0}}/>
            <span style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',lineHeight:1.5}}>{t}</span>
          </div>))}
        </div>
        <KitButton as="a" href="/pricing" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>Join VIP Signals</KitButton>
      </div>
      <KitCard featured padding="0" style={{overflow:'hidden'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',borderBottom:'1px solid var(--border-subtle)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{fontWeight:700,fontSize:'var(--text-sm)'}}>XAU/USD</span><KitBadge tone="bull" dot>Buy</KitBadge>
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>Posted 2m ago</span>
        </div>
        <div style={{padding:'14px 18px'}}><CandleChart height={130}/></div>
        <div style={{padding:'0 18px 18px',display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'10px'}} className="fwg-grid-3">
          {[['Entry','2,338.4','var(--text-primary)'],['Stop','2,332.0','var(--bearish)'],['Target','2,357.5','var(--bullish)']].map(([l,v,c])=>(
            <div key={l} style={{padding:'12px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-subtle)'}}>
              <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',marginBottom:'6px'}}>{l}</div>
              <div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-md)',fontWeight:600,color:c}}>{v}</div>
            </div>
          ))}
        </div>
      </KitCard>
    </div>
  </Container></Section>;
}

function Mentorship() {
  const tiers=[
    ['graduation-cap','Foundations academy','Structured lessons from the basics of price action to advanced risk management, at your own pace.'],
    ['users','Group coaching','Weekly live sessions where we break down the markets, review setups, and answer your questions.'],
    ['crown','1:1 mentorship','Private coaching with Ghasif, personalised trade plan reviews and a path to consistent, independent trading.'],
  ];
  return <Section id="mentorship"><Container>
    <Head align="center" kicker="Mentorship & education" title="Learn to trade for yourself"
      lead="Signals get you started. Education makes you independent. Choose the depth of guidance that fits where you are." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
      {tiers.map(([ic,t,d])=>(
        <KitCard key={t} interactive>
          <div style={{width:'52px',height:'52px',borderRadius:'var(--radius-md)',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'18px',boxShadow:'var(--inset-gold-hi)'}}>
            <Icon name={ic} size={24} color="#1a1405"/>
          </div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',fontWeight:600,margin:'0 0 8px'}}>{t}</h3>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 16px'}}>{d}</p>
          <a href="/pricing" style={{display:'inline-flex',alignItems:'center',gap:'6px',color:'var(--text-gold)',fontSize:'var(--text-sm)',fontWeight:700}}>Learn more <Icon name="arrow-right" size={15}/></a>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

function Analysis() {
  const items=[
    ['newspaper','Daily market briefings','Pre-session outlooks on the pairs that matter, with key levels and the bias for the day.'],
    ['calendar-clock','Economic calendar reads','We translate high-impact news into what it actually means for your open risk.'],
    ['layers','Weekly deep dives','Long-form breakdowns of structure, sentiment, and the setups forming across the week.'],
    ['compass','Trade-along sessions','Watch the analysis turn into live decisions, in real time, with full commentary.'],
  ];
  return <Section id="analysis" style={{background:'var(--bg-elevated)'}}><Container>
    <Head kicker="Market analysis" title="Context before every trade"
      lead="Signals without context build dependence. Our analysis teaches you to see what we see, so you understand every move." />
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="fwg-grid-2">
      {items.map(([ic,t,d])=>(
        <KitCard key={t} interactive>
          <div style={{display:'flex',gap:'16px'}}>
            <div style={{width:'44px',height:'44px',flexShrink:0,borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <Icon name={ic} size={20} color="var(--text-gold)"/>
            </div>
            <div>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,margin:'0 0 6px'}}>{t}</h3>
              <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
            </div>
          </div>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

Object.assign(window,{TrustBar,WhyChoose,About,Signals,Mentorship,Analysis});

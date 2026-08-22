/* FWG, proof, conversion & closing sections. */

function Performance() {
  const stats=[['78.4%','Avg win rate','+2.1% MoM','up'],['+612','Pips · last 30 days','best month yet','up'],['1 : 3.2','Avg reward-to-risk','disciplined sizing','up'],['4.1%','Max drawdown','risk controlled','down']];
  return <Section id="results" data-reveal="left"><Container>
    <Head kicker="Performance & results" title="Numbers we publish, not promise"
      lead="A track record only matters if it’s honest. We log every trade, the losers included, and report the figures that actually reflect risk-adjusted consistency." />
    <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'18px',alignItems:'stretch'}} className="fwg-hero-grid">
      <KitCard padding="0" style={{overflow:'hidden'}}>
        <div style={{padding:'20px 22px',borderBottom:'1px solid var(--border-subtle)',display:'flex',justifyContent:'space-between',alignItems:'baseline',flexWrap:'wrap',gap:'8px'}}>
          <div>
            <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.14em',color:'var(--text-tertiary)',marginBottom:'8px'}}>Verified equity curve · 12 months</div>
            <div style={{display:'flex',alignItems:'baseline',gap:'12px'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-3xl)',fontWeight:600,letterSpacing:'-0.02em'}}>+143.8%</span>
              <KitBadge tone="bull" mono>↗ compounded</KitBadge>
            </div>
          </div>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>Past performance ≠ future results</span>
        </div>
        <div style={{padding:'22px'}}><EquityCurve height={220}/></div>
      </KitCard>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}} className="fwg-grid-2">
        {stats.map(([v,l,d,dir])=>(
          <KitCard key={l} padding="20px" style={{display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <KitStat value={v} label={l} />
            <div style={{marginTop:'14px',fontSize:'var(--text-2xs)',fontFamily:'var(--font-mono)',color:dir==='up'?'var(--bullish)':'var(--bearish)'}}>{d}</div>
          </KitCard>
        ))}
      </div>
    </div>
  </Container></Section>;
}

/* Live Markets: the official TradingView "Advanced Real-Time Chart" widget
   (tv.js, loaded as a plain script tag in index.html — see the head there),
   not a custom or simulated chart. It ships its own full toolbar (symbol
   search, timeframes, drawing tools, indicators), so this component only
   needs to instantiate it into a container and frame it to match the site. */
function fwgRequestFullscreen(el) {
  const fn = el.requestFullscreen || el.webkitRequestFullscreen;
  if (fn) fn.call(el);
}
function fwgExitFullscreen() {
  const fn = document.exitFullscreen || document.webkitExitFullscreen;
  if (fn) fn.call(document);
}
function fwgFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}
function fwgFullscreenSupported() {
  return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled);
}

function LiveMarkets() {
  const containerRef = React.useRef(null);
  const frameRef = React.useRef(null);
  const idRef = React.useRef('fwg-tv-widget-' + Math.random().toString(36).slice(2));
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [fsSupported] = React.useState(fwgFullscreenSupported);

  React.useEffect(() => {
    const onChange = () => setIsFullscreen(fwgFullscreenElement() === frameRef.current);
    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    return () => {
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
    };
  }, []);

  const toggleFullscreen = () => {
    if (fwgFullscreenElement()) fwgExitFullscreen();
    else if (frameRef.current) fwgRequestFullscreen(frameRef.current);
  };

  React.useEffect(() => {
    let cancelled = false;
    let pollId = null;
    let timeoutId = null;

    function init() {
      if (cancelled || !containerRef.current) return;
      new window.TradingView.widget({
        autosize: true,
        symbol: 'FX:EURUSD',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#131722',
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
        withdateranges: true,
        details: false,
        hotlist: false,
        calendar: false,
        container_id: idRef.current,
      });
    }

    if (window.TradingView) {
      init();
    } else {
      /* tv.js is a plain blocking <script> tag loaded before the app's own
         scripts, so it should already be ready by the time this effect
         runs — this poll is just a safety net in case that ever changes. */
      pollId = setInterval(() => {
        if (window.TradingView) { clearInterval(pollId); init(); }
      }, 150);
      timeoutId = setTimeout(() => clearInterval(pollId), 10000);
    }

    return () => { cancelled = true; clearInterval(pollId); clearTimeout(timeoutId); };
  }, []);

  return <Section id="live-markets" data-reveal="up"><Container>
    <Head align="center" kicker="Real-time" title="Live Markets"
      lead="A full TradingView chart, right on our site — forex pairs, gold, and anything else you want to pull up." />
    <div ref={frameRef} className="fwg-tv-chart-wrap" style={{position:'relative',display:'flex',flexDirection:'column',borderRadius:'var(--radius-2xl)',border:'1px solid var(--border-gold)',boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',overflow:'hidden',background:'#131722'}}>
      <div ref={containerRef} id={idRef.current} style={{flex:1,minHeight:0}}/>
      {fsSupported && (
        <div style={{flexShrink:0,display:'flex',justifyContent:'center',padding:'14px',borderTop:'1px solid rgba(255,255,255,0.08)',background:'linear-gradient(180deg, #131722, #0d1019)'}}>
          <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen?'Exit fullscreen':'View chart in fullscreen'}
            style={{display:'inline-flex',alignItems:'center',gap:'9px',padding:'10px 22px',borderRadius:'var(--radius-pill)',cursor:'pointer',
              background:'var(--grad-gold-soft)',border:'none',color:'#1a1405',
              fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'var(--ls-wide)',textTransform:'uppercase',
              boxShadow:'var(--glow-gold-sm)',transition:'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'}}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='var(--glow-gold-md)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='var(--glow-gold-sm)';}}>
            <Icon name={isFullscreen?'minimize':'maximize'} size={15}/>
            {isFullscreen?'Exit Fullscreen':'View Fullscreen'}
          </button>
        </div>
      )}
    </div>
  </Container></Section>;
}

function Testimonials() {
  const t=[
    ['Before learning from Ghasif, I was entering trades without really understanding why. His lessons on market structure, liquidity, and risk management helped me look at the market with a completely different mindset.','Hamza R.'],
    ['What I liked most about Ghasif’s teaching is that he keeps things simple. Instead of making trading complicated, he focuses on understanding the market and waiting for the right setup.','Ali M.'],
    ['I used to focus more on making quick profits than managing my risk. Learning proper risk management and trade planning completely changed my approach to Forex.','Usman K.'],
    ['The market structure and liquidity concepts were explained in a way that was actually easy to understand. I now have a much clearer process before taking a trade.','Ahsan F.'],
    ['Ghasif doesn’t teach Forex as a get-rich-quick thing. He emphasizes patience, discipline, risk management, and understanding the market before entering a trade. That mindset shift has been the biggest value for me.','Bilal A.'],
    ['My biggest problem was overtrading. After learning to wait for specific setups and follow a defined risk plan, I became much more disciplined with my trades.','Saad H.'],
  ];
  return <Section id="testimonials" style={{background:'var(--bg-elevated)'}} data-reveal="right"><Container>
    <Head align="center" kicker="Student results" title="Traders who found consistency"
      lead="Real members, real progress, built on discipline and education, not overnight miracles." />
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px'}} className="fwg-grid-2">
      {t.map(([q,n])=>(
        <KitCard key={n} interactive>
          <div style={{display:'flex',gap:'3px',marginBottom:'14px'}}>
            {[0,1,2,3,4].map(i=><Icon key={i} name="star" size={15} color="var(--text-gold)" strokeWidth={0}/>)}
          </div>
          <p style={{fontSize:'var(--text-md)',lineHeight:1.6,color:'var(--text-primary)',margin:'0 0 18px',fontWeight:500}}>“{q}”</p>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'#1a1405',fontWeight:800,fontFamily:'var(--font-display)'}}>{n[0]}</div>
            <div style={{fontSize:'var(--text-sm)',fontWeight:700}}>{n}</div>
          </div>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

/* Price + billing period, styled so one-time and recurring never look
   identical (required: never make a visitor guess whether a price repeats). */
function PriceTag({ price, billing }) {
  return <div style={{display:'flex',flexDirection:'column',gap:'6px'}}>
    <div style={{display:'flex',alignItems:'baseline',gap:'8px',flexWrap:'wrap'}}>
      <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',letterSpacing:'-0.02em'}}>{price}</span>
      {billing==='monthly' && <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>/month</span>}
      {billing==='one-time' && <KitBadge tone="gold" mono>One-time</KitBadge>}
      {billing==='free' && <KitBadge tone="neutral" mono>Free</KitBadge>}
    </div>
    <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>
      {billing==='monthly' ? 'Recurring monthly · cancel anytime' : billing==='one-time' ? 'One-time payment, keep access' : 'No cost, ever'}
    </span>
  </div>;
}

/* Standard tier card, shared by the 4 non-bundle products. A badge (only
   Masterclass has one) overlaps the card's top edge as a small ribbon instead
   of sitting inline next to the name — inline wrapped onto its own line at
   most widths, which is the "stacked, looks bad" bug being fixed here. The
   tagline block still gets a fixed minHeight so every card's price row starts
   at the same y-position regardless of how many lines the tagline wraps to. */
function PlanCard({ p }) {
  return <div style={{position:'relative',display:'flex',flexDirection:'column',gap:'18px',padding:'var(--space-6)',borderRadius:'var(--radius-xl)',
    background:'var(--surface-card)',border:'1px solid var(--border-default)',boxShadow:'var(--shadow-card)',height:'100%'}}>
    {p.badge && <span style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)'}}><KitBadge tone="gold">{p.badge}</KitBadge></span>}
    <div style={{minHeight:'110px'}}>
      <div style={{marginBottom:'8px'}}>
        <span style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'var(--ls-wider)',textTransform:'uppercase',color:'var(--text-gold)'}}>{p.name}</span>
      </div>
      <div style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',lineHeight:1.55}}>{p.tagline}</div>
    </div>
    <PriceTag price={p.price} billing={p.billing} />
    <div style={{height:'1px',background:'var(--border-subtle)'}}/>
    <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'11px',flex:1}}>
      {p.features.map(f=>(<li key={f} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
        <Icon name="check" size={15} color="var(--text-gold)" style={{flexShrink:0,marginTop:'2px'}}/>
        <span style={{lineHeight:1.5}}>{f}</span></li>))}
    </ul>
    <KitButton as="a" href={p.href||'/contact'} target={p.href&&p.href.startsWith('http')?'_blank':undefined} rel={p.href&&p.href.startsWith('http')?'noopener noreferrer':undefined} variant="secondary" fullWidth>{p.cta}</KitButton>
  </div>;
}

/* Flagship: the Pro Bundle, broken out full-width with its own value stack.
   No "save $X/month" claim — Masterclass is one-time and Signals/Mentorship
   are monthly, so that math would be misleading; instead the billing model
   is explained in plain language. */
function BundleCard({ p, all }) {
  const parts = all.filter(x=>['masterclass','signals','mentorship'].includes(x.id));
  const savePct = p.originalPrice ? Math.round((1 - parseFloat(p.price.replace('$','')) / parseFloat(p.originalPrice.replace('$',''))) * 100) : null;
  return <div id="pro-bundle" style={{position:'relative',overflow:'hidden',borderRadius:'var(--radius-2xl)',scrollMarginTop:'100px',
    background:'linear-gradient(160deg, rgba(214,175,67,0.10), var(--surface-card-solid))',border:'1px solid var(--border-gold)',
    boxShadow:'var(--glow-gold-md), var(--shadow-xl)',padding:'clamp(28px,4vw,48px)'}}>
    <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
    <div style={{position:'relative',display:'grid',gridTemplateColumns:'1.05fr 0.95fr',gap:'var(--space-8)',alignItems:'start'}} className="fwg-hero-grid">
      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        <div>
          <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'12px'}}>
            <KitBadge tone="solid">{p.badge}</KitBadge>
            {p.offerBadge && <KitBadge tone="bull" dot>{p.offerBadge}</KitBadge>}
          </div>
          <h3 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',letterSpacing:'-0.02em',margin:'0 0 10px'}}>{p.name}</h3>
          <p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'46ch'}}>{p.tagline}</p>
        </div>
        {p.originalPrice && (
          <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',color:'var(--text-muted)',textDecoration:'line-through'}}>{p.originalPrice}/mo</span>
            {savePct!=null && <KitBadge tone="bull" mono>Save {savePct}%</KitBadge>}
          </div>
        )}
        <PriceTag price={p.price} billing={p.billing} />
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'4px'}}>
          <KitButton as="a" href={p.href} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>{p.cta}</KitButton>
          <span style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)',fontStyle:'italic'}}>{p.secondaryText}</span>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
        <div style={{padding:'18px',borderRadius:'var(--radius-lg)',background:'var(--surface-inset)',border:'1px solid var(--border-default)'}}>
          <div style={{fontSize:'var(--text-2xs)',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px'}}>What's combined into {p.price}/month</div>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {parts.map(x=>(
              <div key={x.id} style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',gap:'12px'}}>
                <span style={{fontSize:'var(--text-sm)',color:'var(--text-primary)',fontWeight:600}}>{x.name}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-tertiary)',whiteSpace:'nowrap'}}>
                  {x.billing==='one-time' ? `${x.price} one-time value` : `${x.price}/mo value`}
                </span>
              </div>
            ))}
          </div>
          <p className="fwg-bundle-disclaimer" style={{fontSize:'var(--text-2xs)',lineHeight:1.6,color:'var(--text-muted)',margin:'14px 0 0',paddingTop:'12px',borderTop:'1px solid var(--border-subtle)'}}>
            The Masterclass is normally a one-time purchase; Signals and Mentorship are each billed monthly on their own. As part of the Pro Bundle, all three run under one {p.price}/month membership, cancel anytime.
          </p>
        </div>
        <ul style={{listStyle:'none',margin:0,padding:0,display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px 14px'}} className="fwg-grid-2">
          {p.features.map(f=>(<li key={f} style={{display:'flex',gap:'8px',alignItems:'flex-start',fontSize:'var(--text-xs)',color:'var(--text-secondary)'}}>
            <Icon name="check" size={13} color="var(--text-gold)" style={{flexShrink:0,marginTop:'2px'}}/>
            <span style={{lineHeight:1.45}}>{f}</span></li>))}
        </ul>
      </div>
    </div>
  </div>;
}

function Pricing() {
  const products = window.FWG_PRODUCTS || [];
  const tiers = products.filter(p=>!p.featured);
  const bundle = products.find(p=>p.featured);
  return <Section id="pricing"><Container>
    <Head align="center" kicker="Membership" title="Choose your trading path"
      lead="Learn the fundamentals, access market guidance, or get the complete trading experience. Billing is always shown up front, one-time or monthly." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px',alignItems:'stretch',marginTop:'12px',marginBottom:'20px'}} className="fwg-grid-4">
      {tiers.map(p=><PlanCard key={p.id} p={p} />)}
    </div>
    {bundle && <BundleCard p={bundle} all={products} />}
    <p style={{textAlign:'center',fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'var(--space-6)',maxWidth:'60ch',marginInline:'auto',lineHeight:1.6}}>
      Trading foreign exchange carries substantial risk and is not suitable for every investor. Past performance is not indicative of future results. No product or service guarantees profit.
    </p>
  </Container></Section>;
}

function FAQ() {
  const qs=[
['What’s the difference between the Masterclass, Signals, and Mentorship?','They’re separate products for separate needs. The Masterclass ($29, one-time) is a structured 12-module course that teaches you to trade. Premium Signals ($15/month) is ongoing market analysis and trade ideas. 1:1 Mentorship ($20/month) is personalised coaching and accountability. The Forex Trader Pro Bundle combines all three into one membership, now $39/month for a limited time (usually $64/month).'],
    ['Do you guarantee profits?','No, and you should run from anyone who does. We provide education, market analysis, and a disciplined framework. Markets carry real risk; our job is to put the odds and the process on your side, not to promise an outcome.'],
    ['Do I need any experience to start?','Not at all. The Free Community and the Masterclass both start from zero background. Many members join knowing nothing and build up step by step.'],
    ['How much money do I need to begin?','You can start learning with any amount, even on a demo account. For live trading we teach you to risk a small, fixed percentage per trade, so your capital decides position size, not the other way around.'],
    ['How are Premium Signals delivered?','In real time through our private channel, each signal with an entry area, stop-loss level, and target levels, plus the reasoning behind the trade.'],
    ['Which broker or platform do I need?','Any reputable broker with major forex pairs and gold works. We give general guidance on choosing one, but you keep full control of your own funds and account.'],
    ['How much time does this take each day?','Most members spend 30 to 60 minutes a day. Analysis is delivered ready to act on, and live sessions are recorded so you can catch up any time.'],
    ['What markets do you cover?','Major forex pairs and gold (XAU/USD). We focus on liquid markets with clean, readable structure.'],
    ['Is the mentorship really 1:1?','Yes. The Mentorship product includes private calls and personalised trade-plan reviews directly with a mentor, not a group session.'],
    ['Does the Masterclass include Signals or Mentorship?','No. The standalone Masterclass is a self-contained course; it doesn’t automatically include Premium Signals or 1:1 Mentorship. Those, plus everything in the Masterclass, come bundled together in the Forex Trader Pro Bundle.'],
    ['Can I cancel anytime, and how do I join?','Premium Signals, Mentorship, and the Pro Bundle are month to month with no lock-in; the Masterclass is a one-time purchase you keep. To join any product, pick it on the Pricing page or message us and we’ll get you set up.'],
  ];
  const [open,setOpen]=React.useState(-1);
  return <Section id="faq"><Container>
    <div style={{display:'grid',gridTemplateColumns:'0.8fr 1.2fr',gap:'var(--space-8)',alignItems:'start'}} className="fwg-hero-grid">
      <div>
        <KitKicker>FAQ</KitKicker>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'16ch'}}>Questions, answered honestly</h2>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:0,maxWidth:'40ch'}}>Can’t find what you’re looking for?</p>
        <div style={{marginTop:'18px'}}><KitButton as="a" href="/contact" variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>Get in touch</KitButton></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {qs.map(([q,a],i)=>{
          const isOpen=open===i;
          return <div key={i} style={{borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:`1px solid ${isOpen?'var(--border-gold)':'var(--border-default)'}`,overflow:'hidden',transition:'border-color var(--dur-base) var(--ease-out)'}}>
            <button onClick={()=>setOpen(isOpen?-1:i)} aria-expanded={isOpen} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'18px 22px',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',color:'var(--text-primary)',fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600}}>
              {q}
              <span style={{flexShrink:0,transform:isOpen?'rotate(45deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-gold)'}}><Icon name="plus" size={20}/></span>
            </button>
            <div style={{maxHeight:isOpen?'400px':'0',overflow:'hidden',transition:'max-height var(--dur-slow) var(--ease-out)'}}>
              <p style={{padding:'0 22px 20px',margin:0,fontSize:'var(--text-sm)',lineHeight:1.7,color:'var(--text-secondary)'}}>{a}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
  </Container></Section>;
}

function Blog() {
  const posts=[
    ['Risk management','The 1% rule that keeps you in the game','Why position sizing, not entries, is the real difference between traders who last and traders who blow up.','6 min'],
    ['Psychology','Trading the plan, not the feeling','A practical framework for removing emotion from your decisions when the market gets loud.','8 min'],
    ['Market structure','Reading liquidity like the banks do','How to spot where smart money is positioned, and why most retail traders enter at exactly the wrong time.','7 min'],
  ];
  return <Section id="blog" style={{background:'var(--bg-elevated)'}}><Container>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:'20px',marginBottom:'var(--space-7)',flexWrap:'wrap'}}>
      <Head kicker="From the blog" title="Insights to sharpen your edge" />
      <KitButton as="a" href="/blog" variant="ghost" iconRight={<Icon name="arrow-right" size={16}/>}>All articles</KitButton>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
      {posts.map(([cat,t,d,read])=>(
        <KitCard key={t} interactive padding="0" style={{overflow:'hidden'}}>
          <div style={{height:'128px',background:'linear-gradient(135deg, var(--ink-800), var(--ink-750))',position:'relative',borderBottom:'1px solid var(--border-subtle)',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',opacity:0.6}}/>
            <Icon name="trending-up" size={32} color="var(--text-gold)"/>
          </div>
          <div style={{padding:'20px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
              <KitBadge tone="gold">{cat}</KitBadge>
              <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>{read}</span>
            </div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,margin:'0 0 8px',lineHeight:1.25}}>{t}</h3>
            <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
          </div>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

/* Compact floating "results" card for the CTA's right side — same visual
   grammar as Hero's dashboard card (KitCard + EquityCurve + live badges) but
   smaller and more abstract, so it reads as a premium accent, not a second
   dashboard. */
/* Compact offer card for the CTA's right side. Deliberately not another
   equity-curve dashboard (Hero already shows one on every page this section
   also appears on) — this one shows the actual discount, so the section
   doubles as a second, differently-shaped nudge toward the same offer. */
function CTAOfferCard({ product }) {
  if(!product) return null;
  const savePct = product.originalPrice ? Math.round((1 - parseFloat(product.price.replace('$','')) / parseFloat(product.originalPrice.replace('$',''))) * 100) : null;
  return (
    <div style={{position:'relative',maxWidth:'360px',margin:'0 auto',padding:'22px',borderRadius:'var(--radius-2xl)',overflow:'hidden',
      background:'linear-gradient(160deg, rgba(214,175,67,0.12), var(--surface-card-solid))',border:'1px solid var(--border-gold)',
      boxShadow:'var(--glow-gold-sm), var(--shadow-xl)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
      <div style={{position:'relative'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap',marginBottom:'16px'}}>
          <KitBadge tone="solid">{product.badge}</KitBadge>
          {product.offerBadge && <KitBadge tone="bull" dot>{product.offerBadge}</KitBadge>}
        </div>
        <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-md)',color:'var(--text-primary)',marginBottom:'10px'}}>{product.name}</div>
        <div style={{display:'flex',alignItems:'baseline',gap:'10px',marginBottom:'8px',flexWrap:'wrap'}}>
          {product.originalPrice && <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-md)',color:'var(--text-muted)',textDecoration:'line-through'}}>{product.originalPrice}/mo</span>}
          <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',letterSpacing:'-0.02em',color:'var(--text-primary)'}}>{product.price}</span>
          <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>/month</span>
        </div>
        {savePct!=null && <div style={{marginBottom:'18px'}}><KitBadge tone="bull" mono>Save {savePct}% today</KitBadge></div>}
        <div style={{height:'1px',background:'var(--border-subtle)',margin:'0 0 18px'}}/>
        <ul style={{listStyle:'none',margin:'0 0 20px',padding:0,display:'flex',flexDirection:'column',gap:'11px'}}>
          {(product.features||[]).slice(0,5).map(f=>(
            <li key={f} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
              <Icon name="check" size={15} color="var(--text-gold)" style={{marginTop:'2px',flexShrink:0}}/><span>{f}</span>
            </li>
          ))}
        </ul>
        <KitButton as="a" href={product.href} target="_blank" rel="noopener noreferrer" variant="primary" fullWidth iconRight={<Icon name="arrow-up-right" size={16}/>}>
          {product.cta}
        </KitButton>
      </div>
    </div>
  );
}

function CTASection() {
  const memberCount=useLiveMemberCount();
  const product=(window.FWG_PRODUCTS||[]).find(p=>p.id==='bundle');
  return <Section id="join"><Container>
    <div style={{position:'relative',overflow:'hidden',borderRadius:'var(--radius-2xl)',padding:'clamp(36px,6vw,72px) clamp(24px,5vw,60px)',
      background:'linear-gradient(135deg, var(--ink-850), var(--ink-900))',border:'1px solid var(--border-gold)',boxShadow:'var(--glow-gold-md), var(--shadow-xl)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,background:'radial-gradient(46% 60% at 88% 40%, rgba(19,185,120,0.10) 0%, rgba(19,185,120,0) 72%)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',backgroundSize:'56px 56px',maskImage:'radial-gradient(65% 75% at 20% 30%, #000, transparent 75%)',WebkitMaskImage:'radial-gradient(65% 75% at 20% 30%, #000, transparent 75%)',opacity:0.4,pointerEvents:'none'}}/>

      <div style={{position:'relative',display:'grid',gridTemplateColumns:'1.05fr 0.95fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-grid-2">
        <div style={{display:'flex',flexDirection:'column',gap:'18px'}} className="fwg-hero-content">
          <KitKicker>Limited-time offer</KitKicker>
          <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',lineHeight:1.05,letterSpacing:'var(--ls-tight)',margin:0,maxWidth:'16ch'}}>
            The complete system, <span className="fwg-gold-text">now $39/month.</span>
          </h2>
          <p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'48ch'}}>
            The Masterclass, Premium Signals, and 1:1 Mentorship, in one membership, normally $64/month. Save 39% while the offer lasts.
          </p>
          <div style={{display:'inline-flex',alignSelf:'flex-start',alignItems:'center',gap:'8px',padding:'9px 18px',borderRadius:'var(--radius-pill)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',boxShadow:'var(--glow-gold-sm)',fontSize:'var(--text-xs)',fontWeight:700,color:'var(--text-gold)'}}>
            🎁 Join Today & Receive a $10 welcome reward
          </div>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginTop:'6px'}}>
            <KitButton as="a" href={product?product.href:'/pricing'} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>Claim Your Bonus</KitButton>
            <KitButton as="a" href="/pricing#pro-bundle" variant="secondary" size="lg" iconLeft={<Icon name="list" size={18}/>}>See What's Included</KitButton>
          </div>
          <p style={{fontSize:'var(--text-2xs)',color:'var(--text-muted)',margin:0}}>Limited-time offer. Terms and eligibility apply.</p>
          <div style={{display:'flex',alignItems:'center',gap:'8px',marginTop:'2px'}}>
            <KitBadge tone="bull" dot>{memberCount} traders active right now</KitBadge>
          </div>
        </div>

        <CTAOfferCard product={product} />
      </div>
    </div>
  </Container></Section>;
}

const NEWSLETTER_EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Footer() {
  const [email,setEmail]=React.useState('');
  const [focus,setFocus]=React.useState(false);
  const [subscribing,setSubscribing]=React.useState(false);
  const [status,setStatus]=React.useState(null);

  const handleSubscribe=async(e)=>{
    e.preventDefault();
    if(subscribing) return;
    if(!NEWSLETTER_EMAIL_RE.test(email.trim())){
      setStatus({type:'error',text:'Enter a valid email address.'});
      return;
    }
    setSubscribing(true);
    setStatus(null);
    try{
      const res=await fetch(`${window.FWG_API_BASE}/api/newsletter`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email:email.trim()}),
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok || !data.success){
        setStatus({type:'error',text:data.message||'Something went wrong. Please try again.'});
        return;
      }
      setStatus({type:'success',text:data.message||"You're subscribed."});
      setEmail('');
    }catch(err){
      setStatus({type:'error',text:'Something went wrong. Please try again.'});
    }finally{
      setSubscribing(false);
    }
  };

  const cols=[
    ['Trading',[['Premium Signals','/pricing'],['1:1 Mentorship','/pricing'],['Performance','/performance'],['Trading Tools','/tools'],['Trading Blog','/blog']]],
    ['Learn',[['Forex Masterclass','/course'],['Free Learning Hub','/learning-hub'],['Risk Management','/services'],['Free Community','/pricing']]],
    ['Company',[['About Ghasif','/about'],['Our Philosophy','/about'],['Pricing','/pricing'],['Contact','/contact']]],
  ];
  return <footer style={{borderTop:'1px solid var(--border-subtle)',background:'var(--bg-deep)',paddingTop:'var(--space-9)'}}>
    <Container>
      <div style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr 1fr',gap:'var(--space-7)',paddingBottom:'var(--space-8)'}} className="fwg-foot-grid">
        <div>
          <img src="/assets/fwg-logo.png" alt="Forex With Ghasif" style={{height:'52px',width:'auto',marginBottom:'18px'}}/>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.65,color:'var(--text-tertiary)',margin:'0 0 18px',maxWidth:'34ch'}}>
            Premium forex signals, mentorship, and market education, built on transparency, discipline, and long-term consistency.
          </p>
          <div style={{display:'flex',gap:'10px'}}>
            {['instagram','facebook','whatsapp'].map(s=>(
              <a key={s} href={(window.FWG_SOCIAL||{})[s]||'#'} target="_blank" rel="noopener noreferrer" aria-label={s} style={{width:'38px',height:'38px',borderRadius:'var(--radius-md)',background:'var(--surface-card)',border:'1px solid var(--border-default)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'var(--text-secondary)',transition:'var(--transition-base)'}}
                onMouseEnter={e=>{e.currentTarget.style.color='var(--text-gold)';e.currentTarget.style.borderColor='var(--border-gold)';}}
                onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.borderColor='var(--border-default)';}}>
                <SocialGlyph name={s} size={17}/></a>
            ))}
          </div>
        </div>
        {cols.map(([h,links])=>(
          <div key={h}>
            <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.14em',color:'var(--text-muted)',fontWeight:700,marginBottom:'16px'}}>{h}</div>
            <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'11px'}}>
              {links.map(([l,href])=>(<li key={l}><a href={href} style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',transition:'var(--transition-color)'}}
                onMouseEnter={e=>e.currentTarget.style.color='var(--text-gold)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-secondary)'}>{l}</a></li>))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{padding:'var(--space-6) 0',borderTop:'1px solid var(--border-subtle)',borderBottom:'1px solid var(--border-subtle)',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'24px',flexWrap:'wrap'}}>
        <div style={{maxWidth:'36ch'}}>
          <div style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,marginBottom:'4px'}}>Weekly market edge, in your inbox</div>
          <div style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>Free analysis and one high-conviction idea every Sunday. No spam.</div>
        </div>
        <div style={{flex:'1 1 280px',maxWidth:'420px'}}>
          <form onSubmit={handleSubscribe} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 6px 5px 16px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:`1px solid ${focus?'var(--border-gold)':'var(--border-default)'}`,boxShadow:focus?'0 0 0 3px var(--accent-soft-bg)':'none',transition:'border-color var(--dur-fast), box-shadow var(--dur-fast)'}}>
            <Icon name="mail" size={17} color="var(--text-tertiary)"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} placeholder="you@email.com" type="email" disabled={subscribing} required
              style={{flex:1,minWidth:0,background:'transparent',border:'none',outline:'none',color:'var(--text-primary)',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',padding:'10px 0'}}/>
            <KitButton as="button" type="submit" variant="primary" size="sm" disabled={subscribing}>Subscribe</KitButton>
          </form>
          {status&&<div style={{fontSize:'var(--text-xs)',marginTop:'8px',color:status.type==='success'?'var(--bullish)':'var(--bearish)'}}>{status.text}</div>}
        </div>
      </div>

      <div style={{padding:'var(--space-6) 0',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px',flexWrap:'wrap'}} className="fwg-footer-bottom">
        <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>© 2026 Forex With Ghasif. All rights reserved.</span>
        <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',maxWidth:'62ch',lineHeight:1.6,textAlign:'right'}}>
          Risk warning: Trading forex and CFDs carries a high level of risk and may not be suitable for all investors. Never trade with money you cannot afford to lose.
        </span>
      </div>
    </Container>
  </footer>;
}

Object.assign(window,{Performance,Testimonials,Pricing,FAQ,Blog,CTASection,Footer});

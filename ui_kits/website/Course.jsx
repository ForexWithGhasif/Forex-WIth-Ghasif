/* FWG, Forex Masterclass course page. Product data (price, features, CTA)
   reads from window.FWG_PRODUCTS (kit.jsx) rather than duplicating it here. */

const COURSE_MODULES = [
  {n:'01', title:'Forex Fundamentals', lessons:['What is Forex?','How the Forex market works','Currency pairs','Base vs quote currency','Major, minor & exotic pairs','Trading sessions']},
  {n:'02', title:'Trading Basics', lessons:['Pips','Lots','Spread','Leverage','Margin','Swap','Position sizing']},
  {n:'03', title:'Candlestick Analysis', lessons:['Candlestick anatomy','Bullish & bearish candles','Important candlestick patterns','Reading price action']},
  {n:'04', title:'Market Structure', lessons:['Higher highs','Higher lows','Lower highs','Lower lows','Trends','Ranges','Breakouts']},
  {n:'05', title:'Support & Resistance', lessons:['Identifying key levels','Strong vs weak levels','Multiple-timeframe analysis','Liquidity concepts']},
  {n:'06', title:'Technical Analysis', lessons:['Trend analysis','Price action','Indicators','Moving averages','RSI','When indicators should and should not be used']},
  {n:'07', title:'Trade Setups', lessons:['Finding opportunities','Entry conditions','Stop-loss placement','Take-profit placement','Risk/reward','Trade execution']},
  {n:'08', title:'Risk Management', highlight:true, lessons:['Risk per trade','Position sizing','Stop-loss discipline','Risk/reward','Maximum daily loss','Drawdown','Avoiding overtrading','Understanding leverage','Understanding potential losses']},
  {n:'09', title:'Trading Psychology', lessons:['Fear','Greed','FOMO','Revenge trading','Overtrading','Patience','Discipline','Following a trading plan']},
  {n:'10', title:'Build Your Trading Plan', lessons:['Creating a trading strategy','Entry rules','Exit rules','Risk rules','Trading hours','Choosing pairs','Daily loss limits','Trade journal']},
  {n:'11', title:'Backtesting', lessons:['Why backtesting matters','How to backtest','Recording results','Win rate','Risk/reward','Drawdown','Evaluating a strategy']},
  {n:'12', title:'Demo Trading', lessons:['Executing the strategy','Recording trades','Reviewing mistakes','Improving consistency','Preparing for responsible live trading']},
];

const WHO_FOR = [
  ['graduation-cap','Beginners','For people starting Forex from zero.'],
  ['trending-up','Aspiring traders','For people who understand the basics but need a structured process.'],
  ['shield-alert','Struggling traders','For traders who want to improve their risk management, discipline, and consistency.'],
  ['compass','Self-directed learners','For people who want to develop their own market understanding instead of relying entirely on signals.'],
];

const ROADMAP = [
  'Understand the market','Read price action','Understand market structure','Build trade setups',
  'Manage risk','Control psychology','Build your trading plan','Backtest','Practice on demo',
];

const COURSE_FAQ = [
  ['Is the course suitable for beginners?','Yes. The curriculum starts with Forex fundamentals and gradually progresses toward strategy development, risk management, psychology, and backtesting.'],
  ['Does the course guarantee profits?','No. Trading involves substantial risk, and no course can guarantee profits or trading success.'],
  ['Do I need previous trading experience?','No. The course starts from the fundamentals.'],
  ['Will I learn risk management?','Yes. Risk management is one of the most important modules in the curriculum.'],
  ['Does the course include trading signals?','No. The standalone Masterclass doesn’t automatically include Premium Signals, that’s a separate product. Signals are included, alongside the full Masterclass, in the Forex Trader Pro Bundle.'],
  ['Is mentorship included?','No. The standalone Masterclass doesn’t automatically include 1:1 Mentorship, that’s a separate product. Mentorship is included, alongside the full Masterclass, in the Forex Trader Pro Bundle.'],
  ['What is included in the Forex Trader Pro Bundle?','The Pro Bundle includes the complete Masterclass, Premium Signals, and 1:1 Mentorship together in one monthly membership.'],
];

function CourseModule({ m, index, open, onToggle }) {
  const isOpen = open===index;
  return (
    <div style={{borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:`1px solid ${isOpen?'var(--border-gold)':'var(--border-default)'}`,overflow:'hidden',transition:'border-color var(--dur-base) var(--ease-out)'}}>
      <button onClick={onToggle} aria-expanded={isOpen} style={{width:'100%',display:'flex',alignItems:'center',gap:'14px',padding:'16px 20px',background:'transparent',border:'none',cursor:'pointer',textAlign:'left'}}>
        <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',fontWeight:700,color:'var(--text-gold)',flexShrink:0,width:'26px'}}>{m.n}</span>
        <span style={{flex:1,fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,color:'var(--text-primary)'}}>{m.title}</span>
        {m.highlight && <span className="fwg-hide-mobile"><KitBadge tone="gold">Core module</KitBadge></span>}
        <span className="fwg-hide-mobile" style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',fontFamily:'var(--font-mono)',flexShrink:0,whiteSpace:'nowrap'}}>{m.lessons.length} lessons</span>
        <span style={{flexShrink:0,transform:isOpen?'rotate(45deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-gold)'}}><Icon name="plus" size={18}/></span>
      </button>
      <div style={{maxHeight:isOpen?'560px':'0',overflow:'hidden',transition:'max-height var(--dur-slow) var(--ease-out)'}}>
        <ul style={{listStyle:'none',margin:0,padding:'0 20px 18px 60px',display:'flex',flexDirection:'column',gap:'10px'}}>
          {m.lessons.map(l=>(<li key={l} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
            <Icon name="check" size={14} color="var(--text-gold)" style={{marginTop:'3px',flexShrink:0}}/><span>{l}</span></li>))}
        </ul>
      </div>
    </div>
  );
}

function Curriculum() {
  const [open,setOpen]=React.useState(-1);
  return <Section id="curriculum"><Container>
    <Head align="center" kicker="Curriculum" title="12 modules, start to finish"
      lead="All lessons are delivered live on Zoom, so you can ask questions in real time as you work through each module." />
    <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
      {COURSE_MODULES.map((m,i)=>(<CourseModule key={m.n} m={m} index={i} open={open} onToggle={()=>setOpen(open===i?-1:i)} />))}
    </div>
  </Container></Section>;
}

function WhoIsThisFor() {
  return <Section style={{background:'var(--bg-elevated)'}}><Container>
    <Head align="center" kicker="Is this for you?" title="Who this course is for" />
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:'16px'}} className="fwg-grid-4">
      {WHO_FOR.map(([ic,t,d])=>(
        <KitCard key={t}>
          <div style={{width:'44px',height:'44px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',marginBottom:'14px'}}>
            <Icon name={ic} size={20} color="var(--text-gold)"/>
          </div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:700,margin:'0 0 8px'}}>{t}</h3>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

const INCLUDED_ICONS = ['layers','trending-up','target','shield-alert','brain','clipboard-list','history','compass','flag'];

function WhatsIncluded() {
  const product = (window.FWG_PRODUCTS||[]).find(p=>p.id==='masterclass');
  if(!product) return null;
  return <Section><Container>
    <Head align="center" kicker="Course details" title="What's included"
      lead="Everything below is part of the single $29 payment, nothing unlocks separately." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}} className="fwg-grid-3">
      {product.features.map((f,i)=>(
        <div key={f} style={{display:'flex',gap:'14px',alignItems:'flex-start',padding:'20px',borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:'1px solid var(--border-default)',boxShadow:'var(--shadow-card)'}}>
          <div style={{width:'38px',height:'38px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Icon name={INCLUDED_ICONS[i%INCLUDED_ICONS.length]} size={17} color="var(--text-gold)"/>
          </div>
          <span style={{fontSize:'var(--text-sm)',fontWeight:600,color:'var(--text-primary)',lineHeight:1.5,paddingTop:'7px'}}>{f}</span>
        </div>
      ))}
    </div>
  </Container></Section>;
}

function LearningRoadmap() {
  return <Section style={{background:'var(--bg-elevated)'}}><Container>
    <Head align="center" kicker="The path" title="Your learning roadmap"
      lead="Nine stages, each building on the last, from understanding the market to trading it with a plan." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'14px'}} className="fwg-grid-3">
      {ROADMAP.map((step,i)=>(
        <div key={step} style={{display:'flex',alignItems:'center',gap:'16px',padding:'20px',borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:'1px solid var(--border-default)',boxShadow:'var(--shadow-card)'}}>
          <span style={{width:'42px',height:'42px',borderRadius:'50%',flexShrink:0,background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-mono)',fontSize:'var(--text-md)',fontWeight:800,color:'#1a1405',boxShadow:'var(--inset-gold-hi)'}}>{i+1}</span>
          <span style={{fontSize:'var(--text-sm)',fontWeight:700,letterSpacing:'0.02em',textTransform:'uppercase',color:'var(--text-primary)'}}>{step}</span>
        </div>
      ))}
    </div>
  </Container></Section>;
}

function CourseFAQSection() {
  const [open,setOpen]=React.useState(-1);
  return <Section id="faq"><Container>
    <div style={{display:'grid',gridTemplateColumns:'0.8fr 1.2fr',gap:'var(--space-8)',alignItems:'start'}} className="fwg-hero-grid">
      <div>
        <KitKicker>FAQ</KitKicker>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'var(--text-2xl)',lineHeight:1.12,letterSpacing:'var(--ls-tight)',margin:'14px 0 16px',maxWidth:'16ch'}}>Course questions, answered honestly</h2>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.7,color:'var(--text-secondary)',margin:0,maxWidth:'40ch'}}>Still not sure? Ask before you enroll.</p>
        <div style={{marginTop:'18px'}}><KitButton as="a" href="/contact" variant="outlineGold" iconRight={<Icon name="arrow-right" size={16}/>}>Get in touch</KitButton></div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
        {COURSE_FAQ.map(([q,a],i)=>{
          const isOpen=open===i;
          return <div key={i} style={{borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:`1px solid ${isOpen?'var(--border-gold)':'var(--border-default)'}`,overflow:'hidden',transition:'border-color var(--dur-base) var(--ease-out)'}}>
            <button onClick={()=>setOpen(isOpen?-1:i)} aria-expanded={isOpen} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'18px 22px',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',color:'var(--text-primary)',fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600}}>
              {q}
              <span style={{flexShrink:0,transform:isOpen?'rotate(45deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-gold)'}}><Icon name="plus" size={20}/></span>
            </button>
            <div style={{maxHeight:isOpen?'320px':'0',overflow:'hidden',transition:'max-height var(--dur-slow) var(--ease-out)'}}>
              <p style={{padding:'0 22px 20px',margin:0,fontSize:'var(--text-sm)',lineHeight:1.7,color:'var(--text-secondary)'}}>{a}</p>
            </div>
          </div>;
        })}
      </div>
    </div>
  </Container></Section>;
}

/* Flagship enroll card — same rich two-column treatment as the Pro Bundle
   card on /pricing (gold border, glow, icon, outcomes panel), not a bare
   price + button. This is the core conversion moment on the site's core page. */
function CoursePricing() {
  const product = (window.FWG_PRODUCTS||[]).find(p=>p.id==='masterclass');
  if(!product) return null;
  const outcomes = [
    'A complete trading strategy framework',
    'A personal risk-management framework',
    'Discipline and psychology tools',
    'A trade-journal & backtesting process',
    'Confidence trading a demo account',
    'A clear, structured learning path',
  ];
  const facts = [
    ['radio','Live on Zoom'],
    ['graduation-cap','Beginner-friendly'],
    ['infinity','Keep access, no expiry'],
  ];
  return <Section id="enroll"><Container>
    <div style={{maxWidth:'960px',margin:'0 auto',position:'relative',overflow:'hidden',borderRadius:'var(--radius-2xl)',
      background:'linear-gradient(160deg, rgba(214,175,67,0.10), var(--surface-card-solid))',border:'1px solid var(--border-gold)',
      boxShadow:'var(--glow-gold-md), var(--shadow-xl)',padding:'clamp(28px,4vw,48px)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
      <div style={{position:'relative',display:'grid',gridTemplateColumns:'1.05fr 0.95fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px'}}>
            <div style={{width:'52px',height:'52px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <Icon name="book-open" size={24} color="var(--text-gold)"/>
            </div>
            <div>
              <div style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'var(--ls-wider)',textTransform:'uppercase',color:'var(--text-gold)',marginBottom:'4px'}}>Forex Masterclass</div>
              <KitBadge tone="gold">{product.badge}</KitBadge>
            </div>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
              <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-4xl)',letterSpacing:'-0.02em'}}>{product.price}</span>
              <KitBadge tone="gold" mono>One-time</KitBadge>
            </div>
            <span style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>One-time payment, keep access, no subscription</span>
          </div>
          <KitButton as="a" href={product.href} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" fullWidth iconRight={<Icon name="arrow-up-right" size={18}/>}>Start Learning</KitButton>
          <div style={{display:'flex',flexWrap:'wrap',gap:'16px'}}>
            {facts.map(([ic,label])=>(
              <span key={label} style={{display:'flex',alignItems:'center',gap:'7px',fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>
                <Icon name={ic} size={14} color="var(--text-gold)"/>{label}
              </span>
            ))}
          </div>
        </div>

        <div style={{padding:'22px',borderRadius:'var(--radius-lg)',background:'var(--surface-inset)',border:'1px solid var(--border-default)'}}>
          <div style={{fontSize:'var(--text-2xs)',fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text-muted)',marginBottom:'14px'}}>What you'll walk away with</div>
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'12px'}}>
            {outcomes.map(o=>(<li key={o} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
              <Icon name="check" size={16} color="var(--text-gold)" style={{marginTop:'2px',flexShrink:0}}/><span>{o}</span></li>))}
          </ul>
        </div>
      </div>
      <p style={{position:'relative',fontSize:'var(--text-xs)',color:'var(--text-muted)',margin:'24px 0 0',paddingTop:'18px',borderTop:'1px solid var(--border-subtle)',lineHeight:1.6,textAlign:'center'}}>
        Trading involves substantial risk. This course is education only and does not guarantee profits or trading success.
      </p>
    </div>
  </Container></Section>;
}

function CoursePage() {
  const product = (window.FWG_PRODUCTS||[]).find(p=>p.id==='masterclass');
  return <React.Fragment>
    <PageHero kicker="Forex Masterclass" title="Learn the foundations of Forex trading"
      lead="Build a structured approach to market analysis, risk management, and execution, from beginner fundamentals through strategy development, psychology, and backtesting."
      badge={product?`${product.price} · One-time payment`:undefined} />
    <div style={{display:'flex',justifyContent:'center',gap:'12px',flexWrap:'wrap',padding:'0 var(--gutter) var(--space-8)',marginTop:'calc(-1 * var(--space-6))'}}>
      <KitButton as="a" href={product?product.href:'/contact'} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>Start Learning</KitButton>
      <KitButton as="a" href="#curriculum" variant="secondary" size="lg" iconLeft={<Icon name="list" size={18}/>}>View Curriculum</KitButton>
    </div>
    <Reveal>
      <TrustBar/>
      <WhoIsThisFor/>
      <Curriculum/>
      <WhatsIncluded/>
      <LearningRoadmap/>
      <CourseFAQSection/>
      <CoursePricing/>
      <CTASection/>
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{CoursePage});

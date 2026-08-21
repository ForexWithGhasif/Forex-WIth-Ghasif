/* FWG, Free Learning Hub — beginner forex education, card grid + lesson modal.
   Mirrors the ArticleModal pattern from Pages2.jsx (same overlay/card CSS,
   same block renderer for h/p/quote/list) but text-only, no images. */

const LEARNING_TOPICS = [
  {
    icon:'globe', category:'Fundamentals', title:'What is Forex Trading?', read:'4 min read',
    summary:'The basics of how the world’s largest financial market actually works.',
    body:[
      ['h','The world’s largest financial market'],
      ['p','Forex, short for foreign exchange, is the global marketplace where currencies are bought and sold against each other. Every time you convert money for travel or a business pays an overseas supplier, that’s forex in action, just on a retail scale. The market trades over $7 trillion a day, more than every stock market on earth combined, and it runs 24 hours a day, five days a week, as trading sessions in Sydney, Tokyo, London, and New York hand off to one another.'],
      ['h','How a currency pair works'],
      ['p','Currencies are always traded in pairs, because you’re simultaneously buying one and selling the other. In EUR/USD, the euro is the base currency and the US dollar is the quote currency. If EUR/USD is trading at 1.0850, one euro buys 1.0850 US dollars. Going long EUR/USD means betting the euro strengthens against the dollar; going short means betting the opposite.'],
      ['h','Pips, lots, and leverage'],
      ['p','A pip is the smallest standard price move in a currency pair, usually the fourth decimal place. Position size is measured in lots, and most brokers offer leverage, borrowed capital that lets you control a larger position than your account balance alone. Leverage magnifies both gains and losses, which is exactly why risk management, not prediction, is what separates traders who last from those who don’t.'],
      ['list','Currencies trade in pairs, always relative to one another','The market runs 24/5 across four major trading sessions','Leverage increases both potential reward and potential loss'],
    ],
  },
  {
    icon:'graduation-cap', category:'Fundamentals', title:'Forex Trading for Beginners', read:'5 min read',
    summary:'A practical starting roadmap, what to learn first and what to skip.',
    body:[
      ['h','Start with the market, not the shortcuts'],
      ['p','Most beginners open a chart before they understand what they’re looking at. Before risking a single dollar, get comfortable with how currency pairs move, what drives volatility, and how a broker platform actually executes an order. This foundation makes everything you learn afterward click faster.'],
      ['h','A sensible learning order'],
      ['list','Learn how currency pairs, pips, and lot sizes work','Understand risk management before you learn any strategy','Study one method of reading price properly, rather than five superficially','Practice on a demo account until your process is consistent, not just profitable once','Only then trade small size with real money, and journal every trade'],
      ['h','Mistakes almost every beginner makes'],
      ['p','Overtrading, risking too much on a single idea, and abandoning a strategy after a handful of losses are the three habits that end most beginner accounts, not a lack of market knowledge. Slow down. Consistency is built one well-managed trade at a time, not one lucky one.'],
      ['quote','You don’t need to predict the market correctly to succeed. You need to manage being wrong better than everyone else.'],
    ],
  },
  {
    icon:'droplets', category:'Market structure', title:'What is Liquidity?', read:'4 min read',
    summary:'Why price moves toward the places where the most orders are resting.',
    body:[
      ['h','Liquidity is where the orders are'],
      ['p','Liquidity refers to pools of resting orders sitting in the market, stop-losses above old highs, breakout entries below old lows, pending orders clustered around obvious levels. Large participants like banks and funds can’t fill big positions without a counterparty, so they need these pools to execute size without moving price against themselves.'],
      ['h','Why price “hunts” liquidity'],
      ['p','This is why price often pushes just beyond an obvious high or low before reversing, commonly called a liquidity sweep. It isn’t personal and it isn’t manipulation in the way it’s often assumed to be; it’s large orders being filled where the liquidity exists, which happens to be exactly where retail stop-losses are placed.'],
      ['h','Reading it practically'],
      ['p','Mark the obvious highs and lows that most traders can see. When price sweeps beyond one and then sharply rejects back through it, that’s often a signal the liquidity has been taken and a real move may follow in the opposite direction. Waiting for that rejection, instead of trading the first touch of a level, is the core skill.'],
      ['list','Buy-side liquidity sits above old highs, where short-sellers’ stops rest','Sell-side liquidity sits below old lows, where long traders’ stops rest','A sweep followed by rejection is more meaningful than the level itself'],
    ],
  },
  {
    icon:'layers', category:'Market structure', title:'What is Market Structure?', read:'4 min read',
    summary:'How to read trend direction from a sequence of highs and lows.',
    body:[
      ['h','Structure is the market’s handwriting'],
      ['p','Market structure is the pattern formed by a sequence of swing highs and swing lows on a chart. It’s the most direct way to read whether a market is trending, ranging, or turning, without relying on lagging indicators.'],
      ['h','Bullish vs bearish structure'],
      ['p','A bullish structure forms a series of higher highs and higher lows, each pullback finding support above the previous low. A bearish structure mirrors this with lower highs and lower lows. When price stops making higher lows, or stops making lower highs, that’s usually the first hint the structure is about to shift.'],
      ['h','Why it matters more than any indicator'],
      ['p','Structure tells you the current trend regime the market is in, and most reliable setups are built around trading with structure, not against it. Learning to label highs and lows accurately is one of the highest-leverage skills a trader can build, because every other concept is read in that context.'],
      ['list','Higher highs + higher lows = bullish structure','Lower highs + lower lows = bearish structure','A broken pattern of highs and lows is the earliest warning of a shift'],
    ],
  },
  {
    icon:'box', category:'Market structure', title:'What is an Order Block?', read:'4 min read',
    summary:'The last candle before a strong move, and why it can act as support or resistance.',
    body:[
      ['h','A footprint of institutional orders'],
      ['p','An order block is the last opposing candle before a sharp, impulsive move in price. In an uptrend, the last bearish candle before a strong rally is considered a bullish order block. The idea is that this candle marks where large orders sat just before the market moved aggressively in one direction.'],
      ['h','Why price often returns to it'],
      ['p','Price frequently retraces back to an order block before continuing in the direction of the original move, since that zone is thought to contain unfilled institutional orders. Traders use this as a potential area to look for an entry, with a tighter, more defined risk than chasing the move after it has already happened.'],
      ['h','Using it responsibly'],
      ['p','An order block is a zone of interest, not a guarantee. It works best combined with other context, market structure, liquidity, and confirmation on a lower timeframe, rather than traded in isolation. Treat it as a place to pay closer attention, not an automatic signal.'],
      ['list','Bullish order block: last down-candle before a strong rally','Bearish order block: last up-candle before a strong decline','Always combine it with structure and confirmation, never trade it blindly'],
    ],
  },
  {
    icon:'arrow-up-down', category:'Market structure', title:'What is Fair Value Gap (FVG)?', read:'4 min read',
    summary:'The price “imbalance” left behind by a fast, aggressive move.',
    body:[
      ['h','An imbalance in three candles'],
      ['p','A Fair Value Gap, or FVG, is a price inefficiency left behind when the market moves so fast it skips over a range of prices without much two-way trading. It’s identified using three consecutive candles: a gap exists between the high of the first candle and the low of the third, where price moved impulsively through the middle candle.'],
      ['h','Why it tends to get “filled”'],
      ['p','Because that price range was never properly traded in both directions, the market often returns to rebalance it later, retracing back through the gap before continuing on its way. This is why FVGs are commonly used as potential entry or reaction zones on a pullback.'],
      ['h','How traders use it'],
      ['p','An FVG works much like an order block: it’s a zone of interest, not a guaranteed reversal point. The strongest FVGs tend to align with market structure and liquidity, for example a gap sitting inside a bullish order block, or one formed right after a liquidity sweep.'],
      ['list','Formed by 3 candles when price moves too fast for two-way trading','Price often revisits the gap before continuing the original move','Most reliable when it lines up with structure, not used alone'],
    ],
  },
  {
    icon:'git-branch', category:'Market structure', title:'What are BOS & CHoCH?', read:'5 min read',
    summary:'Two structure signals: one confirms a trend, the other warns of a reversal.',
    body:[
      ['h','Break of Structure (BOS)'],
      ['p','A Break of Structure happens when price breaks beyond the most recent swing high in an uptrend, or swing low in a downtrend, confirming the existing trend is continuing. A BOS is a continuation signal, it tells you the current structure is intact and likely to keep pushing in the same direction.'],
      ['h','Change of Character (CHoCH)'],
      ['p','A Change of Character is different: it occurs when price breaks structure in the opposite direction to the current trend, for example breaking below a higher low during an uptrend. A CHoCH is often the earliest technical clue that the prevailing trend may be losing control and a reversal, or at least a deeper correction, could be starting.'],
      ['h','Reading them together'],
      ['p','BOS confirms you’re still in the trend; CHoCH warns you that trend may be ending. Many traders wait for a CHoCH, followed by a fresh BOS in the new direction, before treating a reversal as confirmed, rather than reacting to the very first sign of a shift.'],
      ['list','BOS = structure breaks in the trend’s direction (continuation)','CHoCH = structure breaks against the trend’s direction (possible reversal)','A CHoCH followed by a new BOS is stronger confirmation than either alone'],
    ],
  },
  {
    icon:'shield', category:'Risk & psychology', title:'What is Risk Management?', read:'5 min read',
    summary:'The discipline that decides whether you stay in the game long enough to win.',
    body:[
      ['h','Protecting capital comes first'],
      ['p','Risk management is the set of rules that decide how much you can lose, on any single trade and over any stretch of losing trades, before your account is meaningfully damaged. It says nothing about your entry or your strategy; its only job is survival.'],
      ['h','The 1% principle'],
      ['p','A widely used starting rule is to risk no more than 1% of total account capital on a single trade. If your account is $10,000, your maximum loss on any one idea is $100. This keeps even a difficult losing streak from doing serious damage, so your strategy has room to actually prove itself over a large enough sample.'],
      ['h','Position sizing and reward-to-risk'],
      ['p','Position size should be calculated from your stop-loss distance and your risk percentage, not chosen first and adjusted afterward. Pairing disciplined sizing with a favourable reward-to-risk ratio means you don’t need an unrealistically high win rate to be profitable over time.'],
      ['list','Define risk in money terms before entering, not after','Never widen a stop-loss to avoid being wrong','A smaller, consistent risk per trade beats a large, occasional one'],
      ['p','Trading involves substantial risk, and no risk management approach eliminates the possibility of loss. Never trade with money you cannot afford to lose.'],
    ],
  },
  {
    icon:'brain', category:'Risk & psychology', title:'What is Trading Psychology?', read:'5 min read',
    summary:'Why the biggest obstacle in trading usually isn’t the market.',
    body:[
      ['h','The market doesn’t cause most losses, reactions do'],
      ['p','Trading psychology is the study of how emotions, fear, greed, revenge, overconfidence, influence decision-making under uncertainty. Most blown accounts aren’t the result of a bad strategy; they’re the result of a good strategy abandoned mid-drawdown, or a sound plan overridden in the heat of a live trade.'],
      ['h','The most common psychological traps'],
      ['list','Revenge trading: increasing size right after a loss to “win it back” quickly','Fear of missing out: entering late, chasing a move that already happened','Moving a stop-loss further away because “it will probably come back”','Cutting winners early out of fear of giving profit back'],
      ['h','Building emotional discipline'],
      ['p','You can’t remove emotion from trading, but you can remove the decision-making from the moment of maximum emotion, by deciding your entry, stop, and target in advance, then following that plan regardless of how the trade feels while it’s open. A trading journal that records the emotional state behind a trade, not just the trade itself, is one of the fastest ways to spot your own patterns.'],
      ['quote','Discipline isn’t the absence of emotion, it’s following the plan anyway.'],
    ],
  },
  {
    icon:'clipboard-list', category:'Strategy', title:'What is a Trading Plan?', read:'4 min read',
    summary:'The written rulebook that removes guesswork from every trade.',
    body:[
      ['h','Why “I’ll figure it out live” doesn’t work'],
      ['p','A trading plan is a written set of rules that defines exactly how you find, enter, manage, and exit trades, decided in advance, when you’re calm, not while a position is open and moving. Without one, every trade becomes a fresh emotional decision, and consistency becomes impossible.'],
      ['h','What a solid plan actually contains'],
      ['list','The setups you trade, and just as importantly, the ones you don’t','Entry criteria specific enough to leave no room for improvisation','Stop-loss and position-sizing rules tied to your risk management','Exit rules, both for profit targets and for when the idea is invalidated','A review process for logging and learning from every trade, win or lose'],
      ['h','Treat it as a living document'],
      ['p','A plan isn’t meant to be rigid forever, it should evolve as you gather data from your own trading. But it should only change based on a structured review of many trades, never mid-session because one trade is going against you. The goal is a plan detailed enough that, once price starts moving, there’s nothing left to decide.'],
    ],
  },
  {
    icon:'history', category:'Strategy', title:'What is Backtesting?', read:'4 min read',
    summary:'How to test a strategy on past data before risking real capital on it.',
    body:[
      ['h','Testing before trusting'],
      ['p','Backtesting is the process of applying a trading strategy’s exact rules to historical price data to see how it would have performed, before risking real money on it. It answers a simple question: does this strategy actually have an edge, or does it just feel right?'],
      ['h','Doing it properly'],
      ['p','A meaningful backtest requires clearly defined, mechanical rules, entry, stop, target, and position size, applied consistently across a large enough sample, typically hundreds of trades, across different market conditions. Testing on ten hand-picked, favourable examples isn’t a backtest, it’s confirmation bias.'],
      ['h','What to look for in the results'],
      ['list','Win rate combined with average reward-to-risk, not win rate alone','The largest losing streak, and whether your risk sizing would survive it','Consistency across different periods, not just one strong stretch'],
      ['h','From backtest to live trading'],
      ['p','A strategy that performs well in a backtest should then be forward-tested on a demo account in real time, since historical testing can’t fully capture live execution, slippage, or your own emotional response to real trades. Backtesting builds the statistical case for a strategy; forward testing builds your confidence to actually execute it.'],
    ],
  },
];

/* Lesson modal: same overlay/card CSS + block renderer as the blog's
   ArticleModal, minus the header image and author bio (text-only content). */
function LessonModal({ topic, onClose }) {
  React.useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prev; };
  },[onClose]);
  const block=(b,i)=>{
    const [type,...rest]=b;
    if(type==='h') return <h2 key={i} style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,letterSpacing:'-0.01em',color:'var(--text-primary)',margin:i===0?'0 0 12px':'34px 0 12px'}}>{rest[0]}</h2>;
    if(type==='p') return <p key={i} style={{fontSize:'var(--text-md)',lineHeight:1.8,color:'var(--text-secondary)',margin:'0 0 16px'}}>{rest[0]}</p>;
    if(type==='quote') return <blockquote key={i} style={{margin:'26px 0',padding:'4px 0 4px 22px',borderLeft:'3px solid var(--border-gold)',fontFamily:'var(--font-serif)',fontStyle:'italic',fontSize:'var(--text-xl)',lineHeight:1.4,color:'var(--text-primary)'}}>{rest[0]}</blockquote>;
    if(type==='list') return <ul key={i} style={{margin:'4px 0 20px',padding:0,listStyle:'none',display:'flex',flexDirection:'column',gap:'12px'}}>
      {rest.map((li,j)=>(<li key={j} style={{display:'flex',gap:'12px',alignItems:'flex-start',fontSize:'var(--text-md)',lineHeight:1.6,color:'var(--text-secondary)'}}>
        <Icon name="check" size={18} color="var(--text-gold)" style={{marginTop:'3px',flexShrink:0}}/><span>{li}</span></li>))}</ul>;
    return null;
  };
  return (
    <div onClick={onClose} className="fwg-modal-overlay"
      style={{position:'fixed',inset:0,zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'clamp(16px,5vh,64px) var(--gutter)',overflowY:'auto',
        background:'rgba(4,5,8,0.72)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)'}}>
      <article onClick={(e)=>e.stopPropagation()} className="fwg-modal-card"
        style={{position:'relative',width:'min(720px,100%)',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',
          boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',overflow:'hidden',marginBottom:'48px'}}>
        <button onClick={onClose} aria-label="Close lesson"
          style={{position:'absolute',top:'16px',right:'16px',zIndex:3,width:'42px',height:'42px',borderRadius:'50%',cursor:'pointer',
            background:'rgba(10,12,17,0.6)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'var(--transition-base)'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-strong)';e.currentTarget.style.color='var(--text-primary)';}}>
          <Icon name="x" size={20}/>
        </button>
        <div style={{padding:'clamp(28px,5vw,52px) clamp(22px,5vw,52px) clamp(32px,5vw,52px)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'18px'}}>
            <div style={{width:'46px',height:'46px',flexShrink:0,borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <Icon name={topic.icon} size={22} color="var(--text-gold)"/>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap'}}>
              <KitBadge tone="solid">{topic.category}</KitBadge>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>{topic.read}</span>
            </div>
          </div>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',lineHeight:1.1,letterSpacing:'-0.02em',color:'var(--text-primary)',margin:'0 0 22px',paddingBottom:'22px',borderBottom:'1px solid var(--border-subtle)'}}>{topic.title}</h1>
          {topic.body.map(block)}
          <div style={{marginTop:'34px',paddingTop:'24px',borderTop:'1px solid var(--border-subtle)',display:'flex',flexWrap:'wrap',gap:'12px',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>Want to put this into practice?</span>
            <KitButton as="a" href="/pricing" variant="primary" iconRight={<Icon name="arrow-up-right" size={16}/>}>View Pricing</KitButton>
          </div>
        </div>
      </article>
    </div>
  );
}

function LearningHubGrid() {
  const [openTopic,setOpenTopic]=React.useState(null);
  return <React.Fragment>
    {openTopic && <LessonModal topic={openTopic} onClose={()=>setOpenTopic(null)} />}
    <Section><Container>
      <Head align="center" kicker="11 core lessons" title="Pick a topic, learn it properly"
        lead="Each card opens a full, written lesson, no video required. Work through them in order, or jump straight to the concept you need." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
        {LEARNING_TOPICS.map(t=>(
          <KitCard key={t.title} interactive padding="26px" onClick={()=>setOpenTopic(t)} style={{cursor:'pointer',display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                <Icon name={t.icon} size={21} color="var(--text-gold)"/>
              </div>
              <KitBadge tone="gold">{t.category}</KitBadge>
            </div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:700,margin:'0 0 8px',lineHeight:1.25}}>{t.title}</h3>
            <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 18px',flex:1}}>{t.summary}</p>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>{t.read}</span>
              <KitButton variant="outlineGold" size="sm" onClick={()=>setOpenTopic(t)} iconRight={<Icon name="arrow-right" size={14}/>}>Read lesson</KitButton>
            </div>
          </KitCard>
        ))}
      </div>
    </Container></Section>
  </React.Fragment>;
}

function LearningHubPage() {
  return <React.Fragment>
    <PageHero kicker="Free Learning Hub" title="Free forex education, built for beginners"
      lead="The Free Learning Hub is where aspiring traders start: clear, no-hype lessons on the exact concepts we use ourselves, entries, structure, and above all, risk. No account required, no charge, ever." />
    <Reveal>
      <LearningHubGrid />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{LearningHubPage});

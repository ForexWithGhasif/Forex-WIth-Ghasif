/* FWG, Performance, Pricing, Blog, Contact pages. */

/* ============================ PERFORMANCE ============================ */
function ResultsTable() {
  const rows=[
    ['June 2026','+612','79.1%','142','1:3.4','up'],
    ['May 2026','+548','77.4%','138','1:3.1','up'],
    ['April 2026','+421','75.9%','131','1:2.9','up'],
    ['March 2026','-86','71.2%','126','1:2.4','down'],
    ['February 2026','+503','78.6%','134','1:3.2','up'],
    ['January 2026','+477','76.8%','129','1:3.0','up'],
  ];
  return <Section style={{background:'var(--bg-elevated)'}}><Container>
    <Head kicker="Monthly breakdown" title="Every month, on the record"
      lead="We log losing months too, March 2026 included. Honest reporting is the only kind worth trusting." />
    <KitCard padding="0" style={{overflow:'hidden'}}>
      <div className="fwg-tablewrap">
      <div className="fwg-table" style={{display:'grid',gridTemplateColumns:'1.4fr 1fr 1fr 1fr 1fr',fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)'}}>
        {['Month','Net pips','Win rate','Trades','Avg R:R'].map((h,i)=>(
          <div key={h} style={{padding:'14px 18px',fontFamily:'var(--font-body)',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',textAlign:i===0?'left':'right'}}>{h}</div>
        ))}
        {rows.map((r,ri)=>(
          <React.Fragment key={r[0]}>
            <div style={{padding:'15px 18px',color:'var(--text-primary)',fontFamily:'var(--font-body)',fontWeight:600,borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r[0]}</div>
            <div style={{padding:'15px 18px',textAlign:'right',fontWeight:600,color:r[5]==='up'?'var(--bullish)':'var(--bearish)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r[5]==='up'?'+':''}{r[1].replace('+','')}{r[5]==='up'?'':''}</div>
            <div style={{padding:'15px 18px',textAlign:'right',color:'var(--text-secondary)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r[2]}</div>
            <div style={{padding:'15px 18px',textAlign:'right',color:'var(--text-secondary)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r[3]}</div>
            <div style={{padding:'15px 18px',textAlign:'right',color:'var(--text-secondary)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r[4]}</div>
          </React.Fragment>
        ))}
      </div>
      </div>
    </KitCard>
    <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',margin:'var(--space-5) auto 0',maxWidth:'64ch',lineHeight:1.6,textAlign:'center'}}>
      Figures reflect the model VIP account and are net of typical spreads. Past performance is not indicative of future results; individual results vary with execution and risk settings.
    </p>
  </Container></Section>;
}

function Transparency() {
  const t=[
    ['file-check','Every trade logged','Wins and losses are recorded, no deleting the bad ones, no cherry-picked screenshots.'],
    ['eye','Public reporting','Monthly figures are published openly so members and prospects see the same numbers we do.'],
    ['shield-alert','Honest risk language','We talk in terms of probabilities and risk-adjusted returns, never guarantees.'],
  ];
  return <Section><Container>
    <Head align="center" kicker="How we report" title="Transparency you can verify" />
    <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
      {t.map(([ic,h,d])=>(
        <KitCard key={h}>
          <Icon name={ic} size={24} color="var(--text-gold)" style={{marginBottom:'14px'}}/>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,margin:'0 0 8px'}}>{h}</h3>
          <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:0}}>{d}</p>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

function PerformancePage() {
  return <React.Fragment>
    <PageHero kicker="Performance" title="Numbers we publish, not promise"
      lead="A track record only matters if it’s honest. Here’s our model VIP account, wins, losses, and the risk discipline behind both." />
    <Reveal>
      <Performance />
      <ResultsTable />
      <Transparency />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ PRICING ============================ */
function ComparisonTable() {
  const feats=[
    ['Weekly market recap',true,true,true],
    ['Education library',true,true,true],
    ['Community access',true,true,true],
    ['Daily VIP signals',false,true,true],
    ['Full trade plans',false,true,true],
    ['Weekly live review',false,true,true],
    ['1:1 mentorship calls',false,false,true],
    ['Personal trade-plan reviews',false,false,true],
    ['Direct access to Ghasif',false,false,true],
  ];
  const cell=(v)=> v
    ? <Icon name="check" size={18} color="var(--bullish)"/>
    : <Icon name="minus" size={16} color="var(--text-muted)"/>;
  return <Section style={{background:'var(--bg-elevated)'}}><Container>
    <Head align="center" kicker="Compare plans" title="What’s included" />
    <KitCard padding="0" style={{overflow:'hidden'}}>
      <div className="fwg-tablewrap">
      <div style={{display:'grid',gridTemplateColumns:'1.6fr 1fr 1fr'}}>
        {['Feature','VIP','Mentorship'].map((h,i)=>(
          <div key={h} style={{padding:'16px 18px',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:700,
            color:i===2?'var(--text-gold)':'var(--text-primary)',borderBottom:'1px solid var(--border-default)',textAlign:i===0?'left':'center',
            background:i===2?'var(--accent-soft-bg)':'transparent'}}>{h}</div>
        ))}
        {feats.map((f,ri)=>(
          <React.Fragment key={f[0]}>
            <div style={{padding:'14px 18px',fontSize:'var(--text-sm)',color:'var(--text-secondary)',borderBottom:ri<feats.length-1?'1px solid var(--border-subtle)':'none'}}>{f[0]}</div>
            {[2,3].map(ci=>(
              <div key={ci} style={{padding:'14px 18px',display:'flex',justifyContent:'center',alignItems:'center',borderBottom:ri<feats.length-1?'1px solid var(--border-subtle)':'none',background:ci===3?'var(--accent-soft-bg)':'transparent'}}>{cell(f[ci])}</div>
            ))}
          </React.Fragment>
        ))}
      </div>
      </div>
    </KitCard>
  </Container></Section>;
}

function PricingPage() {
  return <React.Fragment>
    <PageHero kicker="Membership" title="Choose your edge"
      lead="Start free, upgrade when you’re ready. Month-to-month with no lock-in, we’d rather earn your membership every month." />
    <Reveal>
      <Pricing />
      <ComparisonTable />
      <FAQ />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ BLOG ============================ */
const ONE_PERCENT_ARTICLE = {
  category:'Risk management', read:'9 min read', date:'June 2026', author:'Ghasif',
  title:'The 1% Rule That Keeps You in the Game',
  img:'../../assets/img/blog-1percent.jpg',
  lead:'Most traders obsess over entries. The ones who last obsess over how much they can lose. Here is the single rule that has kept disciplined traders in the market long enough to actually win.',
  body:[
    ['h','What the 1% rule actually means'],
    ['p','The 1% rule is simple: never risk more than 1% of your trading account on a single trade. Not 1% of your position size, not 1% of your margin, 1% of your total capital. If your account is $10,000, your maximum loss on any one idea is $100. That is the line you do not cross, no matter how confident you feel.'],
    ['p','Notice what this rule is not about. It says nothing about your entry, your indicator, or your win rate. It is purely a survival mechanism, and survival is the thing almost every blown account had in common: the trader was right about direction often enough, but one or two oversized losses erased months of progress.'],
    ['h','Why survival beats being right'],
    ['p','Trading is a game of compounding, and compounding only works if you stay in the game. Consider two traders who both find a strong edge. Trader A risks 1% per trade. Trader B risks 10% because they want to get rich faster. A run of five losing trades, completely normal in any strategy, costs Trader A about 5% of capital. The same run costs Trader B nearly 41%, and to recover from a 41% drawdown they now need a 70% gain just to break even.'],
    ['quote','You do not lose because you are wrong. You lose because you are wrong while risking too much.'],
    ['h','The math of staying alive'],
    ['p','At 1% risk, surviving a brutal losing streak is almost trivial. Ten losses in a row, an event most strategies will never produce, still leaves roughly 90% of your capital intact. That means your edge gets the time it needs to express itself across hundreds of trades, which is the only horizon over which a real edge matters.'],
    ['list','Define risk in money, not pips, before you enter','Size the position so the stop-loss equals 1% of the account','Move on the moment the stop is hit, no negotiating','Never widen a stop to avoid being wrong'],
    ['h','How we apply it at Forex With Ghasif'],
    ['p','Every signal we publish includes a defined stop-loss, because without one there is no way to size a position responsibly. In mentorship, the first thing we build with a new trader is not a strategy, it is a personal risk plan: account size, per-trade risk, and the maximum drawdown that triggers a pause and review. Strategy is what you do when conditions are good. Risk management is what keeps you here when they are not.'],
    ['p','If you take one idea from this article, let it be this: protect your capital first, and let consistency do the slow, boring, reliable work of compounding. That is how traders stay in the game long enough to win it.'],
  ],
};

const BLOG_ARTICLES = [
  {
    category:'Psychology', read:'8 min', date:'June 2026', author:'Ghasif',
    title:'Trading the Plan, Not the Feeling',
    img:'../../assets/img/blog-plan.jpg',
    excerpt:'A framework for removing emotion when the market gets loud.',
    lead:'A trading plan is only useful if you follow it when it is hardest to follow. Here is how to build a plan that survives contact with a live, moving market.',
    body:[
      ['h','Why the plan breaks down in real time'],
      ['p','Every trader writes a plan when they are calm. Then the market moves, the candle spikes through their level, and the plan quietly gets renegotiated in real time. That renegotiation, not a bad strategy, is what actually erodes most accounts.'],
      ['p','The fix is not more discipline as a personality trait. It is removing the decision from the moment of maximum emotion, by deciding everything in advance: entry, stop, target, and the exact condition that invalidates the idea.'],
      ['h','Building a plan that holds'],
      ['p','A plan that survives pressure is specific enough that there is nothing left to decide once price starts moving. If your plan still requires judgment calls mid-trade, it is not finished yet.'],
      ['list','Write the entry, stop, and target before you click buy or sell','Define exactly what invalidates the idea, not just where price hurts','Decide your reaction to being stopped out before it happens','Review the plan after the trade closes, win or lose'],
      ['h','The feeling is data, not a signal'],
      ['p','Fear and excitement are useful information about your risk sizing, not instructions for what to do next. When a trade feels unbearable to watch, that is usually a sign the position is too large for the account, not a sign the trade is wrong.'],
    ],
  },
  {
    category:'Market structure', read:'7 min', date:'June 2026', author:'Ghasif',
    title:'Reading Liquidity Like the Banks Do',
    img:'../../assets/img/blog-liquidity.jpg',
    excerpt:'Spot where smart money is positioned, and why retail enters wrong.',
    lead:'Price does not move randomly between support and resistance. It moves toward the places where the most orders are sitting. Here is how to start reading the market that way.',
    body:[
      ['h','Liquidity is the real magnet'],
      ['p','Large participants cannot fill big orders without moving the market against themselves, so they look for pools of resting orders: stop-losses clustered above old highs, breakout entries clustered below old lows. Price is frequently drawn toward these pools before it reverses.'],
      ['p','This is why an obvious-looking breakout often fails immediately after triggering. The move was never about the breakout, it was about the liquidity sitting just beyond it.'],
      ['h','What to look for instead'],
      ['p','Rather than trading the first touch of an obvious level, watch what happens after price sweeps it. A sharp rejection back through the level, on a clear spike of momentum, tells you the liquidity has been taken and the real move may be starting in the opposite direction.'],
      ['quote','The crowd provides the liquidity. The structure tells you who is using it.'],
      ['h','Applying it without overcomplicating'],
      ['p','You do not need a complex theory to use this. Mark the obvious highs and lows everyone else can see, wait for a sweep beyond them, then look for confirmation before entering in the direction of the reversal. Patience at this step is what separates a structured entry from a guess.'],
    ],
  },
  {
    category:'Strategy', read:'6 min', date:'June 2026', author:'Ghasif',
    title:'Building a Repeatable Trading Routine',
    img:'../../assets/img/blog-routine.jpg',
    excerpt:'The daily process that turns random entries into consistent results.',
    lead:'Consistency is not a personality trait some traders are born with. It is the output of a routine that removes randomness from the day. Here is the structure we teach.',
    body:[
      ['h','Why routine beats motivation'],
      ['p','Motivation is unreliable; it is high after a win and low after a loss, which is exactly backwards from when discipline matters most. A routine you follow regardless of how the last trade went is what actually produces consistent results over time.'],
      ['h','The three sessions that matter'],
      ['list','Pre-market: review the economic calendar and mark key levels before price opens','In-session: trade only the setups defined in your plan, log every entry as it happens','Post-market: review every trade taken, win or lose, against the original plan'],
      ['p','Most traders only do the middle step. The review at the end of the day is where the actual improvement happens, because it is the only point where you can honestly compare what you planned against what you did.'],
      ['h','Keeping it sustainable'],
      ['p','A routine that takes three hours a day will not survive a busy week. Build the smallest version that still covers preparation, execution, and review, then protect that minimum every single trading day. Consistency compounds; intensity does not.'],
    ],
  },
  {
    category:'Risk management', read:'5 min', date:'June 2026', author:'Ghasif',
    title:'Drawdown: The Number That Matters Most',
    img:'../../assets/img/blog-drawdown.jpg',
    excerpt:'How to think about losing streaks before they happen to you.',
    lead:'Most traders track win rate. The number that actually determines whether you survive long enough to compound is maximum drawdown. Here is how to think about it before you are in one.',
    body:[
      ['h','Why drawdown, not win rate, decides survival'],
      ['p','A strategy with a 75% win rate can still blow up an account if the losses are oversized relative to the wins. A strategy with a 40% win rate can compound steadily for years if losses are kept small and consistent. Drawdown is the number that tells you which kind of trader you are.'],
      ['p','The math is unforgiving on the way back up: a 20% drawdown needs a 25% gain to recover, a 50% drawdown needs a 100% gain. The deeper the hole, the more disproportionate the climb out.'],
      ['h','Setting a drawdown limit before you need one'],
      ['p','Decide your maximum acceptable drawdown while you are calm and rational, not mid-losing-streak. A common, sustainable threshold is a pause-and-review trigger at 10% to 15% of account equity, well before the math turns against you.'],
      ['h','What to do when you hit the limit'],
      ['p','Stop trading new ideas, review every loss in the streak against your plan, and only resume once you can identify what, if anything, actually went wrong. Sometimes the answer is nothing, the streak was normal variance, and that is fine too.'],
    ],
  },
  {
    category:'News', read:'6 min', date:'June 2026', author:'Ghasif',
    title:'Trading High-Impact News Safely',
    img:'../../assets/img/blog-news.jpg',
    excerpt:'What economic releases actually mean for your open risk.',
    lead:'High-impact news events can move a pair further in one minute than it normally moves in a day. Here is how to manage that risk without simply avoiding the calendar altogether.',
    body:[
      ['h','What actually happens during a release'],
      ['p','In the seconds around a major release, spreads widen, slippage increases, and liquidity briefly thins out. Stop-losses can still trigger, but the price you get filled at may be meaningfully worse than the level you set. This is a structural feature of news events, not a broker problem.'],
      ['h','Managing risk around the calendar'],
      ['list','Know the high-impact releases for the pairs you trade before the week starts','Reduce position size or stand aside heading into events you are not trading specifically','If holding through news, size the position assuming your stop may slip','Never widen a stop during the event to avoid an early exit'],
      ['h','Trading the event on purpose'],
      ['p','If you do trade news deliberately, treat it as its own strategy with its own rules, not an extension of your normal setups. Wait for the initial spike and reaction to settle before entering, rather than trying to catch the first, most chaotic tick.'],
      ['p','The goal is not to avoid volatility, it is to make sure volatility never arrives as a surprise to your risk plan.'],
    ],
  },
  {
    category:'Psychology', read:'7 min', date:'June 2026', author:'Ghasif',
    title:'Why Most Traders Quit Too Early',
    img:'../../assets/img/blog-consistency.jpg',
    excerpt:'The consistency curve, and how to stay on it long enough to win.',
    lead:'Most traders do not fail because their edge does not work. They fail because they abandon a sound process before it has had enough trades to express itself. Here is the curve that explains why.',
    body:[
      ['h','The gap between effort and results'],
      ['p','A genuine edge does not show up evenly. It shows up as a noisy, uneven equity curve that only becomes clearly profitable over a large enough sample of trades. Early on, a sound strategy and a flawed one can look almost identical.'],
      ['p','Most traders quit, switch strategies, or start oversizing positions to "catch up" precisely during this noisy early period, before the edge has had room to express itself. That decision, not the strategy itself, is what causes the failure.'],
      ['h','What staying on the curve requires'],
      ['p','Staying in requires two things: risk small enough that a losing streak is financially survivable, and a sample size large enough to judge a strategy honestly, typically measured in hundreds of trades, not tens.'],
      ['quote','The traders who last are not the ones who never doubt the process. They are the ones who keep risk small enough to keep doubting it and still survive.'],
      ['h','A simple test before you change anything'],
      ['p','Before abandoning a strategy, ask whether you have actually given it a statistically meaningful sample at controlled risk. If the honest answer is no, the next step is not a new strategy, it is more disciplined repetition of the one you have.'],
    ],
  },
];

function ArticleModal({ article, onClose }) {
  React.useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prev; };
  },[onClose]);
  const block=(b,i)=>{
    const [type,...rest]=b;
    if(type==='h') return <h2 key={i} style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,letterSpacing:'-0.01em',color:'var(--text-primary)',margin:'34px 0 12px'}}>{rest[0]}</h2>;
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
        style={{position:'relative',width:'min(760px,100%)',background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',
          boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',overflow:'hidden',marginBottom:'48px'}}>
        <button onClick={onClose} aria-label="Close article"
          style={{position:'absolute',top:'16px',right:'16px',zIndex:3,width:'42px',height:'42px',borderRadius:'50%',cursor:'pointer',
            background:'rgba(10,12,17,0.6)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'var(--transition-base)'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-strong)';e.currentTarget.style.color='var(--text-primary)';}}>
          <Icon name="x" size={20}/>
        </button>
        <div style={{position:'relative',height:'clamp(180px,32vh,280px)'}}>
          <img src={article.img} alt={article.title} style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
          <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg, transparent 30%, var(--bg-elevated))'}}/>
        </div>
        <div style={{padding:'0 clamp(22px,5vw,52px) clamp(32px,5vw,52px)',marginTop:'-30px',position:'relative'}}>
          <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'16px',flexWrap:'wrap'}}>
            <KitBadge tone="solid">{article.category}</KitBadge>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>{article.read.includes('read')?article.read:`${article.read} read`}</span>
            <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>· {article.date}</span>
          </div>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',lineHeight:1.1,letterSpacing:'-0.02em',color:'var(--text-primary)',margin:'0 0 16px'}}>{article.title}</h1>
          <div style={{display:'flex',alignItems:'center',gap:'12px',paddingBottom:'22px',marginBottom:'8px',borderBottom:'1px solid var(--border-subtle)'}}>
            <div style={{width:'38px',height:'38px',borderRadius:'50%',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'#1a1405',fontWeight:800,fontFamily:'var(--font-display)'}}>{article.author[0]}</div>
            <div>
              <div style={{fontSize:'var(--text-sm)',fontWeight:700,color:'var(--text-primary)'}}>{article.author}</div>
              <div style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>Founder & Head Trader</div>
            </div>
          </div>
          <p style={{fontSize:'var(--text-lg)',lineHeight:1.6,color:'var(--text-primary)',fontWeight:500,margin:'16px 0 8px'}}>{article.lead}</p>
          {article.body.map(block)}
          <div style={{marginTop:'34px',paddingTop:'24px',borderTop:'1px solid var(--border-subtle)',display:'flex',flexWrap:'wrap',gap:'12px',alignItems:'center',justifyContent:'space-between'}}>
            <span style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>Want signals with this discipline built in?</span>
            <KitButton as="a" href="pricing.html" variant="primary" iconRight={<Icon name="arrow-up-right" size={16}/>}>Join VIP Signals</KitButton>
          </div>
        </div>
      </article>
    </div>
  );
}

function BlogIndex() {
  const cats=['All','Risk management','Psychology','Market structure','Strategy','News'];
  const featured=['Risk management','The 1% rule that keeps you in the game','Why position sizing, not entries, is the real difference between traders who last and those who blow up. A practical walkthrough of the math and the mindset.','9 min','../../assets/img/blog-1percent.jpg'];
  const posts=BLOG_ARTICLES;
  const [cat,setCat]=React.useState('All');
  const [openArticle,setOpenArticle]=React.useState(null);
  const shown=cat==='All'?posts:posts.filter(p=>p.category===cat);
  return <React.Fragment>
    {openArticle && <ArticleModal article={openArticle} onClose={()=>setOpenArticle(null)} />}
    <Section><Container>
      {/* featured */}
      <KitCard padding="0" interactive style={{overflow:'hidden',marginBottom:'var(--space-7)'}}>
        <div style={{display:'grid',gridTemplateColumns:'1.1fr 1fr',alignItems:'stretch'}} className="fwg-service-grid">
          <div style={{minHeight:'260px',position:'relative'}}>
            <img src={featured[4]} alt={featured[1]} decoding="async" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
            <div style={{position:'absolute',inset:0,background:'linear-gradient(90deg, transparent 55%, var(--surface-card-solid))'}} className="fwg-feat-fade"/>
          </div>
          <div style={{padding:'var(--space-7)',display:'flex',flexDirection:'column',justifyContent:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'14px'}}>
              <KitBadge tone="solid">Featured</KitBadge><KitBadge tone="gold">{featured[0]}</KitBadge>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>{featured[3]}</span>
            </div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-xl)',fontWeight:700,margin:'0 0 12px',lineHeight:1.2}}>{featured[1]}</h2>
            <p style={{fontSize:'var(--text-sm)',lineHeight:1.65,color:'var(--text-secondary)',margin:'0 0 18px',maxWidth:'48ch'}}>{featured[2]}</p>
            <div><KitButton variant="primary" onClick={()=>setOpenArticle(ONE_PERCENT_ARTICLE)} iconRight={<Icon name="arrow-right" size={15}/>}>Read article</KitButton></div>
          </div>
        </div>
      </KitCard>

      {/* category chips */}
      <div style={{display:'flex',gap:'8px',flexWrap:'wrap',marginBottom:'var(--space-6)'}}>
        {cats.map(c=>{
          const on=c===cat;
          return <button key={c} onClick={()=>setCat(c)} style={{padding:'7px 15px',borderRadius:'var(--radius-pill)',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:600,
            border:`1px solid ${on?'var(--border-gold)':'var(--border-default)'}`,background:on?'var(--accent-soft-bg)':'transparent',color:on?'var(--text-gold)':'var(--text-secondary)',transition:'var(--transition-base)'}}>{c}</button>;
        })}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
        {shown.map(a=>(
          <KitCard key={a.title} interactive padding="0" onClick={()=>setOpenArticle(a)} style={{overflow:'hidden',cursor:'pointer'}}>
            <div style={{height:'150px',position:'relative',borderBottom:'1px solid var(--border-subtle)'}}>
              <LazyImg src={a.img} alt={a.title} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>
            </div>
            <div style={{padding:'20px'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'12px'}}>
                <KitBadge tone="gold">{a.category}</KitBadge>
                <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',fontFamily:'var(--font-mono)'}}>{a.read}</span>
              </div>
              <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600,margin:'0 0 8px',lineHeight:1.25}}>{a.title}</h3>
              <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 16px'}}>{a.excerpt}</p>
              <KitButton variant="outlineGold" size="sm" onClick={()=>setOpenArticle(a)} iconRight={<Icon name="arrow-right" size={14}/>}>Read Article</KitButton>
            </div>
          </KitCard>
        ))}
      </div>
    </Container></Section>
  </React.Fragment>;
}

function BlogPage() {
  return <React.Fragment>
    <PageHero kicker="Insights" title="The Forex With Ghasif blog"
      lead="Education-first articles on risk, psychology, and market structure, written to sharpen your edge, not sell you a dream." />
    <Reveal>
      <BlogIndex />
      <CTASection />
    </Reveal>
  </React.Fragment>;
}

/* ============================ CONTACT ============================ */
/* Premium custom dropdown, keyboard + click-outside aware. */
function FancySelect({ value, onChange, options, icon='target' }) {
  const [open,setOpen]=React.useState(false);
  const [active,setActive]=React.useState(Math.max(0,options.indexOf(value)));
  const ref=React.useRef(null);
  React.useEffect(()=>{
    const onDoc=(e)=>{ if(ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown',onDoc);
    return ()=>document.removeEventListener('mousedown',onDoc);
  },[]);
  const choose=(o)=>{ onChange(o); setOpen(false); };
  const onKey=(e)=>{
    if(e.key==='ArrowDown'){e.preventDefault(); setOpen(true); setActive(a=>Math.min(options.length-1,a+1));}
    else if(e.key==='ArrowUp'){e.preventDefault(); setActive(a=>Math.max(0,a-1));}
    else if(e.key==='Enter'||e.key===' '){e.preventDefault(); if(open) choose(options[active]); else setOpen(true);}
    else if(e.key==='Escape'){setOpen(false);}
  };
  return (
    <div ref={ref} style={{position:'relative'}}>
      <button type="button" role="combobox" aria-expanded={open} aria-haspopup="listbox" onClick={()=>setOpen(o=>!o)} onKeyDown={onKey}
        style={{width:'100%',display:'flex',alignItems:'center',gap:'12px',cursor:'pointer',textAlign:'left',
          background:'var(--surface-inset)',border:`1px solid ${open?'var(--border-gold)':'var(--border-default)'}`,borderRadius:'var(--radius-md)',
          padding:'13px 14px',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)',
          boxShadow:open?'0 0 0 3px var(--accent-soft-bg)':'none',transition:'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'}}>
        <Icon name={icon} size={17} color="var(--text-gold)"/>
        <span style={{flex:1}}>{value}</span>
        <span style={{display:'inline-flex',transform:open?'rotate(180deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-tertiary)'}}>
          <Icon name="chevron-down" size={18}/>
        </span>
      </button>
      {open && (
        <ul role="listbox" className="fwg-dropdown-menu"
          style={{position:'absolute',top:'calc(100% + 8px)',left:0,right:0,zIndex:20,listStyle:'none',margin:0,padding:'6px',
            background:'var(--surface-glass)',backdropFilter:'blur(var(--blur-md))',WebkitBackdropFilter:'blur(var(--blur-md))',
            border:'1px solid var(--border-strong)',borderRadius:'var(--radius-md)',boxShadow:'var(--shadow-lg)'}}>
          {options.map((o,i)=>{
            const sel=o===value, hot=i===active;
            return <li key={o} role="option" aria-selected={sel}
              onMouseEnter={()=>setActive(i)} onClick={()=>choose(o)}
              style={{display:'flex',alignItems:'center',gap:'10px',padding:'11px 12px',borderRadius:'var(--radius-sm)',cursor:'pointer',
                fontSize:'var(--text-sm)',fontWeight:sel?700:500,color:sel?'var(--text-gold)':'var(--text-secondary)',
                background:hot?'var(--surface-hover)':'transparent',transition:'background var(--dur-fast) var(--ease-out)'}}>
              <span style={{width:'16px',display:'inline-flex',justifyContent:'center',color:'var(--text-gold)'}}>{sel && <Icon name="check" size={15}/>}</span>
              <span>{o}</span>
            </li>;
          })}
        </ul>
      )}
    </div>
  );
}

/* Searchable international phone input: country-code selector + number field.
   Matches the form's input styling, radius, and gold focus treatment. */
function PhoneInput({ value, onChange, country, onCountry, required }) {
  const all = (typeof window!=='undefined' && window.FWG_COUNTRIES) || [];
  const [open,setOpen]=React.useState(false);
  const [q,setQ]=React.useState('');
  const [focus,setFocus]=React.useState(false);
  const ref=React.useRef(null);
  const searchRef=React.useRef(null);
  React.useEffect(()=>{
    const onDoc=(e)=>{ if(ref.current && !ref.current.contains(e.target)){ setOpen(false); setQ(''); } };
    document.addEventListener('mousedown',onDoc);
    return ()=>document.removeEventListener('mousedown',onDoc);
  },[]);
  React.useEffect(()=>{ if(open && searchRef.current) searchRef.current.focus(); },[open]);
  const sel = country || all[0] || {dial:'1',flag:'🇺🇸',iso:'US',name:'United States'};
  const filtered = !q ? all : all.filter(c=>{
    const s=q.toLowerCase().replace(/^\+/,'');
    return c.name.toLowerCase().includes(s) || c.dial.includes(s) || c.iso.toLowerCase()===s;
  });
  const pick=(c)=>{ onCountry(c); setOpen(false); setQ(''); };
  return (
    <div ref={ref} style={{position:'relative'}}>
      <div style={{display:'flex',alignItems:'stretch',gap:'8px',
        background:'var(--surface-inset)',border:`1px solid ${focus||open?'var(--border-gold)':'var(--border-default)'}`,borderRadius:'var(--radius-md)',
        boxShadow:focus||open?'0 0 0 3px var(--accent-soft-bg)':'none',transition:'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'}}>
        <button type="button" aria-label="Select country code" aria-expanded={open} onClick={()=>setOpen(o=>!o)}
          style={{display:'inline-flex',alignItems:'center',gap:'8px',cursor:'pointer',background:'transparent',border:'none',
            borderRight:'1px solid var(--border-default)',padding:'13px 12px',color:'var(--text-primary)',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',flexShrink:0}}>
          <span style={{fontSize:'16px',lineHeight:1}}>{sel.flag}</span>
          <span style={{fontFamily:'var(--font-mono)',fontWeight:600}}>+{sel.dial}</span>
          <span style={{display:'inline-flex',transform:open?'rotate(180deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-tertiary)'}}>
            <Icon name="chevron-down" size={15}/>
          </span>
        </button>
        <input required={required} type="tel" inputMode="tel" placeholder="Phone number" value={value}
          onChange={(e)=>onChange(e.target.value.replace(/[^0-9\s\-()]/g,''))}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{flex:1,minWidth:0,background:'transparent',border:'none',outline:'none',padding:'13px 14px 13px 2px',
            fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)'}}/>
      </div>
      {open && (
        <div className="fwg-dropdown-menu"
          style={{position:'absolute',top:'calc(100% + 8px)',left:0,zIndex:30,width:'min(340px, 90vw)',
            background:'var(--surface-glass)',backdropFilter:'blur(var(--blur-md))',WebkitBackdropFilter:'blur(var(--blur-md))',
            border:'1px solid var(--border-strong)',borderRadius:'var(--radius-md)',boxShadow:'var(--shadow-lg)',overflow:'hidden'}}>
          <div style={{padding:'8px',borderBottom:'1px solid var(--border-subtle)'}}>
            <div style={{display:'flex',alignItems:'center',gap:'8px',padding:'0 10px',background:'var(--surface-inset)',border:'1px solid var(--border-default)',borderRadius:'var(--radius-sm)'}}>
              <Icon name="search" size={15} color="var(--text-tertiary)"/>
              <input ref={searchRef} value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search country or code"
                style={{flex:1,minWidth:0,background:'transparent',border:'none',outline:'none',padding:'9px 0',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)'}}/>
            </div>
          </div>
          <ul role="listbox" style={{listStyle:'none',margin:0,padding:'6px',maxHeight:'260px',overflowY:'auto'}}>
            {filtered.length===0 && <li style={{padding:'14px',textAlign:'center',color:'var(--text-muted)',fontSize:'var(--text-sm)'}}>No matches</li>}
            {filtered.map(c=>{
              const on=c.iso===sel.iso;
              return <li key={c.iso} role="option" aria-selected={on} onClick={()=>pick(c)}
                style={{display:'flex',alignItems:'center',gap:'10px',padding:'10px 11px',borderRadius:'var(--radius-sm)',cursor:'pointer',
                  background:on?'var(--accent-soft-bg)':'transparent',transition:'background var(--dur-fast) var(--ease-out)'}}
                onMouseEnter={e=>{if(!on)e.currentTarget.style.background='var(--surface-hover)';}}
                onMouseLeave={e=>{if(!on)e.currentTarget.style.background='transparent';}}>
                <span style={{fontSize:'17px',lineHeight:1,flexShrink:0}}>{c.flag}</span>
                <span style={{flex:1,fontSize:'var(--text-sm)',color:on?'var(--text-gold)':'var(--text-secondary)',fontWeight:on?700:500,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.name}</span>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-tertiary)',flexShrink:0}}>+{c.dial}</span>
              </li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

function ContactForm() {
  const [sent,setSent]=React.useState(false);
  const [f,setF]=React.useState({name:'',email:'',phone:'',topic:'VIP Signals',message:''});
  const [country,setCountry]=React.useState(null);
  const fld=(k)=>({value:f[k],onChange:(e)=>setF(s=>({...s,[k]:e.target.value}))});
  const inputStyle={width:'100%',background:'var(--surface-inset)',border:'1px solid var(--border-default)',borderRadius:'var(--radius-md)',padding:'13px 14px',
    fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',color:'var(--text-primary)',outline:'none'};
  const lab={fontSize:'var(--text-xs)',fontWeight:600,letterSpacing:'var(--ls-wide)',textTransform:'uppercase',color:'var(--text-tertiary)',marginBottom:'8px',display:'block'};

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res=await fetch(`${window.FWG_API_BASE}/api/contact`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(f),
      });
      const data=await res.json().catch(()=>({}));
      if(!res.ok || !data.success){
        console.error('Contact form submission failed:',data.message||res.statusText);
        return;
      }
      setSent(true);
    }catch(err){
      console.error('Contact form submission failed:',err);
    }
  };

  return <KitCard>
    {sent ? (
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',textAlign:'center',padding:'30px 10px',gap:'14px'}}>
        <div style={{width:'56px',height:'56px',borderRadius:'50%',background:'var(--bullish-bg)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}><Icon name="check" size={28} color="var(--bullish)"/></div>
        <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-lg)',fontWeight:600,margin:0}}>Message sent</h3>
        <p style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',margin:0,maxWidth:'36ch'}}>Thanks, we’ll get back to you within one business day.</p>
        <KitButton variant="secondary" onClick={()=>setSent(false)}>Send another</KitButton>
      </div>
    ) : (
      <form onSubmit={handleSubmit} style={{display:'flex',flexDirection:'column',gap:'18px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="fwg-grid-2">
          <div><label style={lab}>Name</label><input required placeholder="Your name" style={inputStyle} {...fld('name')}/></div>
          <div><label style={lab}>Email</label><input required type="email" placeholder="you@email.com" style={inputStyle} {...fld('email')}/></div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="fwg-grid-2">
          <div><label style={lab}>Phone number</label>
            <PhoneInput required value={f.phone} onChange={(v)=>setF(s=>({...s,phone:v}))} country={country} onCountry={setCountry} />
          </div>
          <div><label style={lab}>I’m interested in</label>
            <FancySelect value={f.topic} onChange={(v)=>setF(s=>({...s,topic:v}))}
              options={['VIP Signals','Mentorship','Market Analysis','General enquiry']} />
          </div>
        </div>
        <div><label style={lab}>Message</label><textarea required rows={5} placeholder="Tell us a little about your trading and what you’re looking for…" style={{...inputStyle,resize:'vertical'}} {...fld('message')}/></div>
        <KitButton as="button" type="submit" variant="primary" size="lg" iconRight={<Icon name="send" size={17}/>}>Send message</KitButton>
      </form>
    )}
  </KitCard>;
}

function ContactPage() {
  const channels=[
    ['mail','Email','mirzaghasif111@gmail.com','For general enquiries & partnerships','mailto:mirzaghasif111@gmail.com'],
    ['instagram','Instagram','@forexwithghasif','Fastest way to reach the team',(window.FWG_SOCIAL||{}).instagram],
    ['message-circle','WhatsApp','Message us directly','Members get priority support',(window.FWG_SOCIAL||{}).whatsapp],
  ];
  const socials=[['instagram','Instagram'],['facebook','Facebook'],['whatsapp','WhatsApp']];
  return <React.Fragment>
    <PageHero kicker="Contact" title="Let’s talk trading"
      lead="Questions about VIP Signals or mentorship? Reach out, we usually reply within one business day." />
    <Reveal>
      <Section><Container>
        <div style={{display:'grid',gridTemplateColumns:'1.1fr 0.9fr',gap:'var(--space-8)',alignItems:'start'}} className="fwg-hero-grid">
          <ContactForm />
          <div style={{display:'flex',flexDirection:'column',gap:'14px'}}>
            {channels.map(([ic,t,v,d,href])=>(
              <a key={t} href={href} target={href&&href.startsWith('http')?'_blank':undefined} rel={href&&href.startsWith('http')?'noopener noreferrer':undefined} style={{display:'block',textDecoration:'none'}}>
              <KitCard interactive padding="20px">
                <div style={{display:'flex',gap:'16px',alignItems:'center'}}>
                  <div style={{width:'46px',height:'46px',flexShrink:0,borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                    <Icon name={ic} size={20} color="var(--text-gold)"/>
                  </div>
                  <div>
                    <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'3px'}}>{t}</div>
                    <div style={{fontFamily:'var(--font-body)',fontSize:'var(--text-md)',fontWeight:600,color:'var(--text-primary)'}}>{v}</div>
                    <div style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)',marginTop:'2px'}}>{d}</div>
                  </div>
                </div>
              </KitCard>
              </a>
            ))}
            <KitCard padding="20px">
              <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'14px'}}>Follow us</div>
              <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                {socials.map(([ic,l])=>(
                  <a key={l} href={(window.FWG_SOCIAL||{})[ic]||'#'} target="_blank" rel="noopener noreferrer" aria-label={l} style={{width:'42px',height:'42px',borderRadius:'var(--radius-md)',background:'var(--surface-card)',border:'1px solid var(--border-default)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'var(--text-secondary)',transition:'var(--transition-base)'}}
                    onMouseEnter={e=>{e.currentTarget.style.color='var(--text-gold)';e.currentTarget.style.borderColor='var(--border-gold)';}}
                    onMouseLeave={e=>{e.currentTarget.style.color='var(--text-secondary)';e.currentTarget.style.borderColor='var(--border-default)';}}>
                    <SocialGlyph name={ic} size={18}/></a>
                ))}
              </div>
              <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',margin:'16px 0 0',lineHeight:1.6}}>
                Risk warning: trading forex carries a high level of risk. Never trade with money you cannot afford to lose.
              </p>
            </KitCard>
          </div>
        </div>
      </Container></Section>
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{PerformancePage,PricingPage,BlogPage,ContactPage});

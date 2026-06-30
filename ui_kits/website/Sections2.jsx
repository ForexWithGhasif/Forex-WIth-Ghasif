/* FWG, proof, conversion & closing sections. */

function Performance() {
  const stats=[['78.4%','Avg win rate','+2.1% MoM','up'],['+612','Pips · last 30 days','best month yet','up'],['1 : 3.2','Avg reward-to-risk','disciplined sizing','up'],['4.1%','Max drawdown','risk controlled','down']];
  return <Section id="results"><Container>
    <Head kicker="Performance & results" title="Numbers we publish, not promise"
      lead="A track record only matters if it’s honest. We log every trade, the losers included, and report the figures that actually reflect risk-adjusted consistency." />
    <div style={{display:'grid',gridTemplateColumns:'1.2fr 0.8fr',gap:'18px',alignItems:'stretch'}} className="fwg-hero-grid">
      <KitCard padding="0" style={{overflow:'hidden'}}>
        <div style={{padding:'20px 22px',borderBottom:'1px solid var(--border-subtle)',display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
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
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
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

function Testimonials() {
  const t=[
    ['I came in blowing accounts. Eight months later I’m green and, more importantly, calm. The risk framework changed everything.','Daniel R.','VIP member · 8 months'],
    ['Ghasif actually teaches. Every signal explains the “why”, so I’m finally building my own read of the market instead of copying blindly.','Aisha M.','Mentorship · 1 year'],
    ['The transparency sold me. They post the losses too. That honesty is rare in this space and it’s why I trust the calls.','Marcus L.','VIP member · 5 months'],
    ['Went from random entries to a repeatable plan. My drawdowns are smaller and my confidence is higher. Worth every penny.','Priya S.','Mentorship · 6 months'],
  ];
  return <Section id="testimonials" style={{background:'var(--bg-elevated)'}}><Container>
    <Head align="center" kicker="Student results" title="Traders who found consistency"
      lead="Real members, real progress, built on discipline and education, not overnight miracles." />
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'18px'}} className="fwg-grid-2">
      {t.map(([q,n,r])=>(
        <KitCard key={n} interactive>
          <div style={{display:'flex',gap:'3px',marginBottom:'14px'}}>
            {[0,1,2,3,4].map(i=><Icon key={i} name="star" size={15} color="var(--text-gold)" strokeWidth={0}/>)}
          </div>
          <p style={{fontSize:'var(--text-md)',lineHeight:1.6,color:'var(--text-primary)',margin:'0 0 18px',fontWeight:500}}>“{q}”</p>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <div style={{width:'40px',height:'40px',borderRadius:'50%',background:'var(--grad-gold-soft)',display:'inline-flex',alignItems:'center',justifyContent:'center',color:'#1a1405',fontWeight:800,fontFamily:'var(--font-display)'}}>{n[0]}</div>
            <div>
              <div style={{fontSize:'var(--text-sm)',fontWeight:700}}>{n}</div>
              <div style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>{r}</div>
            </div>
          </div>
        </KitCard>
      ))}
    </div>
  </Container></Section>;
}

function Pricing() {
  const plans=[
    {name:'VIP Signals',price:'Free',period:'',blurb:'Daily signals with full trade plans.',features:['3-5 signals daily','Entry, stop & target on every call','Private Instagram & app alerts','Weekly live market review','Gold, indices & major pairs'],cta:'Join VIP',href:'/contact',featured:true},
    {name:'Mentorship',price:'$20',blurb:'1:1 coaching to consistency.',features:['Everything in VIP','2× monthly 1:1 calls','Personal trade-plan reviews','Direct access to Ghasif','Custom risk framework'],highlights:['Forex Trading Mentorship','Complete Masterclass Course','Premium Trading Signals'],cta:'Apply now',href:'/contact',variant:'outlineGold'},
  ];
  return <Section id="pricing"><Container>
    <Head align="center" kicker="Plans" title="Simple, honest pricing"
      lead="Start free, upgrade when you’re ready. Cancel anytime, we’d rather earn your membership every month." />
    <div style={{display:'grid',gridTemplateColumns:'repeat(2, minmax(0, 380px))',gap:'18px',alignItems:'stretch',marginTop:'12px',justifyContent:'center'}} className="fwg-grid-2">
      {plans.map(p=>(
        <div key={p.name} style={{position:'relative',display:'flex',flexDirection:'column',gap:'20px',padding:'var(--space-6)',borderRadius:'var(--radius-xl)',
          background:p.featured?'linear-gradient(180deg, rgba(214,175,67,0.08), var(--surface-card))':'var(--surface-card)',
          border:`1px solid ${p.featured?'var(--border-gold)':'var(--border-default)'}`,
          boxShadow:p.featured?'var(--glow-gold-sm), var(--shadow-card)':'var(--shadow-card)'}}>
          {p.featured&&<span style={{position:'absolute',top:'-12px',left:'50%',transform:'translateX(-50%)'}}><KitBadge tone="solid">Most popular</KitBadge></span>}
          <div>
            <div style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'var(--ls-wider)',textTransform:'uppercase',color:'var(--text-gold)',marginBottom:'6px'}}>{p.name}</div>
            <div style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',lineHeight:1.5}}>{p.blurb}</div>
          </div>
          <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
            <span style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',letterSpacing:'-0.02em'}}>{p.price}</span>
            {p.period!==''&&<span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-tertiary)'}}>{p.period||'/mo'}</span>}
          </div>
          <div style={{height:'1px',background:'var(--border-subtle)'}}/>
          <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'12px',flex:p.highlights?'0 0 auto':1}}>
            {p.features.map(f=>(<li key={f} style={{display:'flex',gap:'10px',alignItems:'flex-start',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
              <span style={{flexShrink:0,width:'18px',height:'18px',borderRadius:'50%',background:'var(--accent-soft-bg)',color:'var(--text-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,marginTop:'1px'}}>✓</span>
              <span style={{lineHeight:1.5}}>{f}</span></li>))}
          </ul>
          {p.highlights&&(
            <div style={{flex:1,marginTop:'2px',padding:'16px',borderRadius:'var(--radius-lg)',background:'linear-gradient(180deg, rgba(214,175,67,0.10), rgba(214,175,67,0.02))',border:'1px solid var(--border-gold)',boxShadow:'var(--inset-gold-hi)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'7px',marginBottom:'12px'}}>
                <Icon name="gem" size={14} color="var(--text-gold)"/>
                <span style={{fontSize:'var(--text-2xs)',fontWeight:700,letterSpacing:'var(--ls-wider)',textTransform:'uppercase',color:'var(--text-gold)'}}>Premium inclusions</span>
              </div>
              <ul style={{listStyle:'none',margin:0,padding:0,display:'flex',flexDirection:'column',gap:'11px'}}>
                {p.highlights.map(h=>(<li key={h} style={{display:'flex',gap:'10px',alignItems:'center',fontSize:'var(--text-sm)',fontWeight:600,color:'var(--text-primary)'}}>
                  <Icon name="check" size={15} color="var(--text-gold)" style={{flexShrink:0}}/>
                  <span style={{lineHeight:1.4}}>{h}</span></li>))}
              </ul>
            </div>
          )}
          <KitButton as="a" href={p.href||'/contact'} variant={p.featured?'primary':(p.variant||'secondary')} fullWidth>{p.cta}</KitButton>
        </div>
      ))}
    </div>
    <p style={{textAlign:'center',fontSize:'var(--text-xs)',color:'var(--text-muted)',marginTop:'var(--space-6)',maxWidth:'60ch',marginInline:'auto',lineHeight:1.6}}>
      Trading foreign exchange carries substantial risk and is not suitable for every investor. Past performance is not indicative of future results.
    </p>
  </Container></Section>;
}

function FAQ() {
  const qs=[
    ['Do you guarantee profits?','No, and you should run from anyone who does. We provide education, signals, and a disciplined framework. Markets carry real risk; our job is to put the odds and the process on your side.'],
    ['Do I need any experience to start?','Not at all. Our free VIP tier and Foundations material assume zero background. Many members join knowing nothing and build up step by step.'],
    ['How much money do I need to begin?','You can start learning with any amount, even on a demo account. For live trading we teach you to risk a small, fixed percentage per trade, so your capital decides position size, not the other way around.'],
    ['How are the signals delivered?','In real time through our private WhatsApp Community, each signal with entry, stop-loss, take-profit, and the reasoning behind the trade.'],
    ['Which broker or platform do I need?','Any reputable broker with major forex pairs and gold works. We give general guidance on choosing one, but you keep full control of your own funds and account.'],
    ['How much time does this take each day?','Most members spend 30 to 60 minutes a day. Signals and analysis are delivered ready to act on, and the live sessions are recorded so you can catch up any time.'],
    ['What markets do you cover?','Major and minor forex pairs, gold (XAU/USD), and select indices. We focus on liquid markets with clean, readable structure.'],
    ['Is the mentorship really 1:1?','Yes. The Mentorship tier includes private calls and personalised trade-plan reviews directly with Ghasif and senior mentors.'],
    ['Can I cancel anytime, and how do I join?','Memberships are month to month with no lock-in. To join, pick a plan on the Pricing page or message us on Instagram and we will get you set up.'],
  ];
  const [open,setOpen]=React.useState(-1);
  return <Section id="faq"><Container style={{maxWidth:'var(--container-md)'}}>
    <Head align="center" kicker="FAQ" title="Questions, answered honestly" />
    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
      {qs.map(([q,a],i)=>{
        const isOpen=open===i;
        return <div key={i} style={{borderRadius:'var(--radius-lg)',background:'var(--surface-card)',border:`1px solid ${isOpen?'var(--border-gold)':'var(--border-default)'}`,overflow:'hidden',transition:'border-color var(--dur-base) var(--ease-out)'}}>
          <button onClick={()=>setOpen(isOpen?-1:i)} style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'16px',padding:'18px 22px',background:'transparent',border:'none',cursor:'pointer',textAlign:'left',color:'var(--text-primary)',fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:600}}>
            {q}
            <span style={{flexShrink:0,transform:isOpen?'rotate(45deg)':'rotate(0)',transition:'transform var(--dur-base) var(--ease-out)',color:'var(--text-gold)'}}><Icon name="plus" size={20}/></span>
          </button>
          <div style={{maxHeight:isOpen?'400px':'0',overflow:'hidden',transition:'max-height var(--dur-slow) var(--ease-out)'}}>
            <p style={{padding:'0 22px 20px',margin:0,fontSize:'var(--text-sm)',lineHeight:1.7,color:'var(--text-secondary)'}}>{a}</p>
          </div>
        </div>;
      })}
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

function CTASection() {
  return <Section id="join"><Container>
    <div style={{position:'relative',overflow:'hidden',borderRadius:'var(--radius-2xl)',padding:'var(--space-10) var(--gutter)',
      background:'linear-gradient(135deg, var(--ink-850), var(--ink-900))',border:'1px solid var(--border-gold)',textAlign:'center',boxShadow:'var(--glow-gold-md), var(--shadow-xl)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--glow-gold)',pointerEvents:'none'}}/>
      <div style={{position:'relative',maxWidth:'640px',margin:'0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'20px'}}>
        <KitKicker>Your edge starts now</KitKicker>
        <h2 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-3xl)',lineHeight:1.05,letterSpacing:'var(--ls-tight)',margin:0}}>
          Stop gambling. Start <span className="fwg-gold-text">trading with a system.</span>
        </h2>
        <p style={{fontSize:'var(--text-md)',lineHeight:1.65,color:'var(--text-secondary)',margin:0,maxWidth:'48ch'}}>
          Join 15+ traders building real, repeatable consistency with Forex With Ghasif. Start free, upgrade when you’re ready.
        </p>
        <div style={{display:'flex',gap:'12px',flexWrap:'wrap',justifyContent:'center',marginTop:'4px'}}>
          <KitButton as="a" href="/pricing" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>Join VIP Signals</KitButton>
          <KitButton as="a" href="/contact" variant="secondary" size="lg" iconLeft={<Icon name="calendar" size={18}/>}>Book a mentorship call</KitButton>
        </div>
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
    ['Trading',[['VIP Signals','/services'],['Market Analysis','/services'],['Performance','/performance'],['Trading Blog','/blog']]],
    ['Learn',[['Mentorship','/services'],['Risk Management','/services'],['Community','/services'],['Free Resources','/blog']]],
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
        <div>
          <form onSubmit={handleSubscribe} style={{display:'flex',alignItems:'center',gap:'8px',padding:'5px 6px 5px 16px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:`1px solid ${focus?'var(--border-gold)':'var(--border-default)'}`,minWidth:'320px',boxShadow:focus?'0 0 0 3px var(--accent-soft-bg)':'none',transition:'border-color var(--dur-fast), box-shadow var(--dur-fast)'}}>
            <Icon name="mail" size={17} color="var(--text-tertiary)"/>
            <input value={email} onChange={e=>setEmail(e.target.value)} onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)} placeholder="you@email.com" type="email" disabled={subscribing} required
              style={{flex:1,minWidth:0,background:'transparent',border:'none',outline:'none',color:'var(--text-primary)',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',padding:'10px 0'}}/>
            <KitButton as="button" type="submit" variant="primary" size="sm" disabled={subscribing}>Subscribe</KitButton>
          </form>
          {status&&<div style={{fontSize:'var(--text-xs)',marginTop:'8px',color:status.type==='success'?'var(--bullish)':'var(--bearish)'}}>{status.text}</div>}
        </div>
      </div>

      <div style={{padding:'var(--space-6) 0',display:'flex',justifyContent:'space-between',alignItems:'center',gap:'16px',flexWrap:'wrap'}}>
        <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>© 2026 Forex With Ghasif. All rights reserved.</span>
        <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',maxWidth:'62ch',lineHeight:1.6,textAlign:'right'}}>
          Risk warning: Trading forex and CFDs carries a high level of risk and may not be suitable for all investors. Never trade with money you cannot afford to lose.
        </span>
      </div>
    </Container>
  </footer>;
}

Object.assign(window,{Performance,Testimonials,Pricing,FAQ,Blog,CTASection,Footer});

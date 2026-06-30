/* FWG, hero with value prop, CTAs, trust strip + floating dashboard. */
const HERO_TICKS_FALLBACK=[
  {pair:'EUR/USD',price:'1.1410',chg:'+0.18%',dir:'up'},
  {pair:'GBP/USD',price:'1.3245',chg:'-0.12%',dir:'down'},
  {pair:'XAU/USD',price:'4,089.26',chg:'+1.54%',dir:'up'},
  {pair:'USD/JPY',price:'161.52',chg:'+0.21%',dir:'up'},
  {pair:'GBP/JPY',price:'213.94',chg:'-0.08%',dir:'down'},
  {pair:'AUD/USD',price:'0.6512',chg:'+0.24%',dir:'up'},
];

function Hero() {
  const ticks=useLiveTicks(HERO_TICKS_FALLBACK);
  return (
    <section id="top" style={{position:'relative',overflow:'hidden',padding:'calc(var(--space-9) + 20px) var(--gutter) var(--space-10)'}}>
      <div style={{position:'absolute',inset:0,background:'var(--hero-glow)',pointerEvents:'none'}}/>
      <div style={{position:'absolute',inset:0,backgroundImage:'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',backgroundSize:'64px 64px',maskImage:'radial-gradient(70% 60% at 50% 30%, #000, transparent 80%)',WebkitMaskImage:'radial-gradient(70% 60% at 50% 30%, #000, transparent 80%)',opacity:0.5,pointerEvents:'none'}}/>
      <div style={{position:'relative',maxWidth:'var(--container-xl)',margin:'0 auto',display:'grid',gridTemplateColumns:'1.05fr 0.95fr',gap:'var(--space-8)',alignItems:'center'}} className="fwg-hero-grid">
        <div style={{display:'flex',flexDirection:'column',gap:'var(--space-5)',maxWidth:'600px'}}>
          <KitBadge tone="gold" dot>Premium forex education &amp; signals</KitBadge>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-4xl)',lineHeight:1.02,letterSpacing:'var(--ls-tighter)',margin:0}}>
            Trade with <span className="fwg-gold-text">conviction</span>, not luck.
          </h1>
          <p style={{fontSize:'var(--text-md)',lineHeight:1.6,color:'var(--text-secondary)',margin:0,maxWidth:'52ch'}}>
            Institutional-grade signals, live market breakdowns, and 1:1 mentorship, built to make you a consistent trader, not a gambler.
          </p>
          <div style={{display:'flex',gap:'12px',flexWrap:'wrap',marginTop:'4px'}}>
            <KitButton as="a" href="/pricing" variant="primary" size="lg" iconRight={<Icon name="arrow-up-right" size={18}/>}>Join VIP Signals</KitButton>
            <KitButton as="a" href="/performance" variant="secondary" size="lg" iconLeft={<Icon name="line-chart" size={18}/>}>See the track record</KitButton>
          </div>
          <div style={{display:'flex',gap:'var(--space-7)',marginTop:'var(--space-4)',flexWrap:'wrap'}}>
            <KitStat value="78.4%" label="Avg win rate" />
            <KitStat value="15+" label="Active members" />
            <KitStat value="+612" label="Pips · 30 days" direction="up" />
          </div>
        </div>

        {/* floating dashboard */}
        <div style={{position:'relative'}}>
          <KitCard padding="0" style={{overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'16px 18px',borderBottom:'1px solid var(--border-subtle)'}}>
              <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
                <KitBadge tone="bull" dot>Live</KitBadge>
                <span style={{fontFamily:'var(--font-body)',fontWeight:700,fontSize:'var(--text-sm)'}}>Signal performance</span>
              </div>
              <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>30D</span>
            </div>
            <div style={{padding:'18px'}}>
              <div style={{display:'flex',alignItems:'baseline',gap:'12px',marginBottom:'12px'}}>
                <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-2xl)',fontWeight:600,letterSpacing:'-0.02em'}}>+18.7%</span>
                <KitBadge tone="bull" mono>↗ +612 pips</KitBadge>
              </div>
              <EquityCurve />
            </div>
            <div style={{padding:'0 14px 16px',display:'flex',flexDirection:'column',gap:'8px'}}>
              {ticks.slice(0,3).map(t=>(
                <div key={t.pair} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 12px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-subtle)'}}>
                  <span style={{display:'flex',alignItems:'center',gap:'10px'}}>
                    <span style={{width:'7px',height:'7px',borderRadius:'50%',background:t.dir==='up'?'var(--bullish)':'var(--bearish)',boxShadow:`0 0 0 3px color-mix(in srgb, ${t.dir==='up'?'var(--bullish)':'var(--bearish)'} 20%, transparent)`}}/>
                    <span style={{fontWeight:700,fontSize:'var(--text-sm)',letterSpacing:'0.02em'}}>{t.pair}</span>
                  </span>
                  <span style={{display:'flex',alignItems:'baseline',gap:'12px'}}>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)'}}>{t.price}</span>
                    <span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',fontWeight:600,color:t.dir==='up'?'var(--bullish)':'var(--bearish)',minWidth:'52px',textAlign:'right'}}>{t.dir==='up'?'▲':'▼'} {t.chg}</span>
                  </span>
                </div>
              ))}
            </div>
          </KitCard>
        </div>
      </div>

      <div style={{position:'relative',maxWidth:'var(--container-xl)',margin:'var(--space-9) auto 0',paddingTop:'var(--space-5)',borderTop:'1px solid var(--border-subtle)'}}>
        <Ticker items={ticks}/>
      </div>
    </section>
  );
}
Object.assign(window,{Hero});

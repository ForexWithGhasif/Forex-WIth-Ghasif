/* FWG, Trading Tools — 6 interactive tools (4 calculators + journal + calendar),
   each opening in a theme-matching modal (same overlay/card CSS as ArticleModal
   and LessonModal). Everything computes client-side; no backend required.
   EconomicCalendar is wired the same way kit.jsx's useLiveTicks is: it calls
   /api/economic-calendar and silently falls back to sample data, so dropping in
   a real backend route later needs no UI changes. */

/* ============================ shared bits ============================ */
const fieldLabel = { fontSize:'var(--text-xs)', fontWeight:600, letterSpacing:'var(--ls-wide)', textTransform:'uppercase', color:'var(--text-tertiary)', marginBottom:'8px', display:'block' };
const fieldInput = { width:'100%', background:'var(--surface-inset)', border:'1px solid var(--border-default)', borderRadius:'var(--radius-md)', padding:'13px 14px', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--text-primary)', outline:'none' };

function numOf(v){ const f=parseFloat(v); return Number.isFinite(f) ? f : NaN; }
function fmt(v,d=2){ return Number.isFinite(v) ? v.toLocaleString('en-US',{minimumFractionDigits:d,maximumFractionDigits:d}) : '—'; }
function fmtInt(v){ return Number.isFinite(v) ? Math.round(v).toLocaleString('en-US') : '—'; }

function Field({ label, value, onChange, suffix, placeholder, error, type='number', ...rest }) {
  return <div>
    <label style={fieldLabel}>{label}</label>
    <div style={{position:'relative'}}>
      <input type={type} inputMode={type==='number'?'decimal':undefined} value={value}
        onChange={(e)=>onChange(e.target.value)} placeholder={placeholder}
        style={{...fieldInput, border:error?'1px solid var(--bearish)':fieldInput.border, paddingRight:suffix?'46px':undefined}}
        {...rest}/>
      {suffix && <span style={{position:'absolute',right:'14px',top:'50%',transform:'translateY(-50%)',fontSize:'var(--text-xs)',color:'var(--text-muted)',fontFamily:'var(--font-mono)',pointerEvents:'none'}}>{suffix}</span>}
    </div>
    {error && <div style={{fontSize:'var(--text-xs)',color:'var(--bearish)',marginTop:'6px'}}>{error}</div>}
  </div>;
}

function ResultTile({ label, value, accent }) {
  return <div style={{padding:'16px 18px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)'}}>
    <div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.12em',color:'var(--text-muted)',fontWeight:700,marginBottom:'6px'}}>{label}</div>
    <div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-xl)',fontWeight:700,color:accent||'var(--text-primary)',fontVariantNumeric:'tabular-nums'}}>{value}</div>
  </div>;
}

function Segmented({ options, value, onChange }) {
  return <div style={{display:'flex',gap:'8px'}}>
    {options.map(o=>{
      const on=o.value===value;
      return <button key={o.value} type="button" onClick={()=>onChange(o.value)}
        style={{flex:1,padding:'12px 14px',borderRadius:'var(--radius-md)',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:700,
          border:`1px solid ${on?(o.color||'var(--border-gold)'):'var(--border-default)'}`,
          background:on?`color-mix(in srgb, ${o.color||'var(--accent)'} 14%, transparent)`:'var(--surface-inset)',
          color:on?(o.color||'var(--text-gold)'):'var(--text-secondary)',transition:'var(--transition-base)'}}>
        {o.label||o.value}
      </button>;
    })}
  </div>;
}

function ToolNote({ children }) {
  return <p style={{fontSize:'var(--text-xs)',color:'var(--text-muted)',lineHeight:1.6,margin:'18px 0 0',paddingTop:'16px',borderTop:'1px solid var(--border-subtle)'}}>{children}</p>;
}

/* Pip value per standard lot (100,000 units) depends only on the pair's quote
   currency, so one USD-rate table drives every forex pair below (all 28 major +
   cross combinations of the 8 majors). Rates are stable planning figures, not
   live ticks, flagged as approximate wherever they're shown. */
const FX_USD_RATE = {
  USD:1, EUR:1.08, GBP:1.27, AUD:0.65, NZD:0.59, CAD:1/1.37, CHF:1/0.88, JPY:1/155,
};
const FOREX_PAIRS = [
  'EUR/USD','USD/JPY','GBP/USD','USD/CHF','USD/CAD','AUD/USD','NZD/USD',
  'EUR/GBP','EUR/JPY','EUR/CHF','EUR/AUD','EUR/CAD','EUR/NZD',
  'GBP/JPY','GBP/CHF','GBP/AUD','GBP/CAD','GBP/NZD',
  'AUD/JPY','AUD/CHF','AUD/CAD','AUD/NZD',
  'NZD/JPY','NZD/CHF','NZD/CAD',
  'CAD/JPY','CAD/CHF',
  'CHF/JPY',
];
/* Commodities: pip/"point" size and standard contract size vary by broker far
   more than FX does. Figures use common default contract sizes (Gold 100oz,
   Silver 5,000oz, Oil 1,000 barrels, Nat Gas 10,000 MMBtu) at their usual
   minimum tick, so treat these as indicative only. */
const COMMODITIES = {
  'XAU/USD — Gold':1, 'XAG/USD — Silver':50,
  'WTI/USD — Crude Oil':10, 'BRENT/USD — Brent Oil':10, 'NATGAS — Natural Gas':10,
};
const INSTRUMENTS = [...FOREX_PAIRS, ...Object.keys(COMMODITIES)];

function pipValuePerStandardLot(instrument){
  if(instrument in COMMODITIES) return COMMODITIES[instrument];
  const quote = instrument.split('/')[1];
  const rate = FX_USD_RATE[quote];
  if(!Number.isFinite(rate)) return NaN;
  const pipSize = quote==='JPY' ? 0.01 : 0.0001;
  return pipSize*100000*rate;
}

/* ============================ Risk Calculator ============================ */
function RiskCalculator() {
  const [balance,setBalance]=React.useState('10000');
  const [riskPct,setRiskPct]=React.useState('1');
  const [streak,setStreak]=React.useState('5');
  const bal=numOf(balance), risk=numOf(riskPct), n=Math.max(0,Math.min(20,Math.round(numOf(streak))||0));
  const balErr = balance!=='' && !(bal>0) ? 'Enter a balance greater than 0' : '';
  const riskErr = riskPct!=='' && !(risk>0 && risk<=100) ? 'Enter a risk between 0 and 100%' : '';
  const valid = bal>0 && risk>0 && risk<=100;
  const riskAmount = valid ? bal*risk/100 : NaN;
  const rows = valid ? Array.from({length:n},(_,i)=>{
    const losses=i+1, remaining=bal*Math.pow(1-risk/100,losses), drawdown=(1-remaining/bal)*100;
    return {losses,remaining,drawdown};
  }) : [];
  return <React.Fragment>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'20px'}} className="fwg-grid-2">
      <Field label="Account balance" value={balance} onChange={setBalance} suffix="USD" error={balErr} min="0" step="any"/>
      <Field label="Risk per trade" value={riskPct} onChange={setRiskPct} suffix="%" error={riskErr} min="0" max="100" step="any"/>
    </div>
    <div style={{marginBottom:'22px'}}>
      <Field label="Consecutive losses to simulate" value={streak} onChange={setStreak} suffix="trades" min="0" max="20" step="1"/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'12px',marginBottom:n>0&&valid?'22px':0}}>
      <ResultTile label="Dollar risk per trade" value={valid?`$${fmt(riskAmount)}`:'—'} accent="var(--text-gold)"/>
    </div>
    {valid && n>0 && (
      <div className="fwg-tablewrap">
        <div className="fwg-table" style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',border:'1px solid var(--border-default)',borderRadius:'var(--radius-md)',overflow:'hidden'}}>
          {['Losses in a row','Account remaining','Drawdown'].map((h,i)=>(
            <div key={h} style={{padding:'11px 14px',fontFamily:'var(--font-body)',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',background:'var(--surface-inset)',textAlign:i===0?'left':'right'}}>{h}</div>
          ))}
          {rows.map((r,ri)=>(
            <React.Fragment key={r.losses}>
              <div style={{padding:'11px 14px',color:'var(--text-primary)',fontWeight:600,borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>{r.losses}</div>
              <div style={{padding:'11px 14px',textAlign:'right',color:'var(--text-secondary)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>${fmt(r.remaining)}</div>
              <div style={{padding:'11px 14px',textAlign:'right',fontWeight:600,color:'var(--bearish)',borderBottom:ri<rows.length-1?'1px solid var(--border-subtle)':'none'}}>-{fmt(r.drawdown)}%</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )}
    <ToolNote>This models a fixed % risk per trade compounding against your balance. It's a planning illustration, not a guarantee of any strategy's actual loss streak.</ToolNote>
  </React.Fragment>;
}

/* ============================ Position Size Calculator ============================ */
function PositionSizeCalculator() {
  const [balance,setBalance]=React.useState('10000');
  const [riskPct,setRiskPct]=React.useState('1');
  const [stopPips,setStopPips]=React.useState('25');
  const [pair,setPair]=React.useState('EUR/USD');
  const bal=numOf(balance), risk=numOf(riskPct), stop=numOf(stopPips);
  const balErr = balance!=='' && !(bal>0) ? 'Enter a balance greater than 0' : '';
  const riskErr = riskPct!=='' && !(risk>0 && risk<=100) ? 'Enter a risk between 0 and 100%' : '';
  const stopErr = stopPips!=='' && !(stop>0) ? 'Stop-loss must be greater than 0 pips' : '';
  const valid = bal>0 && risk>0 && risk<=100 && stop>0;
  const riskAmount = valid ? bal*risk/100 : NaN;
  const pipVal = pipValuePerStandardLot(pair);
  const lots = valid ? riskAmount/(stop*pipVal) : NaN;
  const units = valid ? lots*100000 : NaN;
  return <React.Fragment>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}} className="fwg-grid-2">
      <Field label="Account balance" value={balance} onChange={setBalance} suffix="USD" error={balErr} min="0" step="any"/>
      <Field label="Risk per trade" value={riskPct} onChange={setRiskPct} suffix="%" error={riskErr} min="0" max="100" step="any"/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'22px'}} className="fwg-grid-2">
      <Field label="Stop-loss distance" value={stopPips} onChange={setStopPips} suffix="pips" error={stopErr} min="0" step="any"/>
      <div><label style={fieldLabel}>Pair / instrument</label><FancySelect value={pair} onChange={setPair} options={INSTRUMENTS} icon="repeat"/></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}} className="fwg-grid-3">
      <ResultTile label="Risk amount" value={valid?`$${fmt(riskAmount)}`:'—'}/>
      <ResultTile label="Position size" value={valid?`${fmt(lots)} lots`:'—'} accent="var(--text-gold)"/>
      <ResultTile label="Units" value={valid?fmtInt(units):'—'}/>
    </div>
    <ToolNote>Pip values are approximate standard-lot figures (100k units for FX; common default contract sizes for commodities). Confirm the exact pip value with your broker before sizing a live position.</ToolNote>
  </React.Fragment>;
}

/* ============================ Pip Calculator ============================ */
function PipCalculator() {
  const [pair,setPair]=React.useState('EUR/USD');
  const [lotType,setLotType]=React.useState('Standard');
  const [customUnits,setCustomUnits]=React.useState('100000');
  const [pips,setPips]=React.useState('10');
  const LOT_UNITS={Standard:100000,Mini:10000,Micro:1000};
  const units = lotType==='Custom' ? numOf(customUnits) : LOT_UNITS[lotType];
  const p = numOf(pips);
  const unitsErr = lotType==='Custom' && customUnits!=='' && !(units>0) ? 'Enter units greater than 0' : '';
  const pipsErr = pips!=='' && !Number.isFinite(p) ? 'Enter a number of pips' : '';
  const valid = units>0 && Number.isFinite(p);
  const pipValue = valid ? pipValuePerStandardLot(pair)*(units/100000) : NaN;
  const totalValue = valid ? pipValue*p : NaN;
  return <React.Fragment>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'16px'}} className="fwg-grid-2">
      <div><label style={fieldLabel}>Pair / instrument</label><FancySelect value={pair} onChange={setPair} options={INSTRUMENTS} icon="repeat"/></div>
      <div><label style={fieldLabel}>Lot size</label><FancySelect value={lotType} onChange={setLotType} options={['Standard','Mini','Micro','Custom']} icon="layers"/></div>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px',marginBottom:'22px'}} className="fwg-grid-2">
      {lotType==='Custom' && <Field label="Units" value={customUnits} onChange={setCustomUnits} error={unitsErr} min="0" step="any"/>}
      <Field label="Number of pips" value={pips} onChange={setPips} error={pipsErr} step="any"/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} className="fwg-grid-2">
      <ResultTile label="Value per pip" value={valid?`$${fmt(pipValue)}`:'—'}/>
      <ResultTile label={`Value of ${pips||0} pips`} value={valid?`$${fmt(totalValue)}`:'—'} accent="var(--text-gold)"/>
    </div>
    <ToolNote>Figures use approximate standard-lot pip values (common default contract sizes for commodities) and don't account for live exchange-rate fluctuation.</ToolNote>
  </React.Fragment>;
}

/* ============================ Risk/Reward Calculator ============================ */
function RiskRewardCalculator() {
  const [direction,setDirection]=React.useState('Buy');
  const [entry,setEntry]=React.useState('');
  const [stop,setStop]=React.useState('');
  const [target,setTarget]=React.useState('');
  const e=numOf(entry), s=numOf(stop), t=numOf(target);
  const valid = Number.isFinite(e) && Number.isFinite(s) && Number.isFinite(t) && e!==s;
  const risk = valid ? Math.abs(e-s) : NaN;
  const reward = valid ? Math.abs(t-e) : NaN;
  const ratio = valid && risk>0 ? reward/risk : NaN;
  const breakeven = valid && (risk+reward)>0 ? risk/(risk+reward)*100 : NaN;
  const illogical = valid && (
    (direction==='Buy' && !(s<e && t>e)) ||
    (direction==='Sell' && !(s>e && t<e))
  );
  return <React.Fragment>
    <div style={{marginBottom:'16px'}}>
      <label style={fieldLabel}>Direction</label>
      <Segmented value={direction} onChange={setDirection} options={[
        {value:'Buy',color:'var(--bullish)'},{value:'Sell',color:'var(--bearish)'},
      ]}/>
    </div>
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px',marginBottom:'20px'}} className="fwg-grid-3">
      <Field label="Entry price" value={entry} onChange={setEntry} step="any"/>
      <Field label="Stop-loss price" value={stop} onChange={setStop} step="any"/>
      <Field label="Take-profit price" value={target} onChange={setTarget} step="any"/>
    </div>
    {illogical && (
      <div style={{display:'flex',gap:'10px',alignItems:'flex-start',padding:'13px 16px',borderRadius:'var(--radius-md)',background:'var(--bearish-bg)',border:'1px solid rgba(228,71,74,0.32)',marginBottom:'20px'}}>
        <Icon name="alert-triangle" size={17} color="var(--bearish)" style={{flexShrink:0,marginTop:'2px'}}/>
        <span style={{fontSize:'var(--text-xs)',lineHeight:1.6,color:'var(--text-secondary)'}}>These levels don't line up with a {direction.toLowerCase()} trade (stop and target should sit on opposite sides of entry). The math below still applies to the numbers as entered.</span>
      </div>
    )}
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px'}} className="fwg-grid-3">
      <ResultTile label="Risk" value={valid?fmt(risk,5).replace(/0+$/,'').replace(/\.$/,''):'—'}/>
      <ResultTile label="Reward" value={valid?fmt(reward,5).replace(/0+$/,'').replace(/\.$/,''):'—'}/>
      <ResultTile label="Reward : risk" value={Number.isFinite(ratio)?`1 : ${fmt(ratio)}`:'—'} accent="var(--text-gold)"/>
    </div>
    <div style={{marginTop:'12px'}}>
      <ResultTile label="Win rate needed to break even" value={Number.isFinite(breakeven)?`${fmt(breakeven,1)}%`:'—'}/>
    </div>
    <ToolNote>Break-even win rate assumes every winner and loser hits this exact reward and risk. Real results vary with execution and slippage.</ToolNote>
  </React.Fragment>;
}

/* ============================ Trading Journal ============================ */
function loadJournal(){ try{ const v=JSON.parse(localStorage.getItem('fwg-journal')||'[]'); return Array.isArray(v)?v:[]; }catch(e){ return []; } }
function saveJournal(entries){ try{ localStorage.setItem('fwg-journal',JSON.stringify(entries)); }catch(e){} }
function todayISO(){ return new Date().toISOString().slice(0,10); }

function TradingJournal() {
  const [entries,setEntries]=React.useState(loadJournal);
  const blank={date:todayISO(),pair:'EUR/USD',side:'Buy',entry:'',stop:'',target:'',riskPct:'1',result:'Win',notes:''};
  const [f,setF]=React.useState(blank);
  const [err,setErr]=React.useState('');
  React.useEffect(()=>{ saveJournal(entries); },[entries]);

  const set=(k)=>(v)=>setF(s=>({...s,[k]:v}));
  const numFieldErr=(v)=> v!=='' && !Number.isFinite(numOf(v));

  const submit=(e)=>{
    e.preventDefault();
    if(!f.date || !f.pair.trim()){ setErr('Date and pair are required.'); return; }
    if(numFieldErr(f.entry)||numFieldErr(f.stop)||numFieldErr(f.target)||numFieldErr(f.riskPct)){ setErr('Entry, stop, target, and risk % must be valid numbers if filled in.'); return; }
    setErr('');
    setEntries(list=>[{...f,id:Date.now()+Math.random(),pair:f.pair.trim()},...list]);
    setF({...blank,date:todayISO()});
  };
  const remove=(id)=> setEntries(list=>list.filter(x=>x.id!==id));
  const clearAll=()=>{ if(window.confirm('Delete all journal entries? This cannot be undone.')) setEntries([]); };

  const total=entries.length;
  const wins=entries.filter(x=>x.result==='Win').length;
  const losses=entries.filter(x=>x.result==='Loss').length;
  const winRate= total? (wins/total*100) : NaN;

  const plannedRR=(x)=>{
    const e=numOf(x.entry), s=numOf(x.stop), t=numOf(x.target);
    if(!Number.isFinite(e)||!Number.isFinite(s)||!Number.isFinite(t)) return '—';
    const risk=Math.abs(e-s), reward=Math.abs(t-e);
    if(!(risk>0)) return '—';
    return `1:${fmt(reward/risk,2)}`;
  };

  return <React.Fragment>
    <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:'16px',marginBottom:'26px',paddingBottom:'26px',borderBottom:'1px solid var(--border-subtle)'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}} className="fwg-grid-3">
        <Field type="date" label="Date" value={f.date} onChange={set('date')}/>
        <Field label="Pair / instrument" value={f.pair} onChange={set('pair')} type="text" placeholder="EUR/USD"/>
        <div><label style={fieldLabel}>Side</label><Segmented value={f.side} onChange={set('side')} options={[{value:'Buy',color:'var(--bullish)'},{value:'Sell',color:'var(--bearish)'}]}/></div>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'16px'}} className="fwg-grid-3">
        <Field label="Entry" value={f.entry} onChange={set('entry')} step="any" error={numFieldErr(f.entry)?'Invalid number':''}/>
        <Field label="Stop loss" value={f.stop} onChange={set('stop')} step="any" error={numFieldErr(f.stop)?'Invalid number':''}/>
        <Field label="Take profit" value={f.target} onChange={set('target')} step="any" error={numFieldErr(f.target)?'Invalid number':''}/>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}} className="fwg-grid-2">
        <Field label="Risk %" value={f.riskPct} onChange={set('riskPct')} suffix="%" step="any" error={numFieldErr(f.riskPct)?'Invalid number':''}/>
        <div><label style={fieldLabel}>Result</label><FancySelect value={f.result} onChange={set('result')} options={['Win','Loss','Breakeven']} icon="flag"/></div>
      </div>
      <div>
        <label style={fieldLabel}>Notes</label>
        <textarea rows={2} value={f.notes} onChange={(e)=>set('notes')(e.target.value)} placeholder="What was the setup? What would you repeat or change?"
          style={{...fieldInput,resize:'vertical'}}/>
      </div>
      {err && <div style={{fontSize:'var(--text-xs)',color:'var(--bearish)'}}>{err}</div>}
      <div><KitButton as="button" type="submit" variant="primary" iconRight={<Icon name="plus" size={16}/>}>Add trade entry</KitButton></div>
    </form>

    <div style={{display:'flex',flexWrap:'wrap',gap:'12px',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
      <div style={{display:'flex',gap:'22px',flexWrap:'wrap'}}>
        <div><div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:700,color:'var(--text-primary)'}}>{total}</div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700}}>Trades logged</div></div>
        <div><div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:700,color:'var(--bullish)'}}>{Number.isFinite(winRate)?`${fmt(winRate,1)}%`:'—'}</div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700}}>Win rate</div></div>
        <div><div style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-lg)',fontWeight:700,color:'var(--text-primary)'}}>{wins}W / {losses}L</div><div style={{fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700}}>Record</div></div>
      </div>
      {total>0 && <button onClick={clearAll} type="button" style={{background:'transparent',border:'none',cursor:'pointer',color:'var(--text-muted)',fontSize:'var(--text-xs)',textDecoration:'underline'}}>Clear all entries</button>}
    </div>

    {total===0 ? (
      <div style={{padding:'32px 16px',textAlign:'center',color:'var(--text-muted)',fontSize:'var(--text-sm)',border:'1px dashed var(--border-default)',borderRadius:'var(--radius-md)'}}>No trades logged yet. Add your first one above, it's saved in this browser.</div>
    ) : (
      <div className="fwg-tablewrap">
        <div className="fwg-table" style={{display:'grid',gridTemplateColumns:'0.9fr 0.9fr 0.7fr 0.8fr 0.8fr 0.8fr 0.7fr 0.9fr 1.4fr 40px',fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',minWidth:'820px'}}>
          {['Date','Pair','Side','Entry','SL','TP','Risk %','Result','Notes',''].map((h,i)=>(
            <div key={h+i} style={{padding:'10px 12px',fontFamily:'var(--font-body)',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)'}}>{h}</div>
          ))}
          {entries.map((x,ri)=>{
            const bdr = ri<entries.length-1 ? '1px solid var(--border-subtle)' : 'none';
            const resultColor = x.result==='Win'?'var(--bullish)':x.result==='Loss'?'var(--bearish)':'var(--text-tertiary)';
            return <React.Fragment key={x.id}>
              <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{x.date}</div>
              <div style={{padding:'11px 12px',color:'var(--text-primary)',fontWeight:600,borderBottom:bdr}}>{x.pair}</div>
              <div style={{padding:'11px 12px',fontWeight:700,color:x.side==='Buy'?'var(--bullish)':'var(--bearish)',borderBottom:bdr}}>{x.side}</div>
              <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{x.entry||'—'}</div>
              <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{x.stop||'—'}</div>
              <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{x.target||'—'}</div>
              <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{x.riskPct?`${x.riskPct}%`:'—'}</div>
              <div style={{padding:'11px 12px',fontWeight:700,color:resultColor,borderBottom:bdr}}>{x.result}</div>
              <div style={{padding:'11px 12px',color:'var(--text-tertiary)',fontFamily:'var(--font-body)',borderBottom:bdr,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={x.notes}>{x.notes||'—'}</div>
              <div style={{padding:'11px 12px',borderBottom:bdr}}>
                <button onClick={()=>remove(x.id)} aria-label="Delete entry" type="button"
                  style={{background:'transparent',border:'none',cursor:'pointer',color:'var(--text-muted)',display:'inline-flex'}}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--bearish)'} onMouseLeave={e=>e.currentTarget.style.color='var(--text-muted)'}>
                  <Icon name="trash-2" size={15}/>
                </button>
              </div>
            </React.Fragment>;
          })}
        </div>
      </div>
    )}
    <ToolNote>Entries are saved privately in this browser only (not sent anywhere). Clearing your browser data will clear your journal too.</ToolNote>
  </React.Fragment>;
}

/* ============================ Economic Calendar ============================ */
/* Live only, no mock/hardcoded events. Polls our own backend (GET
   /api/economic-calendar), which proxies+caches the same feed that powers
   ForexFactory's own calendar widget (see economicCalendarService.js on the
   backend). Auto-refreshes every 5 minutes to match the server-side cache. */
function timeAgo(iso){
  if(!iso) return '';
  const mins=Math.round((Date.now()-new Date(iso).getTime())/60000);
  if(mins<1) return 'just now';
  if(mins===1) return '1 min ago';
  if(mins<60) return `${mins} min ago`;
  const hrs=Math.round(mins/60);
  return `${hrs} hr${hrs===1?'':'s'} ago`;
}

function useLiveEvents(){
  const [state,setState]=React.useState({status:'loading',events:[],source:null,fetchedAt:null,error:null});
  const load=React.useCallback(async()=>{
    setState(s=>({...s,status:s.events.length?'refreshing':'loading',error:null}));
    try{
      const res=await fetch(`${window.FWG_API_BASE}/api/economic-calendar`);
      const data=await res.json().catch(()=>null);
      if(res.ok && data && data.success && Array.isArray(data.data)){
        setState({status:'ready',events:data.data,source:data.source||null,fetchedAt:data.fetchedAt||new Date().toISOString(),error:null});
      }else{
        throw new Error((data&&data.message)||`Request failed (${res.status})`);
      }
    }catch(err){
      setState(s=>({...s,status:s.events.length?'ready':'error',error:err.message||'Could not load live calendar data.'}));
    }
  },[]);
  React.useEffect(()=>{
    load();
    const id=setInterval(load,5*60*1000);
    return ()=>clearInterval(id);
  },[load]);
  return {...state,reload:load};
}

function EconomicCalendar() {
  const {status,events,source,fetchedAt,error,reload}=useLiveEvents();
  const [impact,setImpact]=React.useState('all');
  const [currency,setCurrency]=React.useState('All currencies');
  const [range,setRange]=React.useState('upcoming');

  const todayMid = React.useMemo(()=>{ const d=new Date(); d.setHours(0,0,0,0); return d; },[]);
  const dayKeyOf=(dt)=>{ const d=new Date(dt); return new Date(d.getFullYear(),d.getMonth(),d.getDate()); };
  const dayOffset=(dt)=> Math.round((dayKeyOf(dt)-todayMid)/86400000);

  const currencies = React.useMemo(()=>['All currencies', ...Array.from(new Set(events.map(e=>e.currency).filter(Boolean))).sort()],[events]);

  const filtered = events.filter(ev=>{
    if(impact!=='all' && ev.impact!==impact) return false;
    if(currency!=='All currencies' && ev.currency!==currency) return false;
    const off=dayOffset(ev.dateTime);
    if(range==='today' && off!==0) return false;
    if(range==='tomorrow' && off!==1) return false;
    if(range==='upcoming' && off<0) return false;
    return true;
  });

  const byDate={};
  filtered.forEach(ev=>{ const k=dayKeyOf(ev.dateTime).toISOString().slice(0,10); (byDate[k]=byDate[k]||[]).push(ev); });
  const dateKeys=Object.keys(byDate).sort();

  const dayLabel=(key)=>{
    const off=Math.round((new Date(key+'T00:00:00')-todayMid)/86400000);
    if(off===0) return 'Today';
    if(off===1) return 'Tomorrow';
    if(off===-1) return 'Yesterday';
    return new Date(key+'T00:00:00').toLocaleDateString(undefined,{weekday:'long',month:'short',day:'numeric'});
  };
  const impactTone=(lvl)=> lvl==='high'?'bear':lvl==='medium'?'gold':'neutral';
  const rangeLabel = range==='today'?'Today':range==='tomorrow'?'Tomorrow':range==='upcoming'?'Upcoming':'All this week';
  const noDataYet = (status==='loading'||status==='error') && events.length===0;

  return <React.Fragment>
    <div style={{display:'flex',alignItems:'center',gap:'10px',flexWrap:'wrap',marginBottom:'18px',padding:'12px 14px',borderRadius:'var(--radius-md)',background:'var(--surface-inset)',border:'1px solid var(--border-default)'}}>
      <span style={{width:'8px',height:'8px',borderRadius:'50%',flexShrink:0,
        background: status==='error'&&!events.length ? 'var(--bearish)' : 'var(--bullish)',
        boxShadow:`0 0 0 3px ${status==='error'&&!events.length?'var(--bearish-bg)':'var(--bullish-bg)'}`}}/>
      <span style={{fontSize:'var(--text-xs)',fontWeight:700,color:'var(--text-primary)'}}>{status==='error'&&!events.length?'Live data unavailable':'Live'}</span>
      <span style={{fontSize:'var(--text-xs)',color:'var(--text-tertiary)'}}>{source?`Source: ${source}`:"Source: ForexFactory's economic calendar"}</span>
      {fetchedAt && <span style={{fontSize:'var(--text-xs)',color:'var(--text-muted)'}}>· Updated {timeAgo(fetchedAt)}</span>}
      <button type="button" onClick={reload} disabled={status==='loading'||status==='refreshing'}
        style={{marginLeft:'auto',display:'inline-flex',alignItems:'center',gap:'6px',background:'transparent',border:'1px solid var(--border-default)',borderRadius:'var(--radius-sm)',padding:'6px 11px',cursor:status==='loading'||status==='refreshing'?'default':'pointer',color:'var(--text-secondary)',fontSize:'var(--text-xs)',fontWeight:600,opacity:status==='loading'||status==='refreshing'?0.6:1}}>
        <Icon name="refresh-cw" size={13}/> {status==='refreshing'?'Refreshing…':'Refresh'}
      </button>
    </div>

    {noDataYet ? (
      status==='error' ? (
        <div style={{padding:'32px 16px',textAlign:'center',border:'1px dashed var(--border-default)',borderRadius:'var(--radius-md)'}}>
          <Icon name="alert-triangle" size={22} color="var(--bearish)" style={{marginBottom:'10px'}}/>
          <div style={{fontSize:'var(--text-sm)',color:'var(--text-secondary)',marginBottom:'16px'}}>{error||'Could not load live calendar data.'}</div>
          <KitButton variant="secondary" size="sm" onClick={reload}>Try again</KitButton>
        </div>
      ) : (
        <div style={{padding:'40px 16px',textAlign:'center',color:'var(--text-muted)',fontSize:'var(--text-sm)'}}>Loading live calendar data…</div>
      )
    ) : (
      <React.Fragment>
        <div style={{display:'flex',flexDirection:'column',gap:'14px',marginBottom:'22px'}}>
          <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
            {['all','high','medium','low'].map(v=>{
              const on=v===impact;
              return <button key={v} type="button" onClick={()=>setImpact(v)}
                style={{padding:'7px 15px',borderRadius:'var(--radius-pill)',cursor:'pointer',fontFamily:'var(--font-body)',fontSize:'var(--text-sm)',fontWeight:600,textTransform:'capitalize',
                  border:`1px solid ${on?'var(--border-gold)':'var(--border-default)'}`,background:on?'var(--accent-soft-bg)':'transparent',color:on?'var(--text-gold)':'var(--text-secondary)',transition:'var(--transition-base)'}}>
                {v==='all'?'All impact':v}
              </button>;
            })}
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}} className="fwg-grid-2">
            <FancySelect value={currency} onChange={setCurrency} options={currencies} icon="banknote"/>
            <FancySelect value={rangeLabel}
              onChange={(v)=>setRange(v==='Today'?'today':v==='Tomorrow'?'tomorrow':v==='Upcoming'?'upcoming':'all')}
              options={['Today','Tomorrow','Upcoming','All this week']} icon="calendar"/>
          </div>
        </div>

        {dateKeys.length===0 ? (
          <div style={{padding:'32px 16px',textAlign:'center',color:'var(--text-muted)',fontSize:'var(--text-sm)',border:'1px dashed var(--border-default)',borderRadius:'var(--radius-md)'}}>No events match these filters.</div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
            {dateKeys.map(key=>(
              <div key={key}>
                <div style={{fontSize:'var(--text-xs)',fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--text-gold)',marginBottom:'10px'}}>{dayLabel(key)}</div>
                <div className="fwg-tablewrap">
                  <div className="fwg-table" style={{display:'grid',gridTemplateColumns:'0.6fr 0.6fr 0.8fr 1.5fr 0.7fr 0.7fr 0.7fr',fontFamily:'var(--font-mono)',fontSize:'var(--text-xs)',border:'1px solid var(--border-default)',borderRadius:'var(--radius-md)',overflow:'hidden',minWidth:'620px'}}>
                    {['Time','Currency','Impact','Event','Actual','Forecast','Previous'].map(h=>(
                      <div key={h} style={{padding:'10px 12px',fontFamily:'var(--font-body)',fontSize:'var(--text-2xs)',textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--text-muted)',fontWeight:700,borderBottom:'1px solid var(--border-default)',background:'var(--surface-inset)'}}>{h}</div>
                    ))}
                    {byDate[key].map((ev,ri,arr)=>{
                      const bdr= ri<arr.length-1 ? '1px solid var(--border-subtle)' : 'none';
                      const time = new Date(ev.dateTime).toLocaleTimeString(undefined,{hour:'2-digit',minute:'2-digit'});
                      return <React.Fragment key={ev.id}>
                        <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{time}</div>
                        <div style={{padding:'11px 12px',color:'var(--text-primary)',fontWeight:700,borderBottom:bdr}}>{ev.currency}</div>
                        <div style={{padding:'11px 12px',borderBottom:bdr}}><KitBadge tone={impactTone(ev.impact)} dot>{ev.impact}</KitBadge></div>
                        <div style={{padding:'11px 12px',color:'var(--text-primary)',fontFamily:'var(--font-body)',fontWeight:600,borderBottom:bdr}}>{ev.title}</div>
                        <div style={{padding:'11px 12px',color:'var(--text-primary)',fontWeight:700,borderBottom:bdr}}>{ev.actual||'—'}</div>
                        <div style={{padding:'11px 12px',color:'var(--text-secondary)',borderBottom:bdr}}>{ev.forecast||'—'}</div>
                        <div style={{padding:'11px 12px',color:'var(--text-tertiary)',borderBottom:bdr}}>{ev.previous||'—'}</div>
                      </React.Fragment>;
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </React.Fragment>
    )}
    <ToolNote>Live data, refreshed automatically every 5 minutes. Times shown in your local timezone. This view covers the current ForexFactory calendar week (Sun–Sat), the same range forexfactory.com/calendar shows by default.</ToolNote>
  </React.Fragment>;
}

/* ============================ modal shell + grid ============================ */
function ToolModal({ tool, onClose }) {
  React.useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='Escape') onClose(); };
    document.addEventListener('keydown',onKey);
    const prev=document.body.style.overflow; document.body.style.overflow='hidden';
    return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prev; };
  },[onClose]);
  return (
    <div onClick={onClose} className="fwg-modal-overlay"
      style={{position:'fixed',inset:0,zIndex:200,display:'flex',alignItems:'flex-start',justifyContent:'center',padding:'clamp(16px,5vh,64px) var(--gutter)',overflowY:'auto',
        background:'rgba(4,5,8,0.72)',backdropFilter:'blur(10px)',WebkitBackdropFilter:'blur(10px)'}}>
      <div onClick={(e)=>e.stopPropagation()} className="fwg-modal-card"
        style={{position:'relative',width:`min(${tool.width},100%)`,background:'var(--bg-elevated)',border:'1px solid var(--border-gold)',borderRadius:'var(--radius-2xl)',
          boxShadow:'var(--glow-gold-sm), var(--shadow-xl)',overflow:'hidden',marginBottom:'48px'}}>
        <button onClick={onClose} aria-label="Close tool"
          style={{position:'absolute',top:'16px',right:'16px',zIndex:3,width:'42px',height:'42px',borderRadius:'50%',cursor:'pointer',
            background:'rgba(10,12,17,0.6)',backdropFilter:'blur(8px)',WebkitBackdropFilter:'blur(8px)',border:'1px solid var(--border-strong)',color:'var(--text-primary)',display:'inline-flex',alignItems:'center',justifyContent:'center',transition:'var(--transition-base)'}}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--border-gold)';e.currentTarget.style.color='var(--text-gold)';}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border-strong)';e.currentTarget.style.color='var(--text-primary)';}}>
          <Icon name="x" size={20}/>
        </button>
        <div style={{padding:'clamp(28px,5vw,44px) clamp(20px,5vw,44px) clamp(30px,5vw,44px)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'14px',marginBottom:'18px'}}>
            <div style={{width:'46px',height:'46px',flexShrink:0,borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
              <Icon name={tool.icon} size={22} color="var(--text-gold)"/>
            </div>
            <KitBadge tone="solid">{tool.category}</KitBadge>
          </div>
          <h1 style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:'var(--text-2xl)',lineHeight:1.1,letterSpacing:'-0.02em',color:'var(--text-primary)',margin:'0 0 8px'}}>{tool.title}</h1>
          <p style={{fontSize:'var(--text-sm)',color:'var(--text-tertiary)',margin:'0 0 24px',paddingBottom:'22px',borderBottom:'1px solid var(--border-subtle)'}}>{tool.description}</p>
          {tool.render()}
        </div>
      </div>
    </div>
  );
}

const TOOLS = [
  { id:'risk-calculator', icon:'shield-alert', category:'Calculator', title:'Risk Calculator', width:'620px',
    description:'Turn your account balance and risk % into a clear dollar figure, and see what a losing streak would cost.',
    render:()=><RiskCalculator/> },
  { id:'position-size', icon:'scale', category:'Calculator', title:'Position Size Calculator', width:'620px',
    description:'Find the exact lot size that keeps a given stop-loss within your risk limit.',
    render:()=><PositionSizeCalculator/> },
  { id:'pip-calculator', icon:'ruler', category:'Calculator', title:'Pip Calculator', width:'560px',
    description:'See the dollar value of a pip move for any pair and lot size.',
    render:()=><PipCalculator/> },
  { id:'risk-reward', icon:'target', category:'Calculator', title:'Risk/Reward Calculator', width:'560px',
    description:'Check a trade idea’s reward-to-risk ratio and the win rate it needs to break even.',
    render:()=><RiskRewardCalculator/> },
  { id:'trading-journal', icon:'book-open', category:'Journal', title:'Trading Journal', width:'980px',
    description:'Log every trade, entry to exit, and track your real performance over time, saved in your browser.',
    render:()=><TradingJournal/> },
  { id:'economic-calendar', icon:'calendar', category:'Calendar', title:'Economic Calendar', width:'900px',
    description:'Filter upcoming releases by impact level, currency, and date.',
    render:()=><EconomicCalendar/> },
];

function ToolsGrid() {
  const [activeId,setActiveId]=React.useState(null);
  const active = TOOLS.find(t=>t.id===activeId);
  return <React.Fragment>
    {active && <ToolModal tool={active} onClose={()=>setActiveId(null)} />}
    <Section><Container>
      <Head align="center" kicker="6 essential tools" title="Trade with the right tools"
        lead="Calculators, a journal, and a calendar, the practical utilities every trader reaches for, built right into the site." />
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'18px'}} className="fwg-grid-3">
        {TOOLS.map(t=>(
          <KitCard key={t.id} interactive padding="26px" onClick={()=>setActiveId(t.id)} style={{cursor:'pointer',display:'flex',flexDirection:'column'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'18px'}}>
              <div style={{width:'46px',height:'46px',borderRadius:'var(--radius-md)',background:'var(--accent-soft-bg)',border:'1px solid var(--border-gold)',display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
                <Icon name={t.icon} size={21} color="var(--text-gold)"/>
              </div>
              <KitBadge tone="gold">{t.category}</KitBadge>
            </div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'var(--text-md)',fontWeight:700,margin:'0 0 8px',lineHeight:1.25}}>{t.title}</h3>
            <p style={{fontSize:'var(--text-sm)',lineHeight:1.6,color:'var(--text-secondary)',margin:'0 0 18px',flex:1}}>{t.description}</p>
            <div><KitButton variant="outlineGold" size="sm" onClick={()=>setActiveId(t.id)} iconRight={<Icon name="arrow-right" size={14}/>}>Open tool</KitButton></div>
          </KitCard>
        ))}
      </div>
    </Container></Section>
  </React.Fragment>;
}

function ToolsPage() {
  return <React.Fragment>
    <PageHero kicker="Trading Tools" title="Professional tools, built into your workflow"
      lead="Free calculators for risk, position size, pips, and reward, plus a private trading journal and an economic calendar. No downloads, no signup, everything runs right here." />
    <Reveal>
      <ToolsGrid />
    </Reveal>
  </React.Fragment>;
}

Object.assign(window,{ToolsPage});

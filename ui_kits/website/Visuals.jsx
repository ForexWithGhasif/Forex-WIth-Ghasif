/* FWG — trading data visuals (charts are content, not decoration). */

function EquityCurve({ width=520, height=200, stroke='var(--emerald-400)' }) {
  // deterministic up-and-to-the-right equity curve with a gentle drawdown
  const pts=[12,18,15,28,34,30,44,52,48,63,72,68,84,96,90,108,124,118,140,160];
  const max=Math.max(...pts), min=Math.min(...pts);
  const stepX=width/(pts.length-1);
  const xy=pts.map((p,i)=>[i*stepX, height-8-((p-min)/(max-min))*(height-28)]);
  const line=xy.map((p,i)=>`${i?'L':'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area=`${line} L${width} ${height} L0 ${height} Z`;
  const gid='eq'+Math.round(width);
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{display:'block'}} preserveAspectRatio="none">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(19,185,120,0.28)"/>
          <stop offset="100%" stopColor="rgba(19,185,120,0)"/>
        </linearGradient>
      </defs>
      {[0.25,0.5,0.75].map((g,i)=>(<line key={i} x1="0" x2={width} y1={height*g} y2={height*g} stroke="var(--border-subtle)" strokeWidth="1"/>))}
      <path d={area} fill={`url(#${gid})`}/>
      <path d={line} fill="none" stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
      <circle cx={xy[xy.length-1][0]} cy={xy[xy.length-1][1]} r="4.5" fill={stroke}/>
      <circle cx={xy[xy.length-1][0]} cy={xy[xy.length-1][1]} r="9" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.4"/>
    </svg>
  );
}

function CandleChart({ height=120 }) {
  const candles=[ // [open,close,low,high] 0-100 scale
    [40,55,34,60],[55,48,44,62],[48,64,46,70],[64,58,52,68],[58,72,55,78],
    [72,66,62,80],[66,80,63,86],[80,74,70,88],[74,88,72,94],[88,82,78,96],
    [82,70,66,90],[70,84,68,90],[84,92,80,98],[92,86,82,98],
  ];
  const cw=100/candles.length;
  return (
    <svg viewBox="0 0 100 100" width="100%" height={height} preserveAspectRatio="none" style={{display:'block'}}>
      {candles.map((c,i)=>{
        const [o,cl,lo,hi]=c; const up=cl>=o;
        const col=up?'var(--emerald-400)':'var(--crimson-400)';
        const x=i*cw+cw/2;
        const bw=cw*0.5;
        const top=100-Math.max(o,cl), bh=Math.abs(cl-o)||1.5;
        return (<g key={i}>
          <line x1={x} x2={x} y1={100-hi} y2={100-lo} stroke={col} strokeWidth="0.6"/>
          <rect x={x-bw/2} y={top} width={bw} height={bh} fill={col} rx="0.4"/>
        </g>);
      })}
    </svg>
  );
}

function Ticker({ items }) {
  const row = items.concat(items);
  return (
    <div style={{overflow:'hidden',position:'relative',maskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',WebkitMaskImage:'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)'}}>
      <div style={{display:'inline-flex',gap:'40px',whiteSpace:'nowrap',animation:'fwgmarquee 38s linear infinite',willChange:'transform'}}>
        {row.map((it,i)=>(
          <span key={i} style={{display:'inline-flex',alignItems:'center',gap:'10px',fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',color:'var(--text-secondary)'}}>
            <span style={{color:'var(--text-primary)',fontWeight:600}}>{it.pair}</span>
            <span>{it.price}</span>
            <span style={{color:it.dir==='up'?'var(--bullish)':'var(--bearish)'}}>{it.dir==='up'?'▲':'▼'} {it.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

Object.assign(window,{EquityCurve,CandleChart,Ticker});

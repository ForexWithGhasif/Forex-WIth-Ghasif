/* Forex With Ghasif — UI kit shared primitives (cosmetic, self-contained).
   Mirrors the design-system components but needs no bundle so the kit
   always renders. Exposed on window for the section files. */

function KitButton({ children, variant='primary', size='md', iconLeft, iconRight, fullWidth, as='button', ...rest }) {
  const [h,setH]=React.useState(false),[p,setP]=React.useState(false);
  const sizes={sm:{padding:'8px 16px',fontSize:'var(--text-sm)',radius:'var(--radius-sm)',gap:'7px'},
    md:{padding:'12px 22px',fontSize:'var(--text-sm)',radius:'var(--radius-md)',gap:'9px'},
    lg:{padding:'16px 30px',fontSize:'var(--text-md)',radius:'var(--radius-md)',gap:'11px'}}[size];
  const V={
    primary:{background:'var(--grad-gold-soft)',color:'var(--accent-contrast)',boxShadow:'var(--glow-gold-sm), var(--inset-gold-hi)',border:'1px solid transparent'},
    emerald:{background:'var(--grad-emerald)',color:'#04120c',boxShadow:'var(--glow-emerald-sm), var(--inset-top-hi)',border:'1px solid transparent'},
    secondary:{background:'var(--surface-card)',color:'var(--text-primary)',border:'1px solid var(--border-strong)',boxShadow:'var(--inset-top-hi)'},
    ghost:{background:'transparent',color:'var(--text-secondary)',border:'1px solid transparent'},
    outlineGold:{background:'transparent',color:'var(--text-gold)',border:'1px solid var(--border-gold)'},
  }[variant];
  const hov=h?{
    primary:{boxShadow:'var(--glow-gold-md), var(--inset-gold-hi)',filter:'brightness(1.04)'},
    emerald:{boxShadow:'0 12px 40px rgba(19,185,120,0.4), var(--inset-top-hi)',filter:'brightness(1.05)'},
    secondary:{background:'var(--surface-hover)',borderColor:'var(--border-gold)'},
    ghost:{color:'var(--text-gold)',background:'var(--surface-hover)'},
    outlineGold:{background:'var(--accent-soft-bg)'},
  }[variant]:{};
  const Tag=as;
  return <Tag onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setP(false);}}
    onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)}
    style={{display:'inline-flex',alignItems:'center',justifyContent:'center',fontFamily:'var(--font-body)',
      fontWeight:'var(--fw-bold)',letterSpacing:'var(--ls-tight)',cursor:'pointer',whiteSpace:'nowrap',textDecoration:'none',
      padding:sizes.padding,fontSize:sizes.fontSize,borderRadius:sizes.radius,gap:sizes.gap,width:fullWidth?'100%':'auto',
      transform:p?'scale(0.975)':'scale(1)',
      transition:'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out)',
      ...V,...hov}} {...rest}>{iconLeft}{children}{iconRight}</Tag>;
}

function KitBadge({children,tone='gold',dot,mono,style}) {
  const T={gold:{bg:'var(--accent-soft-bg)',fg:'var(--text-gold)',bd:'rgba(214,175,67,0.3)'},
    bull:{bg:'var(--bullish-bg)',fg:'var(--bullish)',bd:'rgba(19,185,120,0.32)'},
    bear:{bg:'var(--bearish-bg)',fg:'var(--bearish)',bd:'rgba(228,71,74,0.32)'},
    neutral:{bg:'var(--surface-card)',fg:'var(--text-secondary)',bd:'var(--border-default)'},
    solid:{bg:'var(--grad-gold-soft)',fg:'var(--accent-contrast)',bd:'transparent'}}[tone];
  return <span style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'4px 11px',borderRadius:'var(--radius-pill)',
    background:T.bg,color:T.fg,border:`1px solid ${T.bd}`,fontFamily:mono?'var(--font-mono)':'var(--font-body)',
    fontSize:'var(--text-xs)',fontWeight:'var(--fw-semibold)',letterSpacing:mono?'-0.01em':'var(--ls-wide)',lineHeight:1.4,whiteSpace:'nowrap',...style}}>
    {dot&&<span style={{width:'6px',height:'6px',borderRadius:'50%',background:'currentColor',boxShadow:'0 0 0 3px color-mix(in srgb, currentColor 22%, transparent)'}}/>}
    {children}</span>;
}

function KitCard({children,featured,interactive,padding='var(--space-6)',style,...rest}) {
  const [h,setH]=React.useState(false);
  return <div onMouseEnter={()=>interactive&&setH(true)} onMouseLeave={()=>interactive&&setH(false)}
    style={{position:'relative',background:featured?'linear-gradient(180deg, rgba(214,175,67,0.06), var(--surface-card))':'var(--surface-card)',
      backdropFilter:'blur(var(--blur-sm))',WebkitBackdropFilter:'blur(var(--blur-sm))',
      border:`1px solid ${featured?'var(--border-gold)':'var(--border-default)'}`,borderRadius:'var(--radius-xl)',padding,
      boxShadow:featured?'var(--glow-gold-sm), var(--shadow-card)':'var(--shadow-card)',
      transition:'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      transform:h?'translateY(-4px)':'translateY(0)',...(h?{borderColor:'var(--border-gold)',boxShadow:'var(--glow-gold-md), var(--shadow-lg)'}:{}),...style}} {...rest}>{children}</div>;
}

function KitStat({value,label,delta,direction='up',align='left'}) {
  const up=direction==='up';
  return <div style={{display:'flex',flexDirection:'column',gap:'6px',textAlign:align,alignItems:align==='center'?'center':'flex-start'}}>
    <div style={{display:'flex',alignItems:'baseline',gap:'10px'}}>
      <span style={{fontFamily:'var(--font-mono)',fontVariantNumeric:'tabular-nums',fontSize:'var(--text-2xl)',fontWeight:'var(--fw-semibold)',letterSpacing:'var(--ls-tight)',color:'var(--text-primary)',lineHeight:1}}>{value}</span>
      {delta&&<span style={{fontFamily:'var(--font-mono)',fontSize:'var(--text-sm)',fontWeight:'var(--fw-semibold)',color:up?'var(--bullish)':'var(--bearish)'}}>{up?'↗':'↘'} {delta}</span>}
    </div>
    <span style={{fontFamily:'var(--font-body)',fontSize:'var(--text-2xs)',fontWeight:'var(--fw-semibold)',textTransform:'uppercase',letterSpacing:'var(--ls-wider)',color:'var(--text-tertiary)'}}>{label}</span>
  </div>;
}

function KitKicker({children,style}) {
  return <span style={{display:'inline-flex',alignItems:'center',gap:'8px',fontFamily:'var(--font-body)',fontSize:'var(--text-xs)',
    fontWeight:'var(--fw-semibold)',letterSpacing:'var(--ls-wider)',textTransform:'uppercase',color:'var(--text-gold)',...style}}>
    <span style={{width:'22px',height:'1px',background:'var(--border-gold)'}}/>{children}</span>;
}

function Icon({name,size=18,color='currentColor',strokeWidth=1.9,style}) {
  const ref=React.useRef(null);
  React.useEffect(()=>{ if(window.lucide&&ref.current){ ref.current.innerHTML=''; const el=document.createElement('i'); el.setAttribute('data-lucide',name); ref.current.appendChild(el); window.lucide.createIcons({attrs:{width:size,height:size,'stroke-width':strokeWidth},nameAttr:'data-lucide'}); } });
  return <span ref={ref} style={{display:'inline-flex',width:size,height:size,color,...style}}/>;
}

/* Social glyphs: lucide for most, custom SVG for brands lucide lacks (WhatsApp). */
function SocialGlyph({name,size=18,style}) {
  if(name==='whatsapp'){
    return <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" style={{display:'inline-flex',...style}} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>;
  }
  return <Icon name={name} size={size} style={style}/>;
}

/* Reliable lazy image: loads via IntersectionObserver (native loading="lazy"
   is unreliable inside sandboxed iframes). rootMargin preloads just before
   the image scrolls into view. Pass eager to load immediately (above fold). */
function LazyImg({src,alt='',style,eager=false,imgProps={}}) {
  const ref=React.useRef(null);
  const [shown,setShown]=React.useState(!!eager);
  React.useEffect(()=>{
    if(shown) return;
    const el=ref.current; if(!el) return;
    let done=false;
    const show=()=>{ if(!done){ done=true; setShown(true); } };
    let io;
    if(typeof IntersectionObserver!=='undefined'){
      io=new IntersectionObserver((es)=>{ es.forEach(e=>{ if(e.isIntersecting){ show(); io.disconnect(); } }); },{rootMargin:'600px'});
      io.observe(el);
    }
    // Safety net: load shortly after first paint so images never stay blank
    // (e.g. when the page never scrolls). Still deferred off the critical path.
    const t=setTimeout(show,1400);
    return ()=>{ clearTimeout(t); if(io) io.disconnect(); };
  },[shown]);
  return <img ref={ref} src={shown?src:undefined} alt={alt} decoding="async" style={style} {...imgProps}/>;
}

Object.assign(window,{KitButton,KitBadge,KitCard,KitStat,KitKicker,Icon,SocialGlyph,LazyImg});

/* Official social/contact destinations (single source of truth). */
window.FWG_SOCIAL = {
  instagram: 'https://www.instagram.com/forexwithghasif/',
  facebook:  'https://www.facebook.com/share/18oPFFMWEm/',
  whatsapp:  'https://wa.me/923047488945?text=Hi%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more%20about%20your%20trading%20services.',
};

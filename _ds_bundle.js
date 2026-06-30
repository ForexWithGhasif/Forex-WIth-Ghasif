/* @ds-bundle: {"format":3,"namespace":"ForexWithGhasifDesignSystem_e958d4","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"PriceTag","sourcePath":"components/core/PriceTag.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Stat","sourcePath":"components/core/Stat.jsx"},{"name":"PlanCard","sourcePath":"components/marketing/PlanCard.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"39e305282ff7","components/core/Button.jsx":"2dcef0247a92","components/core/Card.jsx":"122b53783955","components/core/Input.jsx":"91a28cf745bc","components/core/Logo.jsx":"a5a23e1aedd4","components/core/PriceTag.jsx":"4437172e362b","components/core/SectionHeading.jsx":"84591016f1ad","components/core/Stat.jsx":"b74aaba6f5e8","components/marketing/PlanCard.jsx":"be7fef81ad54","ui_kits/website/Hero.jsx":"ce46aa360015","ui_kits/website/Layout.jsx":"321fe094a004","ui_kits/website/Pages1.jsx":"b92a4a2e7ddd","ui_kits/website/Pages2.jsx":"61e49f406871","ui_kits/website/Sections.jsx":"bc87698adb0d","ui_kits/website/Sections2.jsx":"b40637c60ac7","ui_kits/website/Visuals.jsx":"84c885587c63","ui_kits/website/countries.js":"0cf0a17627e6","ui_kits/website/kit.jsx":"9ae5712f74f4","ui_kits/website/shaderbg.js":"578cc71e0e5f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ForexWithGhasifDesignSystem_e958d4 = window.ForexWithGhasifDesignSystem_e958d4 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  gold: {
    bg: 'var(--accent-soft-bg)',
    fg: 'var(--text-gold)',
    bd: 'rgba(214,175,67,0.3)'
  },
  bull: {
    bg: 'var(--bullish-bg)',
    fg: 'var(--bullish)',
    bd: 'rgba(19,185,120,0.32)'
  },
  bear: {
    bg: 'var(--bearish-bg)',
    fg: 'var(--bearish)',
    bd: 'rgba(228,71,74,0.32)'
  },
  neutral: {
    bg: 'var(--surface-card)',
    fg: 'var(--text-secondary)',
    bd: 'var(--border-default)'
  },
  solid: {
    bg: 'var(--grad-gold-soft)',
    fg: 'var(--accent-contrast)',
    bd: 'transparent'
  }
};

/**
 * Small pill label — status, category, or a live trading delta.
 */
function Badge({
  children,
  tone = 'gold',
  dot = false,
  mono = false,
  style = {},
  ...rest
}) {
  const t = tones[tone] || tones.gold;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: mono ? '-0.01em' : 'var(--ls-wide)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'currentColor',
      boxShadow: '0 0 0 3px color-mix(in srgb, currentColor 22%, transparent)'
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: '8px 16px',
    fontSize: 'var(--text-sm)',
    radius: 'var(--radius-sm)',
    gap: '7px'
  },
  md: {
    padding: '12px 22px',
    fontSize: 'var(--text-sm)',
    radius: 'var(--radius-md)',
    gap: '9px'
  },
  lg: {
    padding: '16px 30px',
    fontSize: 'var(--text-md)',
    radius: 'var(--radius-md)',
    gap: '11px'
  }
};
const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'var(--font-body)',
  fontWeight: 'var(--fw-bold)',
  letterSpacing: 'var(--ls-tight)',
  border: '1px solid transparent',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
  WebkitTapHighlightColor: 'transparent'
};
const variants = {
  primary: {
    background: 'var(--grad-gold-soft)',
    color: 'var(--accent-contrast)',
    boxShadow: 'var(--glow-gold-sm), var(--inset-gold-hi)'
  },
  emerald: {
    background: 'var(--grad-emerald)',
    color: '#04120c',
    boxShadow: 'var(--glow-emerald-sm), var(--inset-top-hi)'
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-strong)',
    boxShadow: 'var(--inset-top-hi)'
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderColor: 'transparent'
  },
  outlineGold: {
    background: 'transparent',
    color: 'var(--text-gold)',
    borderColor: 'var(--border-gold)'
  }
};

/**
 * FWG primary action button. Gold is the hero CTA; use emerald for
 * "join / start" conversion moments, secondary/ghost for lower priority.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const s = sizes[size] || sizes.md;
  const v = variants[variant] || variants.primary;
  const Tag = as;
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverFx = !disabled && hover ? {
    primary: {
      boxShadow: 'var(--glow-gold-md), var(--inset-gold-hi)',
      filter: 'brightness(1.04)'
    },
    emerald: {
      boxShadow: '0 12px 40px rgba(19,185,120,0.4), var(--inset-top-hi)',
      filter: 'brightness(1.05)'
    },
    secondary: {
      background: 'var(--surface-hover)',
      borderColor: 'var(--border-gold)'
    },
    ghost: {
      color: 'var(--text-gold)',
      background: 'var(--surface-hover)'
    },
    outlineGold: {
      background: 'var(--accent-soft-bg)'
    }
  }[variant] : {};
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    disabled: as === 'button' ? disabled : undefined,
    style: {
      ...base,
      padding: s.padding,
      fontSize: s.fontSize,
      borderRadius: s.radius,
      gap: s.gap,
      width: fullWidth ? '100%' : 'auto',
      opacity: disabled ? 0.45 : 1,
      pointerEvents: disabled ? 'none' : 'auto',
      transform: press ? 'scale(0.975)' : 'scale(1)',
      ...v,
      ...hoverFx,
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Translucent glass panel — the core surface for FWG content blocks.
 * `featured` swaps to a gold border + glow. `interactive` lifts on hover.
 */
function Card({
  children,
  featured = false,
  interactive = false,
  padding = 'var(--space-6)',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      position: 'relative',
      background: featured ? 'linear-gradient(180deg, rgba(214,175,67,0.06), var(--surface-card))' : 'var(--surface-card)',
      backdropFilter: 'blur(var(--blur-sm))',
      WebkitBackdropFilter: 'blur(var(--blur-sm))',
      border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xl)',
      padding,
      boxShadow: featured ? 'var(--glow-gold-sm), var(--shadow-card)' : 'var(--shadow-card)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      transform: hover ? 'translateY(-4px)' : 'translateY(0)',
      ...(hover ? {
        borderColor: 'var(--border-gold)',
        boxShadow: 'var(--glow-gold-md), var(--shadow-lg)'
      } : {}),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Text input with FWG styling. `attached` renders a trailing button slot
 * (e.g. newsletter signup). Gold focus ring.
 */
function Input({
  label = null,
  hint = null,
  iconLeft = null,
  trailing = null,
  type = 'text',
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-wide)',
      textTransform: 'uppercase',
      color: 'var(--text-tertiary)'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '0 6px 0 14px',
      background: 'var(--surface-inset)',
      border: `1px solid ${focus ? 'var(--border-gold)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus ? '0 0 0 3px var(--accent-soft-bg)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-tertiary)',
      display: 'flex'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '13px 0',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      ...inputStyle
    }
  }, rest)), trailing), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * FWG brand lockup. Default is a dependency-free gold typographic
 * wordmark; pass `src` to use the real logo image instead.
 * `variant="mark"` shows just "FWG"; `full` adds the wordmark line.
 */
function Logo({
  variant = 'full',
  src = null,
  height = 34,
  style = {},
  ...rest
}) {
  if (src) {
    return /*#__PURE__*/React.createElement("img", _extends({
      src: src,
      alt: "Forex With Ghasif",
      style: {
        height,
        width: 'auto',
        display: 'block',
        ...style
      }
    }, rest));
  }
  const markSize = height * 0.78;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      flexDirection: 'column',
      lineHeight: 1,
      gap: '3px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extra)',
      fontSize: `${markSize}px`,
      letterSpacing: '0.02em',
      background: 'var(--grad-gold)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
      filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))'
    }
  }, "FWG"), variant === 'full' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-semibold)',
      fontSize: `${markSize * 0.2}px`,
      letterSpacing: '0.34em',
      textTransform: 'uppercase',
      color: 'var(--text-gold)',
      paddingLeft: '2px'
    }
  }, "Forex With Ghasif"));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/PriceTag.jsx
try { (() => {
/**
 * Live trading-pair row — pair, price, and signed change.
 * Used in tickers, watchlists, and the signals feed.
 */
function PriceTag({
  pair,
  price,
  change,
  direction = 'up',
  sparkline = false,
  style = {}
}) {
  const isUp = direction === 'up';
  const color = isUp ? 'var(--bullish)' : 'var(--bearish)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 20%, transparent)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-sm)',
      letterSpacing: 'var(--ls-wide)',
      color: 'var(--text-primary)'
    }
  }, pair)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      color,
      minWidth: '58px',
      textAlign: 'right'
    }
  }, isUp ? '▲' : '▼', " ", change)));
}
Object.assign(__ds_scope, { PriceTag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/PriceTag.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
/**
 * Section eyebrow + title + optional lead. The standard way every
 * homepage section opens. `center` for centered hero-style sections.
 */
function SectionHeading({
  kicker,
  title,
  lead = null,
  align = 'left',
  maxWidth = '54ch',
  style = {}
}) {
  const centered = align === 'center';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      ...style
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-gold)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '1px',
      background: 'var(--border-gold)'
    }
  }), kicker), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-bold)',
      fontSize: 'var(--text-2xl)',
      lineHeight: 'var(--lh-snug)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-primary)',
      maxWidth,
      margin: 0
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--text-secondary)',
      maxWidth: '58ch',
      margin: 0
    }
  }, lead));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Stat.jsx
try { (() => {
/**
 * Big metric block — credibility number with a label and optional delta.
 * Use for success statistics, performance, and trust indicators.
 */
function Stat({
  value,
  label,
  delta = null,
  direction = 'up',
  align = 'left',
  style = {}
}) {
  const isUp = direction === 'up';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, value), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: isUp ? 'var(--bullish)' : 'var(--bearish)'
    }
  }, isUp ? '↗' : '↘', " ", delta)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-wider)',
      color: 'var(--text-tertiary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Stat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Stat.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PlanCard.jsx
try { (() => {
/**
 * Membership / pricing plan card. `featured` highlights the recommended
 * tier with a gold border, glow, and a "Most popular" ribbon.
 */
function PlanCard({
  name,
  price,
  period = '/mo',
  blurb,
  features = [],
  cta = 'Choose plan',
  ctaVariant,
  featured = false,
  ribbon = 'Most popular',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: featured ? 'linear-gradient(180deg, rgba(214,175,67,0.08), var(--surface-card))' : 'var(--surface-card)',
      border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
      boxShadow: featured ? 'var(--glow-gold-sm), var(--shadow-card)' : 'var(--shadow-card)',
      ...style
    }
  }, featured && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "solid"
  }, ribbon)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-gold)'
    }
  }, name), blurb && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)',
      lineHeight: 1.5
    }
  }, blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--fw-extra)',
      fontSize: 'var(--text-3xl)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-primary)'
    }
  }, price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)'
    }
  }, period)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '1px',
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: 1
    }
  }, features.map((f, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: 'var(--accent-soft-bg)',
      color: 'var(--text-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 700,
      marginTop: '1px'
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.5
    }
  }, f)))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: ctaVariant || (featured ? 'primary' : 'secondary'),
    fullWidth: true,
    size: "md"
  }, cta));
}
Object.assign(__ds_scope, { PlanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PlanCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Hero.jsx
try { (() => {
/* FWG, hero with value prop, CTAs, trust strip + floating dashboard. */
function Hero() {
  const ticks = [{
    pair: 'EUR/USD',
    price: '1.1410',
    chg: '+0.18%',
    dir: 'up'
  }, {
    pair: 'GBP/USD',
    price: '1.3245',
    chg: '-0.12%',
    dir: 'down'
  }, {
    pair: 'XAU/USD',
    price: '4,089.26',
    chg: '+1.54%',
    dir: 'up'
  }, {
    pair: 'USD/JPY',
    price: '161.52',
    chg: '+0.21%',
    dir: 'up'
  }, {
    pair: 'GBP/JPY',
    price: '213.94',
    chg: '-0.08%',
    dir: 'down'
  }, {
    pair: 'AUD/USD',
    price: '0.6512',
    chg: '+0.24%',
    dir: 'up'
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'calc(var(--space-9) + 20px) var(--gutter) var(--space-10)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--hero-glow)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(70% 60% at 50% 30%, #000, transparent 80%)',
      WebkitMaskImage: 'radial-gradient(70% 60% at 50% 30%, #000, transparent 80%)',
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1.05fr 0.95fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      maxWidth: '600px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold",
    dot: true
  }, "Premium forex education & signals"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-4xl)',
      lineHeight: 1.02,
      letterSpacing: 'var(--ls-tighter)',
      margin: 0
    }
  }, "Trade with ", /*#__PURE__*/React.createElement("span", {
    className: "fwg-gold-text"
  }, "conviction"), ", not luck."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '52ch'
    }
  }, "Institutional-grade signals, live market breakdowns, and 1:1 mentorship, built to make you a consistent trader, not a gambler."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    })
  }, "Join VIP Signals"), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "performance.html",
    variant: "secondary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "line-chart",
      size: 18
    })
  }, "See the track record")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 'var(--space-7)',
      marginTop: 'var(--space-4)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(KitStat, {
    value: "78.4%",
    label: "Avg win rate"
  }), /*#__PURE__*/React.createElement(KitStat, {
    value: "50+",
    label: "Active members"
  }), /*#__PURE__*/React.createElement(KitStat, {
    value: "+612",
    label: "Pips \xB7 30 days",
    direction: "up"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 18px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "bull",
    dot: true
  }, "Live"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "Signal performance")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, "30D")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-2xl)',
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "+18.7%"), /*#__PURE__*/React.createElement(KitBadge, {
    tone: "bull",
    mono: true
  }, "\u2197 +612 pips")), /*#__PURE__*/React.createElement(EquityCurve, null)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, ticks.slice(0, 3).map(t => /*#__PURE__*/React.createElement("div", {
    key: t.pair,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 12px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: t.dir === 'up' ? 'var(--bullish)' : 'var(--bearish)',
      boxShadow: `0 0 0 3px color-mix(in srgb, ${t.dir === 'up' ? 'var(--bullish)' : 'var(--bearish)'} 20%, transparent)`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 'var(--text-sm)',
      letterSpacing: '0.02em'
    }
  }, t.pair)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)'
    }
  }, t.price), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      fontWeight: 600,
      color: t.dir === 'up' ? 'var(--bullish)' : 'var(--bearish)',
      minWidth: '52px',
      textAlign: 'right'
    }
  }, t.dir === 'up' ? '▲' : '▼', " ", t.chg)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: '-22px',
      left: '-22px',
      width: '150px'
    },
    className: "fwg-hide-sm"
  }, /*#__PURE__*/React.createElement(KitCard, {
    padding: "14px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check",
    size: 16,
    color: "var(--text-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-tertiary)'
    }
  }, "Risk-first")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600
    }
  }, "1 : 3.2"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      color: 'var(--text-muted)',
      marginTop: '2px'
    }
  }, "Avg reward-to-risk"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-xl)',
      margin: 'var(--space-9) auto 0',
      paddingTop: 'var(--space-5)',
      borderTop: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(Ticker, {
    items: ticks
  })));
}
Object.assign(window, {
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Layout.jsx
try { (() => {
/* FWG, shared site chrome: routed Nav, Footer, page-layout helpers, theme.
   Real multi-page navigation via <a href> to sibling .html files. */

function Container({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      padding: '0 var(--gutter)',
      ...style
    }
  }, children);
}
function Section({
  id,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    style: {
      padding: 'var(--section-y) 0',
      position: 'relative',
      ...style
    }
  }, children);
}
function Head({
  kicker,
  title,
  lead,
  align = 'left',
  as = 'h2'
}) {
  const c = align === 'center';
  const Tag = as;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      alignItems: c ? 'center' : 'flex-start',
      textAlign: c ? 'center' : 'left',
      marginBottom: 'var(--space-7)'
    }
  }, kicker && /*#__PURE__*/React.createElement(KitKicker, null, kicker), /*#__PURE__*/React.createElement(Tag, {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.12,
      letterSpacing: 'var(--ls-tight)',
      margin: 0,
      maxWidth: '20ch'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '60ch'
    }
  }, lead));
}
const NAV = [['Home', 'index.html'], ['About', 'about.html'], ['Services', 'services.html'], ['Performance', 'performance.html'], ['Pricing', 'pricing.html'], ['Blog', 'blog.html'], ['Contact', 'contact.html']];
function Nav({
  active,
  theme,
  onToggleTheme
}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', f, {
      passive: true
    });
    f();
    return () => window.removeEventListener('scroll', f);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 60,
      padding: '12px var(--gutter)',
      background: scrolled || open ? 'var(--surface-glass)' : 'transparent',
      backdropFilter: scrolled || open ? 'blur(var(--blur-md))' : 'none',
      WebkitBackdropFilter: scrolled || open ? 'blur(var(--blur-md))' : 'none',
      borderBottom: `1px solid ${scrolled || open ? 'var(--border-subtle)' : 'transparent'}`,
      transition: 'background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("nav", {
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '0 auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "index.html",
    "aria-label": "Forex With Ghasif home",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/fwg-logo.png",
    alt: "Forex With Ghasif",
    style: {
      height: '40px',
      width: 'auto'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "fwg-navlinks",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '2px'
    }
  }, NAV.map(([label, href]) => {
    const on = active === label.toLowerCase();
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: href,
      "aria-current": on ? 'page' : undefined,
      style: {
        position: 'relative',
        padding: '8px 13px',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        color: on ? 'var(--text-gold)' : 'var(--text-secondary)',
        borderRadius: 'var(--radius-sm)',
        transition: 'var(--transition-color)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-primary)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.color = 'var(--text-secondary)';
      }
    }, label, on && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: '13px',
        right: '13px',
        bottom: '1px',
        height: '2px',
        borderRadius: '2px',
        background: 'var(--grad-gold-soft)'
      }
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onToggleTheme,
    "aria-label": "Toggle theme",
    style: {
      width: '40px',
      height: '40px',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-secondary)',
      cursor: 'pointer',
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--border-gold)';
      e.currentTarget.style.color = 'var(--text-gold)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--border-default)';
      e.currentTarget.style.color = 'var(--text-secondary)';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: theme === 'dark' ? 'sun' : 'moon',
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    className: "fwg-hide-mobile"
  }, /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Join VIP")), /*#__PURE__*/React.createElement("button", {
    className: "fwg-menu-btn",
    onClick: () => setOpen(o => !o),
    "aria-label": "Menu",
    "aria-expanded": open,
    style: {
      display: 'none',
      width: '40px',
      height: '40px',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      color: 'var(--text-primary)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 20
  })))), open && /*#__PURE__*/React.createElement("div", {
    className: "fwg-mobile-menu",
    style: {
      maxWidth: 'var(--container-xl)',
      margin: '12px auto 4px',
      display: 'flex',
      flexDirection: 'column',
      gap: '2px'
    }
  }, NAV.map(([label, href]) => {
    const on = active === label.toLowerCase();
    return /*#__PURE__*/React.createElement("a", {
      key: label,
      href: href,
      style: {
        padding: '13px 14px',
        borderRadius: 'var(--radius-md)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-md)',
        fontWeight: 600,
        color: on ? 'var(--text-gold)' : 'var(--text-secondary)',
        background: on ? 'var(--accent-soft-bg)' : 'transparent'
      }
    }, label);
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 4px 6px'
    }
  }, /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    fullWidth: true
  }, "Join VIP Signals"))));
}

/* Reusable inner-page hero band, carries each page's H1 for SEO. */
function PageHero({
  kicker,
  title,
  lead,
  badge
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      padding: 'calc(var(--space-9) + 12px) var(--gutter) var(--space-8)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--hero-glow)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: 'linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)',
      backgroundSize: '64px 64px',
      maskImage: 'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',
      WebkitMaskImage: 'radial-gradient(60% 70% at 50% 0%, #000, transparent 75%)',
      opacity: 0.5,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: 'var(--container-lg)',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '18px',
      textAlign: 'center'
    }
  }, kicker && /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold",
    dot: true
  }, kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-3xl)',
      lineHeight: 1.04,
      letterSpacing: 'var(--ls-tighter)',
      margin: 0,
      maxWidth: '16ch'
    }
  }, title), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '58ch'
    }
  }, lead)));
}
function useTheme() {
  const [theme, setTheme] = React.useState(() => {
    try {
      return localStorage.getItem('fwg-theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('fwg-theme', theme);
    } catch (e) {}
  }, [theme]);
  React.useEffect(() => {
    if (window.lucide) window.lucide.createIcons();
  });
  return [theme, () => setTheme(t => t === 'dark' ? 'light' : 'dark')];
}

/* Scroll-reveal wrapper */
function Reveal({
  children
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(es => {
      es.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fwg-reveal');
          io.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -6% 0px'
    });
    Array.from(el.children).forEach(c => io.observe(c));
    return () => io.disconnect();
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    ref: ref
  }, children);
}

/* Full page wrapper: Nav + content + Footer + theme wiring. */
function Layout({
  active,
  children
}) {
  const [theme, toggle] = useTheme();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: active,
    theme: theme,
    onToggleTheme: toggle
  }), /*#__PURE__*/React.createElement("main", null, children), /*#__PURE__*/React.createElement(Footer, null));
}
Object.assign(window, {
  Container,
  Section,
  Head,
  Nav,
  PageHero,
  useTheme,
  Reveal,
  Layout
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Layout.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pages1.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* FWG, Home, About, Services pages (compose shared blocks + bespoke sections). */

/* ---- shared small pieces ---- */
function FeatureCheck({
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--text-gold)",
    style: {
      marginTop: '2px',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, children));
}

/* ============================ HOME ============================ */
function ServicesPreview() {
  const s = [['bell-ring', 'VIP Forex Signals', '3-5 high-conviction signals daily with full entry, stop and target.'], ['graduation-cap', 'Trading Mentorship', '1:1 and group coaching that builds you into an independent trader.'], ['line-chart', 'Market Analysis', 'Daily briefings and deep dives so you understand every move.']];
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '20px',
      marginBottom: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Head, {
    kicker: "What we do",
    title: "Everything you need to trade with an edge"
  }), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "services.html",
    variant: "outlineGold",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "View all services")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, s.map(([ic, t, d]) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: "services.html",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement(KitCard, {
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-soft-bg)',
      border: '1px solid var(--border-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--text-gold)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: '0 0 14px'
    }
  }, d), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: 'var(--text-gold)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700
    }
  }, "Explore ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15
  }))))))));
}
function IntroBand() {
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KitKicker, null, "Who we are"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.12,
      letterSpacing: 'var(--ls-tight)',
      margin: '14px 0 16px',
      maxWidth: '18ch'
    }
  }, "A serious trading company, not a signal group."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 22px',
      maxWidth: '52ch'
    }
  }, "Forex With Ghasif is an education-led trading brand built on transparency and discipline. We publish our results, teach the reasoning behind every trade, and measure success by how consistent, and independent, our members become."), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "about.html",
    variant: "secondary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Our story & philosophy")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, [['78.4%', 'Avg win rate'], ['50+', 'Active members'], ['1+ year', 'Trading the markets'], ['1:3.2', 'Avg reward-to-risk']].map(([v, l]) => /*#__PURE__*/React.createElement(KitCard, {
    key: l,
    padding: "20px"
  }, /*#__PURE__*/React.createElement(KitStat, {
    value: v,
    label: l
  })))))));
}
function HomePage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(ServicesPreview, null), /*#__PURE__*/React.createElement(IntroBand, null), /*#__PURE__*/React.createElement(Testimonials, null), /*#__PURE__*/React.createElement(CTASection, null)));
}

/* ============================ ABOUT ============================ */
function FounderPhoto({
  ratio = '4/5'
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: ratio,
      borderRadius: 'var(--radius-2xl)',
      overflow: 'hidden',
      border: '1px solid var(--border-gold)',
      boxShadow: 'var(--glow-gold-sm), var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/founder.png",
    alt: "Ghasif, Founder of Forex With Ghasif",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'top center'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 55%, rgba(4,5,8,0.82))'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '18px',
      left: '18px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold",
    dot: true
  }, "Founder")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      padding: '24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-xl)',
      letterSpacing: '-0.01em',
      color: 'var(--text-primary)'
    }
  }, "Ghasif"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-gold)',
      marginTop: '2px'
    }
  }, "Founder & Head Trader")));
}
function AboutPage() {
  const mv = [['target', 'Our mission', 'Make disciplined, risk-first trading accessible, and turn members into confident, independent traders rather than dependent followers.'], ['eye', 'Our vision', 'To be the most trusted name in forex education: known for transparency, consistency, and putting students’ long-term growth first.'], ['scale', 'Our values', 'Honesty over hype. Process over prediction. Risk management before profit. Education at the center of everything.']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "About us",
    title: "The story behind Forex With Ghasif",
    lead: "A premium forex education brand built to bring institutional discipline and radical transparency to everyday traders."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'var(--space-8)',
      alignItems: 'stretch'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement(FounderPhoto, {
    ratio: "1/1"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(KitKicker, null, "Our story"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.12,
      letterSpacing: 'var(--ls-tight)',
      margin: '14px 0 16px',
      maxWidth: '18ch'
    }
  }, "Built on transparency, not promises."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 14px'
    }
  }, "Forex With Ghasif began with a simple frustration: an industry full of screenshots, hype, and get-rich-quick promises, and very little honest teaching. We set out to build the opposite."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 14px'
    }
  }, "Today we\u2019re a community of over 50 traders learning to read the markets with structure and discipline. Every signal is explained. Every result, wins and losses, is logged. The goal isn\u2019t to make you depend on us; it\u2019s to make you a consistent trader who no longer needs to."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'var(--text-xl)',
      lineHeight: 1.35,
      color: 'var(--text-primary)',
      margin: '8px 0 0'
    }
  }, "\u201CWe\u2019re not here to keep you dependent, we\u2019re here to make you independent.\u201D"))))), /*#__PURE__*/React.createElement(Section, {
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "What drives us",
    title: "Mission, vision & values"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, mv.map(([ic, t, d]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--grad-gold-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px',
      boxShadow: 'var(--inset-gold-hi)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "#1a1405"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d)))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(FounderPhoto, null)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KitKicker, null, "Meet the founder"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.12,
      letterSpacing: 'var(--ls-tight)',
      margin: '14px 0 16px',
      maxWidth: '18ch'
    }
  }, "A trader who teaches the way he wished he\u2019d been taught."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 14px'
    }
  }, "Ghasif has spent years trading the currency and metals markets through every condition, and just as long teaching others to do it with structure. His approach is unglamorous on purpose: define your risk, wait for your setup, and let consistency compound."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 20px'
    }
  }, "He mentors every member personally at the highest tier, reviews trade plans, and leads the weekly live sessions where the analysis becomes real decisions in real time."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "contact.html",
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Work with Ghasif"), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "performance.html",
    variant: "secondary"
  }, "See the results")))))), /*#__PURE__*/React.createElement(About, null), /*#__PURE__*/React.createElement(TrustBar, null), /*#__PURE__*/React.createElement(CTASection, null)));
}

/* ============================ SERVICES ============================ */
function ServiceRow({
  icon,
  name,
  blurb,
  points,
  badge,
  href,
  reverse,
  img
}) {
  return /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: reverse ? '0.9fr 1.1fr' : '1.1fr 0.9fr',
      gap: 0,
      alignItems: 'stretch'
    },
    className: "fwg-service-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-7)',
      order: reverse ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '48px',
      height: '48px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-soft-bg)',
      border: '1px solid var(--border-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 22,
    color: "var(--text-gold)"
  })), badge && /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold"
  }, badge)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      margin: '0 0 10px',
      letterSpacing: '-0.01em'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      color: 'var(--text-secondary)',
      margin: '0 0 18px',
      maxWidth: '46ch'
    }
  }, blurb), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px',
      marginBottom: '22px'
    }
  }, points.map(p => /*#__PURE__*/React.createElement(FeatureCheck, {
    key: p
  }, p))), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: href || 'pricing.html',
    variant: "outlineGold",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "Learn more")), /*#__PURE__*/React.createElement("div", {
    style: {
      order: reverse ? 1 : 2,
      minHeight: '260px',
      position: 'relative',
      overflow: 'hidden',
      borderLeft: reverse ? 'none' : '1px solid var(--border-subtle)',
      borderRight: reverse ? '1px solid var(--border-subtle)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(LazyImg, {
    src: img,
    alt: name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: reverse ? 'linear-gradient(90deg, rgba(10,12,17,0.55), transparent 60%)' : 'linear-gradient(270deg, rgba(10,12,17,0.55), transparent 60%)'
    }
  }))));
}
function ServicesPage() {
  const services = [{
    icon: 'bell-ring',
    name: 'VIP Forex Signals',
    badge: 'Most popular',
    img: '../../assets/img/service-signals.jpg',
    blurb: 'Institutional-grade trade ideas delivered in real time, each with a full plan and the reasoning behind it, so every signal also teaches.',
    points: ['3-5 signals daily', 'Entry, stop & target', 'Real-time app & Instagram alerts', 'Gold, indices & major pairs']
  }, {
    icon: 'graduation-cap',
    name: 'Trading Mentorship',
    img: '../../assets/img/service-mentorship.jpg',
    blurb: 'Structured 1:1 and group coaching that takes you from the fundamentals to a repeatable, independent trading process.',
    points: ['Personal trade-plan reviews', '2× monthly 1:1 calls', 'Weekly live sessions', 'Direct access to Ghasif']
  }, {
    icon: 'line-chart',
    name: 'Market Analysis',
    img: '../../assets/img/service-analysis.jpg',
    blurb: 'Daily briefings, economic-calendar reads, and weekly deep dives that give you the context behind every move.',
    points: ['Pre-session outlooks', 'Key levels & bias', 'Weekly structure breakdowns', 'Trade-along commentary']
  }, {
    icon: 'shield-check',
    name: 'Risk Management Training',
    img: '../../assets/img/service-risk.jpg',
    blurb: 'The discipline that actually separates traders who last from those who blow up: position sizing, drawdown control, and psychology.',
    points: ['Position-sizing frameworks', 'Drawdown control', 'Trading psychology', 'Personal risk plan']
  }, {
    icon: 'users',
    name: 'Community Support',
    img: '../../assets/img/service-community.jpg',
    blurb: 'A private, moderated community of serious traders: accountability, shared setups, and answers when you need them.',
    points: ['Private member community', 'Accountability & reviews', 'Setup sharing', 'Responsive support']
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Our services",
    title: "Built to make you a complete trader",
    lead: "Signals, mentorship, analysis, and the risk discipline that ties them together, choose the depth of support that fits where you are."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, services.map((s, i) => /*#__PURE__*/React.createElement(ServiceRow, _extends({
    key: s.name
  }, s, {
    reverse: i % 2 === 1
  })))))), /*#__PURE__*/React.createElement(CTASection, null)));
}
Object.assign(window, {
  HomePage,
  AboutPage,
  ServicesPage,
  FeatureCheck
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pages1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Pages2.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* FWG, Performance, Pricing, Blog, Contact pages. */

/* ============================ PERFORMANCE ============================ */
function ResultsTable() {
  const rows = [['June 2026', '+612', '79.1%', '142', '1:3.4', 'up'], ['May 2026', '+548', '77.4%', '138', '1:3.1', 'up'], ['April 2026', '+421', '75.9%', '131', '1:2.9', 'up'], ['March 2026', '-86', '71.2%', '126', '1:2.4', 'down'], ['February 2026', '+503', '78.6%', '134', '1:3.2', 'up'], ['January 2026', '+477', '76.8%', '129', '1:3.0', 'up']];
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    kicker: "Monthly breakdown",
    title: "Every month, on the record",
    lead: "We log losing months too, March 2026 included. Honest reporting is the only kind worth trusting."
  }), /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fwg-tablewrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fwg-table",
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)'
    }
  }, ['Month', 'Net pips', 'Win rate', 'Trades', 'Avg R:R'].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      padding: '14px 18px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      fontWeight: 700,
      borderBottom: '1px solid var(--border-default)',
      textAlign: i === 0 ? 'left' : 'right'
    }
  }, h)), rows.map((r, ri) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: r[0]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontWeight: 600,
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, r[0]), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px',
      textAlign: 'right',
      fontWeight: 600,
      color: r[5] === 'up' ? 'var(--bullish)' : 'var(--bearish)',
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, r[5] === 'up' ? '+' : '', r[1].replace('+', ''), r[5] === 'up' ? '' : ''), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px',
      textAlign: 'right',
      color: 'var(--text-secondary)',
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, r[2]), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px',
      textAlign: 'right',
      color: 'var(--text-secondary)',
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, r[3]), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '15px 18px',
      textAlign: 'right',
      color: 'var(--text-secondary)',
      borderBottom: ri < rows.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, r[4])))))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-5)',
      maxWidth: '64ch',
      lineHeight: 1.6
    }
  }, "Figures reflect the model VIP account and are net of typical spreads. Past performance is not indicative of future results; individual results vary with execution and risk settings.")));
}
function Transparency() {
  const t = [['file-check', 'Every trade logged', 'Wins and losses are recorded, no deleting the bad ones, no cherry-picked screenshots.'], ['eye', 'Public reporting', 'Monthly figures are published openly so members and prospects see the same numbers we do.'], ['shield-alert', 'Honest risk language', 'We talk in terms of probabilities and risk-adjusted returns, never guarantees.']];
  return /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "How we report",
    title: "Transparency you can verify"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, t.map(([ic, h, d]) => /*#__PURE__*/React.createElement(KitCard, {
    key: h
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 24,
    color: "var(--text-gold)",
    style: {
      marginBottom: '14px'
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      margin: '0 0 8px'
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))));
}
function PerformancePage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Performance",
    title: "Numbers we publish, not promise",
    lead: "A track record only matters if it\u2019s honest. Here\u2019s our model VIP account, wins, losses, and the risk discipline behind both."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Performance, null), /*#__PURE__*/React.createElement(ResultsTable, null), /*#__PURE__*/React.createElement(Transparency, null), /*#__PURE__*/React.createElement(CTASection, null)));
}

/* ============================ PRICING ============================ */
function ComparisonTable() {
  const feats = [['Weekly market recap', true, true, true], ['Education library', true, true, true], ['Community access', true, true, true], ['Daily VIP signals', false, true, true], ['Full trade plans', false, true, true], ['Weekly live review', false, true, true], ['1:1 mentorship calls', false, false, true], ['Personal trade-plan reviews', false, false, true], ['Direct access to Ghasif', false, false, true]];
  const cell = v => v ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 18,
    color: "var(--bullish)"
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 16,
    color: "var(--text-muted)"
  });
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "Compare plans",
    title: "What\u2019s included"
  }), /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fwg-tablewrap"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.6fr 1fr 1fr'
    }
  }, ['Feature', 'VIP', 'Mentorship'].map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      padding: '16px 18px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: i === 2 ? 'var(--text-gold)' : 'var(--text-primary)',
      borderBottom: '1px solid var(--border-default)',
      textAlign: i === 0 ? 'left' : 'center',
      background: i === 2 ? 'var(--accent-soft-bg)' : 'transparent'
    }
  }, h)), feats.map((f, ri) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: f[0]
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      borderBottom: ri < feats.length - 1 ? '1px solid var(--border-subtle)' : 'none'
    }
  }, f[0]), [2, 3].map(ci => /*#__PURE__*/React.createElement("div", {
    key: ci,
    style: {
      padding: '14px 18px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderBottom: ri < feats.length - 1 ? '1px solid var(--border-subtle)' : 'none',
      background: ci === 3 ? 'var(--accent-soft-bg)' : 'transparent'
    }
  }, cell(f[ci]))))))))));
}
function PricingPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Membership",
    title: "Choose your edge",
    lead: "Start free, upgrade when you\u2019re ready. Month-to-month with no lock-in, we\u2019d rather earn your membership every month."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Pricing, null), /*#__PURE__*/React.createElement(ComparisonTable, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(CTASection, null)));
}

/* ============================ BLOG ============================ */
const ONE_PERCENT_ARTICLE = {
  category: 'Risk management',
  read: '9 min read',
  date: 'June 2026',
  author: 'Ghasif',
  title: 'The 1% Rule That Keeps You in the Game',
  img: '../../assets/img/blog-1percent.jpg',
  lead: 'Most traders obsess over entries. The ones who last obsess over how much they can lose. Here is the single rule that has kept disciplined traders in the market long enough to actually win.',
  body: [['h', 'What the 1% rule actually means'], ['p', 'The 1% rule is simple: never risk more than 1% of your trading account on a single trade. Not 1% of your position size, not 1% of your margin, 1% of your total capital. If your account is $10,000, your maximum loss on any one idea is $100. That is the line you do not cross, no matter how confident you feel.'], ['p', 'Notice what this rule is not about. It says nothing about your entry, your indicator, or your win rate. It is purely a survival mechanism, and survival is the thing almost every blown account had in common: the trader was right about direction often enough, but one or two oversized losses erased months of progress.'], ['h', 'Why survival beats being right'], ['p', 'Trading is a game of compounding, and compounding only works if you stay in the game. Consider two traders who both find a strong edge. Trader A risks 1% per trade. Trader B risks 10% because they want to get rich faster. A run of five losing trades, completely normal in any strategy, costs Trader A about 5% of capital. The same run costs Trader B nearly 41%, and to recover from a 41% drawdown they now need a 70% gain just to break even.'], ['quote', 'You do not lose because you are wrong. You lose because you are wrong while risking too much.'], ['h', 'The math of staying alive'], ['p', 'At 1% risk, surviving a brutal losing streak is almost trivial. Ten losses in a row, an event most strategies will never produce, still leaves roughly 90% of your capital intact. That means your edge gets the time it needs to express itself across hundreds of trades, which is the only horizon over which a real edge matters.'], ['list', 'Define risk in money, not pips, before you enter', 'Size the position so the stop-loss equals 1% of the account', 'Move on the moment the stop is hit, no negotiating', 'Never widen a stop to avoid being wrong'], ['h', 'How we apply it at Forex With Ghasif'], ['p', 'Every signal we publish includes a defined stop-loss, because without one there is no way to size a position responsibly. In mentorship, the first thing we build with a new trader is not a strategy, it is a personal risk plan: account size, per-trade risk, and the maximum drawdown that triggers a pause and review. Strategy is what you do when conditions are good. Risk management is what keeps you here when they are not.'], ['p', 'If you take one idea from this article, let it be this: protect your capital first, and let consistency do the slow, boring, reliable work of compounding. That is how traders stay in the game long enough to win it.']]
};
function ArticleModal({
  article,
  onClose
}) {
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  const block = (b, i) => {
    const [type, ...rest] = b;
    if (type === 'h') return /*#__PURE__*/React.createElement("h2", {
      key: i,
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-xl)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--text-primary)',
        margin: '34px 0 12px'
      }
    }, rest[0]);
    if (type === 'p') return /*#__PURE__*/React.createElement("p", {
      key: i,
      style: {
        fontSize: 'var(--text-md)',
        lineHeight: 1.8,
        color: 'var(--text-secondary)',
        margin: '0 0 16px'
      }
    }, rest[0]);
    if (type === 'quote') return /*#__PURE__*/React.createElement("blockquote", {
      key: i,
      style: {
        margin: '26px 0',
        padding: '4px 0 4px 22px',
        borderLeft: '3px solid var(--border-gold)',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        fontSize: 'var(--text-xl)',
        lineHeight: 1.4,
        color: 'var(--text-primary)'
      }
    }, rest[0]);
    if (type === 'list') return /*#__PURE__*/React.createElement("ul", {
      key: i,
      style: {
        margin: '4px 0 20px',
        padding: 0,
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }
    }, rest.map((li, j) => /*#__PURE__*/React.createElement("li", {
      key: j,
      style: {
        display: 'flex',
        gap: '12px',
        alignItems: 'flex-start',
        fontSize: 'var(--text-md)',
        lineHeight: 1.6,
        color: 'var(--text-secondary)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 18,
      color: "var(--text-gold)",
      style: {
        marginTop: '3px',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", null, li))));
    return null;
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    className: "fwg-modal-overlay",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 'clamp(16px,5vh,64px) var(--gutter)',
      overflowY: 'auto',
      background: 'rgba(4,5,8,0.72)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)'
    }
  }, /*#__PURE__*/React.createElement("article", {
    onClick: e => e.stopPropagation(),
    className: "fwg-modal-card",
    style: {
      position: 'relative',
      width: 'min(760px,100%)',
      background: 'var(--bg-elevated)',
      border: '1px solid var(--border-gold)',
      borderRadius: 'var(--radius-2xl)',
      boxShadow: 'var(--glow-gold-sm), var(--shadow-xl)',
      overflow: 'hidden',
      marginBottom: '48px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close article",
    style: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      zIndex: 3,
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      cursor: 'pointer',
      background: 'rgba(10,12,17,0.6)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      border: '1px solid var(--border-strong)',
      color: 'var(--text-primary)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.borderColor = 'var(--border-gold)';
      e.currentTarget.style.color = 'var(--text-gold)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.borderColor = 'var(--border-strong)';
      e.currentTarget.style.color = 'var(--text-primary)';
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 'clamp(180px,32vh,280px)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: article.img,
    alt: article.title,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(180deg, transparent 30%, var(--bg-elevated))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 clamp(22px,5vw,52px) clamp(32px,5vw,52px)',
      marginTop: '-30px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "solid"
  }, article.category), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, article.read), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "\xB7 ", article.date)), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      color: 'var(--text-primary)',
      margin: '0 0 16px'
    }
  }, article.title), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      paddingBottom: '22px',
      marginBottom: '8px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: 'var(--grad-gold-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1a1405',
      fontWeight: 800,
      fontFamily: 'var(--font-display)'
    }
  }, article.author[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, article.author), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, "Founder & Head Trader"))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-lg)',
      lineHeight: 1.6,
      color: 'var(--text-primary)',
      fontWeight: 500,
      margin: '16px 0 8px'
    }
  }, article.lead), article.body.map(block), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '34px',
      paddingTop: '24px',
      borderTop: '1px solid var(--border-subtle)',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '12px',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)'
    }
  }, "Want signals with this discipline built in?"), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 16
    })
  }, "Join VIP Signals")))));
}
function BlogIndex() {
  const cats = ['All', 'Risk management', 'Psychology', 'Market structure', 'Strategy', 'News'];
  const featured = ['Risk management', 'The 1% rule that keeps you in the game', 'Why position sizing, not entries, is the real difference between traders who last and those who blow up. A practical walkthrough of the math and the mindset.', '9 min', '../../assets/img/blog-1percent.jpg'];
  const posts = [['Psychology', 'Trading the plan, not the feeling', 'A framework for removing emotion when the market gets loud.', '8 min', '../../assets/img/blog-plan.jpg'], ['Market structure', 'Reading liquidity like the banks do', 'Spot where smart money is positioned, and why retail enters wrong.', '7 min', '../../assets/img/blog-liquidity.jpg'], ['Strategy', 'Building a repeatable trading routine', 'The daily process that turns random entries into consistent results.', '6 min', '../../assets/img/blog-routine.jpg'], ['Risk management', 'Drawdown: the number that matters most', 'How to think about losing streaks before they happen to you.', '5 min', '../../assets/img/blog-drawdown.jpg'], ['News', 'Trading high-impact news safely', 'What economic releases actually mean for your open risk.', '6 min', '../../assets/img/blog-news.jpg'], ['Psychology', 'Why most traders quit too early', 'The consistency curve, and how to stay on it long enough to win.', '7 min', '../../assets/img/blog-consistency.jpg']];
  const [cat, setCat] = React.useState('All');
  const [open, setOpen] = React.useState(false);
  const shown = cat === 'All' ? posts : posts.filter(p => p[0] === cat);
  return /*#__PURE__*/React.createElement(React.Fragment, null, open && /*#__PURE__*/React.createElement(ArticleModal, {
    article: ONE_PERCENT_ARTICLE,
    onClose: () => setOpen(false)
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    interactive: true,
    style: {
      overflow: 'hidden',
      marginBottom: 'var(--space-7)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      alignItems: 'stretch'
    },
    className: "fwg-service-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '260px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: featured[4],
    alt: featured[1],
    decoding: "async",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(90deg, transparent 55%, var(--surface-card-solid))'
    },
    className: "fwg-feat-fade"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-7)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '14px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "solid"
  }, "Featured"), /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold"
  }, featured[0]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, featured[3])), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-xl)',
      fontWeight: 700,
      margin: '0 0 12px',
      lineHeight: 1.2
    }
  }, featured[1]), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.65,
      color: 'var(--text-secondary)',
      margin: '0 0 18px',
      maxWidth: '48ch'
    }
  }, featured[2]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KitButton, {
    variant: "primary",
    onClick: () => setOpen(true),
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 15
    })
  }, "Read article"))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '8px',
      flexWrap: 'wrap',
      marginBottom: 'var(--space-6)'
    }
  }, cats.map(c => {
    const on = c === cat;
    return /*#__PURE__*/React.createElement("button", {
      key: c,
      onClick: () => setCat(c),
      style: {
        padding: '7px 15px',
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-sm)',
        fontWeight: 600,
        border: `1px solid ${on ? 'var(--border-gold)' : 'var(--border-default)'}`,
        background: on ? 'var(--accent-soft-bg)' : 'transparent',
        color: on ? 'var(--text-gold)' : 'var(--text-secondary)',
        transition: 'var(--transition-base)'
      }
    }, c);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, shown.map(([c, t, d, read, img]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true,
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '150px',
      position: 'relative',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement(LazyImg, {
    src: img,
    alt: t,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold"
  }, c), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, read)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      margin: '0 0 8px',
      lineHeight: 1.25
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))))));
}
function BlogPage() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Insights",
    title: "The Forex With Ghasif blog",
    lead: "Education-first articles on risk, psychology, and market structure, written to sharpen your edge, not sell you a dream."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(BlogIndex, null), /*#__PURE__*/React.createElement(CTASection, null)));
}

/* ============================ CONTACT ============================ */
/* Premium custom dropdown, keyboard + click-outside aware. */
function FancySelect({
  value,
  onChange,
  options,
  icon = 'target'
}) {
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(Math.max(0, options.indexOf(value)));
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const choose = o => {
    onChange(o);
    setOpen(false);
  };
  const onKey = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setActive(a => Math.min(options.length - 1, a + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(a => Math.max(0, a - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (open) choose(options[active]);else setOpen(true);
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    role: "combobox",
    "aria-expanded": open,
    "aria-haspopup": "listbox",
    onClick: () => setOpen(o => !o),
    onKeyDown: onKey,
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      textAlign: 'left',
      background: 'var(--surface-inset)',
      border: `1px solid ${open ? 'var(--border-gold)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '13px 14px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)',
      boxShadow: open ? '0 0 0 3px var(--accent-soft-bg)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon,
    size: 17,
    color: "var(--text-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      transform: open ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform var(--dur-base) var(--ease-out)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 18
  }))), open && /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    className: "fwg-dropdown-menu",
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: 0,
      right: 0,
      zIndex: 20,
      listStyle: 'none',
      margin: 0,
      padding: '6px',
      background: 'var(--surface-glass)',
      backdropFilter: 'blur(var(--blur-md))',
      WebkitBackdropFilter: 'blur(var(--blur-md))',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)'
    }
  }, options.map((o, i) => {
    const sel = o === value,
      hot = i === active;
    return /*#__PURE__*/React.createElement("li", {
      key: o,
      role: "option",
      "aria-selected": sel,
      onMouseEnter: () => setActive(i),
      onClick: () => choose(o),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '11px 12px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontWeight: sel ? 700 : 500,
        color: sel ? 'var(--text-gold)' : 'var(--text-secondary)',
        background: hot ? 'var(--surface-hover)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: '16px',
        display: 'inline-flex',
        justifyContent: 'center',
        color: 'var(--text-gold)'
      }
    }, sel && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15
    })), /*#__PURE__*/React.createElement("span", null, o));
  })));
}

/* Searchable international phone input: country-code selector + number field.
   Matches the form's input styling, radius, and gold focus treatment. */
function PhoneInput({
  value,
  onChange,
  country,
  onCountry,
  required
}) {
  const all = typeof window !== 'undefined' && window.FWG_COUNTRIES || [];
  const [open, setOpen] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const ref = React.useRef(null);
  const searchRef = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setQ('');
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  React.useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);
  const sel = country || all[0] || {
    dial: '1',
    flag: '🇺🇸',
    iso: 'US',
    name: 'United States'
  };
  const filtered = !q ? all : all.filter(c => {
    const s = q.toLowerCase().replace(/^\+/, '');
    return c.name.toLowerCase().includes(s) || c.dial.includes(s) || c.iso.toLowerCase() === s;
  });
  const pick = c => {
    onCountry(c);
    setOpen(false);
    setQ('');
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      gap: '8px',
      background: 'var(--surface-inset)',
      border: `1px solid ${focus || open ? 'var(--border-gold)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus || open ? '0 0 0 3px var(--accent-soft-bg)' : 'none',
      transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Select country code",
    "aria-expanded": open,
    onClick: () => setOpen(o => !o),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer',
      background: 'transparent',
      border: 'none',
      borderRight: '1px solid var(--border-default)',
      padding: '13px 12px',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '16px',
      lineHeight: 1
    }
  }, sel.flag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 600
    }
  }, "+", sel.dial), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      transform: open ? 'rotate(180deg)' : 'rotate(0)',
      transition: 'transform var(--dur-base) var(--ease-out)',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down",
    size: 15
  }))), /*#__PURE__*/React.createElement("input", {
    required: required,
    type: "tel",
    inputMode: "tel",
    placeholder: "Phone number",
    value: value,
    onChange: e => onChange(e.target.value.replace(/[^0-9\s\-()]/g, '')),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '13px 14px 13px 2px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)'
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    className: "fwg-dropdown-menu",
    style: {
      position: 'absolute',
      top: 'calc(100% + 8px)',
      left: 0,
      zIndex: 30,
      width: 'min(340px, 90vw)',
      background: 'var(--surface-glass)',
      backdropFilter: 'blur(var(--blur-md))',
      WebkitBackdropFilter: 'blur(var(--blur-md))',
      border: '1px solid var(--border-strong)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '0 10px',
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-default)',
      borderRadius: 'var(--radius-sm)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    size: 15,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    ref: searchRef,
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "Search country or code",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      padding: '9px 0',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-primary)'
    }
  }))), /*#__PURE__*/React.createElement("ul", {
    role: "listbox",
    style: {
      listStyle: 'none',
      margin: 0,
      padding: '6px',
      maxHeight: '260px',
      overflowY: 'auto'
    }
  }, filtered.length === 0 && /*#__PURE__*/React.createElement("li", {
    style: {
      padding: '14px',
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 'var(--text-sm)'
    }
  }, "No matches"), filtered.map(c => {
    const on = c.iso === sel.iso;
    return /*#__PURE__*/React.createElement("li", {
      key: c.iso,
      role: "option",
      "aria-selected": on,
      onClick: () => pick(c),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 11px',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        background: on ? 'var(--accent-soft-bg)' : 'transparent',
        transition: 'background var(--dur-fast) var(--ease-out)'
      },
      onMouseEnter: e => {
        if (!on) e.currentTarget.style.background = 'var(--surface-hover)';
      },
      onMouseLeave: e => {
        if (!on) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: '17px',
        lineHeight: 1,
        flexShrink: 0
      }
    }, c.flag), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 'var(--text-sm)',
        color: on ? 'var(--text-gold)' : 'var(--text-secondary)',
        fontWeight: on ? 700 : 500,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--text-sm)',
        color: 'var(--text-tertiary)',
        flexShrink: 0
      }
    }, "+", c.dial));
  }))));
}
function ContactForm() {
  const [sent, setSent] = React.useState(false);
  const [f, setF] = React.useState({
    name: '',
    email: '',
    phone: '',
    topic: 'VIP Signals',
    message: ''
  });
  const [country, setCountry] = React.useState(null);
  const fld = k => ({
    value: f[k],
    onChange: e => setF(s => ({
      ...s,
      [k]: e.target.value
    }))
  });
  const inputStyle = {
    width: '100%',
    background: 'var(--surface-inset)',
    border: '1px solid var(--border-default)',
    borderRadius: 'var(--radius-md)',
    padding: '13px 14px',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--text-sm)',
    color: 'var(--text-primary)',
    outline: 'none'
  };
  const lab = {
    fontSize: 'var(--text-xs)',
    fontWeight: 600,
    letterSpacing: 'var(--ls-wide)',
    textTransform: 'uppercase',
    color: 'var(--text-tertiary)',
    marginBottom: '8px',
    display: 'block'
  };
  return /*#__PURE__*/React.createElement(KitCard, null, sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '30px 10px',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'var(--bullish-bg)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28,
    color: "var(--bullish)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      margin: 0
    }
  }, "Message sent"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '36ch'
    }
  }, "Thanks, we\u2019ll get back to you within one business day."), /*#__PURE__*/React.createElement(KitButton, {
    variant: "secondary",
    onClick: () => setSent(false)
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '18px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    className: "fwg-grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Name"), /*#__PURE__*/React.createElement("input", _extends({
    required: true,
    placeholder: "Your name",
    style: inputStyle
  }, fld('name')))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Email"), /*#__PURE__*/React.createElement("input", _extends({
    required: true,
    type: "email",
    placeholder: "you@email.com",
    style: inputStyle
  }, fld('email'))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    className: "fwg-grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Phone number"), /*#__PURE__*/React.createElement(PhoneInput, {
    required: true,
    value: f.phone,
    onChange: v => setF(s => ({
      ...s,
      phone: v
    })),
    country: country,
    onCountry: setCountry
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "I\u2019m interested in"), /*#__PURE__*/React.createElement(FancySelect, {
    value: f.topic,
    onChange: v => setF(s => ({
      ...s,
      topic: v
    })),
    options: ['VIP Signals', 'Mentorship', 'Market Analysis', 'General enquiry']
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Message"), /*#__PURE__*/React.createElement("textarea", _extends({
    required: true,
    rows: 5,
    placeholder: "Tell us a little about your trading and what you\u2019re looking for\u2026",
    style: {
      ...inputStyle,
      resize: 'vertical'
    }
  }, fld('message')))), /*#__PURE__*/React.createElement(KitButton, {
    as: "button",
    type: "submit",
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "send",
      size: 17
    })
  }, "Send message")));
}
function ContactPage() {
  const channels = [['mail', 'Email', 'mirzaghasif111@gmail.com', 'For general enquiries & partnerships', 'mailto:mirzaghasif111@gmail.com'], ['instagram', 'Instagram', '@ForexWithGhasif', 'Fastest way to reach the team', 'https://instagram.com/ForexWithGhasif'], ['message-circle', 'WhatsApp', 'Message us directly', 'Members get priority support', 'https://wa.me/']];
  const socials = [['instagram', 'Instagram'], ['facebook', 'Facebook'], ['whatsapp', 'WhatsApp']];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHero, {
    kicker: "Contact",
    title: "Let\u2019s talk trading",
    lead: "Questions about VIP Signals or mentorship? Reach out, we usually reply within one business day."
  }), /*#__PURE__*/React.createElement(Reveal, null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      gap: 'var(--space-8)',
      alignItems: 'start'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement(ContactForm, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, channels.map(([ic, t, v, d, href]) => /*#__PURE__*/React.createElement("a", {
    key: t,
    href: href,
    target: href && href.startsWith('http') ? '_blank' : undefined,
    rel: href && href.startsWith('http') ? 'noopener noreferrer' : undefined,
    style: {
      display: 'block',
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement(KitCard, {
    interactive: true,
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      height: '46px',
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-soft-bg)',
      border: '1px solid var(--border-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    color: "var(--text-gold)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      fontWeight: 700,
      marginBottom: '3px'
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, v), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)',
      marginTop: '2px'
    }
  }, d)))))), /*#__PURE__*/React.createElement(KitCard, {
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      fontWeight: 700,
      marginBottom: '14px'
    }
  }, "Follow us"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }
  }, socials.map(([ic, l]) => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: (window.FWG_SOCIAL || {})[ic] || '#',
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": l,
    style: {
      width: '42px',
      height: '42px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--text-gold)';
      e.currentTarget.style.borderColor = 'var(--border-gold)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-secondary)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement(SocialGlyph, {
    name: ic,
    size: 18
  })))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      margin: '16px 0 0',
      lineHeight: 1.6
    }
  }, "Risk warning: trading forex carries a high level of risk. Never trade with money you cannot afford to lose."))))))));
}
Object.assign(window, {
  PerformancePage,
  PricingPage,
  BlogPage,
  ContactPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Pages2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections.jsx
try { (() => {
/* FWG, primary content blocks (Container/Section/Head come from Layout.jsx). */

function TrustBar() {
  const items = [['shield-check', 'Risk-first framework'], ['candlestick-chart', 'Live trade breakdowns'], ['users', '50+ traders'], ['graduation-cap', 'Mentor-led education'], ['bell-ring', 'Real-time alerts']];
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      padding: 'var(--space-7) 0'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '18px 40px',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: 0.92
    }
  }, items.map(([ic, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--text-tertiary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18,
    color: "var(--text-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      letterSpacing: '0.01em'
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '1px',
      background: 'var(--divider-gold)',
      marginTop: 'var(--space-7)'
    }
  })));
}
function WhyChoose() {
  const f = [['target', 'Precision over noise', 'Every call ships with exact entry, stop-loss, and targets, plus the reasoning, so you learn while you trade.'], ['shield-check', 'Risk-first by design', 'We size positions around capital protection. Discipline is the edge; survival compounds returns.'], ['radio', 'Real-time delivery', 'Signals and market alerts land the moment setups confirm, synced across Instagram, the app, and email.'], ['line-chart', 'Transparent track record', 'Wins and losses logged publicly. No cherry-picking, no fantasy screenshots, no hype.'], ['graduation-cap', 'Built to make you independent', 'The goal isn’t dependence on signals, it’s turning you into a confident, self-sufficient trader.'], ['headset', 'Mentor access', 'Direct guidance from Ghasif and senior traders through reviews, calls, and a private community.']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "why"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    kicker: "Why choose us",
    title: "A trading edge you can actually follow",
    lead: "Forex With Ghasif is built on transparency, discipline, and education, the opposite of the get-rich-quick noise that fills this industry."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, f.map(([ic, t, d]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '46px',
      height: '46px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-soft-bg)',
      border: '1px solid var(--border-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '16px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 22,
    color: "var(--text-gold)"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      margin: '0 0 8px',
      letterSpacing: '-0.01em'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))));
}
function About() {
  const principles = [['Capital preservation first', 'We never risk more than a defined fraction of the account. Protecting downside is what keeps you in the game long enough to win.'], ['Process over prediction', 'We don’t predict the market, we react to confirmed structure with a repeatable, rules-based plan.'], ['Patience is a position', 'The best trade is often no trade. We wait for A-grade setups instead of forcing the market.']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "about"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(KitKicker, null, "About Forex With Ghasif"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 700,
      fontSize: 'var(--text-2xl)',
      lineHeight: 1.12,
      letterSpacing: 'var(--ls-tight)',
      margin: '14px 0 16px',
      maxWidth: '16ch'
    }
  }, "A mentor, not a hype machine."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.7,
      color: 'var(--text-secondary)',
      margin: '0 0 16px'
    }
  }, "Ghasif has spent years trading the currency and metals markets and teaching others to do the same with structure and discipline. Forex With Ghasif exists to give serious traders an honest, education-led path to consistency."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-serif)',
      fontStyle: 'italic',
      fontSize: 'var(--text-xl)',
      lineHeight: 1.35,
      color: 'var(--text-primary)',
      margin: '0 0 22px'
    }
  }, "\u201CDiscipline is the edge. Everything else is ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-gold)'
    }
  }, "noise."), "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/ForexWithGhasif",
    target: "_blank",
    rel: "noopener",
    "aria-label": "Follow Forex With Ghasif on Instagram",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      padding: '11px 18px',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      border: '1px solid var(--border-gold)',
      color: 'var(--text-gold)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700,
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = 'var(--accent-soft-bg)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = 'transparent';
    }
  }, /*#__PURE__*/React.createElement(SocialGlyph, {
    name: "instagram",
    size: 18
  }), " Follow on Instagram"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '14px'
    }
  }, /*#__PURE__*/React.createElement(KitKicker, {
    style: {
      marginBottom: '2px'
    }
  }, "Our trading philosophy"), principles.map(([t, d], i) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true,
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      color: 'var(--text-gold)',
      minWidth: '34px'
    }
  }, String(i + 1).padStart(2, '0')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      margin: '0 0 6px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d)))))))));
}
function Signals() {
  const incl = ['3-5 high-conviction signals daily', 'Exact entry, stop-loss & take-profit', 'Full reasoning on every trade', 'Real-time Instagram & app alerts', 'Weekly live market review', 'Major-pairs, gold & indices coverage'];
  return /*#__PURE__*/React.createElement(Section, {
    id: "signals",
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 0.85fr',
      gap: 'var(--space-8)',
      alignItems: 'center'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Head, {
    kicker: "VIP Signals",
    title: "Signals you can trust and learn from",
    lead: "No black-box alerts. Every VIP signal comes with the full trade plan and the logic behind it, so each trade sharpens your own edge."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '24px'
    }
  }, incl.map(t => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    color: "var(--text-gold)",
    style: {
      marginTop: '2px',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      lineHeight: 1.5
    }
  }, t)))), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    })
  }, "Join VIP Signals")), /*#__PURE__*/React.createElement(KitCard, {
    featured: true,
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 18px',
      borderBottom: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      fontSize: 'var(--text-sm)'
    }
  }, "XAU/USD"), /*#__PURE__*/React.createElement(KitBadge, {
    tone: "bull",
    dot: true
  }, "Buy")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, "Posted 2m ago")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 18px'
    }
  }, /*#__PURE__*/React.createElement(CandleChart, {
    height: 130
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 18px 18px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '10px'
    }
  }, [['Entry', '2,338.4', 'var(--text-primary)'], ['Stop', '2,332.0', 'var(--bearish)'], ['Target', '2,357.5', 'var(--bullish)']].map(([l, v, c]) => /*#__PURE__*/React.createElement("div", {
    key: l,
    style: {
      padding: '12px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-inset)',
      border: '1px solid var(--border-subtle)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: 'var(--text-muted)',
      marginBottom: '6px'
    }
  }, l), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      color: c
    }
  }, v))))))));
}
function Mentorship() {
  const tiers = [['graduation-cap', 'Foundations academy', 'Structured lessons from the basics of price action to advanced risk management, at your own pace.'], ['users', 'Group coaching', 'Weekly live sessions where we break down the markets, review setups, and answer your questions.'], ['crown', '1:1 mentorship', 'Private coaching with Ghasif, personalised trade plan reviews and a path to consistent, independent trading.']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "mentorship"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "Mentorship & education",
    title: "Learn to trade for yourself",
    lead: "Signals get you started. Education makes you independent. Choose the depth of guidance that fits where you are."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, tiers.map(([ic, t, d]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '52px',
      height: '52px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--grad-gold-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '18px',
      boxShadow: 'var(--inset-gold-hi)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 24,
    color: "#1a1405"
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-lg)',
      fontWeight: 600,
      margin: '0 0 8px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: '0 0 16px'
    }
  }, d), /*#__PURE__*/React.createElement("a", {
    href: "pricing.html",
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      color: 'var(--text-gold)',
      fontSize: 'var(--text-sm)',
      fontWeight: 700
    }
  }, "Learn more ", /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 15
  })))))));
}
function Analysis() {
  const items = [['newspaper', 'Daily market briefings', 'Pre-session outlooks on the pairs that matter, with key levels and the bias for the day.'], ['calendar-clock', 'Economic calendar reads', 'We translate high-impact news into what it actually means for your open risk.'], ['layers', 'Weekly deep dives', 'Long-form breakdowns of structure, sentiment, and the setups forming across the week.'], ['compass', 'Trade-along sessions', 'Watch the analysis turn into live decisions, in real time, with full commentary.']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "analysis",
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    kicker: "Market analysis",
    title: "Context before every trade",
    lead: "Signals without context build dependence. Our analysis teaches you to see what we see, so you understand every move."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px'
    },
    className: "fwg-grid-2"
  }, items.map(([ic, t, d]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '44px',
      height: '44px',
      flexShrink: 0,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-soft-bg)',
      border: '1px solid var(--border-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 20,
    color: "var(--text-gold)"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      margin: '0 0 6px'
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d))))))));
}
Object.assign(window, {
  TrustBar,
  WhyChoose,
  About,
  Signals,
  Mentorship,
  Analysis
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Sections2.jsx
try { (() => {
/* FWG, proof, conversion & closing sections. */

function Performance() {
  const stats = [['78.4%', 'Avg win rate', '+2.1% MoM', 'up'], ['+612', 'Pips · last 30 days', 'best month yet', 'up'], ['1 : 3.2', 'Avg reward-to-risk', 'disciplined sizing', 'up'], ['4.1%', 'Max drawdown', 'risk controlled', 'down']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "results"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    kicker: "Performance & results",
    title: "Numbers we publish, not promise",
    lead: "A track record only matters if it\u2019s honest. We log every trade, the losers included, and report the figures that actually reflect risk-adjusted consistency."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '18px',
      alignItems: 'stretch'
    },
    className: "fwg-hero-grid"
  }, /*#__PURE__*/React.createElement(KitCard, {
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'var(--text-tertiary)',
      marginBottom: '8px'
    }
  }, "Verified equity curve \xB7 12 months"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-3xl)',
      fontWeight: 600,
      letterSpacing: '-0.02em'
    }
  }, "+143.8%"), /*#__PURE__*/React.createElement(KitBadge, {
    tone: "bull",
    mono: true
  }, "\u2197 compounded"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "Past performance \u2260 future results")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px'
    }
  }, /*#__PURE__*/React.createElement(EquityCurve, {
    height: 220
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '14px'
    }
  }, stats.map(([v, l, d, dir]) => /*#__PURE__*/React.createElement(KitCard, {
    key: l,
    padding: "20px",
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(KitStat, {
    value: v,
    label: l
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: '14px',
      fontSize: 'var(--text-2xs)',
      fontFamily: 'var(--font-mono)',
      color: dir === 'up' ? 'var(--bullish)' : 'var(--bearish)'
    }
  }, d)))))));
}
function Testimonials() {
  const t = [['I came in blowing accounts. Eight months later I’m green and, more importantly, calm. The risk framework changed everything.', 'Daniel R.', 'VIP member · 8 months'], ['Ghasif actually teaches. Every signal explains the “why”, so I’m finally building my own read of the market instead of copying blindly.', 'Aisha M.', 'Mentorship · 1 year'], ['The transparency sold me. They post the losses too. That honesty is rare in this space and it’s why I trust the calls.', 'Marcus L.', 'VIP member · 5 months'], ['Went from random entries to a repeatable plan. My drawdowns are smaller and my confidence is higher. Worth every penny.', 'Priya S.', 'Mentorship · 6 months']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "testimonials",
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "Student results",
    title: "Traders who found consistency",
    lead: "Real members, real progress, built on discipline and education, not overnight miracles."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '18px'
    },
    className: "fwg-grid-2"
  }, t.map(([q, n, r]) => /*#__PURE__*/React.createElement(KitCard, {
    key: n,
    interactive: true
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '3px',
      marginBottom: '14px'
    }
  }, [0, 1, 2, 3, 4].map(i => /*#__PURE__*/React.createElement(Icon, {
    key: i,
    name: "star",
    size: 15,
    color: "var(--text-gold)",
    strokeWidth: 0
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.6,
      color: 'var(--text-primary)',
      margin: '0 0 18px',
      fontWeight: 500
    }
  }, "\u201C", q, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: 'var(--grad-gold-soft)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#1a1405',
      fontWeight: 800,
      fontFamily: 'var(--font-display)'
    }
  }, n[0]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      fontWeight: 700
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-tertiary)'
    }
  }, r))))))));
}
function Pricing() {
  const plans = [{
    name: 'VIP Signals',
    price: 'Free',
    period: '',
    blurb: 'Daily signals with full trade plans.',
    features: ['3-5 signals daily', 'Entry, stop & target on every call', 'Private Instagram & app alerts', 'Weekly live market review', 'Gold, indices & major pairs'],
    cta: 'Join VIP',
    href: 'contact.html',
    featured: true
  }, {
    name: 'Mentorship',
    price: '$20',
    blurb: '1:1 coaching to consistency.',
    features: ['Everything in VIP', '2× monthly 1:1 calls', 'Personal trade-plan reviews', 'Direct access to Ghasif', 'Custom risk framework'],
    highlights: ['Forex Trading Mentorship', 'Complete Masterclass Course', 'Premium Trading Signals'],
    cta: 'Apply now',
    href: 'contact.html',
    variant: 'outlineGold'
  }];
  return /*#__PURE__*/React.createElement(Section, {
    id: "pricing"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "Plans",
    title: "Simple, honest pricing",
    lead: "Start free, upgrade when you\u2019re ready. Cancel anytime, we\u2019d rather earn your membership every month."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, minmax(0, 380px))',
      gap: '18px',
      alignItems: 'stretch',
      marginTop: '12px',
      justifyContent: 'center'
    },
    className: "fwg-grid-2"
  }, plans.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: p.featured ? 'linear-gradient(180deg, rgba(214,175,67,0.08), var(--surface-card))' : 'var(--surface-card)',
      border: `1px solid ${p.featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
      boxShadow: p.featured ? 'var(--glow-gold-sm), var(--shadow-card)' : 'var(--shadow-card)'
    }
  }, p.featured && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "solid"
  }, "Most popular")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-xs)',
      fontWeight: 700,
      letterSpacing: 'var(--ls-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-gold)',
      marginBottom: '6px'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)',
      lineHeight: 1.5
    }
  }, p.blurb)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '4px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-3xl)',
      letterSpacing: '-0.02em'
    }
  }, p.price), p.period !== '' && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)'
    }
  }, p.period || '/mo')), /*#__PURE__*/React.createElement("div", {
    style: {
      height: '1px',
      background: 'var(--border-subtle)'
    }
  }), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      flex: p.highlights ? '0 0 auto' : 1
    }
  }, p.features.map(f => /*#__PURE__*/React.createElement("li", {
    key: f,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: 'var(--accent-soft-bg)',
      color: 'var(--text-gold)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
      fontWeight: 700,
      marginTop: '1px'
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.5
    }
  }, f)))), p.highlights && /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      marginTop: '2px',
      padding: '16px',
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(180deg, rgba(214,175,67,0.10), rgba(214,175,67,0.02))',
      border: '1px solid var(--border-gold)',
      boxShadow: 'var(--inset-gold-hi)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '7px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "gem",
    size: 14,
    color: "var(--text-gold)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-2xs)',
      fontWeight: 700,
      letterSpacing: 'var(--ls-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-gold)'
    }
  }, "Premium inclusions")), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '11px'
    }
  }, p.highlights.map(h => /*#__PURE__*/React.createElement("li", {
    key: h,
    style: {
      display: 'flex',
      gap: '10px',
      alignItems: 'center',
      fontSize: 'var(--text-sm)',
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    color: "var(--text-gold)",
    style: {
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      lineHeight: 1.4
    }
  }, h))))), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: p.href || 'contact.html',
    variant: p.featured ? 'primary' : p.variant || 'secondary',
    fullWidth: true
  }, p.cta)))), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      marginTop: 'var(--space-6)',
      maxWidth: '60ch',
      marginInline: 'auto',
      lineHeight: 1.6
    }
  }, "Trading foreign exchange carries substantial risk and is not suitable for every investor. Past performance is not indicative of future results.")));
}
function FAQ() {
  const qs = [['Do you guarantee profits?', 'No, and you should run from anyone who does. We provide education, signals, and a disciplined framework. Markets carry real risk; our job is to put the odds and the process on your side.'], ['Do I need any experience to start?', 'Not at all. Our free VIP tier and Foundations material assume zero background. Many members join knowing nothing and build up step by step.'], ['How much money do I need to begin?', 'You can start learning with any amount, even on a demo account. For live trading we teach you to risk a small, fixed percentage per trade, so your capital decides position size, not the other way around.'], ['How are the signals delivered?', 'In real time through our private WhatsApp Community, each signal with entry, stop-loss, take-profit, and the reasoning behind the trade.'], ['Which broker or platform do I need?', 'Any reputable broker with major forex pairs and gold works. We give general guidance on choosing one, but you keep full control of your own funds and account.'], ['How much time does this take each day?', 'Most members spend 30 to 60 minutes a day. Signals and analysis are delivered ready to act on, and the live sessions are recorded so you can catch up any time.'], ['What markets do you cover?', 'Major and minor forex pairs, gold (XAU/USD), and select indices. We focus on liquid markets with clean, readable structure.'], ['Is the mentorship really 1:1?', 'Yes. The Mentorship tier includes private calls and personalised trade-plan reviews directly with Ghasif and senior mentors.'], ['Can I cancel anytime, and how do I join?', 'Memberships are month to month with no lock-in. To join, pick a plan on the Pricing page or message us on Instagram and we will get you set up.']];
  const [open, setOpen] = React.useState(-1);
  return /*#__PURE__*/React.createElement(Section, {
    id: "faq"
  }, /*#__PURE__*/React.createElement(Container, {
    style: {
      maxWidth: 'var(--container-md)'
    }
  }, /*#__PURE__*/React.createElement(Head, {
    align: "center",
    kicker: "FAQ",
    title: "Questions, answered honestly"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }
  }, qs.map(([q, a], i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        borderRadius: 'var(--radius-lg)',
        background: 'var(--surface-card)',
        border: `1px solid ${isOpen ? 'var(--border-gold)' : 'var(--border-default)'}`,
        overflow: 'hidden',
        transition: 'border-color var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '18px 22px',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-md)',
        fontWeight: 600
      }
    }, q, /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
        transition: 'transform var(--dur-base) var(--ease-out)',
        color: 'var(--text-gold)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 20
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height var(--dur-slow) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        padding: '0 22px 20px',
        margin: 0,
        fontSize: 'var(--text-sm)',
        lineHeight: 1.7,
        color: 'var(--text-secondary)'
      }
    }, a)));
  }))));
}
function Blog() {
  const posts = [['Risk management', 'The 1% rule that keeps you in the game', 'Why position sizing, not entries, is the real difference between traders who last and traders who blow up.', '6 min'], ['Psychology', 'Trading the plan, not the feeling', 'A practical framework for removing emotion from your decisions when the market gets loud.', '8 min'], ['Market structure', 'Reading liquidity like the banks do', 'How to spot where smart money is positioned, and why most retail traders enter at exactly the wrong time.', '7 min']];
  return /*#__PURE__*/React.createElement(Section, {
    id: "blog",
    style: {
      background: 'var(--bg-elevated)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      gap: '20px',
      marginBottom: 'var(--space-7)',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Head, {
    kicker: "From the blog",
    title: "Insights to sharpen your edge"
  }), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "blog.html",
    variant: "ghost",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    })
  }, "All articles")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)',
      gap: '18px'
    },
    className: "fwg-grid-3"
  }, posts.map(([cat, t, d, read]) => /*#__PURE__*/React.createElement(KitCard, {
    key: t,
    interactive: true,
    padding: "0",
    style: {
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '128px',
      background: 'linear-gradient(135deg, var(--ink-800), var(--ink-750))',
      position: 'relative',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--glow-gold)',
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    size: 32,
    color: "var(--text-gold)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px'
    }
  }, /*#__PURE__*/React.createElement(KitBadge, {
    tone: "gold"
  }, cat), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, read)), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      margin: '0 0 8px',
      lineHeight: 1.25
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.6,
      color: 'var(--text-secondary)',
      margin: 0
    }
  }, d)))))));
}
function CTASection() {
  return /*#__PURE__*/React.createElement(Section, {
    id: "join"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: 'var(--radius-2xl)',
      padding: 'var(--space-10) var(--gutter)',
      background: 'linear-gradient(135deg, var(--ink-850), var(--ink-900))',
      border: '1px solid var(--border-gold)',
      textAlign: 'center',
      boxShadow: 'var(--glow-gold-md), var(--shadow-xl)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--glow-gold)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: '640px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement(KitKicker, null, "Your edge starts now"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 800,
      fontSize: 'var(--text-3xl)',
      lineHeight: 1.05,
      letterSpacing: 'var(--ls-tight)',
      margin: 0
    }
  }, "Stop gambling. Start ", /*#__PURE__*/React.createElement("span", {
    className: "fwg-gold-text"
  }, "trading with a system.")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-md)',
      lineHeight: 1.65,
      color: 'var(--text-secondary)',
      margin: 0,
      maxWidth: '48ch'
    }
  }, "Join 50+ traders building real, repeatable consistency with Forex With Ghasif. Start free, upgrade when you\u2019re ready."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '4px'
    }
  }, /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "pricing.html",
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-up-right",
      size: 18
    })
  }, "Join VIP Signals"), /*#__PURE__*/React.createElement(KitButton, {
    as: "a",
    href: "contact.html",
    variant: "secondary",
    size: "lg",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "calendar",
      size: 18
    })
  }, "Book a mentorship call"))))));
}
function Footer() {
  const [email, setEmail] = React.useState('');
  const [focus, setFocus] = React.useState(false);
  const cols = [['Trading', [['VIP Signals', 'services.html'], ['Market Analysis', 'services.html'], ['Performance', 'performance.html'], ['Trading Blog', 'blog.html']]], ['Learn', [['Mentorship', 'services.html'], ['Risk Management', 'services.html'], ['Community', 'services.html'], ['Free Resources', 'blog.html']]], ['Company', [['About Ghasif', 'about.html'], ['Our Philosophy', 'about.html'], ['Pricing', 'pricing.html'], ['Contact', 'contact.html']]]];
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: '1px solid var(--border-subtle)',
      background: 'var(--bg-deep)',
      paddingTop: 'var(--space-9)'
    }
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
      gap: 'var(--space-7)',
      paddingBottom: 'var(--space-8)'
    },
    className: "fwg-foot-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/fwg-logo.png",
    alt: "Forex With Ghasif",
    style: {
      height: '52px',
      width: 'auto',
      marginBottom: '18px'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 'var(--text-sm)',
      lineHeight: 1.65,
      color: 'var(--text-tertiary)',
      margin: '0 0 18px',
      maxWidth: '34ch'
    }
  }, "Premium forex signals, mentorship, and market education, built on transparency, discipline, and long-term consistency."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: '10px'
    }
  }, ['instagram', 'facebook', 'whatsapp'].map(s => /*#__PURE__*/React.createElement("a", {
    key: s,
    href: (window.FWG_SOCIAL || {})[s] || '#',
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": s,
    style: {
      width: '38px',
      height: '38px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-default)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-secondary)',
      transition: 'var(--transition-base)'
    },
    onMouseEnter: e => {
      e.currentTarget.style.color = 'var(--text-gold)';
      e.currentTarget.style.borderColor = 'var(--border-gold)';
    },
    onMouseLeave: e => {
      e.currentTarget.style.color = 'var(--text-secondary)';
      e.currentTarget.style.borderColor = 'var(--border-default)';
    }
  }, /*#__PURE__*/React.createElement(SocialGlyph, {
    name: s,
    size: 17
  }))))), cols.map(([h, links]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-2xs)',
      textTransform: 'uppercase',
      letterSpacing: '0.14em',
      color: 'var(--text-muted)',
      fontWeight: 700,
      marginBottom: '16px'
    }
  }, h), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '11px'
    }
  }, links.map(([l, href]) => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: href,
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)',
      transition: 'var(--transition-color)'
    },
    onMouseEnter: e => e.currentTarget.style.color = 'var(--text-gold)',
    onMouseLeave: e => e.currentTarget.style.color = 'var(--text-secondary)'
  }, l))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) 0',
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: '36ch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'var(--text-md)',
      fontWeight: 600,
      marginBottom: '4px'
    }
  }, "Weekly market edge, in your inbox"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'var(--text-sm)',
      color: 'var(--text-tertiary)'
    }
  }, "Free analysis and one high-conviction idea every Sunday. No spam.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '5px 6px 5px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-inset)',
      border: `1px solid ${focus ? 'var(--border-gold)' : 'var(--border-default)'}`,
      minWidth: '320px',
      boxShadow: focus ? '0 0 0 3px var(--accent-soft-bg)' : 'none',
      transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    size: 17,
    color: "var(--text-tertiary)"
  }), /*#__PURE__*/React.createElement("input", {
    value: email,
    onChange: e => setEmail(e.target.value),
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    placeholder: "you@email.com",
    type: "email",
    style: {
      flex: 1,
      minWidth: 0,
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: 'var(--text-primary)',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-sm)',
      padding: '10px 0'
    }
  }), /*#__PURE__*/React.createElement(KitButton, {
    variant: "primary",
    size: "sm"
  }, "Subscribe"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 'var(--space-6) 0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)'
    }
  }, "\xA9 2026 Forex With Ghasif. All rights reserved."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 'var(--text-xs)',
      color: 'var(--text-muted)',
      maxWidth: '62ch',
      lineHeight: 1.6,
      textAlign: 'right'
    }
  }, "Risk warning: Trading forex and CFDs carries a high level of risk and may not be suitable for all investors. Never trade with money you cannot afford to lose."))));
}
Object.assign(window, {
  Performance,
  Testimonials,
  Pricing,
  FAQ,
  Blog,
  CTASection,
  Footer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Sections2.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/Visuals.jsx
try { (() => {
/* FWG — trading data visuals (charts are content, not decoration). */

function EquityCurve({
  width = 520,
  height = 200,
  stroke = 'var(--emerald-400)'
}) {
  // deterministic up-and-to-the-right equity curve with a gentle drawdown
  const pts = [12, 18, 15, 28, 34, 30, 44, 52, 48, 63, 72, 68, 84, 96, 90, 108, 124, 118, 140, 160];
  const max = Math.max(...pts),
    min = Math.min(...pts);
  const stepX = width / (pts.length - 1);
  const xy = pts.map((p, i) => [i * stepX, height - 8 - (p - min) / (max - min) * (height - 28)]);
  const line = xy.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${line} L${width} ${height} L0 ${height} Z`;
  const gid = 'eq' + Math.round(width);
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${width} ${height}`,
    width: "100%",
    style: {
      display: 'block'
    },
    preserveAspectRatio: "none"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: gid,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "rgba(19,185,120,0.28)"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "rgba(19,185,120,0)"
  }))), [0.25, 0.5, 0.75].map((g, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: "0",
    x2: width,
    y1: height * g,
    y2: height * g,
    stroke: "var(--border-subtle)",
    strokeWidth: "1"
  })), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: `url(#${gid})`
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: stroke,
    strokeWidth: "2.5",
    strokeLinejoin: "round",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: xy[xy.length - 1][0],
    cy: xy[xy.length - 1][1],
    r: "4.5",
    fill: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: xy[xy.length - 1][0],
    cy: xy[xy.length - 1][1],
    r: "9",
    fill: "none",
    stroke: stroke,
    strokeWidth: "1.5",
    opacity: "0.4"
  }));
}
function CandleChart({
  height = 120
}) {
  const candles = [
  // [open,close,low,high] 0-100 scale
  [40, 55, 34, 60], [55, 48, 44, 62], [48, 64, 46, 70], [64, 58, 52, 68], [58, 72, 55, 78], [72, 66, 62, 80], [66, 80, 63, 86], [80, 74, 70, 88], [74, 88, 72, 94], [88, 82, 78, 96], [82, 70, 66, 90], [70, 84, 68, 90], [84, 92, 80, 98], [92, 86, 82, 98]];
  const cw = 100 / candles.length;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: "100%",
    height: height,
    preserveAspectRatio: "none",
    style: {
      display: 'block'
    }
  }, candles.map((c, i) => {
    const [o, cl, lo, hi] = c;
    const up = cl >= o;
    const col = up ? 'var(--emerald-400)' : 'var(--crimson-400)';
    const x = i * cw + cw / 2;
    const bw = cw * 0.5;
    const top = 100 - Math.max(o, cl),
      bh = Math.abs(cl - o) || 1.5;
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("line", {
      x1: x,
      x2: x,
      y1: 100 - hi,
      y2: 100 - lo,
      stroke: col,
      strokeWidth: "0.6"
    }), /*#__PURE__*/React.createElement("rect", {
      x: x - bw / 2,
      y: top,
      width: bw,
      height: bh,
      fill: col,
      rx: "0.4"
    }));
  }));
}
function Ticker({
  items
}) {
  const row = items.concat(items);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: 'hidden',
      position: 'relative',
      maskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)',
      WebkitMaskImage: 'linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-flex',
      gap: '40px',
      whiteSpace: 'nowrap',
      animation: 'fwgmarquee 38s linear infinite',
      willChange: 'transform'
    }
  }, row.map((it, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      color: 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-primary)',
      fontWeight: 600
    }
  }, it.pair), /*#__PURE__*/React.createElement("span", null, it.price), /*#__PURE__*/React.createElement("span", {
    style: {
      color: it.dir === 'up' ? 'var(--bullish)' : 'var(--bearish)'
    }
  }, it.dir === 'up' ? '▲' : '▼', " ", it.chg)))));
}
Object.assign(window, {
  EquityCurve,
  CandleChart,
  Ticker
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/Visuals.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/countries.js
try { (() => {
/* All international country calling codes (ISO 3166 + ITU dial codes).
   Exposed as window.FWG_COUNTRIES = [{name, iso, dial, flag}]. */
(function () {
  var raw = [["Afghanistan", "AF", "93"], ["Albania", "AL", "355"], ["Algeria", "DZ", "213"], ["Andorra", "AD", "376"], ["Angola", "AO", "244"], ["Antigua and Barbuda", "AG", "1268"], ["Argentina", "AR", "54"], ["Armenia", "AM", "374"], ["Australia", "AU", "61"], ["Austria", "AT", "43"], ["Azerbaijan", "AZ", "994"], ["Bahamas", "BS", "1242"], ["Bahrain", "BH", "973"], ["Bangladesh", "BD", "880"], ["Barbados", "BB", "1246"], ["Belarus", "BY", "375"], ["Belgium", "BE", "32"], ["Belize", "BZ", "501"], ["Benin", "BJ", "229"], ["Bhutan", "BT", "975"], ["Bolivia", "BO", "591"], ["Bosnia and Herzegovina", "BA", "387"], ["Botswana", "BW", "267"], ["Brazil", "BR", "55"], ["Brunei", "BN", "673"], ["Bulgaria", "BG", "359"], ["Burkina Faso", "BF", "226"], ["Burundi", "BI", "257"], ["Cambodia", "KH", "855"], ["Cameroon", "CM", "237"], ["Canada", "CA", "1"], ["Cape Verde", "CV", "238"], ["Central African Republic", "CF", "236"], ["Chad", "TD", "235"], ["Chile", "CL", "56"], ["China", "CN", "86"], ["Colombia", "CO", "57"], ["Comoros", "KM", "269"], ["Congo", "CG", "242"], ["Congo (DRC)", "CD", "243"], ["Costa Rica", "CR", "506"], ["Côte d’Ivoire", "CI", "225"], ["Croatia", "HR", "385"], ["Cuba", "CU", "53"], ["Cyprus", "CY", "357"], ["Czechia", "CZ", "420"], ["Denmark", "DK", "45"], ["Djibouti", "DJ", "253"], ["Dominica", "DM", "1767"], ["Dominican Republic", "DO", "1809"], ["Ecuador", "EC", "593"], ["Egypt", "EG", "20"], ["El Salvador", "SV", "503"], ["Equatorial Guinea", "GQ", "240"], ["Eritrea", "ER", "291"], ["Estonia", "EE", "372"], ["Eswatini", "SZ", "268"], ["Ethiopia", "ET", "251"], ["Fiji", "FJ", "679"], ["Finland", "FI", "358"], ["France", "FR", "33"], ["Gabon", "GA", "241"], ["Gambia", "GM", "220"], ["Georgia", "GE", "995"], ["Germany", "DE", "49"], ["Ghana", "GH", "233"], ["Greece", "GR", "30"], ["Grenada", "GD", "1473"], ["Guatemala", "GT", "502"], ["Guinea", "GN", "224"], ["Guinea-Bissau", "GW", "245"], ["Guyana", "GY", "592"], ["Haiti", "HT", "509"], ["Honduras", "HN", "504"], ["Hong Kong", "HK", "852"], ["Hungary", "HU", "36"], ["Iceland", "IS", "354"], ["India", "IN", "91"], ["Indonesia", "ID", "62"], ["Iran", "IR", "98"], ["Iraq", "IQ", "964"], ["Ireland", "IE", "353"], ["Israel", "IL", "972"], ["Italy", "IT", "39"], ["Jamaica", "JM", "1876"], ["Japan", "JP", "81"], ["Jordan", "JO", "962"], ["Kazakhstan", "KZ", "7"], ["Kenya", "KE", "254"], ["Kiribati", "KI", "686"], ["Kuwait", "KW", "965"], ["Kyrgyzstan", "KG", "996"], ["Laos", "LA", "856"], ["Latvia", "LV", "371"], ["Lebanon", "LB", "961"], ["Lesotho", "LS", "266"], ["Liberia", "LR", "231"], ["Libya", "LY", "218"], ["Liechtenstein", "LI", "423"], ["Lithuania", "LT", "370"], ["Luxembourg", "LU", "352"], ["Macau", "MO", "853"], ["Madagascar", "MG", "261"], ["Malawi", "MW", "265"], ["Malaysia", "MY", "60"], ["Maldives", "MV", "960"], ["Mali", "ML", "223"], ["Malta", "MT", "356"], ["Marshall Islands", "MH", "692"], ["Mauritania", "MR", "222"], ["Mauritius", "MU", "230"], ["Mexico", "MX", "52"], ["Micronesia", "FM", "691"], ["Moldova", "MD", "373"], ["Monaco", "MC", "377"], ["Mongolia", "MN", "976"], ["Montenegro", "ME", "382"], ["Morocco", "MA", "212"], ["Mozambique", "MZ", "258"], ["Myanmar", "MM", "95"], ["Namibia", "NA", "264"], ["Nauru", "NR", "674"], ["Nepal", "NP", "977"], ["Netherlands", "NL", "31"], ["New Zealand", "NZ", "64"], ["Nicaragua", "NI", "505"], ["Niger", "NE", "227"], ["Nigeria", "NG", "234"], ["North Korea", "KP", "850"], ["North Macedonia", "MK", "389"], ["Norway", "NO", "47"], ["Oman", "OM", "968"], ["Pakistan", "PK", "92"], ["Palau", "PW", "680"], ["Palestine", "PS", "970"], ["Panama", "PA", "507"], ["Papua New Guinea", "PG", "675"], ["Paraguay", "PY", "595"], ["Peru", "PE", "51"], ["Philippines", "PH", "63"], ["Poland", "PL", "48"], ["Portugal", "PT", "351"], ["Qatar", "QA", "974"], ["Romania", "RO", "40"], ["Russia", "RU", "7"], ["Rwanda", "RW", "250"], ["Saint Kitts and Nevis", "KN", "1869"], ["Saint Lucia", "LC", "1758"], ["Saint Vincent and the Grenadines", "VC", "1784"], ["Samoa", "WS", "685"], ["San Marino", "SM", "378"], ["São Tomé and Príncipe", "ST", "239"], ["Saudi Arabia", "SA", "966"], ["Senegal", "SN", "221"], ["Serbia", "RS", "381"], ["Seychelles", "SC", "248"], ["Sierra Leone", "SL", "232"], ["Singapore", "SG", "65"], ["Slovakia", "SK", "421"], ["Slovenia", "SI", "386"], ["Solomon Islands", "SB", "677"], ["Somalia", "SO", "252"], ["South Africa", "ZA", "27"], ["South Korea", "KR", "82"], ["South Sudan", "SS", "211"], ["Spain", "ES", "34"], ["Sri Lanka", "LK", "94"], ["Sudan", "SD", "249"], ["Suriname", "SR", "597"], ["Sweden", "SE", "46"], ["Switzerland", "CH", "41"], ["Syria", "SY", "963"], ["Taiwan", "TW", "886"], ["Tajikistan", "TJ", "992"], ["Tanzania", "TZ", "255"], ["Thailand", "TH", "66"], ["Timor-Leste", "TL", "670"], ["Togo", "TG", "228"], ["Tonga", "TO", "676"], ["Trinidad and Tobago", "TT", "1868"], ["Tunisia", "TN", "216"], ["Turkey", "TR", "90"], ["Turkmenistan", "TM", "993"], ["Tuvalu", "TV", "688"], ["Uganda", "UG", "256"], ["Ukraine", "UA", "380"], ["United Arab Emirates", "AE", "971"], ["United Kingdom", "GB", "44"], ["United States", "US", "1"], ["Uruguay", "UY", "598"], ["Uzbekistan", "UZ", "998"], ["Vanuatu", "VU", "678"], ["Vatican City", "VA", "379"], ["Venezuela", "VE", "58"], ["Vietnam", "VN", "84"], ["Yemen", "YE", "967"], ["Zambia", "ZM", "260"], ["Zimbabwe", "ZW", "263"]];
  function flag(iso) {
    return iso.toUpperCase().replace(/./g, function (c) {
      return String.fromCodePoint(127397 + c.charCodeAt(0));
    });
  }
  window.FWG_COUNTRIES = raw.map(function (r) {
    return {
      name: r[0],
      iso: r[1],
      dial: r[2],
      flag: flag(r[1])
    };
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/countries.js", error: String((e && e.message) || e) }); }

// ui_kits/website/kit.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Forex With Ghasif — UI kit shared primitives (cosmetic, self-contained).
   Mirrors the design-system components but needs no bundle so the kit
   always renders. Exposed on window for the section files. */

function KitButton({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth,
  as = 'button',
  ...rest
}) {
  const [h, setH] = React.useState(false),
    [p, setP] = React.useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-sm)',
      radius: 'var(--radius-sm)',
      gap: '7px'
    },
    md: {
      padding: '12px 22px',
      fontSize: 'var(--text-sm)',
      radius: 'var(--radius-md)',
      gap: '9px'
    },
    lg: {
      padding: '16px 30px',
      fontSize: 'var(--text-md)',
      radius: 'var(--radius-md)',
      gap: '11px'
    }
  }[size];
  const V = {
    primary: {
      background: 'var(--grad-gold-soft)',
      color: 'var(--accent-contrast)',
      boxShadow: 'var(--glow-gold-sm), var(--inset-gold-hi)',
      border: '1px solid transparent'
    },
    emerald: {
      background: 'var(--grad-emerald)',
      color: '#04120c',
      boxShadow: 'var(--glow-emerald-sm), var(--inset-top-hi)',
      border: '1px solid transparent'
    },
    secondary: {
      background: 'var(--surface-card)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-strong)',
      boxShadow: 'var(--inset-top-hi)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)',
      border: '1px solid transparent'
    },
    outlineGold: {
      background: 'transparent',
      color: 'var(--text-gold)',
      border: '1px solid var(--border-gold)'
    }
  }[variant];
  const hov = h ? {
    primary: {
      boxShadow: 'var(--glow-gold-md), var(--inset-gold-hi)',
      filter: 'brightness(1.04)'
    },
    emerald: {
      boxShadow: '0 12px 40px rgba(19,185,120,0.4), var(--inset-top-hi)',
      filter: 'brightness(1.05)'
    },
    secondary: {
      background: 'var(--surface-hover)',
      borderColor: 'var(--border-gold)'
    },
    ghost: {
      color: 'var(--text-gold)',
      background: 'var(--surface-hover)'
    },
    outlineGold: {
      background: 'var(--accent-soft-bg)'
    }
  }[variant] : {};
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    onMouseEnter: () => setH(true),
    onMouseLeave: () => {
      setH(false);
      setP(false);
    },
    onMouseDown: () => setP(true),
    onMouseUp: () => setP(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-body)',
      fontWeight: 'var(--fw-bold)',
      letterSpacing: 'var(--ls-tight)',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textDecoration: 'none',
      padding: sizes.padding,
      fontSize: sizes.fontSize,
      borderRadius: sizes.radius,
      gap: sizes.gap,
      width: fullWidth ? '100%' : 'auto',
      transform: p ? 'scale(0.975)' : 'scale(1)',
      transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out), filter var(--dur-base) var(--ease-out)',
      ...V,
      ...hov
    }
  }, rest), iconLeft, children, iconRight);
}
function KitBadge({
  children,
  tone = 'gold',
  dot,
  mono,
  style
}) {
  const T = {
    gold: {
      bg: 'var(--accent-soft-bg)',
      fg: 'var(--text-gold)',
      bd: 'rgba(214,175,67,0.3)'
    },
    bull: {
      bg: 'var(--bullish-bg)',
      fg: 'var(--bullish)',
      bd: 'rgba(19,185,120,0.32)'
    },
    bear: {
      bg: 'var(--bearish-bg)',
      fg: 'var(--bearish)',
      bd: 'rgba(228,71,74,0.32)'
    },
    neutral: {
      bg: 'var(--surface-card)',
      fg: 'var(--text-secondary)',
      bd: 'var(--border-default)'
    },
    solid: {
      bg: 'var(--grad-gold-soft)',
      fg: 'var(--accent-contrast)',
      bd: 'transparent'
    }
  }[tone];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 11px',
      borderRadius: 'var(--radius-pill)',
      background: T.bg,
      color: T.fg,
      border: `1px solid ${T.bd}`,
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: mono ? '-0.01em' : 'var(--ls-wide)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap',
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'currentColor',
      boxShadow: '0 0 0 3px color-mix(in srgb, currentColor 22%, transparent)'
    }
  }), children);
}
function KitCard({
  children,
  featured,
  interactive,
  padding = 'var(--space-6)',
  style,
  ...rest
}) {
  const [h, setH] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => interactive && setH(true),
    onMouseLeave: () => interactive && setH(false),
    style: {
      position: 'relative',
      background: featured ? 'linear-gradient(180deg, rgba(214,175,67,0.06), var(--surface-card))' : 'var(--surface-card)',
      backdropFilter: 'blur(var(--blur-sm))',
      WebkitBackdropFilter: 'blur(var(--blur-sm))',
      border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
      borderRadius: 'var(--radius-xl)',
      padding,
      boxShadow: featured ? 'var(--glow-gold-sm), var(--shadow-card)' : 'var(--shadow-card)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      transform: h ? 'translateY(-4px)' : 'translateY(0)',
      ...(h ? {
        borderColor: 'var(--border-gold)',
        boxShadow: 'var(--glow-gold-md), var(--shadow-lg)'
      } : {}),
      ...style
    }
  }, rest), children);
}
function KitStat({
  value,
  label,
  delta,
  direction = 'up',
  align = 'left'
}) {
  const up = direction === 'up';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '10px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--text-2xl)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-tight)',
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, value), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-sm)',
      fontWeight: 'var(--fw-semibold)',
      color: up ? 'var(--bullish)' : 'var(--bearish)'
    }
  }, up ? '↗' : '↘', " ", delta)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-2xs)',
      fontWeight: 'var(--fw-semibold)',
      textTransform: 'uppercase',
      letterSpacing: 'var(--ls-wider)',
      color: 'var(--text-tertiary)'
    }
  }, label));
}
function KitKicker({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-xs)',
      fontWeight: 'var(--fw-semibold)',
      letterSpacing: 'var(--ls-wider)',
      textTransform: 'uppercase',
      color: 'var(--text-gold)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '22px',
      height: '1px',
      background: 'var(--border-gold)'
    }
  }), children);
}
function Icon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.9,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (window.lucide && ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          'stroke-width': strokeWidth
        },
        nameAttr: 'data-lucide'
      });
    }
  });
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      color,
      ...style
    }
  });
}

/* Social glyphs: lucide for most, custom SVG for brands lucide lacks (WhatsApp). */
function SocialGlyph({
  name,
  size = 18,
  style
}) {
  if (name === 'whatsapp') {
    return /*#__PURE__*/React.createElement("svg", {
      viewBox: "0 0 24 24",
      width: size,
      height: size,
      fill: "currentColor",
      style: {
        display: 'inline-flex',
        ...style
      },
      "aria-hidden": "true"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
    }));
  }
  return /*#__PURE__*/React.createElement(Icon, {
    name: name,
    size: size,
    style: style
  });
}

/* Reliable lazy image: loads via IntersectionObserver (native loading="lazy"
   is unreliable inside sandboxed iframes). rootMargin preloads just before
   the image scrolls into view. Pass eager to load immediately (above fold). */
function LazyImg({
  src,
  alt = '',
  style,
  eager = false,
  imgProps = {}
}) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(!!eager);
  React.useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const show = () => {
      if (!done) {
        done = true;
        setShown(true);
      }
    };
    let io;
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(es => {
        es.forEach(e => {
          if (e.isIntersecting) {
            show();
            io.disconnect();
          }
        });
      }, {
        rootMargin: '600px'
      });
      io.observe(el);
    }
    // Safety net: load shortly after first paint so images never stay blank
    // (e.g. when the page never scrolls). Still deferred off the critical path.
    const t = setTimeout(show, 1400);
    return () => {
      clearTimeout(t);
      if (io) io.disconnect();
    };
  }, [shown]);
  return /*#__PURE__*/React.createElement("img", _extends({
    ref: ref,
    src: shown ? src : undefined,
    alt: alt,
    decoding: "async",
    style: style
  }, imgProps));
}
Object.assign(window, {
  KitButton,
  KitBadge,
  KitCard,
  KitStat,
  KitKicker,
  Icon,
  SocialGlyph,
  LazyImg
});

/* Official social/contact destinations (single source of truth). */
window.FWG_SOCIAL = {
  instagram: 'https://instagram.com/ForexWithGhasif',
  facebook: 'https://facebook.com/ForexWithGhasif',
  whatsapp: 'https://wa.me/'
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/kit.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/shaderbg.js
try { (() => {
/* Forex With Ghasif — premium interactive shader wallpaper.
   Fixed full-viewport WebGL backdrop: obsidian base with soft gold/emerald
   glows, organic idle motion, and eased mouse interaction. Theme-aware.
   Loads behind all content (z-index:-1) and degrades gracefully if WebGL
   or THREE is unavailable (html keeps its solid --bg-base fallback). */
(function () {
  function boot() {
    if (!window.THREE) {
      return setTimeout(boot, 60);
    }
    var THREE = window.THREE;
    var canvas = document.createElement('canvas');
    canvas.id = 'fwg-shader-bg';
    canvas.setAttribute('aria-hidden', 'true');
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      zIndex: '-1',
      pointerEvents: 'none',
      display: 'block'
    });
    document.body.appendChild(canvas);
    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      canvas.remove();
      return;
    }
    var DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(DPR);
    var scene = new THREE.Scene();
    var camera = new THREE.Camera();
    function themeVal() {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 1 : 0;
    }
    var uniforms = {
      uTime: {
        value: 0
      },
      uRes: {
        value: new THREE.Vector2(1, 1)
      },
      uMouse: {
        value: new THREE.Vector2(0.5, 0.5)
      },
      uMouseV: {
        value: 0
      },
      uTheme: {
        value: themeVal()
      }
    };
    var vert = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }';
    var frag = ['precision highp float;', 'varying vec2 vUv;', 'uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uMouseV; uniform float uTheme;', 'float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }', 'float noise(vec2 p){ vec2 i=floor(p), f=fract(p); float a=hash(i),b=hash(i+vec2(1.,0.)),c=hash(i+vec2(0.,1.)),d=hash(i+vec2(1.,1.)); vec2 u=f*f*(3.-2.*f); return mix(a,b,u.x)+(c-a)*u.y*(1.-u.x)+(d-b)*u.x*u.y; }', 'float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<4;i++){ v+=a*noise(p); p*=2.02; a*=0.5; } return v; }', 'void main(){', '  vec2 uv=vUv; vec2 asp=vec2(uRes.x/uRes.y,1.0);', '  vec2 p=(uv-0.5)*asp; vec2 m=(uMouse-0.5)*asp;', '  float md=distance(p,m);', '  vec2 dir=normalize(p-m+0.0001);', '  float bend=smoothstep(0.7,0.0,md)*(0.03+uMouseV*0.10);', '  p-=dir*bend;', '  float t=uTime*0.05;', '  vec2 q=vec2(fbm(p*1.1+t), fbm(p*1.1-t+5.2));', '  float n=fbm(p*1.25 + q*1.6 + t);', '  vec2 g1=vec2(sin(t*1.3)*0.55, 0.35+cos(t*1.1)*0.3);', '  vec2 g2=vec2(cos(t*0.8)*0.6, -0.2+sin(t*1.5)*0.4);', '  float gold=smoothstep(1.05,0.0,distance(p,g1));', '  float em=smoothstep(1.25,0.0,distance(p,g2));', '  float glow=pow(max(n,0.0),1.5);', '  vec3 base=mix(vec3(0.020,0.024,0.032), vec3(0.972,0.957,0.918), uTheme);', '  vec3 goldC=vec3(0.84,0.69,0.27); vec3 emC=vec3(0.07,0.55,0.40);', '  float gi=mix(0.090,0.060,uTheme); float ei=mix(0.050,0.030,uTheme);', '  vec3 col=base;', '  col+=goldC*gold*glow*gi;', '  col+=emC*em*glow*ei;', '  float prox=smoothstep(0.30,0.0,md);', '  col+=goldC*prox*(0.045+uMouseV*0.10)*mix(1.0,0.6,uTheme);', '  col*=1.0-0.30*length(uv-0.5);', '  col*=mix(0.82,0.94,uTheme);', '  gl_FragColor=vec4(col,1.0);', '}'].join('\n');
    var mat = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert,
      fragmentShader: frag
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));
    function resize() {
      var w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h, false);
      uniforms.uRes.value.set(w * DPR, h * DPR);
    }
    window.addEventListener('resize', resize);
    resize();

    // eased mouse follow
    var target = {
        x: 0.5,
        y: 0.5
      },
      cur = {
        x: 0.5,
        y: 0.5
      },
      vel = 0;
    function onMove(cx, cy) {
      target.x = cx / window.innerWidth;
      target.y = 1 - cy / window.innerHeight;
    }
    window.addEventListener('mousemove', function (e) {
      onMove(e.clientX, e.clientY);
    }, {
      passive: true
    });
    window.addEventListener('touchmove', function (e) {
      if (e.touches[0]) onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, {
      passive: true
    });

    // Soft gold cursor glow that trails the pointer and fades when idle.
    var glow = document.createElement('div');
    glow.setAttribute('aria-hidden', 'true');
    Object.assign(glow.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '460px',
      height: '460px',
      marginLeft: '-230px',
      marginTop: '-230px',
      borderRadius: '50%',
      zIndex: '0',
      pointerEvents: 'none',
      mixBlendMode: 'screen',
      opacity: '0',
      background: 'radial-gradient(circle, rgba(214,175,67,0.16) 0%, rgba(214,175,67,0.06) 32%, rgba(214,175,67,0) 68%)',
      transition: 'opacity 500ms ease',
      willChange: 'transform, opacity'
    });
    var glowMounted = false;
    var gpos = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    var graw = {
      x: gpos.x,
      y: gpos.y
    };
    var idleT = null;
    function pointer(cx, cy) {
      graw.x = cx;
      graw.y = cy;
      if (!glowMounted) {
        document.body.appendChild(glow);
        glowMounted = true;
      }
      glow.style.opacity = '1';
      clearTimeout(idleT);
      idleT = setTimeout(function () {
        glow.style.opacity = '0';
      }, 1600);
    }
    window.addEventListener('mousemove', function (e) {
      pointer(e.clientX, e.clientY);
    }, {
      passive: true
    });
    window.addEventListener('mousedown', function () {
      glow.style.transform += '';
      glow.animate && glow.animate([{
        filter: 'brightness(1.8)'
      }, {
        filter: 'brightness(1)'
      }], {
        duration: 420,
        easing: 'ease-out'
      });
    }, {
      passive: true
    });
    window.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
    }, {
      passive: true
    });
    new MutationObserver(function () {
      uniforms.uTheme.value = themeVal();
    }).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    var running = true;
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(loop);
    });
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var last = performance.now();
    function loop(now) {
      if (!running) return;
      var dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      var px = cur.x,
        py = cur.y;
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      var dv = Math.sqrt((cur.x - px) * (cur.x - px) + (cur.y - py) * (cur.y - py)) / Math.max(dt, 0.001);
      vel += (Math.min(dv, 3) - vel) * 0.1;
      uniforms.uMouse.value.set(cur.x, cur.y);
      uniforms.uMouseV.value = vel;
      uniforms.uTime.value += reduce ? 0.0 : dt;
      // ease the cursor glow toward the raw pointer
      gpos.x += (graw.x - gpos.x) * 0.18;
      gpos.y += (graw.y - gpos.y) * 0.18;
      if (glowMounted) glow.style.transform = 'translate(' + gpos.x + 'px,' + gpos.y + 'px)';
      renderer.render(scene, camera);
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);else boot();
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/shaderbg.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.PriceTag = __ds_scope.PriceTag;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Stat = __ds_scope.Stat;

__ds_ns.PlanCard = __ds_scope.PlanCard;

})();

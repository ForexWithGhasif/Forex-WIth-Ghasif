import React from 'react';

const sizes = {
  sm: { padding: '8px 16px', fontSize: 'var(--text-sm)', radius: 'var(--radius-sm)', gap: '7px' },
  md: { padding: '12px 22px', fontSize: 'var(--text-sm)', radius: 'var(--radius-md)', gap: '9px' },
  lg: { padding: '16px 30px', fontSize: 'var(--text-md)', radius: 'var(--radius-md)', gap: '11px' },
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
  WebkitTapHighlightColor: 'transparent',
};

const variants = {
  primary: {
    background: 'var(--grad-gold-soft)',
    color: 'var(--accent-contrast)',
    boxShadow: 'var(--glow-gold-sm), var(--inset-gold-hi)',
  },
  emerald: {
    background: 'var(--grad-emerald)',
    color: '#04120c',
    boxShadow: 'var(--glow-emerald-sm), var(--inset-top-hi)',
  },
  secondary: {
    background: 'var(--surface-card)',
    color: 'var(--text-primary)',
    borderColor: 'var(--border-strong)',
    boxShadow: 'var(--inset-top-hi)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text-secondary)',
    borderColor: 'transparent',
  },
  outlineGold: {
    background: 'transparent',
    color: 'var(--text-gold)',
    borderColor: 'var(--border-gold)',
  },
};

/**
 * FWG primary action button. Gold is the hero CTA; use emerald for
 * "join / start" conversion moments, secondary/ghost for lower priority.
 */
export function Button({
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
    primary: { boxShadow: 'var(--glow-gold-md), var(--inset-gold-hi)', filter: 'brightness(1.04)' },
    emerald: { boxShadow: '0 12px 40px rgba(19,185,120,0.4), var(--inset-top-hi)', filter: 'brightness(1.05)' },
    secondary: { background: 'var(--surface-hover)', borderColor: 'var(--border-gold)' },
    ghost: { color: 'var(--text-gold)', background: 'var(--surface-hover)' },
    outlineGold: { background: 'var(--accent-soft-bg)' },
  }[variant] : {};

  return (
    <Tag
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      disabled={as === 'button' ? disabled : undefined}
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}

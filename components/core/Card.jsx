import React from 'react';

/**
 * Translucent glass panel — the core surface for FWG content blocks.
 * `featured` swaps to a gold border + glow. `interactive` lifts on hover.
 */
export function Card({
  children,
  featured = false,
  interactive = false,
  padding = 'var(--space-6)',
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        position: 'relative',
        background: featured
          ? 'linear-gradient(180deg, rgba(214,175,67,0.06), var(--surface-card))'
          : 'var(--surface-card)',
        backdropFilter: 'blur(var(--blur-sm))',
        WebkitBackdropFilter: 'blur(var(--blur-sm))',
        border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-xl)',
        padding,
        boxShadow: featured
          ? 'var(--glow-gold-sm), var(--shadow-card)'
          : 'var(--shadow-card)',
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        transform: hover ? 'translateY(-4px)' : 'translateY(0)',
        ...(hover ? {
          borderColor: 'var(--border-gold)',
          boxShadow: 'var(--glow-gold-md), var(--shadow-lg)',
        } : {}),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

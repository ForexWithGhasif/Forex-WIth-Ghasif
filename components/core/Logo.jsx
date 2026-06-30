import React from 'react';

/**
 * FWG brand lockup. Default is a dependency-free gold typographic
 * wordmark; pass `src` to use the real logo image instead.
 * `variant="mark"` shows just "FWG"; `full` adds the wordmark line.
 */
export function Logo({ variant = 'full', src = null, height = 34, style = {}, ...rest }) {
  if (src) {
    return <img src={src} alt="Forex With Ghasif" style={{ height, width: 'auto', display: 'block', ...style }} {...rest} />;
  }
  const markSize = height * 0.78;
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', lineHeight: 1, gap: '3px', ...style }} {...rest}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-extra)',
        fontSize: `${markSize}px`,
        letterSpacing: '0.02em',
        background: 'var(--grad-gold)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.4))',
      }}>FWG</span>
      {variant === 'full' && (
        <span style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 'var(--fw-semibold)',
          fontSize: `${markSize * 0.2}px`,
          letterSpacing: '0.34em',
          textTransform: 'uppercase',
          color: 'var(--text-gold)',
          paddingLeft: '2px',
        }}>Forex With Ghasif</span>
      )}
    </span>
  );
}

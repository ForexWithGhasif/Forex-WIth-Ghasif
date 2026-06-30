import React from 'react';

/**
 * Big metric block — credibility number with a label and optional delta.
 * Use for success statistics, performance, and trust indicators.
 */
export function Stat({ value, label, delta = null, direction = 'up', align = 'left', style = {} }) {
  const isUp = direction === 'up';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--ls-tight)',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>{value}</span>
        {delta && (
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--fw-semibold)',
            color: isUp ? 'var(--bullish)' : 'var(--bearish)',
          }}>{isUp ? '↗' : '↘'} {delta}</span>
        )}
      </div>
      <span style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--fw-semibold)',
        textTransform: 'uppercase',
        letterSpacing: 'var(--ls-wider)',
        color: 'var(--text-tertiary)',
      }}>{label}</span>
    </div>
  );
}

import React from 'react';

/**
 * Live trading-pair row — pair, price, and signed change.
 * Used in tickers, watchlists, and the signals feed.
 */
export function PriceTag({ pair, price, change, direction = 'up', sparkline = false, style = {} }) {
  const isUp = direction === 'up';
  const color = isUp ? 'var(--bullish)' : 'var(--bearish)';
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-5)',
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-subtle)',
      ...style,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          width: '7px', height: '7px', borderRadius: '50%', background: color,
          boxShadow: `0 0 0 3px color-mix(in srgb, ${color} 20%, transparent)`,
        }} />
        <span style={{
          fontFamily: 'var(--font-body)', fontWeight: 'var(--fw-bold)',
          fontSize: 'var(--text-sm)', letterSpacing: 'var(--ls-wide)',
          color: 'var(--text-primary)',
        }}>{pair}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--text-sm)', color: 'var(--text-primary)',
        }}>{price}</span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--text-xs)', fontWeight: 'var(--fw-semibold)', color,
          minWidth: '58px', textAlign: 'right',
        }}>{isUp ? '▲' : '▼'} {change}</span>
      </div>
    </div>
  );
}

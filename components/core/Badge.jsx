import React from 'react';

const tones = {
  gold:    { bg: 'var(--accent-soft-bg)', fg: 'var(--text-gold)', bd: 'rgba(214,175,67,0.3)' },
  bull:    { bg: 'var(--bullish-bg)', fg: 'var(--bullish)', bd: 'rgba(19,185,120,0.32)' },
  bear:    { bg: 'var(--bearish-bg)', fg: 'var(--bearish)', bd: 'rgba(228,71,74,0.32)' },
  neutral: { bg: 'var(--surface-card)', fg: 'var(--text-secondary)', bd: 'var(--border-default)' },
  solid:   { bg: 'var(--grad-gold-soft)', fg: 'var(--accent-contrast)', bd: 'transparent' },
};

/**
 * Small pill label — status, category, or a live trading delta.
 */
export function Badge({ children, tone = 'gold', dot = false, mono = false, style = {}, ...rest }) {
  const t = tones[tone] || tones.gold;
  return (
    <span
      style={{
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
        ...style,
      }}
      {...rest}
    >
      {dot && (
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: 'currentColor',
          boxShadow: '0 0 0 3px color-mix(in srgb, currentColor 22%, transparent)',
        }} />
      )}
      {children}
    </span>
  );
}

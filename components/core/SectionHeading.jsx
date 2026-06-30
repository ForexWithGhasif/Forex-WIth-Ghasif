import React from 'react';

/**
 * Section eyebrow + title + optional lead. The standard way every
 * homepage section opens. `center` for centered hero-style sections.
 */
export function SectionHeading({ kicker, title, lead = null, align = 'left', maxWidth = '54ch', style = {} }) {
  const centered = align === 'center';
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      alignItems: centered ? 'center' : 'flex-start',
      textAlign: centered ? 'center' : 'left',
      ...style,
    }}>
      {kicker && (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--fw-semibold)',
          letterSpacing: 'var(--ls-wider)',
          textTransform: 'uppercase',
          color: 'var(--text-gold)',
        }}>
          <span style={{ width: '22px', height: '1px', background: 'var(--border-gold)' }} />
          {kicker}
        </span>
      )}
      <h2 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 'var(--fw-bold)',
        fontSize: 'var(--text-2xl)',
        lineHeight: 'var(--lh-snug)',
        letterSpacing: 'var(--ls-tight)',
        color: 'var(--text-primary)',
        maxWidth,
        margin: 0,
      }}>{title}</h2>
      {lead && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-md)',
          lineHeight: 'var(--lh-relaxed)',
          color: 'var(--text-secondary)',
          maxWidth: '58ch',
          margin: 0,
        }}>{lead}</p>
      )}
    </div>
  );
}

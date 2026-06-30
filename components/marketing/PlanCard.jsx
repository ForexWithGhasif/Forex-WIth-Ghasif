import React from 'react';
import { Button } from '../core/Button.jsx';
import { Badge } from '../core/Badge.jsx';

/**
 * Membership / pricing plan card. `featured` highlights the recommended
 * tier with a gold border, glow, and a "Most popular" ribbon.
 */
export function PlanCard({
  name,
  price,
  period = '/mo',
  blurb,
  features = [],
  cta = 'Choose plan',
  ctaVariant,
  featured = false,
  ribbon = 'Most popular',
  style = {},
}) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      padding: 'var(--space-6)',
      borderRadius: 'var(--radius-xl)',
      background: featured
        ? 'linear-gradient(180deg, rgba(214,175,67,0.08), var(--surface-card))'
        : 'var(--surface-card)',
      border: `1px solid ${featured ? 'var(--border-gold)' : 'var(--border-default)'}`,
      boxShadow: featured ? 'var(--glow-gold-sm), var(--shadow-card)' : 'var(--shadow-card)',
      ...style,
    }}>
      {featured && (
        <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
          <Badge tone="solid">{ribbon}</Badge>
        </span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          fontWeight: 'var(--fw-bold)', letterSpacing: 'var(--ls-wider)',
          textTransform: 'uppercase', color: 'var(--text-gold)',
        }}>{name}</span>
        {blurb && <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>{blurb}</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 'var(--fw-extra)',
          fontSize: 'var(--text-3xl)', letterSpacing: 'var(--ls-tight)',
          color: 'var(--text-primary)',
        }}>{price}</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>{period}</span>
      </div>

      <div style={{ height: '1px', background: 'var(--border-subtle)' }} />

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        {features.map((f, i) => (
          <li key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
            <span style={{
              flexShrink: 0, width: '18px', height: '18px', borderRadius: '50%',
              background: 'var(--accent-soft-bg)', color: 'var(--text-gold)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: 700, marginTop: '1px',
            }}>✓</span>
            <span style={{ lineHeight: 1.5 }}>{f}</span>
          </li>
        ))}
      </ul>

      <Button variant={ctaVariant || (featured ? 'primary' : 'secondary')} fullWidth size="md">{cta}</Button>
    </div>
  );
}

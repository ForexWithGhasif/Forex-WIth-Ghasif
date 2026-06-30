import React from 'react';

/**
 * Text input with FWG styling. `attached` renders a trailing button slot
 * (e.g. newsletter signup). Gold focus ring.
 */
export function Input({
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
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '8px', ...style }}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)',
          fontWeight: 'var(--fw-semibold)', letterSpacing: 'var(--ls-wide)',
          textTransform: 'uppercase', color: 'var(--text-tertiary)',
        }}>{label}</span>
      )}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '0 6px 0 14px',
        background: 'var(--surface-inset)',
        border: `1px solid ${focus ? 'var(--border-gold)' : 'var(--border-default)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: focus ? '0 0 0 3px var(--accent-soft-bg)' : 'none',
        transition: 'border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out)',
      }}>
        {iconLeft && <span style={{ color: 'var(--text-tertiary)', display: 'flex' }}>{iconLeft}</span>}
        <input
          type={type}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1, minWidth: 0,
            background: 'transparent', border: 'none', outline: 'none',
            padding: '13px 0',
            fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)',
            color: 'var(--text-primary)',
            ...inputStyle,
          }}
          {...rest}
        />
        {trailing}
      </div>
      {hint && (
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>{hint}</span>
      )}
    </label>
  );
}

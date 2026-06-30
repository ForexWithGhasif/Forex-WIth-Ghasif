import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. `primary` = gold hero CTA, `emerald` = join/convert, `secondary`/`ghost`/`outlineGold` = lower priority. */
  variant?: 'primary' | 'emerald' | 'secondary' | 'ghost' | 'outlineGold';
  size?: 'sm' | 'md' | 'lg';
  /** Render as a different element, e.g. 'a' for links. */
  as?: 'button' | 'a';
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary action button for Forex With Ghasif.
 * @startingPoint section="Core" subtitle="Gold & emerald CTAs with hover glow" viewport="700x140"
 */
export function Button(props: ButtonProps): JSX.Element;

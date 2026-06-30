import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** gold = brand, bull = up/green, bear = down/red, neutral = quiet, solid = gold fill */
  tone?: 'gold' | 'bull' | 'bear' | 'neutral' | 'solid';
  /** Show a leading status dot. */
  dot?: boolean;
  /** Use the tabular mono font (for numeric deltas). */
  mono?: boolean;
  children?: React.ReactNode;
}

/** Small pill label for status, category, or live trading deltas. */
export function Badge(props: BadgeProps): JSX.Element;

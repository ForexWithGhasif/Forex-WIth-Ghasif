import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gold border + glow for the highlighted card in a set. */
  featured?: boolean;
  /** Lift + reveal gold border on hover. */
  interactive?: boolean;
  /** CSS padding value. Default var(--space-6). */
  padding?: string;
  children?: React.ReactNode;
}

/** Translucent glass surface — the core content panel. */
export function Card(props: CardProps): JSX.Element;

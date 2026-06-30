import React from 'react';

export interface StatProps {
  /** The headline figure, e.g. "78.4%" or "4,200+". */
  value: React.ReactNode;
  /** Uppercase caption under the number. */
  label: string;
  /** Optional change indicator, e.g. "+612 pips". */
  delta?: React.ReactNode;
  direction?: 'up' | 'down';
  align?: 'left' | 'center';
}

/** Credibility metric — big tabular number + label + optional delta. */
export function Stat(props: StatProps): JSX.Element;

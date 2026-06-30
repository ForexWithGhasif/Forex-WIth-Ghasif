import React from 'react';

export interface PriceTagProps {
  /** Currency pair label, e.g. "EUR/USD". */
  pair: string;
  /** Current price, e.g. "1.0942". */
  price: React.ReactNode;
  /** Signed change, e.g. "+0.24%". */
  change: React.ReactNode;
  direction?: 'up' | 'down';
  style?: React.CSSProperties;
}

/** Live trading-pair row for tickers, watchlists, and signal feeds. */
export function PriceTag(props: PriceTagProps): JSX.Element;

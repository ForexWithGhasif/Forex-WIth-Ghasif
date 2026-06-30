import React from 'react';

export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** `full` = mark + wordmark line, `mark` = just "FWG". */
  variant?: 'full' | 'mark';
  /** Use the real logo image instead of the typographic lockup. */
  src?: string;
  /** Pixel height. */
  height?: number;
}

/** Forex With Ghasif brand lockup (gold wordmark or image). */
export function Logo(props: LogoProps): JSX.Element;

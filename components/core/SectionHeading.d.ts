import React from 'react';

export interface SectionHeadingProps {
  /** Uppercase gold eyebrow with a lead rule. */
  kicker?: string;
  title: React.ReactNode;
  /** Supporting paragraph below the title. */
  lead?: React.ReactNode;
  align?: 'left' | 'center';
  maxWidth?: string;
}

/** Standard section opener: kicker + title + lead. */
export function SectionHeading(props: SectionHeadingProps): JSX.Element;

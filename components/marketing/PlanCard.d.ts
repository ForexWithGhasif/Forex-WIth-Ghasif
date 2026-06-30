import React from 'react';

export interface PlanCardProps {
  name: string;
  /** Display price, e.g. "$129". */
  price: React.ReactNode;
  period?: string;
  blurb?: string;
  features?: string[];
  cta?: string;
  ctaVariant?: 'primary' | 'emerald' | 'secondary' | 'ghost' | 'outlineGold';
  /** Highlight as the recommended tier. */
  featured?: boolean;
  ribbon?: string;
}

/**
 * Membership / pricing plan card.
 * @startingPoint section="Marketing" subtitle="Pricing tier with feature list" viewport="380x520"
 */
export function PlanCard(props: PlanCardProps): JSX.Element;

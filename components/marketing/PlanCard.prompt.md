Membership / pricing tier card with a feature list and CTA.

```jsx
<PlanCard
  name="VIP Signals"
  price="$129"
  period="/mo"
  blurb="Daily signals with full trade plans."
  features={['3–5 signals daily', 'Entry, stop & target', 'Private Telegram', 'Weekly live review']}
  cta="Join VIP"
  featured
/>
```

`featured` adds the gold border, glow, and "Most popular" ribbon. Composes `Badge` + `Button`.

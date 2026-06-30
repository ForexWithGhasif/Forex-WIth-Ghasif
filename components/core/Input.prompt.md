Styled text input with a gold focus ring and an optional trailing action.

```jsx
<Input label="Email" placeholder="you@email.com" type="email" />

// Newsletter pattern with a trailing button:
<Input
  placeholder="Enter your email"
  trailing={<Button size="sm" variant="primary">Subscribe</Button>}
/>
```

Props: `label`, `hint`, `iconLeft`, `trailing`, plus native input attributes.

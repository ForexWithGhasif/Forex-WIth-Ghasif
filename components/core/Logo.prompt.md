FWG brand lockup. Default is a dependency-free gold typographic wordmark; pass `src` for the real logo image.

```jsx
<Logo />                                    // mark + "Forex With Ghasif"
<Logo variant="mark" height={40} />         // just FWG
<Logo src="assets/fwg-logo.png" height={48} />  // real image
```

Props: `variant` (`full`/`mark`), `src`, `height`.

import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';

/* Palette notes: no purple anywhere. Accent comes from the blue/navy
   already present in the supplied dark background gradients. */
export default createGlobalStyle`
  :root {
    --radius: 18px;
    --radius-sm: 12px;
    --shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
    --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  :root[data-theme='dark'] {
    --bg: #181c21;
    --surface: rgba(24, 28, 33, 0.82);
    --surface-solid: #1f242a;
    --surface-2: rgba(255, 255, 255, 0.07);
    --text: #f2f4f7;
    --text-soft: #b9c0ca;
    --text-faint: #8d96a3;
    --border: rgba(255, 255, 255, 0.14);
    --accent: #4b6cb7;
    --accent-hover: #5b7cc7;
    --accent-text: #ffffff;
    --accent-soft: rgba(75, 108, 183, 0.22);
    --focus: #a8edea;
    --star: #f5c451;
    --danger: #ff8a80;
    --scrim: rgba(8, 10, 13, 0.66);
    color-scheme: dark;
  }

  :root { --head-shadow: 0 1px 14px rgba(0, 0, 0, 0.7), 0 0 4px rgba(0, 0, 0, 0.5); }
  :root[data-theme='light'] {
    --head-shadow: 0 0 14px rgba(255, 255, 255, 0.95), 0 0 4px rgba(255, 255, 255, 0.9);
    --bg: #fafafa;
    --surface: rgba(255, 255, 255, 0.9);
    --surface-solid: #ffffff;
    --surface-2: rgba(24, 40, 72, 0.06);
    --text: #14181d;
    --text-soft: #444c57;
    --text-faint: #6a737f;
    --border: rgba(20, 24, 29, 0.14);
    --accent: #182848;
    --accent-hover: #24396b;
    --accent-text: #ffffff;
    --accent-soft: rgba(24, 40, 72, 0.1);
    --focus: #182848;
    --star: #c98a00;
    --danger: #b3261e;
    --scrim: rgba(20, 24, 29, 0.5);
    color-scheme: light;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  /* Theme switch: the whole page cross-fades as one (View Transitions).
     Where that is unsupported, .theme-fading fades every themed property
     together at the same speed instead. */
  ::view-transition-old(root), ::view-transition-new(root) {
    animation-duration: 0.65s;
    animation-timing-function: ease-in-out;
  }
  .theme-fading *, .theme-fading *::before, .theme-fading *::after {
    transition: background-color 0.65s ease, color 0.65s ease, border-color 0.65s ease,
      box-shadow 0.65s ease, text-shadow 0.65s ease, fill 0.65s ease, stroke 0.65s ease,
      opacity 0.65s ease !important;
  }

  h1, h2, h3, h4, p { margin: 0; }
  a { color: inherit; text-decoration: none; }
  button { font: inherit; color: inherit; cursor: pointer; }
  img { max-width: 100%; display: block; }
  ul { margin: 0; padding: 0; list-style: none; }

  :focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }

  ::selection { background: var(--accent); color: var(--accent-text); }

  .sr-only {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

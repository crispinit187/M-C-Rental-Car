import styled from 'styled-components';
import Logo from './Logo.jsx';
import { Button } from './ui.js';
import { MoonIcon, SunIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  background: var(--surface);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--border);
`;

const Inner = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 12px clamp(16px, 4vw, 40px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  .actions {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  @media (max-width: 520px) {
    .words { display: none; }
    button { padding: 0 16px; }
  }
`;

const ThemeButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  background: var(--surface);
  display: grid;
  place-items: center;
  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--accent-soft);
  }

  svg {
    position: absolute;
    transition: transform 0.5s var(--ease), opacity 0.4s ease;
  }
  .sun { opacity: ${(p) => (p.$dark ? 1 : 0)}; transform: rotate(${(p) => (p.$dark ? '0' : '-90deg')}) scale(${(p) => (p.$dark ? 1 : 0.4)}); }
  .moon { opacity: ${(p) => (p.$dark ? 0 : 1)}; transform: rotate(${(p) => (p.$dark ? '90deg' : '0')}) scale(${(p) => (p.$dark ? 0.4 : 1)}); }
`;

export default function Header() {
  const { theme, toggleTheme, openSignIn } = useApp();
  const dark = theme === 'dark';
  return (
    <Bar>
      <Inner aria-label="Main">
        <Logo />
        <div className="actions">
          <ThemeButton
            type="button"
            $dark={dark}
            onClick={toggleTheme}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <SunIcon className="sun" />
            <MoonIcon className="moon" />
          </ThemeButton>
          <Button type="button" onClick={() => openSignIn('Sign in to list your car.')}>List your car</Button>
          <Button type="button" $variant="ghost" onClick={() => openSignIn('')}>Sign in</Button>
        </div>
      </Inner>
    </Bar>
  );
}

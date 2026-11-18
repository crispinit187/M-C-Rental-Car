import styled from 'styled-components';
import DarkPattern from './backgrounds/DarkPattern.jsx';
import LightPattern from './backgrounds/LightPattern.jsx';
import { useApp } from '../context/AppContext.jsx';

/* Both supplied backgrounds stay mounted and cross-fade, so switching
   theme is a smooth transition and never an abrupt cut. */
const Layer = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
  opacity: ${(p) => (p.$on ? 1 : 0)};

  & > div {
    width: 100%;
    height: 100%;
  }
`;

export default function ThemeBackground() {
  const { theme } = useApp();
  return (
    <>
      <Layer $on={theme === 'light'} aria-hidden="true">
        <LightPattern />
      </Layer>
      <Layer $on={theme === 'dark'} aria-hidden="true">
        <DarkPattern />
      </Layer>
    </>
  );
}

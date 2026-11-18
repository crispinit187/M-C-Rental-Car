import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeft } from './Icons.jsx';

const Btn = styled.button`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: 4px;
  height: 40px;
  padding: 0 16px 0 10px;
  margin-bottom: 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(12px);
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.25s ease, transform 0.25s var(--ease);

  &:hover { background: var(--surface-2); }
  &:hover svg { transform: translateX(-2px); }
  svg { transition: transform 0.25s var(--ease); }
`;

/* Goes back one step in history; if the page was opened directly
   (no earlier step in this app), goes to `to` instead. */
export default function BackLink({ to = '/', label = 'Back' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const go = () => (location.key !== 'default' ? navigate(-1) : navigate(to));
  return (
    <Btn type="button" onClick={go} aria-label={label}>
      <ChevronLeft size={20} />
      Back
    </Btn>
  );
}

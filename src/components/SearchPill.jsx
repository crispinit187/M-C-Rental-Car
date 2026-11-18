import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SearchIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { readParams, summarize } from '../lib/search.js';

const Pill = styled.button`
  width: 100%;
  max-width: 620px;
  margin-inline: auto;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 64px;
  padding: 8px 8px 8px 24px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(14px);
  box-shadow: var(--shadow);
  text-align: left;
  color: var(--text);

  &:hover {
    transform: translateY(-1px);
    border-color: var(--text-faint);
  }

  .t {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    min-width: 0;
  }
  .t { flex: 1; }
  .go {
    flex: none;
    width: 46px; height: 46px; border-radius: 50%;
    display: grid; place-items: center;
    background: var(--accent); color: #fff;
    transition: transform 0.3s var(--ease);
  }
  &:hover .go { transform: scale(1.06); }
  .l1 { font-weight: 600; font-size: 14px; }
  .l2 { font-size: 12.5px; color: var(--text-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;

export default function SearchPill() {
  const { openSearch } = useApp();
  const [sp] = useSearchParams();
  const { line1, line2 } = summarize(readParams(sp));
  return (
    <Pill type="button" onClick={openSearch} aria-label={`Edit search: ${line1}, ${line2}`}>
      <span className="t">
        <span className="l1">{line1}</span>
        <span className="l2">{line2}</span>
      </span>
      <span className="go" aria-hidden="true"><SearchIcon size={20} /></span>
    </Pill>
  );
}

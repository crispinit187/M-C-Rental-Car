import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SearchIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { readParams, summarize } from '../lib/search.js';

const Pill = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 64px;
  padding: 10px 24px;
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
  .l1 { font-weight: 600; font-size: 14px; }
  .l2 { font-size: 12.5px; color: var(--text-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
`;

export default function SearchPill() {
  const { openSearch } = useApp();
  const [sp] = useSearchParams();
  const { line1, line2 } = summarize(readParams(sp));
  return (
    <Pill type="button" onClick={openSearch} aria-label={`Edit search: ${line1}, ${line2}`}>
      <SearchIcon size={24} />
      <span className="t">
        <span className="l1">{line1}</span>
        <span className="l2">{line2}</span>
      </span>
    </Pill>
  );
}

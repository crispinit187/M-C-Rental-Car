import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from './Icons.jsx';
import { fmtShort, sameDay, startOfDay } from '../lib/format.js';

const Wrap = styled.div`
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface-2);
  overflow: hidden;
`;

const Row = styled.button`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  padding: 12px 16px;
  min-height: 56px;
  border: 0;
  background: ${(p) => (p.$active ? 'var(--accent-soft)' : 'transparent')};
  text-align: left;
  color: var(--text);

  & + & {
    border-top: 1px solid var(--border);
  }
  .label {
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-faint);
  }
  .value {
    font-size: 15px;
    font-weight: 600;
    color: ${(p) => (p.$empty ? 'var(--text-soft)' : 'var(--text)')};
  }
`;

const Drawer = styled.div`
  display: grid;
  grid-template-rows: ${(p) => (p.$open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.4s var(--ease);
  border-top: ${(p) => (p.$open ? '1px solid var(--border)' : '0 solid transparent')};

  & > div {
    overflow: hidden;
    min-height: 0;
  }
`;

const Cal = styled.div`
  padding: 14px 14px 16px;
  max-width: 340px;
  margin: 0 auto;

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 8px;
    font-weight: 600;
    font-size: 15px;
  }
  .nav {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
    background: transparent;
    display: grid;
    place-items: center;
  }
  .nav:disabled { opacity: 0.3; cursor: not-allowed; }
  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
    text-align: center;
  }
  .dow {
    font-size: 11px;
    color: var(--text-faint);
    padding: 6px 0;
  }
`;

const Day = styled.button`
  height: 40px;
  border: 0;
  font-size: 14px;
  font-weight: ${(p) => (p.$edge ? 700 : 500)};
  border-radius: ${(p) => (p.$edge ? '12px' : p.$inRange ? '0' : '12px')};
  background: ${(p) => (p.$edge ? 'var(--accent)' : p.$inRange ? 'var(--accent-soft)' : 'transparent')};
  color: ${(p) => (p.$edge ? 'var(--accent-text)' : 'var(--text)')};
  outline: ${(p) => (p.$today && !p.$edge ? '1px solid var(--focus)' : 'none')};
  outline-offset: -2px;

  &:disabled {
    color: var(--text-faint);
    opacity: 0.4;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background: ${(p) => (p.$edge ? 'var(--accent-hover)' : 'var(--accent-soft)')};
  }
`;

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DateRange({ pickup, ret, onChange, single = false }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState(() => new Date((pickup || today).getFullYear(), (pickup || today).getMonth(), 1));
  const [openField, setOpenField] = useState(null); // 'pickup' | 'return' | null

  const first = new Date(view.getFullYear(), view.getMonth(), 1);
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells = [...Array(first.getDay()).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1))];

  const canGoBack = view > new Date(today.getFullYear(), today.getMonth(), 1);
  const monthLabel = view.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  const choose = (d) => {
    if (single) {
      onChange({ pickup: d, ret: d });
      setOpenField(null);
      return;
    }
    if (openField === 'return' && pickup && d >= pickup) {
      onChange({ pickup, ret: d });
      setOpenField(null);
      return;
    }
    if (openField === 'pickup' || !pickup || (pickup && ret) || d < pickup) {
      onChange({ pickup: d, ret: ret && ret > d ? ret : null });
      setOpenField('return');
      return;
    }
    onChange({ pickup, ret: d });
    setOpenField(null);
  };

  return (
    <Wrap>
      <Row type="button" $empty={!pickup} $active={openField === 'pickup'} onClick={() => setOpenField(openField === 'pickup' ? null : 'pickup')} aria-expanded={openField === 'pickup'}>
        <span className="label">Pickup</span>
        <span className="value">{pickup ? fmtShort(pickup) + ' ' + pickup.getFullYear() : 'Add date'}</span>
      </Row>
      {!single && (
      <Row type="button" $empty={!ret} $active={openField === 'return'} onClick={() => setOpenField(openField === 'return' ? null : 'return')} aria-expanded={openField === 'return'}>
        <span className="label">Return</span>
        <span className="value">{ret ? fmtShort(ret) + ' ' + ret.getFullYear() : 'Add date'}</span>
      </Row>
      )}
      <Drawer $open={!!openField}>
        <div>
          <Cal>
            <div className="head">
              <button type="button" className="nav" disabled={!canGoBack} aria-label="Previous month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}>
                <ChevronLeft size={18} />
              </button>
              <span aria-live="polite">{monthLabel}</span>
              <button type="button" className="nav" aria-label="Next month" onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}>
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="grid" role="grid" aria-label={monthLabel}>
              {DOW.map((d) => (
                <span className="dow" key={d}>{d}</span>
              ))}
              {cells.map((d, i) =>
                d ? (
                  <Day
                    key={d.toISOString()}
                    type="button"
                    disabled={d < today || (openField === 'return' && pickup && d < pickup)}
                    $edge={sameDay(d, pickup) || sameDay(d, ret)}
                    $inRange={pickup && ret && d > pickup && d < ret}
                    $today={sameDay(d, today)}
                    onClick={() => choose(d)}
                    aria-label={d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  >
                    {d.getDate()}
                  </Day>
                ) : (
                  <span key={`e${i}`} />
                )
              )}
            </div>
          </Cal>
        </div>
      </Drawer>
    </Wrap>
  );
}

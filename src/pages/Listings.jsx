import BackLink from '../components/BackLink.jsx';
import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button, H1, Page } from '../components/ui.js';
import SearchPill from '../components/SearchPill.jsx';
import CarCard from '../components/CarCard.jsx';
import { filterCars, readParams } from '../lib/search.js';
import { useApp } from '../context/AppContext.jsx';

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  .count { font-size: 15px; color: var(--text-soft); }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
    gap: 18px;
  }
  .grid > * { animation: rise 0.55s var(--ease) both; }
  @keyframes rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
  .empty {
    padding: 40px 24px; text-align: center; border-radius: var(--radius);
    background: var(--surface); border: 1px solid var(--border);
    display: flex; flex-direction: column; align-items: center; gap: 12px;
  }
`;

export default function Listings() {
  const [sp, setSp] = useSearchParams();
  const { openSearch } = useApp();
  const params = readParams(sp);
  const cars = useMemo(() => filterCars(params), [sp]); // eslint-disable-line react-hooks/exhaustive-deps
  const active = Object.values(params).some(Boolean);

  return (
    <Page>
      <Stack>
        <BackLink to="/" />
        <SearchPill />
        <H1 style={{ alignSelf: 'flex-start', textShadow: 'var(--head-shadow)' }}>{cars.length} cars</H1>
        {active && (
          <p className="count">
            Filtered results.{' '}
            <button type="button" onClick={() => setSp({})} style={{ background: 'none', border: 0, textDecoration: 'underline', textUnderlineOffset: 4, padding: 0 }}>
              Clear filters
            </button>
          </p>
        )}
        {cars.length ? (
          <div className="grid">
            {cars.map((c, i) => (
              <CarCard key={c.id} car={c} detailed style={{ animationDelay: `${Math.min(i, 12) * 40}ms` }} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <strong>No cars match that search.</strong>
            <span style={{ color: 'var(--text-soft)', fontSize: 14 }}>Try a different city, make or price range.</span>
            <Button type="button" onClick={openSearch}>Edit search</Button>
          </div>
        )}
      </Stack>
    </Page>
  );
}

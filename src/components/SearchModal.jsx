import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Modal, { ModalClose, ModalBack } from './Modal.jsx';
import DateRange from './DateRange.jsx';
import { Button, Field, Input, Select } from './ui.js';
import { ClockIcon, PinIcon, SearchIcon } from './Icons.jsx';
import { useApp } from '../context/AppContext.jsx';
import { buildQuery, readParams } from '../lib/search.js';
import { CARS, CITIES, MAKES } from '../data/cars.js';
import { fromISO, safeStorage, toISO } from '../lib/format.js';

const Head = styled.div`
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 14px 20px 14px 16px;
  border-bottom: 1px solid var(--border);
  h2 { flex: 1; font-size: 22px; font-weight: 500; }
`;

const Scroll = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px 26px;
  display: flex;
  flex-direction: column;
  gap: 18px;

  .hint { font-size: 12px; color: var(--text-faint); margin-top: -10px; }
  .icon-input { position: relative; }
  .icon-input > svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-faint); pointer-events: none; }
  .icon-input input { padding-left: 42px; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chip {
    min-height: 34px; padding: 0 14px; border-radius: 999px;
    border: 1px solid var(--border); background: var(--surface-2); font-size: 13px;
  }
  .chip:hover, .chip[aria-pressed='true'] { background: var(--accent); color: var(--accent-text); border-color: var(--accent); }
  .price { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .recent { display: flex; flex-direction: column; gap: 4px; }
  .recent button {
    display: flex; align-items: center; gap: 10px; text-align: left;
    padding: 8px 10px; border-radius: 10px; border: 0; background: transparent; font-size: 13.5px;
  }
  .recent button:hover { background: var(--surface-2); }
`;

const Foot = styled.div`
  flex: none;
  padding: 14px 20px 20px;
  border-top: 1px solid var(--border);
  button { width: 100%; min-height: 52px; font-size: 15px; }
`;

const RECENT_KEY = 'mc-recent-searches';

const getRecent = () => {
  try {
    return JSON.parse(safeStorage.get(RECENT_KEY, '[]'));
  } catch {
    return [];
  }
};

export default function SearchModal() {
  const { searchOpen, closeSearch } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [sp] = useSearchParams();

  const [form, setForm] = useState(() => readParams(sp));
  const [pickup, setPickup] = useState(null);
  const [ret, setRet] = useState(null);
  const [showRecent, setShowRecent] = useState(false);
  const [recent, setRecent] = useState(getRecent);

  useEffect(() => {
    if (searchOpen) {
      const p = readParams(sp);
      setForm(p);
      setPickup(fromISO(p.from));
      setRet(fromISO(p.to));
      setRecent(getRecent());
      setShowRecent(false);
    }
  }, [searchOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const suggestions = form.q.trim()
    ? [...new Set(CARS.map((c) => c.name))].filter((n) => n.toLowerCase().includes(form.q.toLowerCase())).slice(0, 5)
    : recent;

  const submit = (e) => {
    e?.preventDefault();
    const params = { ...form, from: pickup ? toISO(pickup) : '', to: ret ? toISO(ret) : '' };
    if (params.q.trim()) {
      const next = [params.q.trim(), ...recent.filter((r) => r !== params.q.trim())].slice(0, 5);
      safeStorage.set(RECENT_KEY, JSON.stringify(next));
    }
    closeSearch();
    navigate(`/vehicle-listings${buildQuery(params)}`);
    if (location.pathname === '/vehicle-listings') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Modal open={searchOpen} onClose={closeSearch} label="Find your perfect ride" width={560}>
      <form onSubmit={submit} style={{ display: 'contents' }}>
        <Head>
          <ModalBack onClick={closeSearch} />
          <h2>Find your perfect ride</h2>
          <ModalClose onClick={closeSearch} />
        </Head>

        <Scroll>
          <Field>
            Search
            <div className="icon-input">
              <SearchIcon size={18} />
              <Input
                data-autofocus
                placeholder="Search by car, e.g. Golf or Mustang"
                value={form.q}
                onChange={set('q')}
                onFocus={() => setShowRecent(true)}
                autoComplete="off"
              />
            </div>
          </Field>
          {showRecent && suggestions.length > 0 && (
            <div className="recent" style={{ marginTop: -10 }}>
              {suggestions.map((s) => (
                <button type="button" key={s} onClick={() => { setForm((f) => ({ ...f, q: s })); setShowRecent(false); }}>
                  <ClockIcon size={16} /> {s}
                </button>
              ))}
            </div>
          )}

          <Field>
            Where
            <div className="icon-input">
              <PinIcon size={18} />
              <Input placeholder="Anywhere" value={form.where} onChange={set('where')} autoComplete="off" />
            </div>
          </Field>
          <div className="chips" style={{ marginTop: -8 }}>
            {CITIES.map((c) => (
              <button
                type="button"
                className="chip"
                key={c}
                aria-pressed={form.where === c}
                onClick={() => setForm((f) => ({ ...f, where: f.where === c ? '' : c }))}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="hint">Pick a city, or type an area</p>

          <Field as="div">
            When
            <DateRange
              pickup={pickup}
              ret={ret}
              onChange={({ pickup: p, ret: r }) => {
                setPickup(p);
                setRet(r);
              }}
            />
          </Field>

          <Field>
            Rental Options
            <Select value={form.option} onChange={set('option')}>
              <option value="">Any rental option</option>
              <option value="Self drive">Self drive</option>
              <option value="Chauffeur">Chauffeur</option>
            </Select>
          </Field>

          <Field>
            Transmission
            <Select value={form.trans} onChange={set('trans')}>
              <option value="">Any</option>
              <option value="Auto">Automatic</option>
              <option value="Manual">Manual</option>
            </Select>
          </Field>

          <Field>
            Make
            <Select value={form.make} onChange={set('make')}>
              <option value="">Select Make</option>
              {MAKES.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </Select>
          </Field>

          <div className="price">
            <Field>
              Minimum Price
              <Input type="number" min="0" inputMode="numeric" placeholder="Any" value={form.min} onChange={set('min')} />
            </Field>
            <Field>
              Maximum Price
              <Input type="number" min="0" inputMode="numeric" placeholder="Any" value={form.max} onChange={set('max')} />
            </Field>
          </div>
        </Scroll>

        <Foot>
          <Button type="submit">Search Cars</Button>
        </Foot>
      </form>
    </Modal>
  );
}

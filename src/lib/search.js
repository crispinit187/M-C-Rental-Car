import { CARS } from '../data/cars.js';
import { fromISO, fmtShort } from './format.js';

export const readParams = (sp) => ({
  q: sp.get('q') || '',
  where: sp.get('where') || sp.get('city') || '',
  from: sp.get('from') || '',
  to: sp.get('to') || '',
  option: sp.get('option') || '',
  trans: sp.get('trans') || '',
  make: sp.get('make') || '',
  min: sp.get('min') || '',
  max: sp.get('max') || '',
  tag: sp.get('tag') || '',
});

export const buildQuery = (p) => {
  const sp = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => {
    if (v) sp.set(k, v);
  });
  const s = sp.toString();
  return s ? `?${s}` : '';
};

const norm = (s) => s.toLowerCase().trim();

const startingPrice = (c) => c.listPrice;

export function filterCars(p) {
  const q = norm(p.q);
  const where = norm(p.where);
  return CARS.filter((c) => {
    if (q && !norm(`${c.make} ${c.model} ${c.name} ${c.year}`).includes(q)) return false;
    if (where && !norm(`${c.city} ${c.area} ${c.address}`).includes(where)) return false;
    if (p.option && !c.options.includes(p.option)) return false;
    if (p.trans && c.trans !== p.trans) return false;
    if (p.make && c.make !== p.make) return false;
    if (p.tag && !c.tags.includes(p.tag)) return false;
    if (p.min && startingPrice(c) < Number(p.min)) return false;
    if (p.max && startingPrice(c) > Number(p.max)) return false;
    return true;
  });
}

export function summarize(p) {
  const line1 = p.q || p.make || (p.tag ? p.tag : 'Search cars');
  const dates = p.from && p.to ? `${fmtShort(fromISO(p.from))} – ${fmtShort(fromISO(p.to))}` : 'Any dates';
  const line2 = `${dates} · ${p.where || 'Anywhere'}`;
  return { line1, line2 };
}

export const CURRENCY = 'K';

export const money = (n) =>
  `${CURRENCY}${Math.round(n).toLocaleString('en-US')}`;

/* Multi-day discount: 5% off per extra day, up to 25% off at 6+ days. */
export const DAY_FACTORS = [1, 0.95, 0.9, 0.85, 0.8, 0.75];

export const dailyRateFor = (basePrice, days) =>
  basePrice * DAY_FACTORS[Math.min(Math.max(days, 1), 6) - 1];

export const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export const daysBetween = (from, to) =>
  Math.max(1, Math.round((startOfDay(to) - startOfDay(from)) / 86400000));

export const fmtDate = (d) =>
  d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export const fmtShort = (d) =>
  d ? d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';

export const toISO = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
};

export const fromISO = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

export const safeStorage = {
  get(key, fallback) {
    try {
      const v = window.localStorage.getItem(key);
      return v === null ? fallback : v;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* storage unavailable */
    }
  },
};

export const imageUrl = (file) => `${import.meta.env.BASE_URL}cars/${file}`;

import { flushSync } from 'react-dom';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { safeStorage } from '../lib/format.js';

const AppContext = createContext(null);

const initialTheme = () => {
  const saved = safeStorage.get('mc-theme', null);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const initialSaved = () => {
  try {
    return JSON.parse(safeStorage.get('mc-saved', '[]'));
  } catch {
    return [];
  }
};

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(initialTheme);
  const [saved, setSaved] = useState(initialSaved);
  const [signIn, setSignIn] = useState({ open: false, reason: '' });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    safeStorage.set('mc-theme', theme);
  }, [theme]);

  useEffect(() => {
    safeStorage.set('mc-saved', JSON.stringify(saved));
  }, [saved]);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    const commit = () => {
      root.dataset.theme = next;
      flushSync(() => setTheme(next));
    };
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (calm) return commit();
    if (document.startViewTransition) {
      document.startViewTransition(commit);
    } else {
      root.classList.add('theme-fading');
      commit();
      setTimeout(() => root.classList.remove('theme-fading'), 800);
    }
  }, [theme]);
  const toggleSaved = useCallback(
    (id) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])),
    []
  );
  const openSignIn = useCallback((reason = '') => setSignIn({ open: true, reason }), []);
  const closeSignIn = useCallback(() => setSignIn((s) => ({ ...s, open: false })), []);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      saved,
      toggleSaved,
      signIn,
      openSignIn,
      closeSignIn,
      searchOpen,
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
    }),
    [theme, toggleTheme, saved, toggleSaved, signIn, openSignIn, closeSignIn, searchOpen]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

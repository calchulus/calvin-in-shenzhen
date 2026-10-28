import { useEffect, useMemo, useState } from 'react';
import rawPlaces from './data/places.json';
import { NEIGHBORHOODS, UI } from './data/meta';
import type { Place } from './types';
import {
  indexPlaces,
  matches,
  orderedCategories,
  sortItems,
  validatePlaces,
  type Filters,
} from './lib/select';
import { useLang, useScrollReveal, useTheme } from './lib/hooks';
import { Hero } from './components/Hero';
import { Toolbar } from './components/Toolbar';
import { Controls } from './components/Controls';
import { TopPicks } from './components/TopPicks';
import { CategorySection } from './components/CategorySection';
import { Footer } from './components/Footer';

// The JSON literal widens priceLevel to `number`; the runtime validator below
// is what actually enforces the 1–4 range.
const PLACES = rawPlaces as unknown as Place[];

export default function App() {
  const [theme, setTheme] = useTheme();
  const [lang, setLang] = useLang();
  const t = UI[lang];

  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [neighborhood, setNeighborhood] = useState<string | null>(null);

  const index = useMemo(() => indexPlaces(PLACES), []);

  // places.json is hand-edited, so surface typos loudly in the console rather
  // than silently dropping a place out of its section.
  useEffect(() => {
    const problems = validatePlaces(PLACES);
    if (problems.length > 0) {
      console.warn(`[places.json] ${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
    }
  }, []);

  const allCats = useMemo(
    () => orderedCategories(new Set(PLACES.map((p) => p.category))),
    [],
  );

  const allHoods = useMemo(() => {
    const present = new Set(PLACES.map((p) => p.neighborhood));
    const ordered = Object.keys(NEIGHBORHOODS).filter((k) => present.has(k));
    const unknown = [...present].filter((k) => !(k in NEIGHBORHOODS)).sort();
    return [...ordered, ...unknown];
  }, []);

  const totalPicks = useMemo(() => PLACES.filter((p) => p.featured).length, []);

  /** Chip counts follow the text query only, so the rows never reshuffle
   *  while you're reading them. */
  const catCounts = useMemo(() => {
    const m = new Map<string, number>();
    const qOnly: Filters = { q: query, category: null, neighborhood: null };
    for (const it of index) {
      if (matches(it, qOnly)) m.set(it.place.category, (m.get(it.place.category) ?? 0) + 1);
    }
    return m;
  }, [index, query]);

  const hoodCounts = useMemo(() => {
    const m = new Map<string, number>();
    const qOnly: Filters = { q: query, category: null, neighborhood: null };
    for (const it of index) {
      if (matches(it, qOnly)) m.set(it.place.neighborhood, (m.get(it.place.neighborhood) ?? 0) + 1);
    }
    return m;
  }, [index, query]);

  const filters: Filters = { q: query, category, neighborhood };

  const filtered = useMemo(
    () => sortItems(index.filter((it) => matches(it, filters))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, query, category, neighborhood],
  );

  const picks = useMemo(
    () => filtered.filter((it) => it.place.featured).map((it) => it.place),
    [filtered],
  );

  const grouped = useMemo(() => {
    const byCat = new Map<string, Place[]>();
    for (const it of filtered) {
      const arr = byCat.get(it.place.category);
      if (arr) arr.push(it.place);
      else byCat.set(it.place.category, [it.place]);
    }
    return allCats
      .filter((c) => byCat.has(c))
      .map((c) => [c, byCat.get(c)!] as const);
  }, [filtered, allCats]);

  useScrollReveal([query, category, neighborhood, grouped.length]);

  const filtersActive = query.trim() !== '' || category !== null || neighborhood !== null;

  const clearAll = () => {
    setQuery('');
    setCategory(null);
    setNeighborhood(null);
  };

  return (
    <div className="shell" id="top">
      <div className="page-texture" aria-hidden="true" />

      <Toolbar
        lang={lang}
        theme={theme}
        onLang={setLang}
        onTheme={setTheme}
        query={query}
        onQuery={setQuery}
      />

      <Hero
        lang={lang}
        total={PLACES.length}
        categories={allCats.length}
        picks={totalPicks}
      />

      <Controls
        lang={lang}
        query={query}
        onQuery={setQuery}
        category={category}
        onCategory={setCategory}
        neighborhood={neighborhood}
        onNeighborhood={setNeighborhood}
        categories={allCats}
        neighborhoods={allHoods}
        catCounts={catCounts}
        hoodCounts={hoodCounts}
      />

      <TopPicks picks={picks} lang={lang} />

      <main className="wrap main">
        {filtersActive && (
          <div className="result-bar">
            <span className="mono">{t.resultCount(filtered.length)}</span>
            {filtersActive && (
              <button type="button" className="result-clear" onClick={clearAll}>
                {t.clearFilters}
              </button>
            )}
          </div>
        )}

        {grouped.length > 0 ? (
          grouped.map(([cat, places], i) => (
            <CategorySection
              key={cat}
              category={cat}
              places={places}
              lang={lang}
              style={{ transitionDelay: `${Math.min(i, 6) * 0.04}s` }}
            />
          ))
        ) : (
          <div className="empty">
            <h3>{t.noResults}</h3>
            <p>{t.noResultsSub}</p>
            <button type="button" onClick={clearAll}>
              {t.clearFilters}
            </button>
          </div>
        )}
      </main>

      <Footer lang={lang} />
    </div>
  );
}

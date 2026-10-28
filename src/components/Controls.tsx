import { CATEGORIES, NEIGHBORHOODS, UI, type Lang } from '../data/meta';
import { Icon, PATHS } from './Icon';

interface ControlsProps {
  lang: Lang;
  query: string;
  onQuery: (q: string) => void;
  category: string | null;
  onCategory: (c: string | null) => void;
  neighborhood: string | null;
  onNeighborhood: (n: string | null) => void;
  categories: string[];
  neighborhoods: string[];
  catCounts: Map<string, number>;
  hoodCounts: Map<string, number>;
}

export function Controls({
  lang,
  query,
  onQuery,
  category,
  onCategory,
  neighborhood,
  onNeighborhood,
  categories,
  neighborhoods,
  catCounts,
  hoodCounts,
}: ControlsProps) {
  const t = UI[lang];

  return (
    <div className="wrap controls">
      <label className="search-row">
        <Icon d={PATHS.search} size={18} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchPlaceholder}
        />
        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onQuery('')}
            aria-label={t.clearFilters}
          >
            ×
          </button>
        )}
      </label>

      <div className="chips-block">
        <div className="chips-label">{lang === 'zh' ? '分类' : 'Categories'}</div>
        <div className="chips" role="group" aria-label={lang === 'zh' ? '分类' : 'Categories'}>
          <button
            type="button"
            className="chip"
            aria-pressed={category === null}
            onClick={() => onCategory(null)}
          >
            {t.allCategories}
          </button>
          {categories.map((c) => {
            const meta = CATEGORIES[c];
            return (
              <button
                key={c}
                type="button"
                className="chip"
                aria-pressed={category === c}
                onClick={() => onCategory(category === c ? null : c)}
              >
                {meta && <Icon d={meta.icon} size={15} />}
                {lang === 'zh' ? (meta?.zh ?? c) : (meta?.en ?? c)}
                <span className="chip-count">{catCounts.get(c) ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="chips-block">
        <div className="chips-label">{lang === 'zh' ? '街区' : 'Neighbourhoods'}</div>
        <div className="chips" role="group" aria-label={lang === 'zh' ? '街区' : 'Neighbourhoods'}>
          <button
            type="button"
            className="chip"
            aria-pressed={neighborhood === null}
            onClick={() => onNeighborhood(null)}
          >
            {t.allNeighborhoods}
          </button>
          {neighborhoods.map((n) => {
            const meta = NEIGHBORHOODS[n];
            return (
              <button
                key={n}
                type="button"
                className="chip"
                aria-pressed={neighborhood === n}
                onClick={() => onNeighborhood(neighborhood === n ? null : n)}
              >
                <Icon d={PATHS.pin} size={14} />
                {lang === 'zh' ? (meta?.zh ?? n) : (meta?.en ?? n)}
                <span className="chip-count">{hoodCounts.get(n) ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

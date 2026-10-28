import type { CSSProperties } from 'react';
import { CATEGORIES, type Lang } from '../data/meta';
import type { Place } from '../types';
import { Icon } from './Icon';
import { PlaceCard } from './PlaceCard';

interface CategorySectionProps {
  category: string;
  places: Place[];
  lang: Lang;
  style?: CSSProperties;
}

export function CategorySection({ category, places, lang, style }: CategorySectionProps) {
  const meta = CATEGORIES[category];
  const title = lang === 'zh' ? (meta?.zh ?? category) : (meta?.en ?? category);
  const sub = lang === 'zh' ? (meta?.en ?? '') : (meta?.zh ?? '');

  return (
    <section className="cat-section reveal" style={style} aria-labelledby={`cat-${category}`}>
      <div className="cat-head">
        <span className="cat-icon">{meta && <Icon d={meta.icon} size={22} />}</span>
        <div>
          <h2 id={`cat-${category}`}>{title}</h2>
          {sub && <div className="cat-zh">{sub}</div>}
        </div>
        <span className="cat-count">
          {places.length} {lang === 'zh' ? '处' : places.length === 1 ? 'place' : 'places'}
        </span>
      </div>

      <div className="grid">
        {places.map((p) => (
          <PlaceCard key={p.id} place={p} lang={lang} />
        ))}
      </div>
    </section>
  );
}

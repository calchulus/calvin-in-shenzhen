import { CATEGORIES, NEIGHBORHOODS, TAGS, UI, type Lang } from '../data/meta';
import type { Place } from '../types';
import { altName, displayName, mapUrl, MAP_TARGETS, priceLabel } from '../lib/links';
import { StarFilled } from './Icon';

interface PlaceCardProps {
  place: Place;
  lang: Lang;
}

export function PlaceCard({ place, lang }: PlaceCardProps) {
  const t = UI[lang];
  const cat = CATEGORIES[place.category];
  const hood = NEIGHBORHOODS[place.neighborhood];
  const alt = altName(place, lang);

  return (
    <article className="card">
      <div className="card-top">
        <div>
          <h3 className="card-title">{displayName(place, lang)}</h3>
          {alt && <div className="card-alt">{alt}</div>}
        </div>
        {place.featured && (
          <span className="star">
            <StarFilled size={9} />
            {t.topPick}
          </span>
        )}
      </div>

      {place.summary && <p className="card-summary">{place.summary}</p>}
      {place.note && <p className="card-note">{place.note}</p>}

      <div className="card-meta">
        <span>{lang === 'zh' ? (hood?.zh ?? place.neighborhood) : (hood?.en ?? place.neighborhood)}</span>
        <span className="sep" aria-hidden="true" />
        <span>{lang === 'zh' ? (cat?.zh ?? place.category) : (cat?.en ?? place.category)}</span>
        {place.rating !== null && (
          <>
            <span className="sep" aria-hidden="true" />
            <span className="rating">
              <StarFilled />
              {place.rating.toFixed(1)}
            </span>
          </>
        )}
      </div>

      {place.tags && place.tags.length > 0 && (
        <div className="tags">
          {place.tags
            .filter((tag) => tag !== 'needsCheck')
            .map((tag) => (
              <span className="tag" key={tag}>
                {lang === 'zh' ? (TAGS[tag]?.zh ?? tag) : (TAGS[tag]?.en ?? tag)}
              </span>
            ))}
        </div>
      )}

      <div className="card-foot">
        <div className="map-links">
          {MAP_TARGETS.map((m) => (
            <a
              key={m.id}
              className="map-link"
              href={mapUrl(m.id, place)}
              target="_blank"
              rel="noopener noreferrer"
              title={m.title}
            >
              {m.label}
            </a>
          ))}
        </div>
        <span className="price" title={priceLabel(place.priceLevel, 'en')}>
          {'¥'.repeat(place.priceLevel)}
        </span>
      </div>
    </article>
  );
}

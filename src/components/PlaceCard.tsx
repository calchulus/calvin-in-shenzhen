import { useState } from 'react';
import { CATEGORIES, NEIGHBORHOODS, TAGS, UI, type Lang } from '../data/meta';
import type { Place } from '../types';
import { altName, displayName, mapUrl, MAP_TARGETS, priceLabel } from '../lib/links';
import { placeHash } from '../lib/urlstate';
import { Icon, PATHS, StarFilled } from './Icon';

interface PlaceCardProps {
  place: Place;
  lang: Lang;
  /** Clicking a tag pill filters the whole list by that tag. */
  onTag: (tag: string) => void;
  activeTag: string | null;
}

export function PlaceCard({ place, lang, onTag, activeTag }: PlaceCardProps) {
  const t = UI[lang];
  const cat = CATEGORIES[place.category];
  const hood = NEIGHBORHOODS[place.neighborhood];
  const alt = altName(place, lang);
  const [copied, setCopied] = useState(false);

  /** Puts #p-<id> in the address bar and copies the full share URL. If the
   *  clipboard is blocked (insecure context, permissions) the hash still lands
   *  in the bar, so the link is never lost. */
  const permalink = async () => {
    const url =
      window.location.origin +
      window.location.pathname +
      window.location.search +
      placeHash(place.id);
    window.history.replaceState(null, '', placeHash(place.id));
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      /* hash is in the bar; user can copy it manually */
    }
  };

  return (
    <article className="card" id={`p-${place.id}`}>
      <div className="card-top">
        <div>
          <h3 className="card-title">{displayName(place, lang)}</h3>
          {alt && <div className="card-alt">{alt}</div>}
        </div>
        <div className="card-badges">
          {place.featured && (
            <span className="star">
              <StarFilled size={9} />
              {t.topPick}
            </span>
          )}
          <button
            type="button"
            className={`permalink${copied ? ' is-copied' : ''}`}
            onClick={permalink}
            title={copied ? (lang === 'zh' ? '已复制' : 'Copied') : lang === 'zh' ? '复制链接' : 'Copy link to this place'}
            aria-label={lang === 'zh' ? '复制链接' : 'Copy link to this place'}
          >
            <Icon d={PATHS.link} size={13} />
          </button>
        </div>
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

      {place.tags && place.tags.filter((tag) => tag !== 'needsCheck').length > 0 && (
        <div className="tags">
          {place.tags
            .filter((tag) => tag !== 'needsCheck')
            .map((tag) => (
              <button
                type="button"
                className="tag"
                key={tag}
                aria-pressed={activeTag === tag}
                onClick={() => onTag(tag)}
                title={lang === 'zh' ? '按此标签筛选' : 'Filter by this tag'}
              >
                {lang === 'zh' ? (TAGS[tag]?.zh ?? tag) : (TAGS[tag]?.en ?? tag)}
              </button>
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

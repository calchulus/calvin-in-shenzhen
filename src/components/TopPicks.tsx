import { useRef, useState } from 'react';
import { CATEGORIES, NEIGHBORHOODS, UI, type Lang } from '../data/meta';
import type { Place } from '../types';
import { altName, displayName, mapUrl, MAP_TARGETS } from '../lib/links';
import { Icon, PATHS, StarFilled } from './Icon';

interface TopPicksProps {
  picks: Place[];
  lang: Lang;
}

export function TopPicks({ picks, lang }: TopPicksProps) {
  const t = UI[lang];
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  if (picks.length === 0) return null;

  const nudge = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 700), behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = rail.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  return (
    <section className="wrap picks" aria-labelledby="picks-heading">
      <div className="section-head">
        <div>
          <div className="kicker">★ {String(picks.length).padStart(2, '0')}</div>
          <h2 id="picks-heading">{t.topPicks}</h2>
          <div className="sub">{t.topPicksSub}</div>
        </div>
        <div className="rail-nav">
          <button type="button" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous">
            <Icon d={PATHS.left} size={15} />
          </button>
          <button type="button" onClick={() => nudge(1)} disabled={atEnd} aria-label="Next">
            <Icon d={PATHS.right} size={15} />
          </button>
        </div>
      </div>

      <div className="rail" ref={rail} onScroll={onScroll}>
        {picks.map((p) => {
          const cat = CATEGORIES[p.category];
          const hood = NEIGHBORHOODS[p.neighborhood];
          const alt = altName(p, lang);
          return (
            <article className="pick-card" key={p.id}>
              <div className="pick-top">
                <span className="pick-cat">
                  {lang === 'zh' ? (cat?.zh ?? p.category) : (cat?.en ?? p.category)}
                </span>
                {p.rating !== null && (
                  <span className="rating">
                    <StarFilled />
                    {p.rating.toFixed(1)}
                  </span>
                )}
              </div>

              <div>
                <h3 className="pick-title">{displayName(p, lang)}</h3>
                {alt && <div className="pick-alt">{alt}</div>}
              </div>

              {p.note && <p className="pick-note">{p.note}</p>}

              <div className="pick-meta">
                <span>{lang === 'zh' ? (hood?.zh ?? p.neighborhood) : (hood?.en ?? p.neighborhood)}</span>
                <span className="map-links">
                  {MAP_TARGETS.map((m) => (
                    <a
                      key={m.id}
                      className="map-link"
                      href={mapUrl(m.id, p)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={m.title}
                    >
                      {m.label}
                    </a>
                  ))}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

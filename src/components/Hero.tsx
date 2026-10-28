import { UI, type Lang } from '../data/meta';
import { useCountUp } from '../lib/hooks';

interface HeroProps {
  lang: Lang;
  total: number;
  categories: number;
  picks: number;
}

export function Hero({ lang, total, categories, picks }: HeroProps) {
  const t = UI[lang];
  const nPlaces = useCountUp(total, true);
  const nCats = useCountUp(categories, true);
  const nPicks = useCountUp(picks, true);

  const stats = [
    { value: nPlaces, label: t.places },
    { value: nCats, label: t.categories },
    { value: nPicks, label: t.picks },
  ];

  return (
    <header className="hero">
      <div className="hero-watermark" aria-hidden="true">
        深圳
      </div>

      <div className="wrap hero-inner">
        <div className="kicker">{t.kicker}</div>

        <h1 className="hero-title">
          <span className="line">{t.brandLine1}</span>
          <span className="line accent">{t.brandLine2}</span>
          <span className="line">{t.brandLine3}</span>
        </h1>

        <p className="hero-lede">{t.lede}</p>
        <hr className="hero-rule" />

        <div className="counters">
          {stats.map((s) => (
            <div className="counter" key={s.label}>
              <span className="counter-num">{s.value}</span>
              <span className="counter-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="scroll-hint">{t.scroll}</div>
      </div>
    </header>
  );
}

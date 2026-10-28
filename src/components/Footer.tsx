import { UI, type Lang } from '../data/meta';

export function Footer({ lang }: { lang: Lang }) {
  const t = UI[lang];
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="f-seal" aria-hidden="true">
          深
        </div>
        <div className="f-brand">{t.footerMade}</div>
        <div className="f-line">© {year} Calvin · {t.footerNote}</div>
      </div>
    </footer>
  );
}

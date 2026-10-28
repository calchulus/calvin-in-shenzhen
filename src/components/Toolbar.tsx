import { UI, type Lang, type Theme } from '../data/meta';
import { useScrolled } from '../lib/hooks';
import { Icon, PATHS } from './Icon';

interface ToolbarProps {
  lang: Lang;
  theme: Theme;
  onLang: (l: Lang) => void;
  onTheme: (t: Theme) => void;
  query: string;
  onQuery: (q: string) => void;
}

export function Toolbar({ lang, theme, onLang, onTheme, query, onQuery }: ToolbarProps) {
  const t = UI[lang];
  const visible = useScrolled(90);

  return (
    <div className={`toolbar${visible ? ' is-visible' : ''}`}>
      <div className="toolbar-inner">
        <a className="toolbar-brand" href="#top" aria-label={t.footerMade}>
          <span className="dot" aria-hidden="true" />
          <span>
            {lang === 'zh' ? '深圳清单' : 'Calvin’s Shenzhen'}
            <span className="brand-tail">{lang === 'zh' ? '' : ' List'}</span>
          </span>
        </a>

        <div className="toolbar-spacer" />

        <label className="search-row search-row--toolbar">
          <Icon d={PATHS.search} size={17} />
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
          />
        </label>

        <div className="toolbar-spacer" />

        <div className="seg" role="group" aria-label="Language">
          <button
            type="button"
            data-lang-btn="en"
            aria-pressed={lang === 'en'}
            onClick={() => onLang('en')}
            title="English"
          >
            EN
          </button>
          <button
            type="button"
            data-lang-btn="zh"
            aria-pressed={lang === 'zh'}
            onClick={() => onLang('zh')}
            title="中文"
          >
            中文
          </button>
        </div>

        <div className="seg" role="group" aria-label="Theme">
          <button
            type="button"
            data-theme-btn="culture"
            aria-pressed={theme === 'culture'}
            onClick={() => onTheme('culture')}
            title="Culture mode — Lingnan warm paper"
          >
            {t.themeCulture}
          </button>
          <button
            type="button"
            data-theme-btn="tech"
            aria-pressed={theme === 'tech'}
            onClick={() => onTheme('tech')}
            title="Tech mode — Shenzhen hardware dark"
          >
            {t.themeTech}
          </button>
        </div>
      </div>
    </div>
  );
}

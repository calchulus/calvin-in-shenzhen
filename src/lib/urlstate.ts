import type { Lang, Theme } from '../data/meta';
import type { Filters } from './select';

export const DEFAULT_LANG: Lang = 'en';
export const DEFAULT_THEME: Theme = 'culture';

/** Place ids are deep-linked as `#p-<id>`. */
const HASH_PREFIX = 'p-';

export interface UrlState {
  filters: Filters;
  /** null = not in the URL; fall back to the visitor's stored preference. */
  lang: Lang | null;
  theme: Theme | null;
  placeId: string | null;
}

/**
 * Read filters, language, theme and a place deep-link out of the address bar.
 * Anything absent is null/empty so callers can fall back to their defaults.
 */
export function parseUrl(): UrlState {
  const p = new URLSearchParams(window.location.search);
  const str = (key: string): string | null => {
    const v = p.get(key);
    return v === null || v === '' ? null : v;
  };

  const lang = str('l');
  const theme = str('t');
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ''));

  return {
    filters: {
      q: str('q') ?? '',
      category: str('c'),
      neighborhood: str('n'),
      tag: str('tag'),
    },
    lang: lang === 'zh' || lang === 'en' ? lang : null,
    theme: theme === 'tech' || theme === 'culture' ? theme : null,
    placeId: hash.startsWith(HASH_PREFIX) ? hash.slice(HASH_PREFIX.length) : null,
  };
}

/**
 * The URL always describes anything non-default about the current view, so a
 * copied link reproduces exactly what the copier saw — including 中文 and the
 * tech skin — while the default view stays a clean, short address.
 */
export function serializeUrl(filters: Filters, lang: Lang, theme: Theme): string {
  const p = new URLSearchParams();
  const q = filters.q.trim();
  if (q) p.set('q', q);
  if (filters.category) p.set('c', filters.category);
  if (filters.neighborhood) p.set('n', filters.neighborhood);
  if (filters.tag) p.set('tag', filters.tag);
  if (lang !== DEFAULT_LANG) p.set('l', lang);
  if (theme !== DEFAULT_THEME) p.set('t', theme);

  const qs = p.toString();
  return (
    window.location.pathname +
    (qs ? `?${qs}` : '') +
    window.location.hash
  );
}

/** replaceState, not pushState: filtering shouldn't fill the back button. */
export function syncUrl(filters: Filters, lang: Lang, theme: Theme) {
  const next = serializeUrl(filters, lang, theme);
  const current = window.location.pathname + window.location.search + window.location.hash;
  if (next !== current) window.history.replaceState(null, '', next);
}

export function placeHash(id: string): string {
  return `#${HASH_PREFIX}${id}`;
}

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang, Theme } from '../data/meta';

function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* private mode / blocked storage — the toggle still works for this session */
  }
}

/** The bootstrap script in index.html already set data-theme/data-lang, so we
 *  read the DOM rather than localStorage to stay in sync with it. */
export function useTheme(): [Theme, (t: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => {
    const attr = document.documentElement.getAttribute('data-theme');
    return attr === 'tech' ? 'tech' : 'culture';
  });

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    store('cis-theme', next);
  }, []);

  return [theme, setTheme];
}

export function useLang(): [Lang, (l: Lang) => void] {
  const [lang, setLangState] = useState<Lang>(() => {
    const attr = document.documentElement.getAttribute('data-lang');
    return attr === 'zh' ? 'zh' : 'en';
  });

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.setAttribute('data-lang', next);
    document.documentElement.setAttribute('lang', next === 'zh' ? 'zh-CN' : 'en');
    store('cis-lang', next);
  }, []);

  return [lang, setLang];
}

/** Adds `is-visible` to every `.reveal` element as it scrolls into view.
 *  Runs once per mount and observes nodes added later by filtering. */
export function useScrollReveal(deps: unknown[]) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((n) => n.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    nodes.forEach((n) => {
      if (!n.classList.contains('is-visible')) io.observe(n);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Counts from 0 to `target` once `active` flips true. Honours reduced motion. */
export function useCountUp(target: number, active: boolean): number {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active || started.current) return;
    started.current = true;

    const reduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || target <= 0) {
      setValue(target);
      return;
    }

    const duration = 900;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);

  return value;
}

/** True once the page has scrolled past `offset` px. */
export function useScrolled(offset = 120): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > offset));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [offset]);
  return scrolled;
}

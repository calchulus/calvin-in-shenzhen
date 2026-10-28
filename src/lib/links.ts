import type { Place } from '../types';
import type { Lang } from '../data/meta';

export type MapTarget = 'amap' | 'apple' | 'google' | 'dianping';

/** Verified against https://www.dianping.com/shenzhen, which emits
 *  `search/keyword/7/` links itself. Shenzhen = 7. */
const DIANPING_SHENZHEN = 7;
/** Shenzhen's GB/T 2260 administrative code, used for Amap's city filter. */
const AMAP_SHENZHEN = 440300;

const enc = encodeURIComponent;

/** coords are stored as [lat, lng]; Amap wants lng,lat. */
function lngLat(p: Place): string | null {
  if (!p.coords) return null;
  return `${p.coords[1]},${p.coords[0]}`;
}

/** The query string that is most likely to resolve on each service.
 *  Chinese services get the Chinese name; the rest get an English-anchored query. */
function queryFor(p: Place, preferZh: boolean): string {
  const zh = p.nameZh;
  if (preferZh) return zh ?? p.name;
  return zh ? `${p.name} ${zh}` : `${p.name} Shenzhen`;
}

/**
 * Build a map/search URL for a place.
 *
 * Links are *searches*, not deep links: they never rot when a venue moves or a
 * platform changes its URL scheme. Pass `coords` on a place to upgrade Amap,
 * Apple and Google to an exact pin.
 */
export function mapUrl(target: MapTarget, p: Place): string {
  const zhQuery = queryFor(p, true);
  const enQuery = queryFor(p, false);

  switch (target) {
    case 'amap': {
      const pin = lngLat(p);
      if (pin) return `https://uri.amap.com/marker?position=${pin}&name=${enc(zhQuery)}&coordinate=gaode`;
      return `https://www.amap.com/search?query=${enc(zhQuery)}&city=${AMAP_SHENZHEN}`;
    }
    case 'apple': {
      if (p.coords) return `https://maps.apple.com/?ll=${p.coords[0]},${p.coords[1]}&q=${enc(enQuery)}`;
      return `https://maps.apple.com/?q=${enc(enQuery)}`;
    }
    case 'google': {
      if (p.coords) return `https://www.google.com/maps/search/?api=1&query=${p.coords[0]},${p.coords[1]}`;
      return `https://www.google.com/maps/search/?api=1&query=${enc(enQuery)}`;
    }
    case 'dianping':
      return `https://www.dianping.com/search/keyword/${DIANPING_SHENZHEN}/0_${enc(zhQuery)}`;
  }
}

export const MAP_TARGETS: { id: MapTarget; label: string; title: string }[] = [
  { id: 'amap', label: '高德', title: 'Amap / 高德地图' },
  { id: 'apple', label: 'Apple', title: 'Apple Maps' },
  { id: 'google', label: 'Google', title: 'Google Maps (needs a VPN in mainland China)' },
  { id: 'dianping', label: '点评', title: 'Dianping / 大众点评' },
];

/** Primary display name for the active language. */
export function displayName(p: Place, lang: Lang): string {
  if (lang === 'zh') return p.nameZh ?? p.name;
  return p.name;
}

/** Secondary name shown beneath the primary one. Returns null when the place
 *  has no alternate script. */
export function altName(p: Place, lang: Lang): string | null {
  if (lang === 'zh') return p.nameZh ? p.name : null;
  return p.nameZh ?? null;
}

export function priceLabel(level: number, lang: Lang): string {
  const symbols = '¥'.repeat(Math.max(1, Math.min(4, level)));
  if (lang === 'zh') return symbols;
  const words = ['', 'under ¥60', '¥¥ 60–150', '¥¥¥ 150–400', '¥¥¥¥ 400+'];
  return words[Math.max(1, Math.min(4, level))] ?? symbols;
}

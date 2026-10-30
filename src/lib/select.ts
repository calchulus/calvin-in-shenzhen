import type { Place } from '../types';
import { CATEGORIES, CATEGORY_ORDER, NEIGHBORHOODS, TAGS } from '../data/meta';

export interface Indexed {
  place: Place;
  /** Position in the source array — the stable tiebreaker for ordering. */
  idx: number;
  /** Lowercased haystack covering every field a reader might search by. */
  hay: string;
}

const lower = (s: string | undefined | null) => (s ? s.toLowerCase() : '');

export function indexPlaces(places: Place[]): Indexed[] {
  return places.map((place, idx) => {
    const cat = CATEGORIES[place.category];
    const hood = NEIGHBORHOODS[place.neighborhood];
    const hay = [
      lower(place.name),
      lower(place.nameZh),
      lower(place.summary),
      lower(place.note),
      lower(place.address),
      lower(cat?.en),
      lower(cat?.zh),
      lower(place.category),
      lower(hood?.en),
      lower(hood?.zh),
      lower(hood?.district),
      lower(place.neighborhood),
      ...(place.tags ?? []).flatMap((t) => [lower(t), lower(TAGS[t]?.en), lower(TAGS[t]?.zh)]),
    ]
      .filter(Boolean)
      .join(' ');
    return { place, idx, hay };
  });
}

export interface Filters {
  q: string;
  category: string | null;
  neighborhood: string | null;
  /** Tag slug, e.g. "late-night". Set by clicking a tag pill on a card. */
  tag: string | null;
}

/** Every whitespace-separated token must appear somewhere in the haystack. */
export function matches(item: Indexed, filters: Filters): boolean {
  if (filters.category && item.place.category !== filters.category) return false;
  if (filters.neighborhood && item.place.neighborhood !== filters.neighborhood) return false;
  if (filters.tag && !(item.place.tags ?? []).includes(filters.tag)) return false;

  const tokens = filters.q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;
  return tokens.every((t) => item.hay.includes(t));
}

/** Featured first, then your own rating, then source order.
 *  Deliberately does *not* weight by review counts — this guide has none, and
 *  inventing them would make the ranking a lie. */
function score(item: Indexed): number {
  const { featured, rating } = item.place;
  return (featured ? 1000 : 0) + (rating ?? 0) * 10 - item.idx * 0.0001;
}

export function sortItems(items: Indexed[]): Indexed[] {
  return [...items].sort((a, b) => score(b) - score(a));
}

/** Categories present in the data, in the curated display order. */
export function orderedCategories(present: Set<string>): string[] {
  const known = CATEGORY_ORDER.filter((c) => present.has(c));
  const extra = [...present].filter((c) => !(CATEGORY_ORDER as readonly string[]).includes(c)).sort();
  return [...known, ...extra];
}

/**
 * Sanity-check the data file and report problems to the console. Editing
 * places.json by hand is the intended workflow, so a typo in a category or
 * neighbourhood key should be loud in dev rather than silently dropping a place
 * out of its section.
 */
export function validatePlaces(places: Place[]): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  places.forEach((p, i) => {
    const at = `places.json[${i}] "${p.name}"`;
    if (!p.id) problems.push(`${at}: missing id`);
    else if (seen.has(p.id)) problems.push(`${at}: duplicate id "${p.id}"`);
    else seen.add(p.id);

    if (!CATEGORIES[p.category]) {
      problems.push(`${at}: unknown category "${p.category}" — add it to src/data/meta.ts`);
    }
    if (!NEIGHBORHOODS[p.neighborhood]) {
      problems.push(`${at}: unknown neighborhood "${p.neighborhood}" — add it to src/data/meta.ts`);
    }
    if (p.rating !== null && (p.rating < 0 || p.rating > 5)) {
      problems.push(`${at}: rating ${p.rating} is outside 0–5`);
    }
    if (p.priceLevel < 1 || p.priceLevel > 4) {
      problems.push(`${at}: priceLevel ${p.priceLevel} must be 1–4`);
    }
    (p.tags ?? []).forEach((t) => {
      // `needsCheck` is a workflow marker for the editor, not a display tag.
      if (t === 'needsCheck') return;
      if (!TAGS[t]) problems.push(`${at}: tag "${t}" has no label in TAGS (will render the raw slug)`);
    });
    if (p.coords && p.coords.length === 2) {
      const [lat, lng] = p.coords;
      if (lat < 22.3 || lat > 22.9 || lng < 113.7 || lng > 114.7) {
        problems.push(`${at}: coords [${lat}, ${lng}] fall outside the Shenzhen bounding box`);
      }
    }
  });

  return problems;
}

export type PriceLevel = 1 | 2 | 3 | 4;

export interface Place {
  /** Stable slug. Used as the React key and for deep links. */
  id: string;
  /** English or romanised name — the primary label in EN mode. */
  name: string;
  /** Chinese name — the primary label in 中文 mode, and what map searches use. */
  nameZh?: string;
  /** Must be a key of CATEGORIES in src/data/meta.ts */
  category: string;
  /** Must be a key of NEIGHBORHOODS in src/data/meta.ts */
  neighborhood: string;
  /** Street address if you have one. Optional — links fall back to name search. */
  address?: string;
  /** 1 = ¥ (under ~60/person) … 4 = ¥¥¥¥ (400+/person) */
  priceLevel: PriceLevel;
  /** Your own score out of 5. null = not rated yet. Never invent a number. */
  rating: number | null;
  /** Shows in the Top Picks rail with a star badge. */
  featured?: boolean;
  /** One line: what the place is. */
  summary?: string;
  /** Two or three lines: your actual opinion and how to do it right. */
  note?: string;
  /** Free-form slugs used for filtering, e.g. "late-night", "sunset", "book-ahead". */
  tags?: string[];
  /** [lat, lng] in WGS-84. When present, map links pin the exact spot. */
  coords?: [number, number];
}

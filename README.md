# Calvin's Shenzhen List — 深圳清单

A personal city guide for Shenzhen: restaurants, cafes, bars, parks, galleries and the
neighbourhoods in between. Modelled on the structure of `zaraintokyo.com` — a curated
personal list, not a review aggregator — but built as a Vite + React app with two
complete visual skins and a bilingual EN / 中文 interface.

- **Culture mode (文化)** — warm Lingnan paper, jade + seal red, Cormorant Garamond / 宋体
- **Tech mode (科技)** — Shenzhen-hardware dark, cyan + amber, Space Grotesk / 苹方, mono metadata

Both themes and the language choice persist in `localStorage`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build on http://localhost:4173
```

Always run `npm run build && npm run preview` and check `localhost:4173` before pushing —
GitHub Pages deploys straight from the pushed tree.

## Adding a place (the whole point)

Everything a reader sees comes from **`src/data/places.json`**. Edit that file; you never
need to touch component code. Append an object to the array:

```json
{
  "id": "some-new-place",
  "name": "Some New Place",
  "nameZh": "某新店",
  "category": "Cafes",
  "neighborhood": "Shekou",
  "priceLevel": 2,
  "rating": null,
  "featured": false,
  "summary": "One line: what it is.",
  "note": "Two or three lines: your actual opinion, and how to do it right.",
  "tags": ["coffee", "laptop", "needsCheck"]
}
```

### Field reference

| field | type | notes |
|---|---|---|
| `id` | string | unique slug; used as the React key |
| `name` | string | English / romanised name |
| `nameZh` | string? | Chinese name. Drives 中文 mode and all Chinese map searches |
| `category` | string | must exist in `CATEGORIES` (src/data/meta.ts) |
| `neighborhood` | string | must exist in `NEIGHBORHOODS` (src/data/meta.ts) |
| `address` | string? | optional; links fall back to a name search without it |
| `priceLevel` | 1–4 | 1 = under ~¥60/person … 4 = ¥400+ |
| `rating` | number \| null | **your own** score out of 5. `null` = not rated yet. Never invent one |
| `featured` | boolean? | puts it in the Top Picks rail with a star badge |
| `summary` | string? | one line, what the place is |
| `note` | string? | your opinion. This is the voice of the site |
| `tags` | string[] | slugs from `TAGS` (src/data/meta.ts); rendered as pills |
| `coords` | [lat, lng]? | WGS-84. When present, Amap/Apple/Google links pin the exact spot |

### Ordering

Within a category, places sort: **featured first → your rating (high→low) → file order**.
So to reorder two unrated places, just move them in the JSON. There is deliberately no
review-count weighting: this guide has no review counts, and synthesising them would make
the ranking a lie.

### Validation

`npm run dev` prints a console warning listing any data problems — unknown category /
neighbourhood / tag, duplicate or missing `id`, rating outside 0–5, priceLevel outside 1–4,
or coords outside the Shenzhen bounding box. Fix those before publishing; an unknown
category silently drops the place out of its section.

### Extending the vocabulary

- New **category**: add it to `CATEGORIES` (with an `icon` SVG path on a 24×24 grid) and to
  `CATEGORY_ORDER` if you care where it sits; otherwise it appends alphabetically.
- New **neighbourhood**: add to `NEIGHBORHOODS` with `en`, `zh`, and `district`.
- New **tag**: add to `TAGS` with `en` and `zh` labels.

### The `needsCheck` convention

Some seed entries carry a `"needsCheck"` tag. It is an editor-only marker — it is never
rendered as a pill — meaning *"I have not personally confirmed this venue is still open and
still good; verify before you trust or publish it."* Shenzhen venues churn fast. When you
confirm one, delete the tag.

## Map links

Every card offers four targets: **高德 Amap**, **Apple Maps**, **Google Maps**, **大众点评
Dianping**. Links are *searches*, not deep links, so they never rot when a venue moves or a
platform changes its URL scheme:

- Amap → `amap.com/search?query=<中文名>&city=440300`
- Apple → `maps.apple.com/?q=<name 中文>`
- Google → `google.com/maps/search/?api=1&query=<name 中文>` (needs a VPN inside mainland China)
- Dianping → `dianping.com/search/keyword/7/0_<中文名>` (Shenzhen city id = 7, verified)

Add `"coords": [lat, lng]` to a place and Amap, Apple and Google upgrade to an exact pin.

## Fonts

Self-hosted via `@fontsource/*` and bundled by Vite — **no font CDN requests at all**.
Google Fonts is unreachable from mainland China and `fonts.gstatic.com` stalls on many
networks, so a CDN-dependent site would render in fallback faces for exactly the audience
this site is for. CJK text falls back to system faces (宋体 / 苹方 / Noto Sans CJK), which
are excellent and cost nothing.

## Deploying to GitHub Pages

`vite.config.ts` uses `base: './'`, so the build works from a project site
(`/calvin-in-shenzhen/`), a custom domain, or `file://` without config changes.

1. Create the repo and push.
2. Settings → Pages → deploy from the `gh-pages` branch (or use Actions with
   `actions/deploy-pages`).
3. Simplest recipe: `npm run build && npx gh-pages -d dist`.

Test locally first (see above). Never push to trigger a deploy without a local preview.

## Data provenance — read this before publishing

The 122 seed places were assembled from model knowledge (cutoff ~mid-2025), not from a live
crawl: Dianping, Baidu and Xiaohongshu all block headless access from this machine, so
venue-level verification was not possible. Landmarks, parks, museums and Shenzhen-born
chains are high-confidence; independent cafes, bars and Western restaurants are the least
reliable and are the ones flagged `needsCheck`. **Treat the seed list as a scaffold to
correct, not as fact.** Ratings are all `null` until you've actually been.

# Portfolio — Xaviero Yamin Loganta

React + TypeScript + Vite. Deployed on Vercel.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run lint
```

## Adding or updating a project

All content lives in `src/data/`. Presentation components never hardcode copy, so
adding a project means editing one file — no component surgery.

| File | What it holds |
|---|---|
| `src/data/projects.ts` | Every project: copy, stack, links, screenshots |
| `src/data/profile.ts` | Name, positioning, bio, skills, contact links |
| `src/data/types.ts` | The shapes both files conform to |

A project needs a `slug` (its URL becomes `/projects/<slug>`), the metadata shown
in the work index (`year`, `platform`, `kind`, `role`, `period`), the case-study
body (`summary`, `highlights`, `stack`) and a `shots` array. Set `featured: true`
to place it in the top group of the index instead of the "earlier work" group.

Backticks inside `summary` and `highlights` copy render as inline code, so
`` `MoleculeLayout` `` comes out set in the mono face.

## Screenshots

Images live in `public/screenshots/<project>/` and are referenced by absolute
path (`/screenshots/taggo/inbox.png`). Each entry in `shots` names the device
frame it is drawn in — `iphone`, `ipad`, `mac` or `browser`.

**A shot with `src: null` is not a mistake.** It renders a labelled empty slot on
the project page showing the `todo` text, so a missing screenshot stays visible
and actionable rather than silently absent. To fill one in, drop the image into
`public/screenshots/<project>/`, set `src` to its path, and delete the `todo`
line.

Keep images reasonably small — the site is built to load fast:

```bash
sips -Z 900 public/screenshots/taggo/*.png    # phone screenshots
sips -Z 1400 public/screenshots/chemzy/*.png  # tablet and desktop
```

## Capturing iOS screenshots

Screenshots from the Simulator, with a clean 9:41 status bar:

```bash
xcrun simctl boot "iPhone 17"
xcrun simctl status_bar booted override \
  --time "9:41" --batteryState charged --batteryLevel 100 \
  --wifiBars 3 --cellularMode active --cellularBars 4
xcrun simctl io booted screenshot shot.png
```

ARKit does not run in the Simulator, so Chemzy's AR screens have to be captured
on a physical iPad. macOS app screenshots need `Cmd + Shift + 4` (or Screen
Recording permission for whatever runs `screencapture`).

## Design system

One committed dark theme. Tokens are defined once in `src/index.css` under
`@theme` and consumed as Tailwind utilities (`text-accent`, `border-line`, …):

| Token | Value | Role |
|---|---|---|
| `ink` | `#071113` | Page ground |
| `surface` / `surface-2` | `#0c1a1d` / `#112529` | Raised panels |
| `line` / `line-soft` | `#1a3237` / `#132427` | Rules and borders |
| `fg` / `muted` / `faint` | `#e9f4f1` / `#94abaa` / `#6c8483` | Text scale |
| `accent` | `#5fd9c3` | The single bold voice |
| `amber` | `#efc05f` | Years and status only |

Type is one superfamily in three roles: **IBM Plex Sans Condensed** for display,
**IBM Plex Sans** for body, **IBM Plex Mono** for metadata and labels. All three
are self-hosted through `@fontsource`, so there is no font-CDN request.

Custom CSS lives inside `@layer components`. This matters: unlayered CSS outranks
Tailwind's utility layer, so a plain `.index-row { display: block }` would
silently beat a `grid` utility on the same element.

## Motion

Scroll reveals use a plain `IntersectionObserver` (`src/components/Reveal.tsx`)
rather than Framer Motion's `whileInView`, which left already-visible elements
stuck at their initial opacity. Framer Motion drives the hero entrance and the
route fade. Everything respects `prefers-reduced-motion`.

## Routing

`vercel.json` rewrites every path to `index.html` so deep links like
`/projects/chemzy` work on a hard refresh.

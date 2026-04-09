# Dakshin Panchangam — Project Guide

## What this is
A Cloudflare Pages PWA for South Indian Hindu calendrical calculations (Tamil, Telugu, Kannada, Malayalam, English). Computes Tithi, Nakshatra, Rahu Kalam, Yamagandam, Brahma Muhurta, Abhijit Muhurta, festivals, and a monthly calendar view. Offline-capable via Service Worker.

## Stack
- **Frontend**: Vanilla JS (`app.js`), custom CSS (`styles.css`), no build step
- **Astronomy**: Pure-JS Meeus algorithms (replaced native `sweph` addon to fix Cloudflare build)
- **API**: Cloudflare Pages Functions (`functions/api/panchangam.js`, `functions/api/rss.js`)
- **Deployment**: Cloudflare Pages — `pages_build_output_dir = "."`
- **UI mockups**: `stitch/*/code.html` — standalone HTML with Tailwind CDN

## Project structure
```
index.html          # Single-page app (homepage)
app.js              # All frontend logic — city presets, i18n, astronomy calls, DOM rendering
styles.css          # Homepage styles (NOT used by stitch pages)
sw.js               # Service worker (offline caching)
functions/
  api/
    panchangam.js   # Cloudflare Worker — astronomy calculations endpoint
    rss.js          # Cloudflare Worker — RSS proxy endpoint
stitch/             # UI page mockups (standalone HTML + Tailwind CDN)
  today_daily_panchangam_fixed_footer/
  calendar_monthly_view_fixed_footer/
  temples_directory_fixed_footer/
  ... (12 pages total)
assets/
  swisseph.js       # Legacy — may be unused after Meeus migration
```

## Key rules
- **No native addons** — Cloudflare Pages Workers runtime; pure-JS only
- **No build step** — edit `app.js` and `styles.css` directly
- **Stitch pages are self-contained** — they use `https://cdn.tailwindcss.com` and their own Tailwind config; do not add `styles.css` links to them
- **Feature branches + PRs only** — never push directly to `main`
- **Cloudflare Workers constraints** — no `fs`, no `child_process`, no Node built-ins in `functions/`

## Stitch page layout pattern
All stitch pages follow this structure:
- Fixed top header: `fixed top-0 w-full z-50`
- Fixed left sidebar (desktop): `hidden lg:flex fixed left-0 top-0 h-full w-64`
- Main content must offset: `lg:ml-64 pt-24 pb-32` (or `lg:pl-72` where sidebar is w-72)
- Fixed AI chat footer: `fixed bottom-0 left-0 w-full z-[100]`
- Mobile bottom nav (where present): `fixed bottom-20 z-40` (sits above footer)

## Active work context
Fixing layout issues across stitch pages. Three pages fixed (see session_handover.md). Remaining lower-severity issues in `temples_virtual_darshan_gallery`, `panchangam_ai_chat`, and `temples_map_discovery`.

## Development
```bash
# Local dev with Cloudflare Pages
npx wrangler pages dev . --compatibility-date=2025-01-01

# Deploy
npx wrangler pages deploy .
```

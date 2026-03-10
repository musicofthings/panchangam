# Tamil Panchangam Web App

Client-side Tamil Panchangam dashboard with offline PWA support.

## Run locally

```bash
python -m http.server 8000
```

Open <http://localhost:8000>.

## Cloudflare Pages deployment

This repo is compatible with Cloudflare Pages static hosting.

- Build command: *(none)*
- Build output directory: `/`
- Framework preset: `None`

### RSS on Cloudflare Pages

To avoid browser CORS issues for external RSS feeds, this project includes a Pages Function at `functions/api/rss.js`.
The client calls `/api/rss?url=...`, and the function fetches the whitelisted upstream feed.

## Notes

- `assets/swisseph.js` is a lightweight shim for demo/offline use.
- Replace it with an official `swisseph` browser build and place ephemeris files inside `assets/ephe/` for accurate astronomical results.


## RSS sources bundled

- Hinduism Today
- Tamil Brahmins Forum
- Aanmeegam
- Tamil and Vedas
- TemplePurohit
- Sadhguru Wisdom

# Dakshin Panchangam

A **single source of truth** for South Indian Hindu rituals, rites, and the lunar calendar — built for Tamil, Telugu, Kannada, and Malayalam communities, as well as the global diaspora.

Designed for brahmins, temple priests, and devotees who need accurate daily panchangam, festival alerts, and devotional news in their own language.

---

## Vision

**Dakshin Panchangam** aims to be the definitive all-in-one platform for South Indian Hinduism:

- **Drik Ganitha accuracy** — Swiss Ephemeris (Moshier algorithm, ~3 arcmin Moon) via Cloudflare Edge Function, with Meeus ELP2000/VSOP87 as offline fallback
- **All four Dravidian languages** — Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), plus English
- **South India focused** — 27 city presets across Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala; plus diaspora locations in Singapore, Malaysia, USA, UK, and Australia
- **Temple & priest workflow** — festivals (Amavasai, Pournami, Shashti Vratam, Soma Pradosh, Shivaratri), auspicious nakshatras, and muhurtas for daily puja scheduling
- **Real-time notifications** — web push for Rahu Kalam reminders (Android & iOS apps planned)
- **Devotional news aggregator** — 11 curated South Indian Hindu RSS feeds, auto-loaded and sorted newest-first

---

## Features

### Astronomical Calculations

Two-tier accuracy model: the Cloudflare Edge Function is tried first; local calculations run instantly when offline.

| Feature | Online (CF Function) | Offline fallback |
|---|---|---|
| Sun longitude | Swiss Ephemeris — Moshier (~1 arcmin) | VSOP87 simplified (Meeus Ch. 25, ~0.01°) |
| Moon longitude | Swiss Ephemeris — Moshier (~3 arcmin) | ELP2000 60-term (Meeus Ch. 47, ~0.5°) |
| Sunrise & Sunset | Swiss Ephemeris `rise_trans` | NOAA solar calculator (~1 min) |
| Tithi (1–30) | Moon–Sun elongation / 12° | Same formula, local Moon/Sun |
| Nakshatra (1–27) | Moon longitude / 13.333° | Same formula, local Moon |
| Moon Rasi | Moon longitude / 30° | Same formula, local Moon |
| Tamil/Solar calendar day | Sun's degree within current rasi | Same formula, local Sun |
| Rahu Kalam, Yamagandam, Abhijit, Brahma, Amrita | Derived from CF sunrise | Derived from NOAA sunrise |

The `GET /api/panchangam` endpoint supports batch queries (`?date=&endDate=&lat=&lon=`) so the entire month calendar is fetched in a single request.

### Languages
Switch between **Tamil · Telugu · Kannada · Malayalam · English** — tithi names, nakshatra names, rasi names, paksha, weekday labels, and all UI strings are fully localized.

### Cities (27 presets)
- **Tamil Nadu**: Chennai, Madurai, Thanjavur, Kanchipuram, Tiruchirapalli, Coimbatore, Tirunelveli
- **Andhra Pradesh**: Tirupati, Vijayawada, Visakhapatnam
- **Telangana**: Hyderabad, Warangal
- **Karnataka**: Bengaluru, Mysuru, Udupi, Mangaluru, Dharwad
- **Kerala**: Thiruvananthapuram, Kochi, Kozhikode, Thrissur, Guruvayur
- **Diaspora**: Singapore, Kuala Lumpur, New York, London, Sydney

### Festival Detection
Amavasai · Pournami · Shashti Vratam (Shukla & Krishna) · Soma Pradosh · Shivaratri

### Devotional News (11 RSS Feeds, Auto-loaded)
| Feed | Focus |
|---|---|
| Hinduism Today | Featured / Global |
| Indica Today | Indic perspective |
| Speaking Tree | Spiritual |
| TemplePurohit | Temple rituals |
| Sadhguru / Isha Wisdom | Spiritual |
| Ramakrishna Math (Belur) | Mutt / Vedanta |
| Sringeri Mutt | South Indian Mutt |
| Aanmeegam | Tamil Bhakthi |
| Tamil and Vedas | Tamil scholarship |
| Tamil Brahmins Forum | Community |
| Mathrubhumi Astrology | Kerala / Jyotish |

All 11 feeds load automatically on page open, sorted newest-first. Filter by tag or use the search box.

---

## Roadmap

- [x] **Drik Ganitha accuracy** — Swiss Ephemeris Moshier via Cloudflare Pages Function
- [ ] **Sub-arcsecond precision** — mount Swiss Ephemeris `.se1` / `.se2` data files via Cloudflare R2 for traditional *Drik* calculations
- [ ] **Web Push Notifications** — real-time Rahu Kalam, festival, and puja alerts via browser Service Worker
- [ ] **Android App** — React Native / Capacitor wrapper
- [ ] **iOS App** — React Native / Capacitor wrapper
- [ ] **Vara (Day quality)** and **Yoga** calculations
- [ ] **Karana** (half-tithi) support
- [ ] **Tamil month & year** (Vikrama Samvat / Tamil solar calendar)
- [ ] **Telugu Panchanga Sravanam** — traditional reading format
- [ ] **Temple calendar integration** — TTD (Tirupati), Guruvayur, Sringeri, Kanchi Mutt event feeds
- [ ] **Priest & archaka mode** — expanded muhurta detail for nityakarma, upanayana, vivaha

---

## Run Locally

```bash
python -m http.server 8000
```
Open <http://localhost:8000>.

The `/api/panchangam` endpoint requires Cloudflare Pages. To test it locally:

```bash
npm install
npx wrangler pages dev . --compatibility-flag=nodejs_compat
```

---

## Deployment — Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | `npm install` |
| Build output directory | `/` |
| Framework preset | `None` |
| Compatibility flag | `nodejs_compat` |

Two Cloudflare Pages Functions are deployed automatically:

| Function | Path | Purpose |
|---|---|---|
| `rss.js` | `/api/rss` | CORS proxy for 11 RSS feeds (allowlisted) |
| `panchangam.js` | `/api/panchangam` | Swiss Ephemeris calculations (Moshier, WASM) |

---

## Astronomical Accuracy Notes

### Online (Cloudflare Edge Function)
Uses the [`sweph`](https://github.com/timotejroiko/sweph) npm package — the Swiss Ephemeris compiled to WebAssembly with the built-in **Moshier algorithm** (no data files required):

| Body | Accuracy |
|---|---|
| Sun longitude | ~1 arcmin |
| Moon longitude | ~3 arcmin |
| Sunrise/Sunset | ~10 seconds |

This is sufficient for correct tithi, nakshatra, and muhurta determination in all practical panchangam use.

### Offline Fallback (Client-side JS)
- **Sun longitude**: VSOP87 simplified (Meeus Ch. 25) — accurate to ~0.01°
- **Moon longitude**: ELP2000 with 60 principal terms (Meeus Ch. 47) — accurate to ~0.5° (30 arcmin)
- **Sunrise/Sunset**: NOAA solar calculator — accurate to within ~1 minute

### Path to Sub-arcsecond Precision
For traditional *Drik Ganitha* precision (< 1 arcsec), upload Swiss Ephemeris data files (`.se1` / `.se2`) to a Cloudflare R2 bucket and update `panchangam.js` to call `sweph.set_ephe_path()` pointing at the R2-mounted path. No client-side changes are needed.

---

## Contributing

All changes go through a **Pull Request** — direct pushes to `main` are not permitted. Open a PR so changes can be reviewed and conflicts resolved before merging.

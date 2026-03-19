# Dakshin Panchangam

A **single source of truth** for South Indian Hindu rituals, rites, and the lunar calendar — built for Tamil, Telugu, Kannada, and Malayalam communities, as well as the global diaspora.

Designed for brahmins, temple priests, and devotees who need accurate daily panchangam, festival alerts, and devotional news in their own language.

---

## Vision

**Dakshin Panchangam** aims to be the definitive all-in-one platform for South Indian Hinduism:

- **Lunar calendar accuracy** — Tithi, Nakshatra, Rahu Kalam, Yamagandam, Abhijit Muhurta, Brahma Muhurta, Amrita Kalam computed from real astronomical algorithms (Meeus ELP2000 / VSOP87 / NOAA)
- **All four Dravidian languages** — Tamil (தமிழ்), Telugu (తెలుగు), Kannada (ಕನ್ನಡ), Malayalam (മലയാളം), plus English
- **South India focused** — cities across Tamil Nadu, Andhra Pradesh, Telangana, Karnataka, and Kerala; plus diaspora locations in Singapore, Malaysia, USA, UK, and Australia
- **Temple & priest workflow** — festivals (Amavasai, Pournami, Shashti Vratam, Soma Pradosh, Shivaratri), auspicious nakshatras, and muhurtas for daily puja scheduling
- **Real-time notifications** — web push for Rahu Kalam reminders (Android & iOS apps planned)
- **Devotional news aggregator** — 11 curated South Indian Hindu RSS feeds, auto-loaded and sorted newest-first

---

## Features

### Astronomical Calculations (Client-side, No API Key)
| Feature | Algorithm |
|---|---|
| Tithi (1–30, Amavasai/Pournami accurate) | Moon–Sun elongation / 12° via Meeus ELP2000 |
| Nakshatra (1–27) | Moon longitude / 13.333° |
| Moon Rasi | Moon longitude / 30° |
| Tamil/Solar calendar day | Sun's degree within current zodiac sign |
| Sunrise & Sunset | NOAA solar calculator (declination + equation of time + hour angle) |
| Rahu Kalam, Yamagandam, Abhijit, Brahma, Amrita | Derived from sunrise by traditional time divisions |

### Languages
Switch between **Tamil · Telugu · Kannada · Malayalam · English** — tithi names, nakshatra names, rasi names, and all UI strings are fully localized.

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

---

## Roadmap

- [ ] **Telugu, Kannada, Malayalam** script UI (in progress — i18n groundwork complete)
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

---

## Deployment — Cloudflare Pages

| Setting | Value |
|---|---|
| Build command | *(none)* |
| Build output directory | `/` |
| Framework preset | `None` |

The Cloudflare Pages Function at `functions/api/rss.js` proxies RSS feeds to avoid CORS. All permitted feed URLs are explicitly allowlisted.

---

## Astronomical Accuracy Notes

The app uses JavaScript implementations of:
- **Sun longitude**: VSOP87 simplified (Meeus Ch. 25) — accurate to ~0.01°
- **Moon longitude**: ELP2000 with 60 principal terms (Meeus Ch. 47) — accurate to ~0.5°
- **Sunrise/Sunset**: NOAA solar calculator — accurate to within ~1 minute for most latitudes

For sub-arcminute precision (required for traditional *Drik Ganitha* panchangam), replace `assets/swisseph.js` with the official [swisseph-js](https://github.com/timotejroiko/sweph) browser build and place Swiss Ephemeris data files (`.se1`/`.se2`) in `assets/ephe/`.

---

## Contributing

All changes go through a **Pull Request** — direct pushes to `main` are not permitted. Open a PR so changes can be reviewed and conflicts resolved before merging.

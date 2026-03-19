const CITY_PRESETS = [
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Hyderabad', lat: 17.385, lon: 78.4867 }
];

const RSS_SOURCES = [
  { name: 'Hinduism Today', url: 'https://www.hinduismtoday.com/feed/', tag: 'Featured' },
  { name: 'Tamil Brahmins Forum', url: 'https://www.tamilbrahmins.com/forums/-/index.rss', tag: 'Community' },
  { name: 'Aanmeegam', url: 'https://aanmeegam.in/feed/', tag: 'Tamil Bhakthi' },
  { name: 'Tamil and Vedas', url: 'https://tamilandvedas.com/feed/', tag: 'Tamil Bhakthi' },
  { name: 'TemplePurohit', url: 'https://www.templepurohit.com/feed/', tag: 'Devotional' },
  { name: 'Sadhguru Wisdom', url: 'https://isha.sadhguru.org/in/en/wisdom/rss.xml', tag: 'Devotional' }
];

const TITHI_NAMES = ['Pirathamai', 'Thuthiyai', 'Thiruthiyai', 'Sathurthi', 'Panjami', 'Shasti', 'Sapthami', 'Astami', 'Navami', 'Thasami', 'Egadashi', 'Duvadasi', 'Thirayodasi', 'Sathuradasi', 'Pournami', 'Pirathamai', 'Thuthiyai', 'Thiruthiyai', 'Sathurthi', 'Panjami', 'Shasti', 'Sapthami', 'Astami', 'Navami', 'Thasami', 'Egadashi', 'Duvadasi', 'Thirayodasi', 'Sathuradasi', 'Amavasai'];
const NAKSHATRA = ['Aswini', 'Bharani', 'Karthigai', 'Rohini', 'Mirugasirisham', 'Thiruvathirai', 'Punarpoosam', 'Poosam', 'Ayilyam', 'Magam', 'Pooram', 'Uthiram', 'Hastham', 'Chithirai', 'Swathi', 'Visakam', 'Anusham', 'Kettai', 'Moolam', 'Pooradam', 'Uthiradam', 'Thiruvonam', 'Avittam', 'Sathayam', 'Poorattathi', 'Uthirattathi', 'Revathi'];
const RASI = ['Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya', 'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'];

const I18N = {
  ta: {
    appTitle: 'தமிழ் பஞ்சாங்கம்', calc: 'கணக்கிடு', date: 'தேதி', city: 'நகரம்', lat: 'அகலாங்கம் (Lat)', lon: 'நெட்டாங்கம் (Lon)',
    useLoc: 'என் இருப்பிடம்', calculate: 'கணக்கு', reminders: 'நினைவூட்டு இயக்கு', results: 'இன்றைய பலன்கள்', news: 'பக்தி செய்திகள்', rss: 'RSS மூலம்',
    footer: 'ஆஃப்லைன் PWA • client-side மட்டும்', monthTitle: 'மாத பஞ்சாங்கம்',
    rahu: 'ராகு காலம்', yama: 'யமகண்டம்', abhijit: 'அபிஜித் முஹூர்த்தம்', shashti: 'சஷ்டி நிலை', amrita: 'அமிர்த காலம்', brahma: 'பிரஹ்ம முகூர்த்தம்',
    tivaraatri: 'திவராத்திரி', ausp: 'மங்கள நாள்', shashtiMsg: 'சஷ்டி விரதம் ({paksha}) — காலை பூஜை மறக்காதீங்க!', noShashti: 'இன்று சஷ்டி இல்லை',
    mondayTuesday: 'ஆம்', no: 'இல்லை', goodNak: 'மங்கல நட்சத்திரம்!', notMarked: 'சாதாரண நாள்', rssLoad: 'RSS ஏற்று',
    remSet: 'ராகு காலம் தொடங்க 30 நிமிடங்களுக்கு முன் நினைவூட்டு அமைக்கப்பட்டது', remNow: 'ராகு காலம் தொடங்க போகுது—பூஜை தள்ளி வைக்கலாம்',
    weekdays: ['Sun<br>ஞா', 'Mon<br>தி', 'Tue<br>செ', 'Wed<br>பு', 'Thu<br>வி', 'Fri<br>வெ', 'Sat<br>ச'],
    festival: 'விழா'
  },
  en: {
    appTitle: 'Tamil Panchangam', calc: 'Calculate', date: 'Date', city: 'City', lat: 'Latitude (Lat)', lon: 'Longitude (Lon)',
    useLoc: 'Use My Location', calculate: 'Calculate', reminders: 'Enable Reminder', results: "Today's Panchangam", news: 'Bhakti News', rss: 'RSS Source',
    footer: 'Offline-ready PWA • Client-side only', monthTitle: 'Monthly Panchangam',
    rahu: 'Rahu Kalam', yama: 'Yamagandam', abhijit: 'Abhijit Muhurta', shashti: 'Shashti', amrita: 'Amrita Kalam', brahma: 'Brahma Muhurta',
    tivaraatri: 'Tivaraatri', ausp: 'Auspicious Day', shashtiMsg: 'Shashti fasting ({paksha}) — Morning puja reminder!', noShashti: 'No Shashti today',
    mondayTuesday: 'Yes', no: 'No', goodNak: 'Mangala nakshatra!', notMarked: 'Regular day', rssLoad: 'Load Feed',
    remSet: 'Reminder set for 30 mins before Rahu Kalam', remNow: 'Rahu Kalam starts soon—consider postponing puja',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], festival: 'Festival'
  }
};

let currentLang = 'ta';
let notifyTimeout;
let currentMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let newsArticles = [];
let activeNewsTag = 'All';

const t = (k) => I18N[currentLang][k] || k;
const fmtTime = (d) => d.toLocaleTimeString(currentLang === 'ta' ? 'ta-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' });

function initUI() {
  const dateInput = document.getElementById('date-input');
  dateInput.valueAsDate = new Date();

  const citySelect = document.getElementById('city-select');
  CITY_PRESETS.forEach((c, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = `${c.name} (${c.lat}, ${c.lon})`;
    citySelect.appendChild(opt);
  });
  citySelect.addEventListener('change', () => {
    applyCity(CITY_PRESETS[citySelect.value]);
    renderMonthViewFromInputs();
  });
  applyCity(CITY_PRESETS[0]);

  renderNewsChips();
  document.getElementById('news-search').addEventListener('input', renderNewsCards);

  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'ta' ? 'en' : 'ta';
    document.getElementById('lang-toggle').textContent = currentLang === 'ta' ? 'English' : 'தமிழ்';
    hydrateLabels();
    renderFromCache();
    renderMonthViewFromInputs();
  });
  document.getElementById('calc-btn').addEventListener('click', calculateAndRender);
  document.getElementById('geo-btn').addEventListener('click', useGeolocation);
  document.getElementById('notify-btn').addEventListener('click', scheduleReminder);
  document.getElementById('rss-load-btn').addEventListener('click', loadAllFeeds);
  document.getElementById('month-prev').addEventListener('click', () => moveMonth(-1));
  document.getElementById('month-next').addEventListener('click', () => moveMonth(1));

  hydrateLabels();
  renderFromCache();
  renderMonthViewFromInputs();
  loadAllFeeds();
}

function hydrateLabels() {
  const map = {
    'app-title': 'appTitle', 'calc-title': 'calc', 'label-date': 'date', 'label-city': 'city', 'label-lat': 'lat', 'label-lon': 'lon',
    'geo-btn': 'useLoc', 'calc-btn': 'calculate', 'notify-btn': 'reminders', 'result-title': 'results', 'news-title': 'news',
    'rss-load-btn': 'rssLoad', 'footer-note': 'footer', 'month-title-text': 'monthTitle'
  };
  Object.entries(map).forEach(([id, key]) => { document.getElementById(id).textContent = t(key); });
  document.getElementById('news-search').placeholder = currentLang === 'ta' ? 'கட்டுரை தேடல்' : 'Search your articles';
  renderWeekdayRail();
}

function applyCity(city) {
  document.getElementById('lat-input').value = city.lat;
  document.getElementById('lon-input').value = city.lon;
}

function useGeolocation() {
  if (!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition((pos) => {
    document.getElementById('lat-input').value = pos.coords.latitude.toFixed(4);
    document.getElementById('lon-input').value = pos.coords.longitude.toFixed(4);
    renderMonthViewFromInputs();
  }, (err) => alert(err.message));
}

// NOAA solar calculator — returns UTC Date objects for sunrise and sunset
function calcSunriseSunset(date, lat, lon) {
  const jd = 2440587.5 + date.getTime() / 86400000;
  const T = (jd - 2451545.0) / 36525;
  let L0 = ((280.46646 + 36000.76983 * T) % 360 + 360) % 360;
  let M = ((357.52911 + 35999.05029 * T) % 360 + 360) % 360;
  const Mrad = M * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad)
    + 0.019993 * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega = 125.04 - 1934.136 * T;
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(omega * Math.PI / 180);
  const epsilon = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
  const decl = Math.asin(Math.sin(epsilon) * Math.sin(lambda * Math.PI / 180));
  const L0rad = L0 * Math.PI / 180;
  const e = 0.016708634 - 0.000042037 * T;
  const y = Math.tan(epsilon / 2) ** 2;
  const eot = 4 * (180 / Math.PI) * (
    y * Math.sin(2 * L0rad) - 2 * e * Math.sin(Mrad)
    + 4 * e * y * Math.sin(Mrad) * Math.cos(2 * L0rad)
    - 0.5 * y * y * Math.sin(4 * L0rad)
    - 1.25 * e * e * Math.sin(2 * Mrad)
  );
  const latRad = lat * Math.PI / 180;
  const cosH = (Math.cos(90.833 * Math.PI / 180) - Math.sin(latRad) * Math.sin(decl))
    / (Math.cos(latRad) * Math.cos(decl));
  const solarNoonUTC = 720 - 4 * lon - eot;
  if (cosH < -1 || cosH > 1) {
    const noon = new Date(date.getTime() + solarNoonUTC * 60000);
    return { sunrise: new Date(noon.getTime() - 6 * 3600000), sunset: new Date(noon.getTime() + 6 * 3600000) };
  }
  const H = Math.acos(cosH) * 180 / Math.PI;
  return {
    sunrise: new Date(date.getTime() + (solarNoonUTC - H * 4) * 60000),
    sunset: new Date(date.getTime() + (solarNoonUTC + H * 4) * 60000)
  };
}

function getSunrise(date, lat, lon) {
  return calcSunriseSunset(date, lat, lon).sunrise;
}

// Moon rasi from real moon longitude
function calcMoonRasi(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return RASI[Math.floor(getMoonLongitude(jd) / 30)];
}

// Tamil solar calendar day: Sun's degree within current rasi (~1°/day)
function calcTamilDay(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return Math.floor(getSunLongitude(jd) % 30) + 1;
}
const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);
const getRahuKalam = (sunrise) => ({ start: addMinutes(sunrise, 90), end: addMinutes(sunrise, 180) });
const getYamagandam = (sunrise) => ({ start: addMinutes(sunrise, 450), end: addMinutes(sunrise, 540) });
const getAbhijitMuhurta = (sunrise) => ({ start: addMinutes(sunrise, 504), end: addMinutes(sunrise, 552) });

// Real astronomical calculations (Meeus, Astronomical Algorithms 2nd ed.)
function getSunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = ((L0 % 360) + 360) % 360;
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = ((M % 360) + 360) % 360;
  const Mrad = M * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
    + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
    + 0.000289 * Math.sin(3 * Mrad);
  return ((( L0 + C) % 360) + 360) % 360;
}

function getMoonLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  const T2 = T * T; const T3 = T2 * T; const T4 = T3 * T;
  const r = Math.PI / 180;
  const L = ((218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841 - T4 / 65194000) % 360 + 360) % 360;
  const D = ((297.8501921 + 445267.1114034 * T - 0.0018819 * T2 + T3 / 545868 - T4 / 113065000) % 360 + 360) % 360;
  const M = ((357.5291092 + 35999.0502909 * T - 0.0001536 * T2 + T3 / 24490000) % 360 + 360) % 360;
  const Mp = ((134.9633964 + 477198.8675055 * T + 0.0087414 * T2 + T3 / 69699 - T4 / 14712000) % 360 + 360) % 360;
  const F = ((93.2720950 + 483202.0175233 * T - 0.0036539 * T2 - T3 / 3526000 + T4 / 863310000) % 360 + 360) % 360;
  const Dr = D * r; const Mr = M * r; const Mpr = Mp * r; const Fr = F * r;
  const dL = (6288774 * Math.sin(Mpr)
    + 1274027 * Math.sin(2 * Dr - Mpr)
    + 658314 * Math.sin(2 * Dr)
    + 213618 * Math.sin(2 * Mpr)
    - 185116 * Math.sin(Mr)
    - 114332 * Math.sin(2 * Fr)
    + 58793 * Math.sin(2 * Dr - 2 * Mpr)
    + 57066 * Math.sin(2 * Dr - Mr - Mpr)
    + 53322 * Math.sin(2 * Dr + Mpr)
    + 45758 * Math.sin(2 * Dr - Mr)
    - 40923 * Math.sin(Mr - Mpr)
    - 34720 * Math.sin(Dr)
    - 30383 * Math.sin(Mr + Mpr)
    + 15327 * Math.sin(2 * Dr - 2 * Fr)
    + 10980 * Math.sin(Mpr - 2 * Fr)
    + 10675 * Math.sin(4 * Dr - Mpr)
    + 10034 * Math.sin(3 * Mpr)
    + 8548 * Math.sin(4 * Dr - 2 * Mpr)
    - 7888 * Math.sin(2 * Dr + Mr - Mpr)
    - 6766 * Math.sin(2 * Dr + Mr)
    - 5163 * Math.sin(Dr - Mpr)
    + 4987 * Math.sin(Dr + Mr)
    + 4036 * Math.sin(2 * Dr - Mr + Mpr)
    + 3994 * Math.sin(2 * Dr + 2 * Mpr)
    + 3861 * Math.sin(4 * Dr)
    + 3665 * Math.sin(2 * Dr - 3 * Mpr)
    - 2689 * Math.sin(Mr - 2 * Mpr)
    + 2390 * Math.sin(2 * Dr - Mr - 2 * Mpr)
    - 2348 * Math.sin(Dr + Mpr)
    + 2236 * Math.sin(2 * Dr - 2 * Mr)
    - 2120 * Math.sin(Mr + 2 * Mpr)
    + 2048 * Math.sin(2 * Dr - 2 * Mr - Mpr)
    - 1773 * Math.sin(2 * Dr + Mpr - 2 * Fr)
    + 1215 * Math.sin(4 * Dr - Mr - Mpr)
    - 892 * Math.sin(3 * Dr - Mpr)
    - 810 * Math.sin(2 * Dr + Mr + Mpr)
    + 759 * Math.sin(4 * Dr - Mr - 2 * Mpr)
    - 713 * Math.sin(2 * Mr - Mpr)
    + 691 * Math.sin(2 * Dr + Mr - 2 * Mpr)
    + 549 * Math.sin(4 * Dr + Mpr)
    + 537 * Math.sin(4 * Mpr)
    + 520 * Math.sin(4 * Dr - Mr)
    - 487 * Math.sin(Dr - 2 * Mpr)
    - 381 * Math.sin(2 * Mpr - 2 * Fr)
    + 351 * Math.sin(Dr + Mr + Mpr)
    - 340 * Math.sin(3 * Dr - 2 * Mpr)
    + 330 * Math.sin(4 * Dr - 3 * Mpr)
    - 323 * Math.sin(2 * Mr + Mpr)
    + 299 * Math.sin(Dr + Mr - Mpr)) * 1e-6;
  return ((( L + dL) % 360) + 360) % 360;
}

// Tithi = Moon-Sun elongation / 12°, 1-indexed (30 = Amavasai)
function calcTithi(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0); // approximate sunrise
  const jd = 2440587.5 + d.getTime() / 86400000;
  let elong = getMoonLongitude(jd) - getSunLongitude(jd);
  if (elong < 0) elong += 360;
  return Math.floor(elong / 12) + 1;
}

// Nakshatra = Moon longitude / (360/27)°, 1-indexed
function calcNakshatra(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return Math.floor(getMoonLongitude(jd) / (360 / 27)) + 1;
}

function getShashti(date) {
  const tithi = calcTithi(date);
  if (tithi === 6 || tithi === 21) {
    const paksha = tithi < 15 ? (currentLang === 'ta' ? 'சுக்க்ல பக்ஷம்' : 'Shukla Paksha') : (currentLang === 'ta' ? 'கிருஷ்ண பக்ஷம்' : 'Krishna Paksha');
    return t('shashtiMsg').replace('{paksha}', paksha);
  }
  return t('noShashti');
}
function getAuspicious(date) {
  return [5, 6, 10, 13, 14, 18].includes(calcNakshatra(date)) ? t('goodNak') : t('notMarked');
}

function calculatePanchangam(date, lat, lon) {
  const sunrise = getSunrise(date, lat, lon);
  const rahu = getRahuKalam(sunrise);
  return {
    date: date.toISOString(), lat, lon, rahu,
    yama: getYamagandam(sunrise), abhijit: getAbhijitMuhurta(sunrise),
    shashti: getShashti(date), auspicious: getAuspicious(date),
    amrita: { start: addMinutes(sunrise, 240), end: addMinutes(sunrise, 288) },
    brahma: { start: addMinutes(sunrise, -96), end: addMinutes(sunrise, -48) },
    tivaraatri: [1, 2].includes(date.getDay()) && /Shashti|சஷ்டி/.test(getShashti(date))
  };
}

function renderResults(data) {
  const cards = [[t('rahu'), `${fmtTime(new Date(data.rahu.start))} - ${fmtTime(new Date(data.rahu.end))}`], [t('yama'), `${fmtTime(new Date(data.yama.start))} - ${fmtTime(new Date(data.yama.end))}`], [t('abhijit'), `${fmtTime(new Date(data.abhijit.start))} - ${fmtTime(new Date(data.abhijit.end))}`], [t('amrita'), `${fmtTime(new Date(data.amrita.start))} - ${fmtTime(new Date(data.amrita.end))}`], [t('brahma'), `${fmtTime(new Date(data.brahma.start))} - ${fmtTime(new Date(data.brahma.end))}`], [t('shashti'), data.shashti], [t('tivaraatri'), data.tivaraatri ? t('mondayTuesday') : t('no')], [t('ausp'), data.auspicious]];
  document.getElementById('results-grid').innerHTML = cards.map(([ttl, txt]) => `<article class="card"><h3>${ttl}</h3><p>${txt}</p></article>`).join('');
}

function calculateAndRender() {
  const dateValue = document.getElementById('date-input').value;
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (!dateValue || Number.isNaN(lat) || Number.isNaN(lon)) return alert('Provide date + valid coordinates');
  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const result = calculatePanchangam(selectedDate, lat, lon);
  localStorage.setItem('panchangam:last', JSON.stringify(result));
  renderResults(result);
  currentMonthDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  renderMonthViewFromInputs();
}

function renderFromCache() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return;
  const parsed = JSON.parse(raw);
  renderResults(parsed);
}

function scheduleReminder() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return alert('Run calculation first');
  const data = JSON.parse(raw);
  const ms = new Date(data.rahu.start).getTime() - (30 * 60 * 1000) - Date.now();
  if (notifyTimeout) clearTimeout(notifyTimeout);
  if (ms <= 0) return alert('Reminder time already passed for selected date');
  notifyTimeout = setTimeout(() => alert(t('remNow')), ms);
  alert(t('remSet'));
}

function extractImageFromItem(item, description) {
  const media = item.querySelector('media\:content, content');
  if (media?.getAttribute('url')) return media.getAttribute('url');
  const enclosure = item.querySelector('enclosure');
  if (enclosure?.getAttribute('url')) return enclosure.getAttribute('url');
  const match = description.match(/<img[^>]+src=["']([^"']+)/i);
  return match ? match[1] : '';
}

function parseRSSItems(xmlDoc, sourceMeta) {
  if (!xmlDoc) return [];
  return Array.from(xmlDoc.querySelectorAll('item')).slice(0, 12).map((item) => {
    const title = item.querySelector('title')?.textContent?.trim() || 'Untitled';
    const link = item.querySelector('link')?.textContent?.trim() || '#';
    const description = item.querySelector('description')?.textContent || '';
    const clean = description.replace(/<[^>]+>/g, '').trim();
    const pub = item.querySelector('pubDate')?.textContent || '';
    return {
      title, link,
      summary: clean.slice(0, 120),
      pubMs: pub ? new Date(pub).getTime() : 0,
      dateText: pub ? new Date(pub).toLocaleDateString(currentLang === 'ta' ? 'ta-IN' : 'en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '',
      image: extractImageFromItem(item, description),
      tag: sourceMeta.tag,
      source: sourceMeta.name
    };
  });
}

async function fetchFeed(source) {
  const parse = (text) => parseRSSItems(new DOMParser().parseFromString(text, 'application/xml'), source);
  try {
    const res = await fetch(`/api/rss?url=${encodeURIComponent(source.url)}`);
    if (res.ok) return parse(await res.text());
  } catch {}
  try {
    const res = await fetch(source.url);
    if (res.ok) return parse(await res.text());
  } catch {}
  return [];
}

async function loadAllFeeds() {
  const output = document.getElementById('news-feed');
  output.innerHTML = '<p>Loading…</p>';
  const results = await Promise.all(RSS_SOURCES.map(fetchFeed));
  newsArticles = results.flat().sort((a, b) => b.pubMs - a.pubMs);
  renderNewsCards();
}

function renderNewsChips() {
  const container = document.getElementById('news-chips');
  const tags = ['All', ...new Set(RSS_SOURCES.map((s) => s.tag))];
  container.innerHTML = tags.map((tag) => `<button type="button" class="news-chip ${tag === activeNewsTag ? 'active' : ''}" data-tag="${tag}">${tag}</button>`).join('');
  container.querySelectorAll('.news-chip').forEach((btn) => btn.addEventListener('click', () => {
    activeNewsTag = btn.getAttribute('data-tag');
    renderNewsChips();
    renderNewsCards();
  }));
}

function renderNewsCards() {
  const q = document.getElementById('news-search').value.trim().toLowerCase();
  const output = document.getElementById('news-feed');
  const filtered = newsArticles.filter((a) => {
    const tagOk = activeNewsTag === 'All' || a.tag === activeNewsTag;
    const qOk = !q || (`${a.title} ${a.summary} ${a.source}`.toLowerCase().includes(q));
    return tagOk && qOk;
  });
  if (!filtered.length) {
    output.innerHTML = '<p>No articles found.</p>';
    return;
  }
  output.innerHTML = filtered.map((a) => `<article class="news-card"><img src="${a.image || 'assets/icon-512.svg'}" alt="${a.title}" loading="lazy" referrerpolicy="no-referrer"><div class="news-card-body"><div class="news-date">${a.dateText || a.source}</div><a class="news-title-link" href="${a.link}" target="_blank" rel="noopener">${a.title}</a></div></article>`).join('');
}


function getFestivalTags(date) {
  const tags = [];
  const tithi = calcTithi(date);
  if ([6, 21].includes(tithi)) tags.push('Shasti Vratam');
  if ([15].includes(tithi)) tags.push('Pournami');
  if ([30].includes(tithi)) tags.push('Amavasai');
  if (date.getDay() === 1 && [13, 28].includes(tithi)) tags.push('Soma Pradosh');
  return tags;
}

function getMonthCellData(date, lat, lon) {
  const { sunrise, sunset } = calcSunriseSunset(date, lat, lon);
  const tithi = calcTithi(date);
  const nak = calcNakshatra(date);
  const paksha = tithi <= 15 ? 'S' : 'K';
  const moonRasi = calcMoonRasi(date);
  const tamilDay = calcTamilDay(date);
  return { sunrise: fmtTime(sunrise), sunset: fmtTime(sunset), tithi: `${TITHI_NAMES[tithi - 1]} ${paksha}`, nakshatra: `${NAKSHATRA[nak - 1]}`, moon: moonRasi, tamilDay, festivals: getFestivalTags(date) };
}

function renderWeekdayRail() {
  document.getElementById('weekday-rail').innerHTML = t('weekdays').map((w) => `<div class="dpVGridWeekdayCell dpFlexEqual"><span>${w}</span></div>`).join('');
}

function moveMonth(step) {
  currentMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + step, 1);
  renderMonthViewFromInputs();
}

function renderMonthViewFromInputs() {
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (Number.isNaN(lat) || Number.isNaN(lon)) return;
  renderMonthGrid(currentMonthDate, lat, lon);
}

function renderMonthGrid(anchorDate, lat, lon) {
  const title = anchorDate.toLocaleDateString(currentLang === 'ta' ? 'ta-IN' : 'en-IN', { month: 'long', year: 'numeric' });
  document.getElementById('month-title').textContent = title;

  const first = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const last = new Date(anchorDate.getFullYear(), anchorDate.getMonth() + 1, 0);
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay());

  const selectedDate = document.getElementById('date-input').value ? new Date(`${document.getElementById('date-input').value}T00:00:00`) : new Date();
  const body = document.getElementById('month-grid-body');
  let html = '';
  let cursor = new Date(start);

  for (let w = 0; w < 6; w += 1) {
    html += '<div class="dpMonthGridRow dpFlexEqual">';
    for (let d = 0; d < 7; d += 1) {
      const sameMonth = cursor.getMonth() === anchorDate.getMonth();
      const isFocused = cursor.toDateString() === selectedDate.toDateString();
      const isHoliday = cursor.getDay() === 0;
      const cell = getMonthCellData(cursor, lat, lon);
      const events = cell.festivals.length ? `<div class="dpCellFestivalName">${cell.festivals.join(', ')}</div>` : '';
      html += `<div class="dpMonthGridCell ${sameMonth ? '' : 'dpInert'} ${isFocused ? 'dpCurrentFocusedDay' : ''} ${isHoliday ? 'dpHoliday' : ''}" data-date="${cursor.toISOString().slice(0, 10)}"><div class="dpCellDate"><span class="dpSunriseTiming">🌅<br>${cell.sunrise}</span><span class="dpBigDate">${cursor.getDate()}<br><span class="dpCellBriefedWeekday">${cursor.toLocaleDateString('en-US', { weekday: 'short' })}</span></span><span class="dpSmallDate">${cell.tamilDay}</span><span class="dpSunsetTiming">🌇<br>${cell.sunset}</span></div><span class="dpCellTithi">${cell.tithi}</span><div class="dpMoonTiming">🌙 ${cell.moon}</div><div class="dpNakshatra">⭐ ${cell.nakshatra}</div>${events}</div>`;
      cursor.setDate(cursor.getDate() + 1);
    }
    html += '</div>';
  }

  body.innerHTML = html;
  body.querySelectorAll('.dpMonthGridCell').forEach((node) => {
    node.addEventListener('click', () => {
      const dateValue = node.getAttribute('data-date');
      document.getElementById('date-input').value = dateValue;
      calculateAndRender();
    });
  });
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
initUI();

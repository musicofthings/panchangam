const CITY_PRESETS = [
  { name: 'Chennai', lat: 13.0827, lon: 80.2707 },
  { name: 'New York', lat: 40.7128, lon: -74.006 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Hyderabad', lat: 17.385, lon: 78.4867 }
];

const RSS_SOURCES = [
  { name: 'Hinduism Today', url: 'https://www.hinduismtoday.com/feed/' },
  { name: 'Tamil Brahmins Forum', url: 'https://www.tamilbrahmins.com/forums/-/index.rss' }
];

const I18N = {
  ta: {
    appTitle: 'தமிழ் பஞ்சாங்கம்', calc: 'கணக்கிடு', date: 'தேதி', city: 'நகரம்', lat: 'அகலாங்கம் (Lat)', lon: 'நெட்டாங்கம் (Lon)',
    useLoc: 'என் இருப்பிடம்', calculate: 'கணக்கு', reminders: 'நினைவூட்டு இயக்கு', results: 'இன்றைய பலன்கள்', news: 'பக்தி செய்திகள்',
    rss: 'RSS மூலம்', footer: 'ஆஃப்லைன் PWA • client-side மட்டும்',
    rahu: 'ராகு காலம்', yama: 'யமகண்டம்', abhijit: 'அபிஜித் முஹூர்த்தம்', shashti: 'சஷ்டி நிலை',
    amrita: 'அமிர்த காலம்', brahma: 'பிரஹ்ம முகூர்த்தம்', tivaraatri: 'திவராத்திரி', ausp: 'மங்கள நாள்',
    shashtiMsg: 'சஷ்டி விரதம் ({paksha}) — காலை பூஜை மறக்காதீங்க!', noShashti: 'இன்று சஷ்டி இல்லை', mondayTuesday: 'ஆம்', no: 'இல்லை',
    goodNak: 'மங்கல நட்சத்திரம்!', notMarked: 'சாதாரண நாள்',
    rssLoad: 'RSS ஏற்று', remSet: 'ராகு காலம் தொடங்க 30 நிமிடங்களுக்கு முன் நினைவூட்டு அமைக்கப்பட்டது',
    remNow: 'ராகு காலம் தொடங்க போகுது—பூஜை தள்ளி வைக்கலாம்'
  },
  en: {
    appTitle: 'Tamil Panchangam', calc: 'Calculate', date: 'Date', city: 'City', lat: 'Latitude (Lat)', lon: 'Longitude (Lon)',
    useLoc: 'Use My Location', calculate: 'Calculate', reminders: 'Enable Reminder', results: "Today's Panchangam", news: 'Bhakti News',
    rss: 'RSS Source', footer: 'Offline-ready PWA • Client-side only',
    rahu: 'Rahu Kalam', yama: 'Yamagandam', abhijit: 'Abhijit Muhurta', shashti: 'Shashti',
    amrita: 'Amrita Kalam', brahma: 'Brahma Muhurta', tivaraatri: 'Tivaraatri', ausp: 'Auspicious Day',
    shashtiMsg: 'Shashti fasting ({paksha}) — Morning puja reminder!', noShashti: 'No Shashti today', mondayTuesday: 'Yes', no: 'No',
    goodNak: 'Mangala nakshatra!', notMarked: 'Regular day',
    rssLoad: 'Load Feed', remSet: 'Reminder set for 30 mins before Rahu Kalam',
    remNow: 'Rahu Kalam starts soon—consider postponing puja'
  }
};

let currentLang = 'ta';
let notifyTimeout;

function t(key) { return I18N[currentLang][key] || key; }
function fmtTime(date) { return date.toLocaleTimeString(currentLang === 'ta' ? 'ta-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' }); }

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
  citySelect.addEventListener('change', () => applyCity(CITY_PRESETS[citySelect.value]));
  applyCity(CITY_PRESETS[0]);

  const rssSelect = document.getElementById('rss-select');
  RSS_SOURCES.forEach((s, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = s.name;
    rssSelect.appendChild(opt);
  });

  document.getElementById('lang-toggle').addEventListener('click', () => {
    currentLang = currentLang === 'ta' ? 'en' : 'ta';
    document.getElementById('lang-toggle').textContent = currentLang === 'ta' ? 'English' : 'தமிழ்';
    hydrateLabels();
    renderFromCache();
  });
  document.getElementById('calc-btn').addEventListener('click', calculateAndRender);
  document.getElementById('geo-btn').addEventListener('click', useGeolocation);
  document.getElementById('notify-btn').addEventListener('click', scheduleReminder);
  document.getElementById('rss-load-btn').addEventListener('click', () => loadRSS(RSS_SOURCES[rssSelect.value].url));

  hydrateLabels();
  renderFromCache();
}

function hydrateLabels() {
  document.getElementById('app-title').textContent = t('appTitle');
  document.getElementById('calc-title').textContent = t('calc');
  document.getElementById('label-date').textContent = t('date');
  document.getElementById('label-city').textContent = t('city');
  document.getElementById('label-lat').textContent = t('lat');
  document.getElementById('label-lon').textContent = t('lon');
  document.getElementById('geo-btn').textContent = t('useLoc');
  document.getElementById('calc-btn').textContent = t('calculate');
  document.getElementById('notify-btn').textContent = t('reminders');
  document.getElementById('result-title').textContent = t('results');
  document.getElementById('news-title').textContent = t('news');
  document.getElementById('label-rss').textContent = t('rss');
  document.getElementById('rss-load-btn').textContent = t('rssLoad');
  document.getElementById('footer-note').textContent = t('footer');
}

function applyCity(city) {
  document.getElementById('lat-input').value = city.lat;
  document.getElementById('lon-input').value = city.lon;
}

function useGeolocation() {
  if (!navigator.geolocation) return alert('Geolocation not supported');
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      document.getElementById('lat-input').value = pos.coords.latitude.toFixed(4);
      document.getElementById('lon-input').value = pos.coords.longitude.toFixed(4);
    },
    (err) => alert(err.message)
  );
}

// Approximate sunrise; if a real SwissEph wrapper is present, use it.
function getSunrise(date, lat, lon) {
  if (window.SwissEph && typeof window.SwissEph.getSunrise === 'function') {
    return window.SwissEph.getSunrise(date, lat, lon);
  }
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const seasonalShift = Math.sin((date.getMonth() / 11) * Math.PI * 2) * 30;
  const latShift = (Math.abs(lat) / 90) * 40;
  d.setMinutes(d.getMinutes() + Math.round(seasonalShift + latShift));
  return d;
}

function addMinutes(date, mins) {
  return new Date(date.getTime() + mins * 60 * 1000);
}

function getRahuKalam(sunrise) {
  return { start: addMinutes(sunrise, 90), end: addMinutes(sunrise, 180) };
}
function getYamagandam(sunrise) {
  return { start: addMinutes(sunrise, 450), end: addMinutes(sunrise, 540) };
}
function getAbhijitMuhurta(sunrise) {
  return { start: addMinutes(sunrise, 504), end: addMinutes(sunrise, 552) };
}

function pseudoTithi(date) {
  const day = date.getDate();
  return ((day % 30) + 1);
}
function pseudoNakshatra(date) {
  return ((date.getDate() + date.getMonth() * 2) % 27) + 1;
}

function getShashti(date) {
  const tithi = pseudoTithi(date);
  if (tithi === 6 || tithi === 21) {
    const paksha = tithi < 15 ? (currentLang === 'ta' ? 'சுக்க்ல பக்ஷம்' : 'Shukla Paksha') : (currentLang === 'ta' ? 'கிருஷ்ண பக்ஷம்' : 'Krishna Paksha');
    return t('shashtiMsg').replace('{paksha}', paksha);
  }
  return t('noShashti');
}

function getAuspicious(date) {
  const nak = pseudoNakshatra(date);
  return [5, 6, 10, 13, 14, 18].includes(nak) ? t('goodNak') : t('notMarked');
}

function calculatePanchangam(date, lat, lon) {
  const sunrise = getSunrise(date, lat, lon);
  const rahu = getRahuKalam(sunrise);
  const yama = getYamagandam(sunrise);
  const abhijit = getAbhijitMuhurta(sunrise);
  const brahma = { start: addMinutes(sunrise, -96), end: addMinutes(sunrise, -48) };
  const amrita = { start: addMinutes(sunrise, 240), end: addMinutes(sunrise, 288) };
  const tivaraatri = [1, 2].includes(date.getDay()) && /Shashti|சஷ்டி/.test(getShashti(date));

  return {
    date: date.toISOString(),
    lat,
    lon,
    rahu,
    yama,
    abhijit,
    shashti: getShashti(date),
    auspicious: getAuspicious(date),
    amrita,
    brahma,
    tivaraatri
  };
}

function renderResults(data) {
  const cards = [
    [t('rahu'), `${fmtTime(new Date(data.rahu.start))} - ${fmtTime(new Date(data.rahu.end))}`],
    [t('yama'), `${fmtTime(new Date(data.yama.start))} - ${fmtTime(new Date(data.yama.end))}`],
    [t('abhijit'), `${fmtTime(new Date(data.abhijit.start))} - ${fmtTime(new Date(data.abhijit.end))}`],
    [t('amrita'), `${fmtTime(new Date(data.amrita.start))} - ${fmtTime(new Date(data.amrita.end))}`],
    [t('brahma'), `${fmtTime(new Date(data.brahma.start))} - ${fmtTime(new Date(data.brahma.end))}`],
    [t('shashti'), data.shashti],
    [t('tivaraatri'), data.tivaraatri ? t('mondayTuesday') : t('no')],
    [t('ausp'), data.auspicious]
  ];
  document.getElementById('results-grid').innerHTML = cards.map(([title, text]) => `<article class="card"><h3>${title}</h3><p>${text}</p></article>`).join('');
}

function calculateAndRender() {
  const dateValue = document.getElementById('date-input').value;
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (!dateValue || Number.isNaN(lat) || Number.isNaN(lon)) {
    alert('Provide date + valid coordinates');
    return;
  }
  const date = new Date(`${dateValue}T00:00:00`);
  const result = calculatePanchangam(date, lat, lon);
  localStorage.setItem('panchangam:last', JSON.stringify(result));
  renderResults(result);
}

function renderFromCache() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return;
  renderResults(JSON.parse(raw));
}

function scheduleReminder() {
  const raw = localStorage.getItem('panchangam:last');
  if (!raw) return alert('Run calculation first');
  const data = JSON.parse(raw);
  const rahuStart = new Date(data.rahu.start).getTime();
  const triggerAt = rahuStart - 30 * 60 * 1000;
  const ms = triggerAt - Date.now();
  if (notifyTimeout) clearTimeout(notifyTimeout);
  if (ms <= 0) return alert('Reminder time already passed for selected date');
  notifyTimeout = setTimeout(() => alert(t('remNow')), ms);
  alert(t('remSet'));
}

function parseAndRenderRSS(xmlDoc) {
  const output = document.getElementById('news-feed');
  if (!xmlDoc) {
    output.innerHTML = '<li>Feed unavailable (CORS or offline).</li>';
    return;
  }
  const items = Array.from(xmlDoc.querySelectorAll('item')).slice(0, 5);
  output.innerHTML = items.map((item) => {
    const title = item.querySelector('title')?.textContent || 'Untitled';
    const link = item.querySelector('link')?.textContent || '#';
    const desc = (item.querySelector('description')?.textContent || '').replace(/<[^>]+>/g, '').slice(0, 120);
    return `<li><a href="${link}" target="_blank" rel="noopener">${title}</a><br><small>${desc}...</small></li>`;
  }).join('');
}

function loadRSS(url) {
  const output = document.getElementById('news-feed');
  output.innerHTML = '<li>Loading...</li>';

  const proxyUrl = `/api/rss?url=${encodeURIComponent(url)}`;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', proxyUrl);
  xhr.responseType = 'text';
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xhr.responseText, 'application/xml');
      parseAndRenderRSS(xmlDoc);
      return;
    }

    // Fallback for local static servers without Cloudflare Functions.
    const direct = new XMLHttpRequest();
    direct.open('GET', url);
    direct.responseType = 'document';
    direct.onload = () => parseAndRenderRSS(direct.responseXML);
    direct.onerror = () => { output.innerHTML = '<li>Could not load feed.</li>'; };
    direct.send();
  };
  xhr.onerror = () => {
    const direct = new XMLHttpRequest();
    direct.open('GET', url);
    direct.responseType = 'document';
    direct.onload = () => parseAndRenderRSS(direct.responseXML);
    direct.onerror = () => { output.innerHTML = '<li>Could not load feed.</li>'; };
    direct.send();
  };
  xhr.send();
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

initUI();

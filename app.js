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
    renderMonthViewFromInputs();
  });
  document.getElementById('calc-btn').addEventListener('click', calculateAndRender);
  document.getElementById('geo-btn').addEventListener('click', useGeolocation);
  document.getElementById('notify-btn').addEventListener('click', scheduleReminder);
  document.getElementById('rss-load-btn').addEventListener('click', () => loadRSS(RSS_SOURCES[rssSelect.value].url));
  document.getElementById('month-prev').addEventListener('click', () => moveMonth(-1));
  document.getElementById('month-next').addEventListener('click', () => moveMonth(1));

  hydrateLabels();
  renderFromCache();
  renderMonthViewFromInputs();
}

function hydrateLabels() {
  const map = {
    'app-title': 'appTitle', 'calc-title': 'calc', 'label-date': 'date', 'label-city': 'city', 'label-lat': 'lat', 'label-lon': 'lon',
    'geo-btn': 'useLoc', 'calc-btn': 'calculate', 'notify-btn': 'reminders', 'result-title': 'results', 'news-title': 'news',
    'label-rss': 'rss', 'rss-load-btn': 'rssLoad', 'footer-note': 'footer', 'month-title-text': 'monthTitle'
  };
  Object.entries(map).forEach(([id, key]) => { document.getElementById(id).textContent = t(key); });
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

function getSunrise(date, lat, lon) {
  if (window.SwissEph && typeof window.SwissEph.getSunrise === 'function') return window.SwissEph.getSunrise(date, lat, lon);
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  d.setMinutes(d.getMinutes() + Math.round(Math.sin((date.getMonth() / 11) * Math.PI * 2) * 30 + (Math.abs(lat) / 90) * 40 + ((lon % 30) / 3)));
  return d;
}
const addMinutes = (date, mins) => new Date(date.getTime() + mins * 60000);
const getRahuKalam = (sunrise) => ({ start: addMinutes(sunrise, 90), end: addMinutes(sunrise, 180) });
const getYamagandam = (sunrise) => ({ start: addMinutes(sunrise, 450), end: addMinutes(sunrise, 540) });
const getAbhijitMuhurta = (sunrise) => ({ start: addMinutes(sunrise, 504), end: addMinutes(sunrise, 552) });
const pseudoTithi = (date) => (date.getDate() % 30) + 1;
const pseudoNakshatra = (date) => ((date.getDate() + date.getMonth() * 2) % 27) + 1;

function getShashti(date) {
  const tithi = pseudoTithi(date);
  if (tithi === 6 || tithi === 21) {
    const paksha = tithi < 15 ? (currentLang === 'ta' ? 'சுக்க்ல பக்ஷம்' : 'Shukla Paksha') : (currentLang === 'ta' ? 'கிருஷ்ண பக்ஷம்' : 'Krishna Paksha');
    return t('shashtiMsg').replace('{paksha}', paksha);
  }
  return t('noShashti');
}
function getAuspicious(date) {
  return [5, 6, 10, 13, 14, 18].includes(pseudoNakshatra(date)) ? t('goodNak') : t('notMarked');
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

function parseAndRenderRSS(xmlDoc) {
  const output = document.getElementById('news-feed');
  if (!xmlDoc) return output.innerHTML = '<li>Feed unavailable (CORS or offline).</li>';
  const items = Array.from(xmlDoc.querySelectorAll('item')).slice(0, 5);
  output.innerHTML = items.map((item) => `<li><a href="${item.querySelector('link')?.textContent || '#'}" target="_blank" rel="noopener">${item.querySelector('title')?.textContent || 'Untitled'}</a><br><small>${(item.querySelector('description')?.textContent || '').replace(/<[^>]+>/g, '').slice(0, 120)}...</small></li>`).join('');
}

function loadRSS(url) {
  const output = document.getElementById('news-feed');
  output.innerHTML = '<li>Loading...</li>';
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `/api/rss?url=${encodeURIComponent(url)}`);
  xhr.responseType = 'text';
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) return parseAndRenderRSS(new DOMParser().parseFromString(xhr.responseText, 'application/xml'));
    const direct = new XMLHttpRequest();
    direct.open('GET', url); direct.responseType = 'document';
    direct.onload = () => parseAndRenderRSS(direct.responseXML);
    direct.onerror = () => { output.innerHTML = '<li>Could not load feed.</li>'; };
    direct.send();
  };
  xhr.onerror = () => { output.innerHTML = '<li>Could not load feed.</li>'; };
  xhr.send();
}

function getFestivalTags(date) {
  const tags = [];
  const tithi = pseudoTithi(date);
  if ([6, 21].includes(tithi)) tags.push('Shasti Vratam');
  if ([15].includes(tithi)) tags.push('Pournami');
  if ([30].includes(tithi)) tags.push('Amavasai');
  if (date.getDay() === 1 && [13, 28].includes(tithi)) tags.push('Soma Pradosh');
  return tags;
}

function getMonthCellData(date, lat, lon) {
  const sunrise = getSunrise(date, lat, lon);
  const sunset = addMinutes(sunrise, 705 + Math.round(Math.cos(date.getMonth()) * 15));
  const tithi = pseudoTithi(date);
  const nak = pseudoNakshatra(date);
  const paksha = tithi <= 15 ? 'S' : 'K';
  const moonRasi = RASI[(date.getDate() + date.getMonth()) % 12];
  const tamilDay = ((date.getDate() + 15) % 30) + 1;
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

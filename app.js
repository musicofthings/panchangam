/* ════════════════════════════════════════════════════════════
   ROUTER & SCREEN MANAGEMENT
════════════════════════════════════════════════════════════ */

const MAIN_SCREENS = ['today', 'calendar', 'festivals', 'temples', 'news'];
let _prevScreen = 'today';
let _currentScreen = 'today';

function showScreen(id) {
  _prevScreen = _currentScreen;
  _currentScreen = id;

  document.querySelectorAll('.screen').forEach((el) => el.classList.add('hidden'));
  const target = document.getElementById(`screen-${id}`);
  if (target) target.classList.remove('hidden');

  // Update sidebar nav
  document.querySelectorAll('.nav-link').forEach((el) => {
    el.classList.toggle('active', el.dataset.screen === id);
  });
  // Update bottom nav (only for main 5 tabs)
  document.querySelectorAll('.bottom-nav-btn').forEach((el) => {
    el.classList.toggle('active', el.dataset.screen === id);
  });

  // Screen-specific initialisation
  if (id === 'today') renderTodayScreen();
  if (id === 'calendar') renderMonthViewFromInputs();
  if (id === 'festivals') renderFestivals();
  if (id === 'temples') renderTemplesGrid();
  if (id === 'temples-map') renderMapTempleList();
  if (id === 'temple-detail') renderTempleDetail();
  if (id === 'temple-booking') renderBookingDates();
  if (id === 'news') { /* news feed already loaded at startup */ }
  if (id === 'chat') renderChatOverview();

  window.scrollTo({ top: 0, behavior: 'instant' });
  history.replaceState(null, '', `#${id}`);
}

function goBack() {
  showScreen(_prevScreen || 'today');
}

/* ════════════════════════════════════════════════════════════
   STATIC DATA — TEMPLES
════════════════════════════════════════════════════════════ */

const TEMPLES_DATA = [
  {
    id: 'kapaleeshwarar',
    name: 'Kapaleeshwarar Temple',
    location: 'Mylapore, Chennai',
    deity: 'shiva',
    distance: '2 km',
    hours: '5:00 AM – 9:00 PM',
    desc: 'Ancient Dravidian temple dedicated to Lord Shiva and Goddess Karpagambal. Built by the Pallavas in the 7th century CE, the current structure dates to the 16th century after Vijayanagara rule.',
    address: 'Thirumalai Pillai Rd, Mylapore, Chennai 600004',
    phone: '+91 44 2464 1670',
    color: '#5e0081',
    bg: 'from-[#5e0081]/20 to-[#5e0081]/50',
    iconColor: '#5e0081',
    badgeBg: '#f5f0ff',
    badgeText: '#5e0081',
    badgeLabel: 'SHIVA',
    festivals: [
      { name: 'Panguni Peruvizha', season: 'Panguni (Mar–Apr)', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Maha Shivaratri', season: 'Maasi (Feb–Mar)', bg: '#fff0f5', color: '#9e0031' },
      { name: 'Teppam Festival', season: 'Thai (Jan–Feb)', bg: '#f0fff5', color: '#00563e' },
      { name: 'Navaratri', season: 'Purattasi (Sep–Oct)', bg: '#fffbf0', color: '#92400e' }
    ],
    pooja: [
      { name: 'Thiruvanandal', sub: 'Morning Ko Pooja', time: '5:30 AM' },
      { name: 'Uchikala Pooja', sub: 'Noon', time: '12:00 PM' },
      { name: 'Sayarakshai', sub: 'Evening', time: '6:00 PM' },
      { name: 'Ardhajama Pooja', sub: 'Night', time: '9:00 PM' }
    ]
  },
  {
    id: 'meenakshi',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai',
    deity: 'devi',
    distance: '450 km',
    hours: '5:00 AM – 12:30 PM, 4:00 PM – 10:00 PM',
    desc: 'Historic temple dedicated to Goddess Meenakshi (Parvati) and Lord Sundareswarar (Shiva). One of the largest temples in India, with 14 towering gopurams.',
    address: 'Madurai Meenakshi Amman Temple, Madurai, Tamil Nadu 625001',
    phone: '+91 452 234 4360',
    color: '#c62828',
    iconColor: '#c62828',
    badgeBg: '#fff0f0',
    badgeText: '#c62828',
    badgeLabel: 'DEVI',
    festivals: [
      { name: 'Chithirai Festival', season: 'Chithirai (Apr–May)', bg: '#fff0f0', color: '#c62828' },
      { name: 'Navaratri', season: 'Purattasi (Sep–Oct)', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Panguni Uttiram', season: 'Panguni (Mar–Apr)', bg: '#f0fff5', color: '#00563e' },
      { name: 'Maha Shivaratri', season: 'Maasi (Feb–Mar)', bg: '#fffbf0', color: '#92400e' }
    ],
    pooja: [
      { name: 'Thiruvanandal', sub: 'Morning', time: '5:00 AM' },
      { name: 'Noon Pooja', sub: 'Midday', time: '12:00 PM' },
      { name: 'Evening Pooja', sub: 'Sayarakshai', time: '6:30 PM' },
      { name: 'Night Pooja', sub: 'Ardhajama', time: '9:30 PM' }
    ]
  },
  {
    id: 'brihadeeswarar',
    name: 'Brihadeeswarar Temple',
    location: 'Thanjavur',
    deity: 'shiva',
    distance: '340 km',
    hours: '6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM',
    desc: 'UNESCO World Heritage Site built by Raja Raja Chola I in 1010 CE. The 66-metre vimana is one of the tallest in India. A masterpiece of Dravidian architecture.',
    address: 'Brihadeeswarar Temple, Thanjavur, Tamil Nadu 613001',
    phone: '+91 4362 274 274',
    color: '#1565c0',
    iconColor: '#1565c0',
    badgeBg: '#e3f2fd',
    badgeText: '#1565c0',
    badgeLabel: 'SHIVA',
    festivals: [
      { name: 'Maha Shivaratri', season: 'Maasi (Feb–Mar)', bg: '#e3f2fd', color: '#1565c0' },
      { name: 'Raja Raja Chola Utsav', season: 'November', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Karthigai Deepam', season: 'Karthigai (Nov–Dec)', bg: '#fffbf0', color: '#92400e' },
      { name: 'Navaratri', season: 'Purattasi (Sep–Oct)', bg: '#f0fff5', color: '#00563e' }
    ],
    pooja: [
      { name: 'Thiruvanandal', sub: 'Morning', time: '6:00 AM' },
      { name: 'Noon Pooja', sub: 'Midday', time: '12:00 PM' },
      { name: 'Evening Pooja', sub: 'Sayarakshai', time: '5:00 PM' },
      { name: 'Ardhajama', sub: 'Night', time: '8:30 PM' }
    ]
  },
  {
    id: 'tirumala',
    name: 'Tirumala Venkateswara',
    location: 'Tirupati, Andhra Pradesh',
    deity: 'vishnu',
    distance: '130 km',
    hours: 'Open 24 hours (with breaks)',
    desc: 'One of the most visited pilgrimage sites in the world. The temple is dedicated to Lord Venkateswara (Vishnu), situated on the Tirumala hills at 853m above sea level.',
    address: 'Tirumala Hills, Tirupati, Andhra Pradesh 517504',
    phone: '+91 877 222 7777',
    color: '#00695c',
    iconColor: '#00695c',
    badgeBg: '#e8f5e9',
    badgeText: '#00695c',
    badgeLabel: 'VISHNU',
    festivals: [
      { name: 'Brahmotsavam', season: 'September', bg: '#e8f5e9', color: '#00695c' },
      { name: 'Vaikunta Ekadashi', season: 'Margazhi (Dec–Jan)', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Rathasapthami', season: 'Maasi (Feb)', bg: '#fffbf0', color: '#92400e' },
      { name: 'Ugadi', season: 'Ugadi (Mar–Apr)', bg: '#e3f2fd', color: '#1565c0' }
    ],
    pooja: [
      { name: 'Thiruvanandal', sub: 'Early Morning', time: '3:00 AM' },
      { name: 'Vishwaroopa', sub: 'Mid Morning', time: '10:00 AM' },
      { name: 'Arjitha Seva', sub: 'Evening', time: '5:00 PM' },
      { name: 'Ekanta Seva', sub: 'Night', time: '9:00 PM' }
    ]
  },
  {
    id: 'guruvayur',
    name: 'Guruvayur Temple',
    location: 'Guruvayur, Kerala',
    deity: 'vishnu',
    distance: '600 km',
    hours: '3:00 AM – 1:00 PM, 5:00 PM – 9:45 PM',
    desc: 'Known as the "Dwarka of South India." The presiding deity is Guruvayurappan (Krishna). One of the most important Vaishnavite pilgrimage centres in Kerala.',
    address: 'Guruvayur Temple, Guruvayur, Kerala 680101',
    phone: '+91 487 255 6696',
    color: '#e65100',
    iconColor: '#e65100',
    badgeBg: '#fff3e0',
    badgeText: '#e65100',
    badgeLabel: 'VISHNU',
    festivals: [
      { name: 'Guruvayur Ekadashi', season: 'Vrischikam (Nov–Dec)', bg: '#fff3e0', color: '#e65100' },
      { name: 'Utsavam', season: 'Kumbham (Feb–Mar)', bg: '#e8f5e9', color: '#00695c' },
      { name: 'Janmashtami', season: 'Chingam (Aug–Sep)', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Vishu', season: 'Medam (Apr)', bg: '#e3f2fd', color: '#1565c0' }
    ],
    pooja: [
      { name: 'Nirmalyam', sub: 'Early Morning', time: '3:00 AM' },
      { name: 'Ucha Pooja', sub: 'Midday', time: '12:00 PM' },
      { name: 'Evening Pooja', sub: 'Sayahna', time: '5:30 PM' },
      { name: 'Athazha Pooja', sub: 'Night', time: '9:00 PM' }
    ]
  },
  {
    id: 'ramanathaswamy',
    name: 'Ramanathaswamy Temple',
    location: 'Rameswaram, Tamil Nadu',
    deity: 'shiva',
    distance: '560 km',
    hours: '5:00 AM – 1:00 PM, 3:00 PM – 9:00 PM',
    desc: 'One of the twelve Jyotirlinga shrines. Famous for its 1,200 metre outer corridor — the longest temple corridor in the world. Situated on Pamban Island.',
    address: 'Ramanathaswamy Temple, Rameswaram, Tamil Nadu 623526',
    phone: '+91 4573 221 223',
    color: '#6a1b9a',
    iconColor: '#6a1b9a',
    badgeBg: '#f3e5f5',
    badgeText: '#6a1b9a',
    badgeLabel: 'SHIVA',
    festivals: [
      { name: 'Thirukalyanam', season: 'Panguni (Mar–Apr)', bg: '#f3e5f5', color: '#6a1b9a' },
      { name: 'Maha Shivaratri', season: 'Maasi (Feb–Mar)', bg: '#f5f0ff', color: '#5e0081' },
      { name: 'Karthigai Deepam', season: 'Karthigai (Nov–Dec)', bg: '#fffbf0', color: '#92400e' },
      { name: 'Aadi Amavasai', season: 'Aadi (Jul–Aug)', bg: '#e8f5e9', color: '#00563e' }
    ],
    pooja: [
      { name: 'Thiruvanandal', sub: 'Morning', time: '5:00 AM' },
      { name: 'Noon Pooja', sub: 'Midday', time: '12:00 PM' },
      { name: 'Evening Pooja', sub: 'Sayarakshai', time: '4:30 PM' },
      { name: 'Ardhajama', sub: 'Night', time: '9:00 PM' }
    ]
  }
];

let _activeTemple = TEMPLES_DATA[0];
let _activeTempleFilter = 'all';

/* ════════════════════════════════════════════════════════════
   STATIC DATA — FESTIVALS
════════════════════════════════════════════════════════════ */

const FESTIVALS_DATA = [
  {
    id: 'panguni-uttiram',
    name: 'Panguni Uttiram',
    date: '2026-04-01',
    daysLeft: 1,
    deity: 'murugan',
    tithi: 'Purnima (Panguni 15)',
    nakshatra: 'Uttara Phalguni',
    icon: '🌕',
    iconBg: '#f3e5f5',
    desc: 'The sacred union of Lord Murugan and Goddess Devasena. Celebrated at all Murugan temples with grand processions and devotional singing.',
    badgeLabel: 'Tomorrow!',
    badgeBg: 'bg-amber-400',
    badgeColor: 'text-amber-900'
  },
  {
    id: 'tamil-new-year',
    name: 'Tamil New Year',
    date: '2026-04-14',
    daysLeft: 14,
    deity: 'tamil',
    tithi: 'Mesha Sankranti',
    nakshatra: 'Ashwini',
    icon: '🌸',
    iconBg: '#e8f5e9',
    desc: 'Tamil New Year (Puthandu) marks the Sun\'s entry into Mesha rasi. Celebrated with kolam, new clothes, and traditional feast.',
    badgeLabel: 'In 14 days',
    badgeBg: 'bg-green-400',
    badgeColor: 'text-green-900'
  },
  {
    id: 'rama-navami',
    name: 'Ram Navami',
    date: '2026-03-28',
    daysLeft: 22,
    deity: 'vishnu',
    tithi: 'Shukla Navami',
    nakshatra: 'Punarvasu',
    icon: '🏹',
    iconBg: '#e3f2fd',
    desc: 'Celebration of Lord Rama\'s birth on the ninth day of Chaitra month. Temples organise Akanda Ramayana parayana.',
    badgeLabel: 'In 22 days',
    badgeBg: 'bg-blue-400',
    badgeColor: 'text-blue-900'
  },
  {
    id: 'akshaya-tritiya',
    name: 'Akshaya Tritiya',
    date: '2026-04-20',
    daysLeft: 20,
    deity: 'vishnu',
    tithi: 'Vaishakha Shukla 3',
    nakshatra: 'Rohini',
    icon: '✨',
    iconBg: '#fffde7',
    desc: 'One of the most auspicious days in the Hindu calendar. Beginning of any enterprise on this day is believed to bring eternal success.',
    badgeLabel: 'In 20 days',
    badgeBg: 'bg-yellow-400',
    badgeColor: 'text-yellow-900'
  },
  {
    id: 'ekadashi',
    name: 'Shukla Ekadashi',
    date: '2026-04-07',
    daysLeft: 7,
    deity: 'vishnu',
    tithi: 'Shukla Ekadashi',
    nakshatra: 'Pushya',
    icon: '🪔',
    iconBg: '#fff8e0',
    desc: 'Ekadashi is observed twice a month. Devotees fast and observe vigil through the night. Especially significant at Vaishnavite temples.',
    badgeLabel: 'In 7 days',
    badgeBg: 'bg-amber-300',
    badgeColor: 'text-amber-900'
  },
  {
    id: 'vaikasi-visakham',
    name: 'Vaikasi Visakham',
    date: '2026-05-22',
    daysLeft: 52,
    deity: 'murugan',
    tithi: 'Vaikasi Purnima',
    nakshatra: 'Vishakha',
    icon: '🦚',
    iconBg: '#e8f5e9',
    desc: 'Birthday of Lord Murugan celebrated in the Tamil month of Vaikasi when the moon is in Visakha nakshatra. Grand celebrations at Murugan temples.',
    badgeLabel: 'In 52 days',
    badgeBg: 'bg-emerald-400',
    badgeColor: 'text-emerald-900'
  },
  {
    id: 'maha-shivaratri',
    name: 'Maha Shivaratri 2027',
    date: '2027-02-17',
    daysLeft: 323,
    deity: 'shiva',
    tithi: 'Krishna Chaturdashi',
    nakshatra: 'Dhanishtha',
    icon: '🔱',
    iconBg: '#f5f0ff',
    desc: 'The Great Night of Shiva. Devotees fast, stay awake all night and offer Abhishekam to Shivalingam. One of the most important Shaivite festivals.',
    badgeLabel: 'In 323 days',
    badgeBg: 'bg-purple-400',
    badgeColor: 'text-purple-900'
  }
];

let _activeFestivalFilter = 'all';

/* ════════════════════════════════════════════════════════════
   TODAY SCREEN RENDERER
════════════════════════════════════════════════════════════ */

function renderTodayScreen() {
  const now = new Date();
  const dateInput = document.getElementById('date-input');
  const selectedDate = dateInput && dateInput.value
    ? new Date(`${dateInput.value}T00:00:00`)
    : now;

  // Location pill
  const citySelect = document.getElementById('city-select');
  const cityIdx = citySelect ? citySelect.value : 0;
  const city = CITY_PRESETS[cityIdx] || CITY_PRESETS[0];
  const pill = document.getElementById('today-location-pill');
  if (pill) pill.textContent = city.name;

  // Date pill
  const datePill = document.getElementById('today-date-pill');
  if (datePill) {
    datePill.textContent = selectedDate.toLocaleDateString('en-IN', {
      weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
    });
  }

  // Big date
  const bigDate = document.getElementById('today-big-date');
  if (bigDate) bigDate.textContent = selectedDate.getDate();

  const weekdayEl = document.getElementById('today-weekday');
  if (weekdayEl) weekdayEl.textContent = selectedDate.toLocaleDateString('en-IN', { weekday: 'long' });

  // Compute panchangam
  const lat = parseFloat(document.getElementById('lat-input')?.value || city.lat);
  const lon = parseFloat(document.getElementById('lon-input')?.value || city.lon);
  const tithi = calcTithi(selectedDate);
  const nak = calcNakshatra(selectedDate);
  const moonRasi = calcMoonRasi(selectedDate);
  const tamilDay = calcTamilDay(selectedDate);
  const paksha = tithi <= 15 ? 'Shukla Paksha' : 'Krishna Paksha';
  const lunarDay = tithi <= 15 ? tithi : tithi - 15;

  const langTithi = (TITHI_NAMES[currentLang] || TITHI_NAMES.en)[tithi - 1];
  const langNak = (NAKSHATRA[currentLang] || NAKSHATRA.en)[nak - 1];

  // Lunar info
  const lunarMonthEl = document.getElementById('today-lunar-month');
  if (lunarMonthEl) lunarMonthEl.textContent = paksha.toUpperCase();
  const lunarDayEl = document.getElementById('today-lunar-day');
  if (lunarDayEl) lunarDayEl.textContent = lunarDay;

  const tithiBadge = document.getElementById('today-tithi-badge');
  if (tithiBadge) tithiBadge.textContent = langTithi;
  const pakshaBadge = document.getElementById('today-paksha-badge');
  if (pakshaBadge) pakshaBadge.textContent = paksha;

  // Sunrise / sunset
  const ss = calcSunriseSunset(selectedDate, lat, lon);
  const srEl = document.getElementById('today-sunrise');
  const ssEl = document.getElementById('today-sunset');
  if (srEl) srEl.textContent = fmtTime(ss.sunrise);
  if (ssEl) ssEl.textContent = fmtTime(ss.sunset);

  // Moon card
  const moonRasiEl = document.getElementById('today-moon-rasi');
  if (moonRasiEl) moonRasiEl.textContent = moonRasi;
  const nakEl = document.getElementById('today-nakshatra');
  if (nakEl) nakEl.textContent = langNak;
  const nakNameEl = document.getElementById('today-nak-name');
  if (nakNameEl) nakNameEl.textContent = langNak;

  // Tamil card
  const TAMIL_MONTHS = ['சித்திரை','வைகாசி','ஆனி','ஆடி','ஆவணி','புரட்டாசி','ஐப்பசி','கார்த்திகை','மார்கழி','தை','மாசி','பங்குனி'];
  const tamilMonthIdx = Math.floor((selectedDate.getMonth() + selectedDate.getDate() / 30 + 9) % 12);
  const tamilMonthEl = document.getElementById('today-tamil-month');
  if (tamilMonthEl) tamilMonthEl.textContent = TAMIL_MONTHS[tamilMonthIdx] || '';
  const tamilDayEl = document.getElementById('today-tamil-day');
  if (tamilDayEl) tamilDayEl.textContent = `Day ${tamilDay}`;
  const rasiEl = document.getElementById('today-rasi');
  if (rasiEl) rasiEl.textContent = moonRasi;

  // Shashti alert
  const alertEl = document.getElementById('today-alert');
  const alertText = document.getElementById('today-alert-text');
  const shashtiStr = getShashti(tithi);
  if (shashtiStr !== t('noShashti') && alertEl && alertText) {
    alertEl.classList.remove('hidden');
    alertText.textContent = shashtiStr;
  } else if (alertEl) {
    alertEl.classList.add('hidden');
  }

  // Render muhurta cards (reuse existing logic)
  const sunrise = ss.sunrise;
  const data = calculatePanchangam(selectedDate, lat, lon, null);
  renderResults(data);

  // Sync chat overview
  const chatTithi = document.getElementById('chat-tithi');
  const chatNak = document.getElementById('chat-nakshatra');
  if (chatTithi) chatTithi.textContent = langTithi;
  if (chatNak) chatNak.textContent = langNak;
}

/* ════════════════════════════════════════════════════════════
   TEMPLES SCREEN RENDERERS
════════════════════════════════════════════════════════════ */

function renderTemplesGrid(filter) {
  filter = filter || _activeTempleFilter;
  _activeTempleFilter = filter;

  // Update filter buttons
  document.querySelectorAll('.temple-filter').forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('bg-[#5e0081]', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('border-gray-200', !isActive);
    btn.classList.toggle('text-gray-600', !isActive);
    btn.classList.toggle('bg-white', !isActive);
  });

  const searchVal = (document.getElementById('temple-search')?.value || '').toLowerCase();
  const grid = document.getElementById('temples-grid');
  if (!grid) return;

  const visible = TEMPLES_DATA.filter((t) => {
    const filterOk = filter === 'all' || t.deity === filter;
    const searchOk = !searchVal || t.name.toLowerCase().includes(searchVal) || t.location.toLowerCase().includes(searchVal);
    return filterOk && searchOk;
  });

  if (!visible.length) {
    grid.innerHTML = '<p class="text-sm text-gray-400 col-span-3 py-8 text-center">No temples found.</p>';
    return;
  }

  grid.innerHTML = visible.map((temple) => `
    <div class="temple-card" onclick="openTempleDetail('${temple.id}')">
      <div class="temple-card-header" style="background: linear-gradient(135deg, ${temple.badgeBg}, ${temple.badgeBg}cc)">
        <span class="material-symbols-outlined text-5xl" style="color:${temple.iconColor}">temple_hindu</span>
        <span class="temple-card-badge" style="background:${temple.badgeBg};color:${temple.iconColor}">${temple.badgeLabel}</span>
      </div>
      <div class="temple-card-body">
        <h3 class="temple-card-name">${temple.name}</h3>
        <p class="temple-card-loc">
          <span class="material-symbols-outlined" style="font-size:0.8rem">location_on</span>${temple.location}
        </p>
        <p class="text-xs text-gray-400 mt-1 line-clamp-2">${temple.desc}</p>
      </div>
      <div class="temple-card-footer">
        <span class="text-xs text-gray-400 flex items-center gap-1">
          <span class="material-symbols-outlined" style="font-size:0.8rem">schedule</span>${temple.distance}
        </span>
        <div class="flex gap-2">
          <button class="text-xs font-semibold text-[#5e0081] border border-[#5e0081]/30 px-3 py-1.5 rounded-lg hover:bg-[#f5f0ff]" onclick="event.stopPropagation();openTempleDetail('${temple.id}')">Details</button>
        </div>
      </div>
    </div>
  `).join('');
}

function openTempleDetail(id) {
  _activeTemple = TEMPLES_DATA.find((t) => t.id === id) || TEMPLES_DATA[0];
  renderTempleDetail();
  showScreen('temple-detail');
}

function renderTempleDetail() {
  const t = _activeTemple;
  if (!t) return;

  const nameEl = document.getElementById('temple-detail-name');
  if (nameEl) nameEl.textContent = t.name;
  const locEl = document.getElementById('temple-detail-location');
  if (locEl) locEl.textContent = t.location;
  const histEl = document.getElementById('temple-detail-history');
  if (histEl) histEl.textContent = t.desc;
  const addrEl = document.getElementById('temple-detail-address');
  if (addrEl) addrEl.textContent = t.address;
  const phoneEl = document.getElementById('temple-detail-phone');
  if (phoneEl) phoneEl.textContent = t.phone ? `📞 ${t.phone}` : '';

  // Pooja schedule
  const schedEl = document.getElementById('temple-pooja-schedule');
  if (schedEl) {
    schedEl.innerHTML = t.pooja.map((p, i) => `
      <div class="flex items-center justify-between py-2 ${i < t.pooja.length - 1 ? 'border-b border-gray-100' : ''}">
        <div>
          <div class="font-semibold text-sm">${p.name}</div>
          <div class="text-xs text-gray-400">${p.sub}</div>
        </div>
        <span class="text-sm font-bold" style="color:${t.iconColor}">${p.time}</span>
      </div>
    `).join('');
  }

  // Festivals grid
  const festEl = document.getElementById('temple-festivals-grid');
  if (festEl) {
    festEl.innerHTML = t.festivals.map((f) => `
      <div class="rounded-xl p-3" style="background:${f.bg}">
        <div class="font-semibold text-sm" style="color:${f.color}">${f.name}</div>
        <div class="text-xs text-gray-500 mt-1">${f.season}</div>
      </div>
    `).join('');
  }
}

function renderMapTempleList() {
  const list = document.getElementById('map-temple-list');
  if (!list) return;
  list.innerHTML = TEMPLES_DATA.map((temple) => `
    <div class="map-temple-card" onclick="openTempleDetail('${temple.id}')">
      <div class="map-temple-thumb" style="background:${temple.badgeBg}">
        <span class="material-symbols-outlined text-2xl" style="color:${temple.iconColor}">temple_hindu</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-sm leading-tight">${temple.name}</div>
        <div class="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
          <span class="material-symbols-outlined" style="font-size:0.75rem">location_on</span>${temple.location}
        </div>
        <div class="text-xs text-gray-400 mt-0.5">${temple.distance}</div>
      </div>
      <button class="text-xs font-semibold text-[#5e0081] border border-[#5e0081]/30 px-3 py-1.5 rounded-lg hover:bg-[#f5f0ff] shrink-0">Map</button>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════════════════
   FESTIVALS SCREEN RENDERER
════════════════════════════════════════════════════════════ */

function renderFestivals(filter) {
  filter = filter || _activeFestivalFilter;
  _activeFestivalFilter = filter;

  document.querySelectorAll('.festival-filter').forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle('bg-[#5e0081]', isActive);
    btn.classList.toggle('text-white', isActive);
    btn.classList.toggle('border-gray-200', !isActive);
    btn.classList.toggle('text-gray-600', !isActive);
    btn.classList.toggle('bg-white', !isActive);
  });

  const filtered = filter === 'all'
    ? FESTIVALS_DATA
    : FESTIVALS_DATA.filter((f) => f.deity === filter);

  // Hero (first upcoming)
  const hero = filtered[0];
  if (hero) {
    const heroEl = document.getElementById('festivals-hero');
    const badgeEl = document.getElementById('festivals-hero-badge');
    const nameEl = document.getElementById('festivals-hero-name');
    const descEl = document.getElementById('festivals-hero-desc');
    const tithiEl = document.getElementById('festivals-hero-tithi');
    const daysEl = document.getElementById('festivals-hero-days');
    if (badgeEl) badgeEl.textContent = hero.badgeLabel;
    if (nameEl) nameEl.textContent = hero.name;
    if (descEl) descEl.textContent = hero.desc;
    if (tithiEl) tithiEl.textContent = hero.tithi;
    if (daysEl) daysEl.textContent = hero.daysLeft === 0 ? 'Today!' : hero.daysLeft === 1 ? 'Tomorrow' : `${hero.daysLeft} days`;
  }

  // Festival list (remaining)
  const listEl = document.getElementById('festivals-list');
  if (!listEl) return;

  listEl.innerHTML = filtered.slice(1).map((f) => `
    <div class="festival-card">
      <div class="festival-card-icon" style="background:${f.iconBg}">${f.icon}</div>
      <div class="flex-1 min-w-0">
        <h3 class="festival-card-name">${f.name}</h3>
        <p class="festival-card-meta">${f.tithi} · ${f.nakshatra}</p>
        <p class="text-xs text-gray-400 mt-1 line-clamp-2">${f.desc}</p>
      </div>
      <div class="flex flex-col items-end gap-2">
        <span class="festival-days-badge bg-gray-100 text-gray-600">${f.daysLeft}d</span>
        <span class="text-xs text-gray-400">${new Date(f.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
      </div>
    </div>
  `).join('');
}

/* ════════════════════════════════════════════════════════════
   BOOKING DATES
════════════════════════════════════════════════════════════ */

function renderBookingDates() {
  const container = document.getElementById('booking-dates');
  if (!container) return;
  const today = new Date();
  const chips = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    chips.push(`
      <button class="booking-date-chip ${i === 0 ? 'active' : ''}" onclick="selectBookingDate(this)">
        <span class="day-name">${d.toLocaleDateString('en-IN', { weekday: 'short' })}</span>
        <span class="day-num">${d.getDate()}</span>
        <span style="font-size:0.6rem;opacity:0.7">${d.toLocaleDateString('en-IN', { month: 'short' })}</span>
      </button>
    `);
  }
  container.innerHTML = chips.join('');
}

function selectBookingDate(el) {
  document.querySelectorAll('.booking-date-chip').forEach((c) => c.classList.remove('active'));
  el.classList.add('active');
}

/* ════════════════════════════════════════════════════════════
   CHAT OVERVIEW
════════════════════════════════════════════════════════════ */

function renderChatOverview() {
  const now = new Date();
  const tithi = calcTithi(now);
  const nak = calcNakshatra(now);
  const langTithi = (TITHI_NAMES[currentLang] || TITHI_NAMES.en)[tithi - 1];
  const langNak = (NAKSHATRA[currentLang] || NAKSHATRA.en)[nak - 1];
  const el1 = document.getElementById('chat-tithi');
  const el2 = document.getElementById('chat-nakshatra');
  if (el1) el1.textContent = langTithi;
  if (el2) el2.textContent = langNak;
}

/* ════════════════════════════════════════════════════════════
   NEWS — override renderNewsCards to support article detail
════════════════════════════════════════════════════════════ */

let _currentArticle = null;

function openArticle(article) {
  _currentArticle = article;
  document.getElementById('article-tag').textContent = article.tag || 'Spiritual';
  document.getElementById('article-date').textContent = article.dateText || article.source;
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-source').textContent = article.source;
  const bodyEl = document.getElementById('article-body');
  if (bodyEl) {
    bodyEl.innerHTML = `<p class="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-[#5e0081]">${article.summary || 'Read more on the original source.'}</p>
    <p class="text-gray-500 text-xs">For the full article, visit the original source.</p>`;
  }
  // Related articles from newsArticles
  const relatedEl = document.getElementById('related-articles');
  if (relatedEl && newsArticles.length > 1) {
    const others = newsArticles.filter((a) => a.title !== article.title).slice(0, 4);
    relatedEl.innerHTML = others.map((a) => `
      <div class="news-card" onclick="openArticle(${JSON.stringify(a).replace(/"/g, '&quot;')})">
        <div class="news-card-img-placeholder"><span class="material-symbols-outlined">article</span></div>
        <div class="news-card-body">
          <div class="news-card-tag">${a.tag}</div>
          <h3 class="news-card-title">${a.title}</h3>
        </div>
      </div>
    `).join('');
  }
  showScreen('news-article');
}

/* ════════════════════════════════════════════════════════════
   ROUTER INIT
════════════════════════════════════════════════════════════ */

function initRouter() {
  // Nav link clicks
  document.querySelectorAll('.nav-link, .bottom-nav-btn').forEach((el) => {
    el.addEventListener('click', () => {
      const screen = el.dataset.screen;
      if (screen) showScreen(screen);
    });
  });

  // Festival filters
  document.querySelectorAll('.festival-filter').forEach((btn) => {
    btn.addEventListener('click', () => renderFestivals(btn.dataset.filter));
  });

  // Temple filters
  document.querySelectorAll('.temple-filter').forEach((btn) => {
    btn.addEventListener('click', () => renderTemplesGrid(btn.dataset.filter));
  });

  // Temple search
  const templeSearch = document.getElementById('temple-search');
  if (templeSearch) templeSearch.addEventListener('input', () => renderTemplesGrid());

  // Load from hash
  const hash = window.location.hash.replace('#', '');
  const validScreens = ['today','calendar','festivals','temples','temples-map','temple-detail','temple-booking','temple-darshan','news','news-article','chat','settings'];
  showScreen(validScreens.includes(hash) ? hash : 'today');
}

const CITY_PRESETS = [
  // Tamil Nadu
  { name: 'Chennai',           region: 'Tamil Nadu',        lat: 13.0827,  lon: 80.2707  },
  { name: 'Madurai',           region: 'Tamil Nadu',        lat: 9.9252,   lon: 78.1198  },
  { name: 'Thanjavur',         region: 'Tamil Nadu',        lat: 10.7870,  lon: 79.1378  },
  { name: 'Kanchipuram',       region: 'Tamil Nadu',        lat: 12.8333,  lon: 79.7000  },
  { name: 'Tiruchirapalli',    region: 'Tamil Nadu',        lat: 10.7905,  lon: 78.7047  },
  { name: 'Coimbatore',        region: 'Tamil Nadu',        lat: 11.0168,  lon: 76.9558  },
  { name: 'Tirunelveli',       region: 'Tamil Nadu',        lat: 8.7139,   lon: 77.7567  },
  // Andhra Pradesh / Telangana
  { name: 'Tirupati',          region: 'Andhra Pradesh',    lat: 13.6288,  lon: 79.4192  },
  { name: 'Vijayawada',        region: 'Andhra Pradesh',    lat: 16.5062,  lon: 80.6480  },
  { name: 'Visakhapatnam',     region: 'Andhra Pradesh',    lat: 17.6868,  lon: 83.2185  },
  { name: 'Hyderabad',         region: 'Telangana',         lat: 17.3850,  lon: 78.4867  },
  { name: 'Warangal',          region: 'Telangana',         lat: 17.9784,  lon: 79.5941  },
  // Karnataka
  { name: 'Bengaluru',         region: 'Karnataka',         lat: 12.9716,  lon: 77.5946  },
  { name: 'Mysuru',            region: 'Karnataka',         lat: 12.2958,  lon: 76.6394  },
  { name: 'Udupi',             region: 'Karnataka',         lat: 13.3409,  lon: 74.7421  },
  { name: 'Mangaluru',         region: 'Karnataka',         lat: 12.9141,  lon: 74.8560  },
  { name: 'Dharwad',           region: 'Karnataka',         lat: 15.4589,  lon: 75.0078  },
  // Kerala
  { name: 'Thiruvananthapuram',region: 'Kerala',            lat: 8.5241,   lon: 76.9366  },
  { name: 'Kochi',             region: 'Kerala',            lat: 9.9312,   lon: 76.2673  },
  { name: 'Kozhikode',         region: 'Kerala',            lat: 11.2588,  lon: 75.7804  },
  { name: 'Thrissur',          region: 'Kerala',            lat: 10.5276,  lon: 76.2144  },
  { name: 'Guruvayur',         region: 'Kerala',            lat: 10.5938,  lon: 76.0417  },
  // Diaspora
  { name: 'Singapore',         region: 'Singapore',         lat: 1.3521,   lon: 103.8198 },
  { name: 'Kuala Lumpur',      region: 'Malaysia',          lat: 3.1390,   lon: 101.6869 },
  { name: 'New York',          region: 'USA',               lat: 40.7128,  lon: -74.0060 },
  { name: 'London',            region: 'UK',                lat: 51.5074,  lon: -0.1278  },
  { name: 'Sydney',            region: 'Australia',         lat: -33.8688, lon: 151.2093 }
];

const RSS_SOURCES = [
  { name: 'Hinduism Today',        url: 'https://www.hinduismtoday.com/feed/',                        tag: 'Featured'   },
  { name: 'Indica Today',          url: 'https://www.indica.today/feed/',                             tag: 'Indic'      },
  { name: 'Speaking Tree',         url: 'https://www.speakingtree.in/rss',                            tag: 'Spiritual'  },
  { name: 'TemplePurohit',         url: 'https://www.templepurohit.com/feed/',                        tag: 'Temples'    },
  { name: 'Sadhguru Wisdom',       url: 'https://isha.sadhguru.org/in/en/wisdom/rss.xml',             tag: 'Spiritual'  },
  { name: 'Ramakrishna Math',      url: 'https://belurmath.org/feed/',                                tag: 'Mutt'       },
  { name: 'Sringeri Mutt',         url: 'https://www.sringeri.net/feed/',                             tag: 'Mutt'       },
  { name: 'Aanmeegam',             url: 'https://aanmeegam.in/feed/',                                 tag: 'Tamil'      },
  { name: 'Tamil and Vedas',       url: 'https://tamilandvedas.com/feed/',                            tag: 'Tamil'      },
  { name: 'Tamil Brahmins Forum',  url: 'https://www.tamilbrahmins.com/forums/-/index.rss',           tag: 'Community'  },
  { name: 'Mathrubhumi Astrology', url: 'https://english.mathrubhumi.com/rss/astrology.xml',          tag: 'Jyotish'    }
];

// Astronomical term names per language (ta / te / kn / ml / en)
const TITHI_NAMES = {
  ta: ['பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','பௌர்ணமி','பிரதமை','துதியை','திருதியை','சதுர்த்தி','பஞ்சமி','சஷ்டி','சப்தமி','அஷ்டமி','நவமி','தசமி','ஏகாதசி','துவாதசி','திரயோதசி','சதுர்தசி','அமாவாசை'],
  te: ['పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','పౌర్ణమి','పాడ్యమి','విదియ','తదియ','చవితి','పంచమి','షష్ఠి','సప్తమి','అష్టమి','నవమి','దశమి','ఏకాదశి','ద్వాదశి','త్రయోదశి','చతుర్దశి','అమావాస్య'],
  kn: ['ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಹುಣ್ಣಿಮೆ','ಪಾಡ್ಯಮಿ','ಬಿದಿಗೆ','ತದಿಗೆ','ಚವಿತಿ','ಪಂಚಮಿ','ಷಷ್ಠಿ','ಸಪ್ತಮಿ','ಅಷ್ಟಮಿ','ನವಮಿ','ದಶಮಿ','ಏಕಾದಶಿ','ದ್ವಾದಶಿ','ತ್ರಯೋದಶಿ','ಚತುರ್ದಶಿ','ಅಮಾವಾಸ್ಯೆ'],
  ml: ['പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','പൗർണമി','പ്രതിപദം','ദ്വിതീയ','തൃതീയ','ചതുർത്ഥി','പഞ്ചമി','ഷഷ്ഠി','സപ്തമി','അഷ്ടമി','നവമി','ദശമി','ഏകാദശി','ദ്വാദശി','ത്രയോദശി','ചതുർദശി','അമാവാസ്യ'],
  en: ['Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Pournami','Pratipada','Dvitiya','Tritiya','Chaturthi','Panchami','Shashti','Saptami','Ashtami','Navami','Dashami','Ekadashi','Dvadashi','Trayodashi','Chaturdashi','Amavasya']
};

const NAKSHATRA = {
  ta: ['அஸ்வினி','பரணி','கார்த்திகை','ரோகிணி','மிருகசிரிஷம்','திருவாதிரை','புனர்பூசம்','பூசம்','ஆயில்யம்','மகம்','பூரம்','உத்திரம்','ஹஸ்தம்','சித்திரை','சுவாதி','விசாகம்','அனுஷம்','கேட்டை','மூலம்','பூராடம்','உத்திராடம்','திருவோணம்','அவிட்டம்','சதயம்','பூரட்டாதி','உத்திரட்டாதி','ரேவதி'],
  te: ['అశ్వని','భరణి','కృత్తిక','రోహిణి','మృగశిర','ఆర్ద్ర','పునర్వసు','పుష్యమి','ఆశ్లేష','మఖ','పుబ్బ','ఉత్తర','హస్త','చిత్త','స్వాతి','విశాఖ','అనూరాధ','జ్యేష్ఠ','మూల','పూర్వాషాఢ','ఉత్తరాషాఢ','శ్రవణ','ధనిష్ఠ','శతభిష','పూర్వాభాద్ర','ఉత్తరాభాద్ర','రేవతి'],
  kn: ['ಅಶ್ವಿನಿ','ಭರಣಿ','ಕೃತ್ತಿಕೆ','ರೋಹಿಣಿ','ಮೃಗಶಿರ','ಆರ್ದ್ರ','ಪುನರ್ವಸು','ಪುಷ್ಯ','ಆಶ್ಲೇಷ','ಮಘ','ಪೂರ್ವ','ಉತ್ತರ','ಹಸ್ತ','ಚಿತ್ತ','ಸ್ವಾತಿ','ವಿಶಾಖ','ಅನುರಾಧ','ಜ್ಯೇಷ್ಠ','ಮೂಲ','ಪೂರ್ವಾಷಾಢ','ಉತ್ತರಾಷಾಢ','ಶ್ರವಣ','ಧನಿಷ್ಠ','ಶತಭಿಷ','ಪೂರ್ವಭಾದ್ರ','ಉತ್ತರಭಾದ್ರ','ರೇವತಿ'],
  ml: ['അശ്വതി','ഭരണി','കാർത്തിക','രോഹിണി','മകയിരം','തിരുവാതിര','പുണർതം','പൂയം','ആയില്യം','മകം','പൂരം','ഉത്രം','അത്തം','ചിത്ര','ചോതി','വിശാഖം','അനിഴം','തൃക്കേട്ട','മൂലം','പൂരാടം','ഉത്രാടം','തിരുവോണം','അവിട്ടം','ചതയം','പൂരുരുട്ടാതി','ഉത്രട്ടാതി','രേവതി'],
  en: ['Ashwini','Bharani','Krittika','Rohini','Mrigashira','Ardra','Punarvasu','Pushya','Ashlesha','Magha','Purva Phalguni','Uttara Phalguni','Hasta','Chitra','Swati','Vishakha','Anuradha','Jyeshtha','Moola','Purva Ashadha','Uttara Ashadha','Shravana','Dhanishtha','Shatabhisha','Purva Bhadrapada','Uttara Bhadrapada','Revati']
};

const RASI = {
  ta: ['மேஷம்','ரிஷபம்','மிதுனம்','கர்கடகம்','சிம்மம்','கன்னி','துலாம்','விருச்சிகம்','தனுசு','மகரம்','கும்பம்','மீனம்'],
  te: ['మేష','వృషభ','మిధున','కర్కాటక','సింహ','కన్య','తుల','వృశ్చిక','ధను','మకర','కుంభ','మీన'],
  kn: ['ಮೇಷ','ವೃಷಭ','ಮಿಥುನ','ಕರ್ಕಾಟಕ','ಸಿಂಹ','ಕನ್ಯ','ತುಲ','ವೃಶ್ಚಿಕ','ಧನು','ಮಕರ','ಕುಂಭ','ಮೀನ'],
  ml: ['മേടം','ഇടവം','മിഥുനം','കർക്കിടകം','ചിങ്ങം','കന്നി','തുലാം','വൃശ്ചികം','ധനു','മകരം','കുംഭം','മീനം'],
  en: ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces']
};

const I18N = {
  ta: {
    appTitle: 'தக்ஷிண பஞ்சாங்கம்', calc: 'கணக்கிடு', date: 'தேதி', city: 'நகரம்', lat: 'அகலாங்கம் (Lat)', lon: 'நெட்டாங்கம் (Lon)',
    useLoc: 'என் இருப்பிடம்', calculate: 'கணக்கு', reminders: 'நினைவூட்டு இயக்கு', results: 'இன்றைய பலன்கள்', news: 'பக்தி செய்திகள்',
    footer: 'ஆஃப்லைன் PWA • client-side மட்டும்', monthTitle: 'மாத பஞ்சாங்கம்',
    rahu: 'ராகு காலம்', yama: 'யமகண்டம்', abhijit: 'அபிஜித் முஹூர்த்தம்', shashti: 'சஷ்டி நிலை', amrita: 'அமிர்த காலம்', brahma: 'பிரஹ்ம முகூர்த்தம்',
    tivaraatri: 'திவராத்திரி', ausp: 'மங்கள நாள்', shashtiMsg: 'சஷ்டி விரதம் ({paksha}) — காலை பூஜை மறக்காதீங்க!', noShashti: 'இன்று சஷ்டி இல்லை',
    mondayTuesday: 'ஆம்', no: 'இல்லை', goodNak: 'மங்கல நட்சத்திரம்!', notMarked: 'சாதாரண நாள்', rssLoad: 'புதுப்பி',
    shuklaPaksha: 'சுக்ல பக்ஷம்', krishnaPaksha: 'கிருஷ்ண பக்ஷம்',
    remSet: 'ராகு காலம் தொடங்க 30 நிமிடங்களுக்கு முன் நினைவூட்டு அமைக்கப்பட்டது', remNow: 'ராகு காலம் தொடங்க போகுது—பூஜை தள்ளி வைக்கலாம்',
    weekdays: ['Sun<br>ஞா', 'Mon<br>தி', 'Tue<br>செ', 'Wed<br>பு', 'Thu<br>வி', 'Fri<br>வெ', 'Sat<br>ச'], festival: 'விழா'
  },
  te: {
    appTitle: 'దక్షిణ పంచాంగం', calc: 'లెక్కించు', date: 'తేది', city: 'నగరం', lat: 'అక్షాంశం (Lat)', lon: 'రేఖాంశం (Lon)',
    useLoc: 'నా స్థానం', calculate: 'లెక్కించు', reminders: 'రిమైండర్ ప్రారంభించు', results: 'నేటి పంచాంగం', news: 'భక్తి వార్తలు',
    footer: 'Offline PWA • క్లయింట్ సైడ్ మాత్రమే', monthTitle: 'నెల పంచాంగం',
    rahu: 'రాహు కాలం', yama: 'యమగండం', abhijit: 'అభిజిత్ ముహూర్తం', shashti: 'షష్ఠి', amrita: 'అమృత కాలం', brahma: 'బ్రహ్మ ముహూర్తం',
    tivaraatri: 'శివరాత్రి', ausp: 'శుభ దినం', shashtiMsg: 'షష్ఠి వ్రతం ({paksha}) — ఉదయం పూజ మర్చిపోకండి!', noShashti: 'నేడు షష్ఠి లేదు',
    mondayTuesday: 'అవును', no: 'కాదు', goodNak: 'మంగళ నక్షత్రం!', notMarked: 'సాధారణ రోజు', rssLoad: 'రిఫ్రెష్',
    shuklaPaksha: 'శుక్ల పక్షం', krishnaPaksha: 'కృష్ణ పక్షం',
    remSet: 'రాహు కాలానికి 30 నిమిషాల ముందు రిమైండర్ సెట్ చేయబడింది', remNow: 'రాహు కాలం మొదలవుతోంది—పూజ వాయిదా వేయండి',
    weekdays: ['ఆది', 'సోమ', 'మంగళ', 'బుధ', 'గురు', 'శుక్ర', 'శని'], festival: 'పండుగ'
  },
  kn: {
    appTitle: 'ದಕ್ಷಿಣ ಪಂಚಾಂಗ', calc: 'ಲೆಕ್ಕಿಸು', date: 'ದಿನಾಂಕ', city: 'ನಗರ', lat: 'ಅಕ್ಷಾಂಶ (Lat)', lon: 'ರೇಖಾಂಶ (Lon)',
    useLoc: 'ನನ್ನ ಸ್ಥಳ', calculate: 'ಲೆಕ್ಕಿಸು', reminders: 'ರಿಮೈಂಡರ್ ಪ್ರಾರಂಭಿಸು', results: 'ಇಂದಿನ ಪಂಚಾಂಗ', news: 'ಭಕ್ತಿ ಸುದ್ದಿ',
    footer: 'Offline PWA • ಕ್ಲೈಂಟ್ ಸೈಡ್ ಮಾತ್ರ', monthTitle: 'ಮಾಸಿಕ ಪಂಚಾಂಗ',
    rahu: 'ರಾಹು ಕಾಲ', yama: 'ಯಮಗಂಡ', abhijit: 'ಅಭಿಜಿತ್ ಮುಹೂರ್ತ', shashti: 'ಷಷ್ಠಿ', amrita: 'ಅಮೃತ ಕಾಲ', brahma: 'ಬ್ರಹ್ಮ ಮುಹೂರ್ತ',
    tivaraatri: 'ಶಿವರಾತ್ರಿ', ausp: 'ಶುಭ ದಿನ', shashtiMsg: 'ಷಷ್ಠಿ ವ್ರತ ({paksha}) — ಬೆಳಿಗ್ಗೆ ಪೂಜೆ ಮರೆಯಬೇಡಿ!', noShashti: 'ಇಂದು ಷಷ್ಠಿ ಇಲ್ಲ',
    mondayTuesday: 'ಹೌದು', no: 'ಇಲ್ಲ', goodNak: 'ಮಂಗಳ ನಕ್ಷತ್ರ!', notMarked: 'ಸಾಮಾನ್ಯ ದಿನ', rssLoad: 'ರಿಫ್ರೆಶ್',
    shuklaPaksha: 'ಶುಕ್ಲ ಪಕ್ಷ', krishnaPaksha: 'ಕೃಷ್ಣ ಪಕ್ಷ',
    remSet: 'ರಾಹು ಕಾಲಕ್ಕೆ 30 ನಿಮಿಷ ಮೊದಲು ರಿಮೈಂಡರ್ ಹೊಂದಿಸಲಾಗಿದೆ', remNow: 'ರಾಹು ಕಾಲ ಪ್ರಾರಂಭವಾಗಲಿದೆ—ಪೂಜೆ ಮುಂದೂಡಿ',
    weekdays: ['ಭಾನು', 'ಸೋಮ', 'ಮಂಗಳ', 'ಬುಧ', 'ಗುರು', 'ಶುಕ್ರ', 'ಶನಿ'], festival: 'ಹಬ್ಬ'
  },
  ml: {
    appTitle: 'ദക്ഷിണ പഞ്ചാംഗം', calc: 'കണക്കാക്കുക', date: 'തീയതി', city: 'നഗരം', lat: 'അക്ഷാംശം (Lat)', lon: 'രേഖാംശം (Lon)',
    useLoc: 'എൻ്റെ സ്ഥാനം', calculate: 'കണക്കാക്കുക', reminders: 'റിമൈൻഡർ പ്രവർത്തനക്ഷമമാക്കുക', results: 'ഇന്നത്തെ പഞ്ചാംഗം', news: 'ഭക്തി വാർത്തകൾ',
    footer: 'Offline PWA • ക്ലൈൻ്റ് സൈഡ് മാത്രം', monthTitle: 'മാസ പഞ്ചാംഗം',
    rahu: 'രാഹു കാലം', yama: 'യമഗണ്ഡം', abhijit: 'അഭിജിത് മുഹൂർത്തം', shashti: 'ഷഷ്ഠി', amrita: 'അമൃത കാലം', brahma: 'ബ്രഹ്മ മുഹൂർത്തം',
    tivaraatri: 'ശിവരാത്രി', ausp: 'ശുഭ ദിനം', shashtiMsg: 'ഷഷ്ഠി വ്രതം ({paksha}) — രാവിലെ പൂജ മറക്കരുത്!', noShashti: 'ഇന്ന് ഷഷ്ഠി ഇല്ല',
    mondayTuesday: 'അതെ', no: 'ഇല്ല', goodNak: 'മംഗള നക്ഷത്രം!', notMarked: 'സാധാരണ ദിവസം', rssLoad: 'റിഫ്രഷ്',
    shuklaPaksha: 'ശുക്ല പക്ഷം', krishnaPaksha: 'കൃഷ്ണ പക്ഷം',
    remSet: 'രാഹു കാലത്തിന് 30 മിനിറ്റ് മുമ്പ് റിമൈൻഡർ സജ്ജമാക്കി', remNow: 'രാഹു കാലം തുടങ്ങാൻ പോകുന്നു—പൂജ മാറ്റിവക്കൂ',
    weekdays: ['ഞായർ', 'തിങ്കൾ', 'ചൊവ്വ', 'ബുധൻ', 'വ്യാഴം', 'വെള്ളി', 'ശനി'], festival: 'ഉത്സവം'
  },
  en: {
    appTitle: 'Dakshin Panchangam', calc: 'Calculate', date: 'Date', city: 'City', lat: 'Latitude (Lat)', lon: 'Longitude (Lon)',
    useLoc: 'Use My Location', calculate: 'Calculate', reminders: 'Enable Reminder', results: "Today's Panchangam", news: 'Bhakti News',
    footer: 'Offline-ready PWA • Client-side only', monthTitle: 'Monthly Panchangam',
    rahu: 'Rahu Kalam', yama: 'Yamagandam', abhijit: 'Abhijit Muhurta', shashti: 'Shashti', amrita: 'Amrita Kalam', brahma: 'Brahma Muhurta',
    tivaraatri: 'Shivaratri', ausp: 'Auspicious Day', shashtiMsg: 'Shashti fasting ({paksha}) — Morning puja reminder!', noShashti: 'No Shashti today',
    mondayTuesday: 'Yes', no: 'No', goodNak: 'Mangala nakshatra!', notMarked: 'Regular day', rssLoad: 'Refresh',
    shuklaPaksha: 'Shukla Paksha', krishnaPaksha: 'Krishna Paksha',
    remSet: 'Reminder set for 30 mins before Rahu Kalam', remNow: 'Rahu Kalam starts soon—consider postponing puja',
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], festival: 'Festival'
  }
};

let currentLang = 'ta';
let notifyTimeout;
let currentMonthDate = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
let newsArticles = [];
let activeNewsTag = 'All';

// Cache for /api/panchangam responses keyed by "date:lat:lon" or "month:start:end:lat:lon".
const apiCache = {};

const LOCALE_MAP = { ta: 'ta-IN', te: 'te-IN', kn: 'kn-IN', ml: 'ml-IN', en: 'en-IN' };
const t = (k) => (I18N[currentLang] || I18N.en)[k] || k;
const fmtTime = (d) => d.toLocaleTimeString(LOCALE_MAP[currentLang] || 'en-IN', { hour: '2-digit', minute: '2-digit' });

function showView(name) {
  // Hide all views
  document.querySelectorAll('[data-view]').forEach((el) => el.classList.remove('active'));
  // Show target view
  const target = document.querySelector(`[data-view="${name}"]`);
  if (target) target.classList.add('active');

  // Update sidebar active state
  document.querySelectorAll('.sidebar-item').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view-btn') === name);
  });
  // Update bottom nav active state
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-view-btn') === name);
  });

  // Update header view title
  const viewTitles = { today: t('results'), calendar: t('monthTitle'), festivals: t('festival'), temples: 'Temples', news: t('news') };
  const viewTitleEl = document.getElementById('view-title');
  if (viewTitleEl) viewTitleEl.textContent = viewTitles[name] || name;

  // If switching to calendar, render it
  if (name === 'calendar') renderMonthViewFromInputs();

  // Update URL hash
  history.replaceState(null, '', `#${name}`);
}

function toggleSettings() {
  const panel = document.getElementById('settings-panel');
  const overlay = document.getElementById('settings-overlay');
  const isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  overlay.classList.toggle('hidden', isOpen);
}

function updateTodayHeroDate() {
  const now = new Date();
  const dateNumEl = document.getElementById('today-date-num');
  if (dateNumEl) dateNumEl.textContent = now.getDate();

  // Tamil month display using the sun longitude
  const d = new Date(now);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  const sunDeg = getSunLongitude(jd);
  const rasiIdx = Math.floor(sunDeg / 30);
  const tamilMonthNames = ['Chithirai','Vaikasi','Aani','Aadi','Aavani','Purattasi','Aippasi','Karthigai','Margazhi','Thai','Maasi','Panguni'];
  const tamilDay = Math.floor(sunDeg % 30) + 1;
  const tamilMonthEl = document.getElementById('today-tamil-month');
  if (tamilMonthEl) tamilMonthEl.textContent = `${tamilMonthNames[rasiIdx]} ${tamilDay}`;

  // Location pill
  const citySelect = document.getElementById('city-select');
  const cityName = citySelect && citySelect.value !== '' ? (CITY_PRESETS[citySelect.value] || {}).name || 'Location' : 'Chennai';
  const dayStr = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const locationPillEl = document.getElementById('today-location-pill');
  if (locationPillEl) locationPillEl.textContent = `${cityName} · ${dayStr}`;
}

function updateLocationDisplay() {
  const citySelect = document.getElementById('city-select');
  if (!citySelect || citySelect.value === '') return;
  const city = CITY_PRESETS[citySelect.value];
  if (!city) return;
  const locDisplay = document.getElementById('current-location-display');
  if (locDisplay) locDisplay.textContent = `${city.name}, ${city.region}`;
  updateTodayHeroDate();
}

function initUI() {
  // Set date input to today
  const dateInput = document.getElementById('date-input');
  if (dateInput) dateInput.valueAsDate = new Date();

  // Populate city select
  const citySelect = document.getElementById('city-select');
  if (citySelect) {
    CITY_PRESETS.forEach((c, idx) => {
      const opt = document.createElement('option');
      opt.value = idx;
      opt.textContent = `${c.region} — ${c.name}`;
      citySelect.appendChild(opt);
    });
    citySelect.addEventListener('change', () => {
      applyCity(CITY_PRESETS[citySelect.value]);
      renderTodayScreen();
      renderMonthViewFromInputs();
    });
    applyCity(CITY_PRESETS[0]);
  }

  const newsSearch = document.getElementById('news-search');
  if (newsSearch) newsSearch.addEventListener('input', renderNewsCards);

  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) langToggle.addEventListener('change', (e) => {
    currentLang = e.target.value;
    hydrateLabels();
    renderTodayScreen();
    renderFromCache();
    if (_currentScreen === 'calendar') renderMonthViewFromInputs();
  });

  const calcBtn = document.getElementById('calc-btn');
  if (calcBtn) calcBtn.addEventListener('click', () => { calculateAndRender(); showScreen('today'); });

  const geoBtn = document.getElementById('geo-btn');
  if (geoBtn) geoBtn.addEventListener('click', useGeolocation);

  // There may be multiple notify-btn elements across screens — attach to all
  document.querySelectorAll('#notify-btn').forEach((btn) => btn.addEventListener('click', scheduleReminder));

  const rssBtn = document.getElementById('rss-load-btn');
  if (rssBtn) rssBtn.addEventListener('click', loadAllFeeds);

  const monthPrev = document.getElementById('month-prev');
  const monthNext = document.getElementById('month-next');
  if (monthPrev) monthPrev.addEventListener('click', () => moveMonth(-1));
  if (monthNext) monthNext.addEventListener('click', () => moveMonth(1));

  hydrateLabels();
  renderFromCache();

  // Boot router
  initRouter();

  // Async: load news feeds
  loadAllFeeds();

  // Auto-calculate today on load
  calculateAndRender();
}

function hydrateLabels() {
  const map = {
    'app-title': 'appTitle', 'calc-title': 'calc', 'label-date': 'date', 'label-city': 'city',
    'label-lat': 'lat', 'label-lon': 'lon',
    'nav-notify': 'reminders', 'result-title': 'results', 'news-title': 'news',
    'footer-note': 'footer', 'month-title-text': 'monthTitle'
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });
  const newsSearch = document.getElementById('news-search');
  if (newsSearch) newsSearch.placeholder = currentLang === 'ta' ? 'கட்டுரை தேடல்' : 'Search articles...';
  // Update app title in top bar
  const brand = document.getElementById('top-bar-brand');
  if (brand) brand.textContent = t('appTitle');
  if (_currentScreen === 'calendar') renderWeekdayRail();
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

// Moon rasi from real moon longitude (language-aware)
function calcMoonRasi(date) {
  const d = new Date(date);
  d.setHours(6, 0, 0, 0);
  const jd = 2440587.5 + d.getTime() / 86400000;
  return (RASI[currentLang] || RASI.ta)[Math.floor(getMoonLongitude(jd) / 30)];
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

function getShashti(tithi) {
  if (tithi === 6 || tithi === 21) {
    const paksha = tithi <= 15 ? t('shuklaPaksha') : t('krishnaPaksha');
    return t('shashtiMsg').replace('{paksha}', paksha);
  }
  return t('noShashti');
}
function getAuspicious(nak) {
  return [5, 6, 10, 13, 14, 18].includes(nak) ? t('goodNak') : t('notMarked');
}

function calculatePanchangam(date, lat, lon, precomputed) {
  let sunrise;
  if (precomputed) {
    sunrise = new Date(precomputed.sunriseMs);
  } else {
    sunrise = getSunrise(date, lat, lon);
  }
  const tithi = precomputed ? precomputed.tithi : calcTithi(date);
  const nak   = precomputed ? precomputed.nakshatra : calcNakshatra(date);
  const rahu  = getRahuKalam(sunrise);
  const shashtiStr = getShashti(tithi);
  return {
    date: date.toISOString(), lat, lon, rahu,
    yama: getYamagandam(sunrise), abhijit: getAbhijitMuhurta(sunrise),
    shashti: shashtiStr, auspicious: getAuspicious(nak),
    amrita: { start: addMinutes(sunrise, 240), end: addMinutes(sunrise, 288) },
    brahma: { start: addMinutes(sunrise, -96), end: addMinutes(sunrise, -48) },
    tivaraatri: [1, 2].includes(date.getDay()) && (tithi === 6 || tithi === 21)
  };
}

function renderResults(data) {
  const cards = [
    { key: 'rahu',    cls: 'rahu',    label: t('rahu'),    val: `${fmtTime(new Date(data.rahu.start))} – ${fmtTime(new Date(data.rahu.end))}`,    icon: 'do_not_disturb_on' },
    { key: 'yama',    cls: 'yama',    label: t('yama'),    val: `${fmtTime(new Date(data.yama.start))} – ${fmtTime(new Date(data.yama.end))}`,    icon: 'warning' },
    { key: 'abhijit', cls: 'abhijit', label: t('abhijit'), val: `${fmtTime(new Date(data.abhijit.start))} – ${fmtTime(new Date(data.abhijit.end))}`, icon: 'star' },
    { key: 'amrita',  cls: 'amrita',  label: t('amrita'),  val: `${fmtTime(new Date(data.amrita.start))} – ${fmtTime(new Date(data.amrita.end))}`,  icon: 'water_drop' },
    { key: 'brahma',  cls: 'brahma',  label: t('brahma'),  val: `${fmtTime(new Date(data.brahma.start))} – ${fmtTime(new Date(data.brahma.end))}`,  icon: 'brightness_2' },
    { key: 'shashti', cls: '',        label: t('shashti'), val: data.shashti, icon: 'event' },
  ];
  const grid = document.getElementById('results-grid');
  if (!grid) return;
  grid.innerHTML = cards.map(({ cls, label, val, icon }) =>
    `<article class="muhurta-card ${cls}">
       <h3><span class="material-symbols-outlined" style="font-size:0.85rem;vertical-align:middle;margin-right:3px">${icon}</span>${label}</h3>
       <p>${val}</p>
     </article>`
  ).join('');
}

/**
 * Fetch Swiss Ephemeris data for a single date from the CF Function.
 * Returns the precomputed object on success, null on failure (triggers local fallback).
 */
async function fetchDayData(dateStr, lat, lon) {
  const key = `${dateStr}:${lat}:${lon}`;
  if (apiCache[key]) return apiCache[key];
  try {
    const res = await fetch(`/api/panchangam?date=${encodeURIComponent(dateStr)}&lat=${lat}&lon=${lon}`);
    if (res.ok) {
      const data = await res.json();
      if (!data.error) { apiCache[key] = data; return data; }
    }
  } catch (_) {}
  return null;
}

/**
 * Fetch Swiss Ephemeris data for all days in the month-grid window (batch).
 * Returns a map of { "YYYY-MM-DD": dayObj } on success, null on failure.
 */
async function fetchMonthData(year, month, lat, lon) {
  // Compute the full grid window (Sun → Sat rows covering the month).
  const firstOfMonth = new Date(year, month, 1);
  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - gridStart.getDay());
  const lastOfMonth = new Date(year, month + 1, 0);
  const gridEnd = new Date(lastOfMonth);
  gridEnd.setDate(gridEnd.getDate() + (6 - gridEnd.getDay()));

  const startStr = gridStart.toISOString().slice(0, 10);
  const endStr   = gridEnd.toISOString().slice(0, 10);
  const cacheKey = `month:${startStr}:${endStr}:${lat}:${lon}`;

  if (apiCache[cacheKey]) return apiCache[cacheKey];
  try {
    const res = await fetch(
      `/api/panchangam?date=${encodeURIComponent(startStr)}&endDate=${encodeURIComponent(endStr)}&lat=${lat}&lon=${lon}`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) {
        const map = {};
        data.forEach((d) => {
          map[d.date] = d;
          apiCache[`${d.date}:${lat}:${lon}`] = d;
        });
        apiCache[cacheKey] = map;
        return map;
      }
    }
  } catch (_) {}
  return null;
}

async function calculateAndRender() {
  const dateValue = document.getElementById('date-input').value;
  const lat = Number.parseFloat(document.getElementById('lat-input').value);
  const lon = Number.parseFloat(document.getElementById('lon-input').value);
  if (!dateValue || Number.isNaN(lat) || Number.isNaN(lon)) return;
  const selectedDate = new Date(`${dateValue}T00:00:00`);
  const precomputed = await fetchDayData(dateValue, lat, lon);
  const result = calculatePanchangam(selectedDate, lat, lon, precomputed);
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
      dateText: pub ? new Date(pub).toLocaleDateString(currentLang === 'en' ? 'en-US' : (LOCALE_MAP[currentLang] || 'en-IN'), { month: 'long', day: 'numeric', year: 'numeric' }) : '',
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
  if (!container) return;
  const tags = ['All', ...new Set(RSS_SOURCES.map((s) => s.tag))];
  container.innerHTML = tags.map((tag) => {
    const isActive = tag === activeNewsTag;
    const cls = isActive
      ? 'px-6 py-2 rounded-full bg-primary text-on-primary font-medium text-sm shrink-0'
      : 'px-6 py-2 rounded-full bg-surface-container text-on-surface-variant font-medium text-sm hover:bg-surface-container-high transition-all shrink-0';
    return `<button type="button" class="${cls}" data-tag="${tag}">${tag}</button>`;
  }).join('');
  container.querySelectorAll('button').forEach((btn) => btn.addEventListener('click', () => {
    activeNewsTag = btn.getAttribute('data-tag');
    renderNewsChips();
    renderNewsCards();
  }));
}

function renderNewsCards() {
  const searchEl = document.getElementById('news-search');
  const q = searchEl ? searchEl.value.trim().toLowerCase() : '';
  const output = document.getElementById('news-feed');
  if (!output) return;

  const filtered = newsArticles.filter((a) => {
    const tagOk = activeNewsTag === 'All' || a.tag === activeNewsTag;
    const qOk = !q || (`${a.title} ${a.summary} ${a.source}`.toLowerCase().includes(q));
    return tagOk && qOk;
  });

  if (!filtered.length) {
    output.innerHTML = `<div class="col-span-full flex flex-col items-center gap-3 py-16 text-on-surface-variant">
      <span class="material-symbols-outlined text-5xl">newspaper</span>
      <p class="text-sm">No articles found.</p>
    </div>`;
    return;
  }
  output.innerHTML = filtered.map((a) => `
    <article class="news-card" onclick="openArticle(${JSON.stringify(a).replace(/"/g, '&quot;')})">
      ${a.image
        ? `<img class="news-card-img" src="${a.image}" alt="${a.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
        : ''}
      <div class="news-card-img-placeholder" ${a.image ? 'style="display:none"' : ''}><span class="material-symbols-outlined">article</span></div>
      <div class="news-card-body">
        <div class="news-card-tag">${a.tag}</div>
        <h3 class="news-card-title">${a.title}</h3>
        <p class="news-card-meta">${a.dateText || a.source}</p>
      </div>
    </article>
  `).join('');
}


function getFestivalTags(date, tithi) {
  const tags = [];
  if ([6, 21].includes(tithi)) tags.push('Shasti Vratam');
  if (tithi === 15) tags.push('Pournami');
  if (tithi === 30) tags.push('Amavasai');
  if (date.getDay() === 1 && [13, 28].includes(tithi)) tags.push('Soma Pradosh');
  return tags;
}

function getMonthCellData(date, lat, lon, apiDay) {
  let sunrise, sunset, tithi, nak, moonRasi, tamilDay;
  if (apiDay) {
    sunrise  = new Date(apiDay.sunriseMs);
    sunset   = new Date(apiDay.sunsetMs);
    tithi    = apiDay.tithi;
    nak      = apiDay.nakshatra;
    moonRasi = (RASI[currentLang] || RASI.ta)[apiDay.moonRasi];
    tamilDay = apiDay.tamilDay;
  } else {
    const ss = calcSunriseSunset(date, lat, lon);
    sunrise  = ss.sunrise;
    sunset   = ss.sunset;
    tithi    = calcTithi(date);
    nak      = calcNakshatra(date);
    moonRasi = calcMoonRasi(date);
    tamilDay = calcTamilDay(date);
  }
  const paksha    = tithi <= 15 ? 'S' : 'K';
  const langTithi = (TITHI_NAMES[currentLang] || TITHI_NAMES.ta)[tithi - 1];
  const langNak   = (NAKSHATRA[currentLang]   || NAKSHATRA.ta)[nak - 1];
  return { sunrise: fmtTime(sunrise), sunset: fmtTime(sunset), tithi: `${langTithi} ${paksha}`, nakshatra: langNak, moon: moonRasi, tamilDay, festivals: getFestivalTags(date, tithi) };
}

function renderWeekdayRail() {
  const rail = document.getElementById('weekday-rail');
  if (!rail) return;
  rail.innerHTML = t('weekdays').map((w) => `<div class="dpVGridWeekdayCell dpFlexEqual"><span>${w}</span></div>`).join('');
}

function moveMonth(step) {
  currentMonthDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth() + step, 1);
  renderMonthViewFromInputs();
}

function renderMonthViewFromInputs() {
  const latEl = document.getElementById('lat-input');
  const lonEl = document.getElementById('lon-input');
  const lat = latEl ? Number.parseFloat(latEl.value) : CITY_PRESETS[0].lat;
  const lon = lonEl ? Number.parseFloat(lonEl.value) : CITY_PRESETS[0].lon;
  if (Number.isNaN(lat) || Number.isNaN(lon)) return;
  renderWeekdayRail();
  renderMonthGrid(currentMonthDate, lat, lon);
}

async function renderMonthGrid(anchorDate, lat, lon) {
  const localeKey = LOCALE_MAP[currentLang] || 'en-IN';
  const title = anchorDate.toLocaleDateString(localeKey, { month: 'long', year: 'numeric' });
  const calTitleEl = document.getElementById('cal-month-title');
  if (calTitleEl) calTitleEl.textContent = title;

  const first = new Date(anchorDate.getFullYear(), anchorDate.getMonth(), 1);
  const start = new Date(first);
  start.setDate(start.getDate() - start.getDay());

  const apiMonthData = await fetchMonthData(anchorDate.getFullYear(), anchorDate.getMonth(), lat, lon);

  const today = new Date();
  const selectedDateStr = document.getElementById('date-input').value || today.toISOString().slice(0, 10);
  const body = document.getElementById('cal-grid-body');
  if (!body) return;

  let html = '';
  let cursor = new Date(start);

  for (let w = 0; w < 6; w += 1) {
    for (let d = 0; d < 7; d += 1) {
      const sameMonth = cursor.getMonth() === anchorDate.getMonth();
      const dateStr = cursor.toISOString().slice(0, 10);
      const isToday = dateStr === today.toISOString().slice(0, 10);
      const isSelected = dateStr === selectedDateStr;
      const isHoliday = cursor.getDay() === 0;
      const apiDay = apiMonthData ? apiMonthData[dateStr] : null;
      const cell = getMonthCellData(cursor, lat, lon, apiDay);

      let cellClasses = 'p-1.5 border border-surface-container hover:bg-surface-container transition-colors cursor-pointer group relative min-h-[70px]';
      if (!sameMonth) cellClasses += ' opacity-40 bg-surface-container-low/30';
      if (isToday) cellClasses += ' ring-2 ring-inset ring-primary bg-primary/5';
      if (isSelected && !isToday) cellClasses += ' bg-primary/10';

      const dayNumClass = isHoliday ? 'text-sm font-bold text-error' : 'text-sm font-bold text-on-surface';
      const festivalDot = cell.festivals.length
        ? `<span class="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-secondary"></span>`
        : '';

      html += `<div class="${cellClasses}" data-date="${dateStr}">
        ${festivalDot}
        <div class="flex justify-between items-start mb-0.5">
          <span class="${dayNumClass}">${cursor.getDate()}</span>
          <span class="text-[8px] text-on-surface-variant leading-tight text-right hidden sm:block">${cell.sunrise}<br>${cell.sunset}</span>
        </div>
        <div class="text-[9px] text-primary font-bold leading-tight truncate">${cell.tithi}</div>
        <div class="text-[8px] text-on-surface-variant truncate">${cell.nakshatra}</div>
      </div>`;

      cursor.setDate(cursor.getDate() + 1);
    }
  }

  body.innerHTML = html;

  // Click handler: show day detail + update date input
  body.querySelectorAll('[data-date]').forEach((node) => {
    node.addEventListener('click', async () => {
      const dateValue = node.getAttribute('data-date');
      document.getElementById('date-input').value = dateValue;

      // Update selected cell highlight
      body.querySelectorAll('[data-date]').forEach((n) => {
        n.classList.remove('bg-primary/10');
        const nDate = n.getAttribute('data-date');
        if (nDate === today.toISOString().slice(0, 10)) return;
        if (nDate === dateValue) n.classList.add('bg-primary/10');
      });

      // Fill right-panel detail
      const titleEl = document.getElementById('cal-day-detail-title');
      const timingsEl = document.getElementById('cal-day-detail-timings');
      if (titleEl && timingsEl) {
        const clickedDate = new Date(`${dateValue}T00:00:00`);
        titleEl.textContent = clickedDate.toLocaleDateString(localeKey, { weekday: 'long', day: 'numeric', month: 'long' });
        timingsEl.innerHTML = '<p class="text-xs text-on-surface-variant">Loading…</p>';
        const precomputed = await fetchDayData(dateValue, lat, lon);
        const result = calculatePanchangam(clickedDate, lat, lon, precomputed);
        const cellData = getMonthCellData(clickedDate, lat, lon, precomputed);
        const fmtI = (interval) => interval ? `${fmtTime(new Date(interval.start))} – ${fmtTime(new Date(interval.end))}` : '—';
        timingsEl.innerHTML = [
          ['Tithi', cellData.tithi],
          ['Nakshatra', cellData.nakshatra],
          ['Moon Rasi', cellData.moon],
          [t('rahu'), fmtI(result.rahu)],
          [t('yama'), fmtI(result.yama)],
          [t('abhijit'), fmtI(result.abhijit)],
          [t('amrita'), fmtI(result.amrita)],
          [t('brahma'), fmtI(result.brahma)],
          ['Sunrise', cellData.sunrise],
          ['Sunset', cellData.sunset],
        ].map(([label, val]) => `
          <div class="flex justify-between items-center py-1.5 border-b border-outline-variant/30">
            <span class="text-xs text-on-surface-variant">${label}</span>
            <span class="text-xs font-bold text-on-surface text-right">${val}</span>
          </div>
        `).join('');
      }

      // Also trigger main renderResults if on today view
      calculateAndRender();
    });
  });
}

if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
initUI();

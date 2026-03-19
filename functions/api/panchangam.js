/**
 * Cloudflare Pages Function: GET /api/panchangam
 *
 * Uses the `sweph` npm package (Swiss Ephemeris WASM, Moshier algorithm).
 * Moshier: no .se1 data files required; Moon accuracy ~3 arcmin, Sun ~1 arcmin.
 * Compare: client-side Meeus 60-term ELP2000 gives ~30 arcmin (0.5°) Moon error.
 *
 * Query params:
 *   date    = YYYY-MM-DD  (required)
 *   lat     = decimal degrees  (required)
 *   lon     = decimal degrees  (required)
 *   endDate = YYYY-MM-DD  (optional; enables batch mode — returns array)
 *
 * Response (single):
 *   { date, tithi, nakshatra, moonRasi, tamilDay, sunriseMs, sunsetMs }
 *
 * Response (batch):
 *   [{ date, tithi, nakshatra, moonRasi, tamilDay, sunriseMs, sunsetMs }, ...]
 */

import sweph from 'sweph';

const {
  SE_SUN,
  SE_MOON,
  SEFLG_MOSEPH,
  SE_CALC_RISE,
  SE_CALC_SET,
  SE_GREG_CAL,
} = sweph.constants;

// Moshier algorithm requires no ephemeris files; path can be empty.
sweph.set_ephe_path('');

const CORS = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': '*',
  'cache-control': 'public, max-age=3600',
};

/**
 * Convert a YYYY-MM-DD date string to Julian Day Number at a given UT hour.
 */
function toJD(dateStr, hourUT) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return sweph.julday(y, m, d, hourUT, SE_GREG_CAL);
}

/**
 * Convert Julian Day Number to milliseconds since Unix epoch (UTC).
 */
function jdToMs(jd) {
  return Math.round((jd - 2440587.5) * 86400000);
}

/**
 * Compute panchangam values for a single date at the given location.
 * Returns { date, tithi, nakshatra, moonRasi, tamilDay, sunriseMs, sunsetMs }.
 */
function computeDay(dateStr, lat, lon) {
  // Start search for sunrise/sunset from the beginning of the UTC day.
  const jdDayStart = toJD(dateStr, 0.0);

  // Sunrise
  const riseResult = sweph.rise_trans(
    jdDayStart,
    SE_SUN,
    '',
    SEFLG_MOSEPH,
    SE_CALC_RISE,
    [lat, lon, 0],
    0,
    0,
  );

  // Sunset
  const setResult = sweph.rise_trans(
    jdDayStart,
    SE_SUN,
    '',
    SEFLG_MOSEPH,
    SE_CALC_SET,
    [lat, lon, 0],
    0,
    0,
  );

  // tret[0] = JD of the event.  Fall back to solar noon ± 6h if unavailable.
  const jdSunrise = riseResult.tret?.[0] ?? (jdDayStart + 0.25);
  const jdSunset  = setResult.tret?.[0]  ?? (jdDayStart + 0.75);

  // Compute Moon and Sun ecliptic longitudes at local sunrise.
  const moonResult = sweph.calc_ut(jdSunrise, SE_MOON, SEFLG_MOSEPH);
  const sunResult  = sweph.calc_ut(jdSunrise, SE_SUN,  SEFLG_MOSEPH);

  const moonLon = moonResult.longitude ?? moonResult.data?.[0] ?? 0;
  const sunLon  = sunResult.longitude  ?? sunResult.data?.[0]  ?? 0;

  // Tithi: Moon–Sun elongation / 12°, 1-indexed (30 = Amavasya).
  let elong = moonLon - sunLon;
  if (elong < 0) elong += 360;
  const tithi = Math.floor(elong / 12) + 1;

  // Nakshatra: Moon longitude / (360/27)°, 1-indexed.
  const nakshatra = Math.floor(moonLon / (360 / 27)) + 1;

  // Moon Rasi index: 0–11.
  const moonRasi = Math.floor(moonLon / 30);

  // Tamil solar calendar day: Sun's degree within current rasi.
  const tamilDay = Math.floor(sunLon % 30) + 1;

  return {
    date: dateStr,
    tithi,
    nakshatra,
    moonRasi,
    tamilDay,
    sunriseMs: jdToMs(jdSunrise),
    sunsetMs:  jdToMs(jdSunset),
  };
}

export async function onRequestGet({ request }) {
  const url    = new URL(request.url);
  const date   = url.searchParams.get('date');
  const lat    = parseFloat(url.searchParams.get('lat'));
  const lon    = parseFloat(url.searchParams.get('lon'));
  const endDate = url.searchParams.get('endDate');

  if (!date || isNaN(lat) || isNaN(lon)) {
    return new Response(
      JSON.stringify({ error: 'Missing or invalid date, lat, or lon' }),
      { status: 400, headers: CORS },
    );
  }

  try {
    if (endDate && endDate >= date) {
      // Batch mode: return one entry per day from date to endDate (inclusive).
      const results = [];
      const cur = new Date(`${date}T00:00:00Z`);
      const end = new Date(`${endDate}T00:00:00Z`);
      while (cur <= end) {
        results.push(computeDay(cur.toISOString().slice(0, 10), lat, lon));
        cur.setUTCDate(cur.getUTCDate() + 1);
      }
      return new Response(JSON.stringify(results), { headers: CORS });
    }

    return new Response(JSON.stringify(computeDay(date, lat, lon)), { headers: CORS });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: CORS },
    );
  }
}

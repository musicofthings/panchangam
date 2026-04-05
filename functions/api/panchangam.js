/**
 * Cloudflare Pages Function: GET /api/panchangam
 *
 * Pure-JavaScript astronomy — no native Node.js addons, no npm deps.
 * Sun accuracy ~1 arcmin (Meeus Ch 25).
 * Moon accuracy ~30 arcmin (Meeus Ch 47, 60-term ELP2000-82).
 * Sunrise/sunset accuracy ~1-2 min (NOAA algorithm, same as Ch 15).
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

const CORS = {
  'content-type': 'application/json; charset=UTF-8',
  'access-control-allow-origin': '*',
  'cache-control': 'public, max-age=3600',
};

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;

// ---------------------------------------------------------------------------
// Julian Day utilities
// ---------------------------------------------------------------------------

function julianDay(year, month, day, hourUT = 0) {
  if (month <= 2) { year -= 1; month += 12; }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716))
       + Math.floor(30.6001 * (month + 1))
       + day + hourUT / 24 + B - 1524.5;
}

function jdFromDateStr(dateStr, hourUT = 0) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return julianDay(y, m, d, hourUT);
}

function jdToMs(jd) {
  return Math.round((jd - 2440587.5) * 86400000);
}

// ---------------------------------------------------------------------------
// Sun ecliptic longitude — Meeus, Astronomical Algorithms, Ch 25
// Accuracy ~1 arcmin
// ---------------------------------------------------------------------------

function sunLongitude(jd) {
  const T = (jd - 2451545.0) / 36525;
  let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  L0 = ((L0 % 360) + 360) % 360;
  let M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  M = ((M % 360) + 360) % 360;
  const Mrad = M * RAD;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad)
          + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega = ((125.04 - 1934.136 * T) % 360 + 360) % 360;
  const apparent = sunLon - 0.00569 - 0.00478 * Math.sin(omega * RAD);
  return ((apparent % 360) + 360) % 360;
}

// ---------------------------------------------------------------------------
// Moon ecliptic longitude — Meeus Ch 47 (ELP2000-82, 60 terms)
// Accuracy ~30 arcmin
// ---------------------------------------------------------------------------

function moonLongitude(jd) {
  const T  = (jd - 2451545.0) / 36525;
  const T2 = T * T, T3 = T2 * T, T4 = T3 * T;

  const L1 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T2 + T3 / 538841    - T4 / 65194000;
  const D  = 297.8501921 + 445267.1114034  * T - 0.0018819 * T2 + T3 / 545868    - T4 / 113065000;
  const M  = 357.5291092 + 35999.0502909   * T - 0.0001536 * T2 + T3 / 24490000;
  const M1 = 134.9633964 + 477198.8675055  * T + 0.0087414 * T2 + T3 / 69699     - T4 / 14712000;
  const F  = 93.2720950  + 483202.0175233  * T - 0.0036539 * T2 - T3 / 3526000   + T4 / 863310000;

  const A1 = 119.75 + 131.849 * T;
  const A2 = 53.09  + 479264.290 * T;
  const E  = 1 - 0.002516 * T - 0.0000074 * T2;

  const Dr = D * RAD, Mr = M * RAD, M1r = M1 * RAD, Fr = F * RAD;

  // Meeus Table 47.A — periodic terms for longitude.
  // Coefficients are in units of 0.000001 degrees; sum / 1000000 = degrees.
  // [D, M, M', F, coefficient]
  const terms = [
    [ 0, 0, 1, 0,  6288774],
    [ 2, 0,-1, 0,  1274027],
    [ 2, 0, 0, 0,   658314],
    [ 0, 0, 2, 0,   213618],
    [ 0, 1, 0, 0,  -185116],
    [ 0, 0, 0, 2,  -114332],
    [ 2, 0,-2, 0,    58793],
    [ 2,-1,-1, 0,    57066],
    [ 2, 0, 1, 0,    53322],
    [ 2,-1, 0, 0,    45758],
    [ 0, 1,-1, 0,   -40923],
    [ 1, 0, 0, 0,   -34720],
    [ 0, 1, 1, 0,   -30383],
    [ 2, 0, 0,-2,    15327],
    [ 0, 0, 1, 2,   -12528],
    [ 0, 0, 1,-2,    10980],
    [ 4, 0,-1, 0,    10675],
    [ 0, 0, 3, 0,    10034],
    [ 4, 0,-2, 0,     8548],
    [ 2, 1,-1, 0,    -7888],
    [ 2, 1, 0, 0,    -6766],
    [ 1, 0,-1, 0,    -5163],
    [ 1, 1, 0, 0,     4987],
    [ 2,-1, 1, 0,     4036],
    [ 2, 0, 2, 0,     3994],
    [ 4, 0, 0, 0,     3861],
    [ 2, 0,-3, 0,     3665],
    [ 0, 1,-2, 0,    -2689],
    [ 2, 0,-1, 2,    -2602],
    [ 2,-1,-2, 0,     2390],
    [ 1, 0, 1, 0,    -2348],
    [ 2,-2, 0, 0,     2236],
    [ 0, 1, 2, 0,    -2120],
    [ 0, 2, 0, 0,    -2069],
    [ 2,-2,-1, 0,     2048],
    [ 2, 0, 1,-2,    -1773],
    [ 2, 0, 0, 2,    -1595],
    [ 4,-1,-1, 0,     1215],
    [ 0, 0, 2, 2,    -1110],
    [ 3, 0,-1, 0,     -892],
    [ 2, 1, 1, 0,     -810],
    [ 4,-1,-2, 0,      759],
    [ 0, 2,-1, 0,     -713],
    [ 2, 2,-1, 0,     -700],
    [ 2, 1,-2, 0,      691],
    [ 2,-1, 0,-2,      596],
    [ 4, 0, 1, 0,      549],
    [ 0, 0, 4, 0,      537],
    [ 4,-1, 0, 0,      520],
    [ 1, 0,-2, 0,     -487],
    [ 2, 1, 0,-2,     -399],
    [ 0, 0, 2,-2,     -381],
    [ 1, 1, 1, 0,      351],
    [ 3, 0,-2, 0,     -340],
    [ 4, 0,-3, 0,      330],
    [ 2,-1, 2, 0,      327],
    [ 0, 2, 1, 0,     -323],
    [ 1, 1,-1, 0,      299],
    [ 2, 0, 3, 0,      294],
  ];

  let sumL = 0;
  for (const [d, m, m1, f, coeff] of terms) {
    const arg = d * Dr + m * Mr + m1 * M1r + f * Fr;
    let c = coeff;
    if (Math.abs(m) === 1) c *= E;
    else if (Math.abs(m) === 2) c *= E * E;
    sumL += c * Math.sin(arg);
  }

  // Additional corrections (Meeus p. 342)
  sumL += 3958 * Math.sin(A1 * RAD)
        + 1962 * Math.sin((L1 - F) * RAD)
        +  318 * Math.sin(A2 * RAD);

  const lon = L1 + sumL / 1000000;
  return ((lon % 360) + 360) % 360;
}

// ---------------------------------------------------------------------------
// Sunrise / sunset — NOAA algorithm (Meeus Ch 15 equivalent)
// Returns JD of the event for the given UTC date.
// ---------------------------------------------------------------------------

function sunEvent(jd, lat, lon, isSunrise) {
  const T = (jd - 2451545.0) / 36525;

  // Geometric mean longitude and anomaly
  let L0 = ((280.46646 + 36000.76983 * T) % 360 + 360) % 360;
  let M  = ((357.52911 + 35999.05029 * T) % 360 + 360) % 360;
  const Mrad = M * RAD;

  const C = (1.914602 - 0.004817 * T) * Math.sin(Mrad)
          + 0.019993 * Math.sin(2 * Mrad)
          + 0.000289 * Math.sin(3 * Mrad);
  const sunLon = L0 + C;
  const omega  = 125.04 - 1934.136 * T;
  const lambda = sunLon - 0.00569 - 0.00478 * Math.sin(omega * RAD);

  // Obliquity and solar declination
  const epsilon = (23.439291111 - 0.013004167 * T) * RAD;
  const decl    = Math.asin(Math.sin(epsilon) * Math.sin(lambda * RAD));

  // Equation of time (minutes)
  const L0r = L0 * RAD;
  const e   = 0.016708634 - 0.000042037 * T;
  const y   = Math.tan(epsilon / 2) ** 2;
  const eot = 4 * DEG * (
      y * Math.sin(2 * L0r)
    - 2 * e * Math.sin(Mrad)
    + 4 * e * y * Math.sin(Mrad) * Math.cos(2 * L0r)
    - 0.5 * y * y * Math.sin(4 * L0r)
    - 1.25 * e * e * Math.sin(2 * Mrad)
  );

  // Hour angle at horizon (standard 0.833° below for refraction + solar disk)
  const latRad = lat * RAD;
  const cosH   = (Math.cos(90.833 * RAD) - Math.sin(latRad) * Math.sin(decl))
               / (Math.cos(latRad) * Math.cos(decl));

  // Solar noon in minutes from midnight UTC
  const solarNoon = 720 - 4 * lon - eot;

  if (cosH < -1 || cosH > 1) {
    // Polar day or night — return solar noon ± 6 h as fallback
    return jd + (solarNoon + (isSunrise ? -360 : 360)) / 1440;
  }

  const H      = Math.acos(cosH) * DEG;
  const offset = isSunrise ? -H * 4 : H * 4; // minutes
  return jd + (solarNoon + offset) / 1440;
}

// ---------------------------------------------------------------------------
// Panchangam for a single day
// ---------------------------------------------------------------------------

function computeDay(dateStr, lat, lon) {
  const jdDayStart = jdFromDateStr(dateStr, 0.0);

  const jdSunrise = sunEvent(jdDayStart, lat, lon, true);
  const jdSunset  = sunEvent(jdDayStart, lat, lon, false);

  const moonLonTropical = moonLongitude(jdSunrise);
  const sunLonTropical  = sunLongitude(jdSunrise);

  // Lahiri ayanamsa (sidereal–tropical offset, Chitrapaksha).
  // Linear approximation: 23.85° at J2000.0, increasing at 50.3"/yr.
  const T_ay = (jdSunrise - 2451545.0) / 36525;
  const ayanamsa = ((23.85 + T_ay * 25 * 0.01397) % 360 + 360) % 360;

  // Sidereal longitudes for rasi/nakshatra computations
  const moonLon = ((moonLonTropical - ayanamsa) % 360 + 360) % 360;
  const sunLon  = ((sunLonTropical  - ayanamsa) % 360 + 360) % 360;

  // Tithi: uses tropical elongation — ayanamsa cancels out
  let elong = moonLonTropical - sunLonTropical;
  if (elong < 0) elong += 360;
  const tithi = Math.floor(elong / 12) + 1;

  // Nakshatra: sidereal Moon longitude / (360/27)°, 1-indexed
  const nakshatra = Math.floor(moonLon / (360 / 27)) + 1;

  // Moon Rasi index: 0–11 (sidereal)
  const moonRasi = Math.floor(moonLon / 30);

  // Sun Rasi index: 0–11 sidereal (0=Mesha/Chittirai … 11=Meena/Panguni)
  const sunRasi = Math.floor(sunLon / 30);

  // Tamil solar calendar day: sidereal Sun's degree within current rasi
  const tamilDay = Math.floor(sunLon % 30) + 1;

  return {
    date: dateStr,
    tithi,
    nakshatra,
    moonRasi,
    sunRasi,
    tamilDay,
    sunriseMs: jdToMs(jdSunrise),
    sunsetMs:  jdToMs(jdSunset),
  };
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------

export async function onRequestGet({ request }) {
  const url     = new URL(request.url);
  const date    = url.searchParams.get('date');
  const lat     = parseFloat(url.searchParams.get('lat'));
  const lon     = parseFloat(url.searchParams.get('lon'));
  const endDate = url.searchParams.get('endDate');

  if (!date || isNaN(lat) || isNaN(lon)) {
    return new Response(
      JSON.stringify({ error: 'Missing or invalid date, lat, or lon' }),
      { status: 400, headers: CORS },
    );
  }

  try {
    if (endDate && endDate >= date) {
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

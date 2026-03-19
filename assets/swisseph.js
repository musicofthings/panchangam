/*
  SwissEph browser shim — real NOAA solar algorithm.
  Replace this file with the official swisseph-js build for Swiss Ephemeris precision.
  Project: https://github.com/timotejroiko/sweph
*/
window.SwissEph = {
  getSunrise(date, lat, lon) {
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
      return new Date(date.getTime() + (solarNoonUTC - 360) * 60000);
    }
    const H = Math.acos(cosH) * 180 / Math.PI;
    return new Date(date.getTime() + (solarNoonUTC - H * 4) * 60000);
  }
};

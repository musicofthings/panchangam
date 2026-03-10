/*
  Minimal SwissEph browser shim.
  Replace this file with the official swisseph-js build for precise astronomy.
  Project: https://github.com/timotejroiko/sweph
*/
window.SwissEph = {
  getSunrise(date, lat) {
    const d = new Date(date);
    d.setHours(6, 0, 0, 0);
    const seasonalShift = Math.sin((date.getMonth() / 11) * Math.PI * 2) * 30;
    const latShift = (Math.abs(lat) / 90) * 40;
    d.setMinutes(d.getMinutes() + Math.round(seasonalShift + latShift));
    return d;
  }
};

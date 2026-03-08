import { ZODIAC_ORDER } from "./zodiac-data";

// Get sun sign from month/day
export function getSunSign(month: number, day: number): string {
  const dates: [number, number, string][] = [
    [1, 20, "capricorn"], [2, 19, "aquarius"], [3, 20, "pisces"],
    [4, 20, "aries"], [5, 21, "taurus"], [6, 21, "gemini"],
    [7, 22, "cancer"], [8, 23, "leo"], [9, 23, "virgo"],
    [10, 23, "libra"], [11, 22, "scorpio"], [12, 22, "sagittarius"],
  ];

  for (let i = dates.length - 1; i >= 0; i--) {
    const [m, d, sign] = dates[i];
    if (month > m || (month === m && day >= d)) {
      return sign;
    }
  }
  return "capricorn";
}

// Simplified moon sign calculation using Julian Day Number approach
// Moon completes a cycle every ~27.32 days through 12 signs (~2.28 days each)
export function getMoonSign(year: number, month: number, day: number): string {
  // Calculate Julian Day Number
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  const jdn = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;

  // Known reference: Jan 1, 2000 (JDN 2451545) Moon was approximately in Cancer (index ~3)
  const refJdn = 2451545;
  const refIndex = 3;
  const moonCycleDays = 27.321661;

  const daysDiff = jdn - refJdn;
  const cyclePosition = ((daysDiff % moonCycleDays) + moonCycleDays) % moonCycleDays;
  const signIndex = Math.floor((cyclePosition / moonCycleDays) * 12 + refIndex) % 12;

  return ZODIAC_ORDER[signIndex];
}

// Simplified rising sign calculation
// Rising sign changes every ~2 hours, full cycle in 24 hours
// At sunrise (~6am), rising sign ≈ sun sign
export function getRisingSign(month: number, day: number, hour: number, minute: number): string {
  const sunSign = getSunSign(month, day);
  const sunIndex = ZODIAC_ORDER.indexOf(sunSign);

  // Hours since 6am (sunrise approximation)
  const totalMinutes = (hour - 6) * 60 + minute;
  const adjustedMinutes = ((totalMinutes % 1440) + 1440) % 1440;

  // Each sign takes ~120 minutes (1440 / 12)
  const signOffset = Math.floor(adjustedMinutes / 120);
  const risingIndex = (sunIndex + signOffset) % 12;

  return ZODIAC_ORDER[risingIndex];
}

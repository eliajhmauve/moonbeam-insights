import { describe, it, expect } from 'vitest';
import { getSunSign, getMoonSign, getRisingSign } from '../lib/astro-calc';

describe('Astro calculations', () => {
  it('getSunSign returns correct sign for Aug 15', () => {
    expect(getSunSign(8, 15)).toBe('leo');
  });

  it('getSunSign returns correct sign for Jan 1', () => {
    expect(getSunSign(1, 1)).toBe('capricorn');
  });

  it('getSunSign returns correct sign for Mar 25', () => {
    expect(getSunSign(3, 25)).toBe('aries');
  });

  it('getMoonSign returns a valid sign', () => {
    const sign = getMoonSign(1990, 8, 15);
    expect(sign).toBeTruthy();
    expect(typeof sign).toBe('string');
  });

  it('getRisingSign returns a valid sign', () => {
    const sign = getRisingSign(8, 15, 14, 30);
    expect(sign).toBeTruthy();
    expect(typeof sign).toBe('string');
  });
});

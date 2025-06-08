import { toKobo, toNaira } from './currency';

describe('Currency Utilities', () => {
  describe('toKobo', () => {
    it('should correctly convert naira to kobo', () => {
      // 100 Naira = 10000 Kobo
      expect(toKobo(100)).toBe(10000);
    });

    it('should handle zero', () => {
      expect(toKobo(0)).toBe(0);
    });

    it('should handle decimal values', () => {
      // 0.5 Naira = 50 Kobo
      expect(toKobo(0.5)).toBe(50);

      // 1.75 Naira = 175 Kobo
      expect(toKobo(1.75)).toBe(175);
    });

    it('should handle large numbers', () => {
      // 10000 Naira = 1000000 Kobo
      expect(toKobo(10000)).toBe(1000000);
    });
  });

  describe('toNaira', () => {
    it('should correctly convert kobo to naira', () => {
      // 10000 Kobo = 100 Naira
      expect(toNaira(10000)).toBe(100);
    });

    it('should handle zero', () => {
      expect(toNaira(0)).toBe(0);
    });

    it('should handle values that result in decimal naira', () => {
      // 50 Kobo = 0.5 Naira
      expect(toNaira(50)).toBe(0.5);

      // 175 Kobo = 1.75 Naira
      expect(toNaira(175)).toBe(1.75);
    });

    it('should handle large numbers', () => {
      // 1000000 Kobo = 10000 Naira
      expect(toNaira(1000000)).toBe(10000);
    });
  });
});

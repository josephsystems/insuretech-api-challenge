import { calculateTotalCost, subtractBalance } from './calculation';

describe('Calculation Utilities', () => {
  describe('calculateTotalCost', () => {
    it('should correctly calculate the total cost', () => {
      // 100 Naira per item * 5 items = 500 Naira = 50000 Kobo
      expect(calculateTotalCost(10000, 5)).toBe(50000);
    });

    it('should handle zero quantity', () => {
      expect(calculateTotalCost(10000, 0)).toBe(0);
    });

    it('should handle large numbers', () => {
      // 100 Naira per item * 1000 items = 100000 Naira = 10000000 Kobo
      expect(calculateTotalCost(10000, 1000)).toBe(10000000);
    });
  });

  describe('subtractBalance', () => {
    it('should correctly subtract the amount from the balance', () => {
      // 1000 Naira - 500 Naira = 500 Naira
      // 100000 Kobo - 50000 Kobo = 50000 Kobo
      expect(subtractBalance(100000, 50000)).toBe(50000);
    });

    it('should handle zero amount', () => {
      expect(subtractBalance(100000, 0)).toBe(100000);
    });
  });
});

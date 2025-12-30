import { describe, it, expect } from 'vitest';
import { cn, formatDate, generateId, clamp, randomInRange } from '@/lib/utils';

describe('Utils', () => {
  describe('cn', () => {
    it('merges class names correctly', () => {
      const result = cn('bg-red-500', 'text-white');
      expect(result).toContain('bg-red-500');
      expect(result).toContain('text-white');
    });
  });

  describe('formatDate', () => {
    it('formats timestamp to readable date', () => {
      const timestamp = new Date('2024-01-15').getTime();
      const formatted = formatDate(timestamp);
      expect(formatted).toContain('Jan');
      expect(formatted).toContain('15');
      expect(formatted).toContain('2024');
    });
  });

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toBe(id2);
      expect(id1).toBeTruthy();
      expect(id2).toBeTruthy();
    });
  });

  describe('clamp', () => {
    it('clamps value within range', () => {
      expect(clamp(50, 0, 100)).toBe(50);
      expect(clamp(-10, 0, 100)).toBe(0);
      expect(clamp(150, 0, 100)).toBe(100);
    });
  });

  describe('randomInRange', () => {
    it('generates random number within range', () => {
      for (let i = 0; i < 100; i++) {
        const value = randomInRange(10, 20);
        expect(value).toBeGreaterThanOrEqual(10);
        expect(value).toBeLessThanOrEqual(20);
      }
    });
  });
});

import { describe, it, expect } from 'vitest';
import { random, randomInt, pick, pickMany, shuffle } from '../random';

describe('random function', () => {
  it('should generate a number between min (inclusive) and max (exclusive)', () => {
    const min = 1;
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const result = random(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
    }
  });
});

describe('randomInt function', () => {
  it('should generate an integer between min (inclusive) and max (exclusive)', () => {
    const min = 1;
    const max = 10;
    for (let i = 0; i < 100; i++) {
      const result = randomInt(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThan(max);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe('pick function', () => {
  it('should pick a random element from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = pick(array);
    expect(array).toContain(result);
  });

  it('should handle an array with one element', () => {
    const array = [1];
    const result = pick(array);
    expect(result).toBe(1);
  });

  it('should throw an error when picking from an empty array', () => {
    const array: unknown[] = [];
    expect(() => pick(array)).toThrow();
  });
});

describe('pickMany function', () => {
  it('should pick the specified number of random elements from the array', () => {
    const array = [1, 2, 3, 4, 5];
    const count = 3;
    const result = pickMany(array, count);
    expect(result).toHaveLength(count);
    result.forEach(element => {
      expect(array).toContain(element);
    });
  });

  it('should handle picking more elements than in the array', () => {
    const array = [1, 2, 3];
    const count = 5;
    const result = pickMany(array, count);
    expect(result).toHaveLength(array.length);
  });
});

describe('shuffle function', () => {
  it('should shuffle the elements of the array', () => {
    const array = [1, 2, 3, 4, 5];
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
    expect(result).not.toEqual(array); // It's possible for the arrays to be equal, but this is highly unlikely
    array.forEach(element => {
      expect(result).toContain(element);
    });
  });

  it('should handle an empty array', () => {
    const array: unknown[] = [];
    const result = shuffle(array);
    expect(result).toHaveLength(0);
  });

  it('should handle an array with one element', () => {
    const array = [1];
    const result = shuffle(array);
    expect(result).toEqual(array);
  });
});

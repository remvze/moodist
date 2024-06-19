import { describe, it, expect } from 'vitest';
import { padNumber } from '../number';

describe('padNumber function', () => {
  it('should pad a single digit number to two digits by default', () => {
    const result = padNumber(5);
    expect(result).toBe('05');
  });

  it('should not pad a number that already has two digits by default', () => {
    const result = padNumber(12);
    expect(result).toBe('12');
  });

  it('should pad a number to the specified length', () => {
    const result = padNumber(7, 4);
    expect(result).toBe('0007');
  });

  it('should not pad a number that already meets the specified length', () => {
    const result = padNumber(1234, 4);
    expect(result).toBe('1234');
  });

  it('should pad a number that has more digits than the specified length', () => {
    const result = padNumber(123, 5);
    expect(result).toBe('00123');
  });

  it('should handle zero correctly', () => {
    const result = padNumber(0, 3);
    expect(result).toBe('000');
  });

  it('should pad negative numbers correctly', () => {
    const result = padNumber(-5, 3);
    expect(result).toBe('-005');
  });

  it('should handle very large padding lengths', () => {
    const result = padNumber(42, 10);
    expect(result).toBe('0000000042');
  });

  it('should handle the maximum length being less than the number length', () => {
    const result = padNumber(12345, 3);
    expect(result).toBe('12345');
  });
});

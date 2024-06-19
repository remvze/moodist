import { describe, it, expect } from 'vitest';
import { cn } from '../styles';

describe('cn function', () => {
  it('should return an empty string when no arguments are provided', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should return an empty string when all arguments are invalid values', () => {
    const result = cn(undefined, null, false, '');
    expect(result).toBe('');
  });

  it('should return a single class name when one valid string is provided', () => {
    const result = cn('class1');
    expect(result).toBe('class1');
  });

  it('should combine multiple class names into a single string separated by spaces', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should filter out invalid values and combine valid class names', () => {
    const result = cn('class1', undefined, 'class2', null, false, 'class3', '');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle a mix of valid and invalid class names', () => {
    const result = cn('class1', '', false, null, 'class2');
    expect(result).toBe('class1 class2');
  });

  it('should return an empty string when all class names are empty strings', () => {
    const result = cn('', '', '');
    expect(result).toBe('');
  });

  it('should handle single class name with leading and trailing spaces', () => {
    const result = cn(' class1 ');
    expect(result).toBe(' class1 ');
  });

  it('should handle class names with spaces in between', () => {
    const result = cn('class1 class2', 'class3 class4');
    expect(result).toBe('class1 class2 class3 class4');
  });
});

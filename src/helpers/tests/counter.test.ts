import { describe, it, expect } from 'vitest';

import { count } from '../counter';

describe('count function', () => {
  it('should count characters and words in an empty string', () => {
    const result = count('');
    expect(result.characters).toBe(0);
    expect(result.words).toBe(0);
  });

  it('should count characters and words in a string with multiple words', () => {
    const result = count('Hello world');
    expect(result.characters).toBe(10);
    expect(result.words).toBe(2);
  });

  it('should count characters and words in a string with multiple spaces', () => {
    const result = count('   Hello   world   ');
    expect(result.characters).toBe(10);
    expect(result.words).toBe(2);
  });

  it('should count characters and words in a string with newlines', () => {
    const result = count('Hello\nworld');
    expect(result.characters).toBe(10);
    expect(result.words).toBe(2);
  });

  it('should count characters and words in a string with special characters', () => {
    const result = count('Hello, world!');
    expect(result.characters).toBe(12);
    expect(result.words).toBe(2);
  });

  it('should count characters and words in a string with only spaces', () => {
    const result = count('     ');
    expect(result.characters).toBe(0);
    expect(result.words).toBe(0);
  });

  it('should count characters and words in a string with a single word', () => {
    const result = count('Vitest');
    expect(result.characters).toBe(6);
    expect(result.words).toBe(1);
  });

  it('should count characters and words in a string with multiple lines and spaces', () => {
    const result = count('  Hello   \n  world  ');
    expect(result.characters).toBe(10);
    expect(result.words).toBe(2);
  });
});

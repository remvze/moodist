import { describe, it, expect } from 'vitest';
import { fade, scale, slideX, slideY, mix } from '../motion';

describe('fade function', () => {
  it('should create a fade motion object with default opacity values', () => {
    const result = fade();
    expect(result).toEqual({
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    });
  });
});

describe('scale function', () => {
  it('should create a scale motion object with default values', () => {
    const result = scale();
    expect(result).toEqual({
      hidden: { scale: 0.85 },
      show: { scale: 1 },
    });
  });

  it('should create a scale motion object with custom values', () => {
    const result = scale(0.5, 1.5);
    expect(result).toEqual({
      hidden: { scale: 0.5 },
      show: { scale: 1.5 },
    });
  });
});

describe('slideX function', () => {
  it('should create a slide motion object with default x values', () => {
    const result = slideX();
    expect(result).toEqual({
      hidden: { x: -10 },
      show: { x: 0 },
    });
  });

  it('should create a slide motion object with custom x values', () => {
    const result = slideX(-20, 10);
    expect(result).toEqual({
      hidden: { x: -20 },
      show: { x: 10 },
    });
  });
});

describe('slideY function', () => {
  it('should create a slide motion object with default y values', () => {
    const result = slideY();
    expect(result).toEqual({
      hidden: { y: -10 },
      show: { y: 0 },
    });
  });

  it('should create a slide motion object with custom y values', () => {
    const result = slideY(-20, 10);
    expect(result).toEqual({
      hidden: { y: -20 },
      show: { y: 10 },
    });
  });
});

describe('mix function', () => {
  it('should combine multiple motion objects into a single motion object', () => {
    const fadeMotion = fade();
    const scaleMotion = scale();
    const result = mix(fadeMotion, scaleMotion);
    expect(result).toEqual({
      hidden: { opacity: 0, scale: 0.85 },
      show: { opacity: 1, scale: 1 },
    });
  });

  it('should handle overlapping properties in motion objects', () => {
    const slideXMotion = slideX();
    const slideYMotion = slideY();
    const result = mix(slideXMotion, slideYMotion);
    expect(result).toEqual({
      hidden: { x: -10, y: -10 },
      show: { x: 0, y: 0 },
    });
  });

  it('should handle single motion object', () => {
    const fadeMotion = fade();
    const result = mix(fadeMotion);
    expect(result).toEqual(fadeMotion);
  });

  it('should handle empty motion objects', () => {
    const result = mix();
    expect(result).toEqual({ hidden: {}, show: {} });
  });
});

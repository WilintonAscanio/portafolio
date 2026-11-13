import { describe, expect, it } from 'vitest';
import { monthIndex } from '../data/timeline';

describe('monthIndex', () => {
  it('counts months from the timeline start', () => {
    expect(monthIndex('2021-05')).toBe(0);
    expect(monthIndex('2021-12')).toBe(7);
    expect(monthIndex('2025-03')).toBe(46);
  });
});

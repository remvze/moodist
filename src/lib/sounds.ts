import { sounds } from '@/data/sounds';

/**
 * Counts the total number of sounds across all categories.
 *
 * @param {boolean} [round=false] - Whether to round the count down to the nearest multiple of 5.
 * @returns {number} The total count of sounds, optionally rounded down.
 */
export function count(round: boolean = false) {
  let count = 0;

  sounds.categories.forEach(category => {
    count += category.sounds.length;
  });

  if (round) {
    return count - (count % 5);
  }

  return count;
}

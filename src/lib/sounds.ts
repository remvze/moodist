import { sounds } from '@/data/sounds';

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

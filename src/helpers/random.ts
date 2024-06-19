/**
 * Generates a random number between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random number between min (inclusive) and max (exclusive).
 */
export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Generates a random integer between the specified minimum and maximum values.
 *
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (exclusive).
 * @returns {number} A random integer between min (inclusive) and max (exclusive).
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max));
}

/**
 * Picks a random element from the given array.
 *
 * @template T
 * @param {Array<T>} array - The array to pick an element from.
 * @returns {T} A random element from the array.
 */
export function pick<T>(array: Array<T>): T {
  if (array.length === 0) {
    throw new Error("The array shouldn't be empty");
  }

  const randomIndex = randomInt(0, array.length);

  return array[randomIndex];
}

/**
 * Picks a specified number of random elements from the given array.
 *
 * @template T
 * @param {Array<T>} array - The array to pick elements from.
 * @param {number} count - The number of elements to pick.
 * @returns {Array<T>} An array containing the picked elements.
 */
export function pickMany<T>(array: Array<T>, count: number): Array<T> {
  const shuffled = shuffle(array);

  return shuffled.slice(0, count);
}

/**
 * Shuffles the elements of the given array in random order.
 *
 * @template T
 * @param {Array<T>} array - The array to shuffle.
 * @returns {Array<T>} The shuffled array.
 */
export function shuffle<T>(array: Array<T>): Array<T> {
  return array
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

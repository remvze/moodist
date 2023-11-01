export function random(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(random(min, max));
}

export function pick<T>(array: Array<T>): T {
  const randomIndex = random(0, array.length);

  return array[randomIndex];
}

export function pickMany<T>(array: Array<T>, count: number): Array<T> {
  const shuffled = shuffle(array);

  return shuffled.slice(0, count);
}

export function shuffle<T>(array: Array<T>): Array<T> {
  return array
    .map(value => ({ sort: Math.random(), value }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

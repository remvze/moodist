export function count(_string: string) {
  const string = _string.trim();

  return {
    characters: string.replace(/\s/g, '').length,
    words: string
      .replace(/\n/g, ' ')
      .split(' ')
      .filter(str => str !== '').length,
  };
}

import wordsCounter from 'word-counting';

export function count(_string: string) {
  const string = _string.trim();

  return {
    characters: string.replace(/\s/g, '').length,
    words: wordsCounter(string).wordsCount,
  };
}

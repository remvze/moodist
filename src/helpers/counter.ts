/**
 * Counts the number of characters and words in a given string.
 *
 * @param {string} _string - The input string to be analyzed.
 * @returns {{characters: number, words: number}} An object containing the counts:
 *   - characters: The number of non-whitespace characters in the input string.
 *   - words: The number of words in the input string.
 */
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

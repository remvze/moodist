/**
 * Pads a given number with leading zeros to ensure it reaches a specified length.
 *
 * @param {number} number - The number to be padded.
 * @param {number} [maxLength=2] - The desired length of the resulting string. Defaults to 2 if not provided.
 * @returns {string} The padded number as a string.
 */
export function padNumber(number: number, maxLength: number = 2): string {
  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number).toString();
  const paddedNumber = absoluteNumber.padStart(maxLength, '0');

  return isNegative ? `-${paddedNumber}` : paddedNumber;
}

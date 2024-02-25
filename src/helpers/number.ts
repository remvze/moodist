export function padNumber(number: number, maxLength: number = 2): string {
  return number.toString().padStart(maxLength, '0');
}

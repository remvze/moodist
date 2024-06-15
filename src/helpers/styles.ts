type className = undefined | null | false | string;

/**
 * Combines multiple class names into a single string, filtering out invalid values.
 *
 * @param {...(undefined|null|false|string)} classNames - The class names to be combined.
 * @returns {string} A single string containing all valid class names separated by spaces.
 */
export function cn(...classNames: Array<className>): string {
  const className = classNames.filter(className => !!className).join(' ');

  return className;
}

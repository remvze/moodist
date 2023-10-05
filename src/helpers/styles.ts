type className = undefined | null | false | string;

export function cn(...classNames: Array<className>): string {
  const className = classNames.filter(className => !!className).join(' ');

  return className;
}

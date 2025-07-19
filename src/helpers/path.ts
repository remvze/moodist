export function getAssetPath(relativePath: string): string {
  const baseURL = import.meta.env.BASE_URL;
  const withoutTrailingSlash = baseURL.replace(/\/+$/, '');
  const withoutLeadingSlash = relativePath.replace(/^\/+/, '');

  return `${withoutTrailingSlash}/${withoutLeadingSlash}`;
}

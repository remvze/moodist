/**
 * A custom React hook to determine if the code is running in a browser or server environment.
 *
 * @returns {{ isBrowser: boolean, isServer: boolean }} An object containing:
 *   - isBrowser: A boolean indicating if the code is running in a browser environment.
 *   - isServer: A boolean indicating if the code is running in a server environment.
 */
export function useSSR() {
  const isDOM =
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement;

  return {
    isBrowser: isDOM,
    isServer: !isDOM,
  };
}

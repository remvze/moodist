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

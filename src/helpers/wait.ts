/**
 * Repeatedly calls a function at a specified interval until it returns `true`.
 *
 * @param {() => boolean} func - A function that returns a boolean. The interval will continue until this function returns `true`.
 * @param {number} interval - The time, in milliseconds, between each call to `func`.
 * @returns {Promise<void>} A promise that resolves when `func` returns `true`, or rejects if an error is thrown during execution of `func`.
 */
export function waitUntil(
  func: () => boolean,
  interval: number,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const intervalId = setInterval(() => {
      try {
        const result = func();

        if (result) {
          clearInterval(intervalId);
          resolve();
        }
      } catch (error) {
        clearInterval(intervalId);
        reject(error);
      }
    }, interval);
  });
}

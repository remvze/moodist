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

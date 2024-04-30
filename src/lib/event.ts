export function dispatch<T>(eventName: string, detail?: T) {
  const event = new CustomEvent(eventName, { detail });

  document.dispatchEvent(event);
}

export function subscribe<T>(eventName: string, listener: (e: T) => void) {
  const handler = (event: Event) => {
    if ('detail' in event) {
      const payload = event.detail as T;

      listener(payload);
    }
  };

  document.addEventListener(eventName, handler);

  return () => unsubscribe(eventName, handler);
}

export function unsubscribe(eventName: string, listener: (e: Event) => void) {
  document.removeEventListener(eventName, listener);
}

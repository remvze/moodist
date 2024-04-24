export function dispatch(eventName: string) {
  const event = new Event(eventName);

  document.dispatchEvent(event);
}

export function subscribe(eventName: string, listener: () => void) {
  document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName: string, listener: () => void) {
  document.removeEventListener(eventName, listener);
}

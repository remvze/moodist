import { useEffect, useRef } from 'react';
import { isNativePlatform } from '@/lib/platform';

type AppStateCallback = (isActive: boolean) => void;

/**
 * Hook to listen for app state changes (foreground/background)
 * On native platforms, uses Capacitor's App plugin
 * On web, uses visibilitychange event
 */
export function useAppState(callback: AppStateCallback) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (isNativePlatform()) {
      // Use Capacitor App plugin for native
      let removeListener: (() => void) | undefined;

      import('@capacitor/app').then(({ App }) => {
        App.addListener('appStateChange', state => {
          callbackRef.current(state.isActive);
        }).then(listener => {
          removeListener = () => listener.remove();
        });
      });

      return () => {
        removeListener?.();
      };
    } else {
      // Use visibilitychange for web
      const handleVisibilityChange = () => {
        callbackRef.current(document.visibilityState === 'visible');
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
    }
  }, []);
}

import { isNativePlatform } from './detect';

interface NotificationOptions {
  body: string;
  id: number;
  scheduleAt: Date;
  title: string;
}

/**
 * Schedule a local notification for native platforms
 * This is essential for timer features to work when the app is backgrounded
 */
export async function scheduleNotification(
  options: NotificationOptions,
): Promise<void> {
  if (!isNativePlatform()) return;

  try {
    const { LocalNotifications } = await import(
      '@capacitor/local-notifications'
    );

    // Request permission first
    const permResult = await LocalNotifications.requestPermissions();
    if (permResult.display !== 'granted') {
      console.warn('[Notifications] Permission not granted');
      return;
    }

    await LocalNotifications.schedule({
      notifications: [
        {
          body: options.body,
          id: options.id,
          schedule: { at: options.scheduleAt },
          sound: 'default',
          title: options.title,
        },
      ],
    });

    console.log('[Notifications] Scheduled:', options.title);
  } catch (error) {
    console.error('[Notifications] Failed to schedule:', error);
  }
}

/**
 * Cancel a scheduled notification by ID
 */
export async function cancelNotification(id: number): Promise<void> {
  if (!isNativePlatform()) return;

  try {
    const { LocalNotifications } = await import(
      '@capacitor/local-notifications'
    );

    await LocalNotifications.cancel({
      notifications: [{ id }],
    });

    console.log('[Notifications] Cancelled:', id);
  } catch (error) {
    console.error('[Notifications] Failed to cancel:', error);
  }
}

/**
 * Cancel all pending notifications
 */
export async function cancelAllNotifications(): Promise<void> {
  if (!isNativePlatform()) return;

  try {
    const { LocalNotifications } = await import(
      '@capacitor/local-notifications'
    );

    const pending = await LocalNotifications.getPending();
    if (pending.notifications.length > 0) {
      await LocalNotifications.cancel({ notifications: pending.notifications });
    }

    console.log('[Notifications] Cancelled all pending');
  } catch (error) {
    console.error('[Notifications] Failed to cancel all:', error);
  }
}

// Notification IDs for different timers
export const NOTIFICATION_IDS = {
  COUNTDOWN: 1001,
  POMODORO: 1002,
  SLEEP_TIMER: 1003,
} as const;

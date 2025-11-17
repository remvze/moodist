import { useState } from 'react';

interface NotificationState {
  showNotification: boolean;
  notificationMessage: string;
  notificationType: 'success' | 'error';
}

export function useNotification() {
  const [state, setState] = useState<NotificationState>({
    showNotification: false,
    notificationMessage: '',
    notificationType: 'success'
  });

  const showNotificationMessage = (message: string, type: 'success' | 'error') => {
    setState({
      showNotification: true,
      notificationMessage: message,
      notificationType: type
    });

    // 3秒后自动关闭
    setTimeout(() => {
      setState(prev => ({ ...prev, showNotification: false }));
    }, 3000);
  };

  const hideNotification = () => {
    setState(prev => ({ ...prev, showNotification: false }));
  };

  return {
    ...state,
    showNotificationMessage,
    hideNotification
  };
}
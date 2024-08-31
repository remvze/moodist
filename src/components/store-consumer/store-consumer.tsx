import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import { usePresetStore } from '@/stores/preset';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

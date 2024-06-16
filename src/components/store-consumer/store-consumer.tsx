import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import { useNoteStore } from '@/stores/note';
import { usePresetStore } from '@/stores/preset';
import { useCountdownTimers } from '@/stores/countdown-timers';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
    useCountdownTimers.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

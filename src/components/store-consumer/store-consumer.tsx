import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import { useNoteStore } from '@/stores/note';
import { usePresetStore } from '@/stores/preset';
import { useTimers } from '@/stores/timers';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
    useTimers.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

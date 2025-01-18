import { useEffect } from 'react';

import { useSoundStore } from '@/stores/sound';
import { useNoteStore } from '@/stores/note';
import { usePresetStore } from '@/stores/preset';
import { useMediaSessionStore } from '@/stores/media-session';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
    useMediaSessionStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

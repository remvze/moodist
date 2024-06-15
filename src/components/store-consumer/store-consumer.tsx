import { useEffect } from 'react';

import { useSoundStore, useNoteStore, usePresetStore } from '@/stores';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    useNoteStore.persist.rehydrate();
    usePresetStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

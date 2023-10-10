import { useEffect } from 'react';

import { useSoundStore } from '@/store';
import { useFavoriteStore } from '@/store/favorite';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
    useFavoriteStore.persist.rehydrate();
  });

  return <>{children}</>;
}

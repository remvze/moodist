import { useEffect } from 'react';

import { useSoundStore } from '@/store';

interface StoreConsumerProps {
  children: React.ReactNode;
}

export function StoreConsumer({ children }: StoreConsumerProps) {
  useEffect(() => {
    useSoundStore.persist.rehydrate();
  }, []);

  return <>{children}</>;
}

import { create } from 'zustand';

interface LoadingStore {
  loaders: Record<string, boolean>;
  set: (id: string, value: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>()((set, get) => ({
  loaders: {},
  set(id: string, value: boolean) {
    set({ loaders: { ...get().loaders, [id]: value } });
  },
}));

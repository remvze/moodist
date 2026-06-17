import { create } from "zustand";

interface FlowmodoroStore {
  running: boolean;
  setRunning: (value: boolean) => void;
}

export const useFlowmodoroStore = create<FlowmodoroStore>()((set) => ({
  running: false,
  setRunning(value: boolean) {
    set({ running: value });
  },
}));

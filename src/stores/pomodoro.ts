import { create } from 'zustand';

export type PomodoroMode = 'pomodoro' | 'short' | 'long';
type Durations = Record<PomodoroMode, number>;

export const pomodoroModes = [
  { id: 'pomodoro', label: 'Focus' },
  { id: 'short', label: 'Short break' },
  { id: 'long', label: 'Long break' },
] as const;

function validDuration(value: unknown): value is number {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 60 &&
    value <= 10800
  );
}

interface PomodoroStore {
  running: boolean;
  mode: PomodoroMode;
  remaining: number;
  deadline: number | null;
  durations: Durations;
  completions: Durations;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setMode: (mode: PomodoroMode) => void;
  setDuration: (seconds: number) => void;
  configure: (saved: unknown) => void;
  tick: () => boolean;
}

export function formatPomodoroTime(seconds: number) {
  return `${Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}

export const usePomodoroStore = create<PomodoroStore>()((set, get) => ({
  running: false,
  mode: 'pomodoro',
  remaining: 1500,
  deadline: null,
  durations: { pomodoro: 1500, short: 300, long: 900 },
  completions: { pomodoro: 0, short: 0, long: 0 },
  start() {
    const { running, remaining, durations, mode } = get();
    if (running) return;
    const seconds = remaining > 0 ? remaining : durations[mode];
    set({
      running: true,
      remaining: seconds,
      deadline: Date.now() + seconds * 1000,
    });
  },
  pause() {
    get().tick();
    set({ running: false, deadline: null });
  },
  reset() {
    const { durations, mode } = get();
    set({ running: false, deadline: null, remaining: durations[mode] });
  },
  setMode(mode) {
    set({
      mode,
      running: false,
      deadline: null,
      remaining: get().durations[mode],
    });
  },
  setDuration(seconds) {
    if (!validDuration(seconds)) return;
    const { durations, mode } = get();
    set({
      durations: { ...durations, [mode]: seconds },
      remaining: seconds,
      running: false,
      deadline: null,
    });
  },
  configure(saved) {
    if (!saved || typeof saved !== 'object') return;
    const durations = { ...get().durations };
    for (const { id } of pomodoroModes) {
      const value = (saved as Record<string, unknown>)[id];
      if (validDuration(value)) durations[id] = value;
    }
    set({ durations, remaining: durations[get().mode] });
  },
  tick() {
    const { running, deadline, remaining, mode, completions } = get();
    if (!running || deadline === null) return false;
    const seconds = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (seconds === 0) {
      set({
        running: false,
        remaining: 0,
        deadline: null,
        completions: { ...completions, [mode]: completions[mode] + 1 },
      });
      return true;
    }
    if (seconds !== remaining) set({ remaining: seconds });
    return false;
  },
}));

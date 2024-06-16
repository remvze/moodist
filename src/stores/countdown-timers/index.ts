import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Timer {
  id: string;
  name: string;
  spent: number;
  total: number;
}

interface State {
  spent: () => number;
  timers: Array<Timer>;
  total: () => number;
}

interface Actions {
  add: (timer: { name: string; total: number }) => string;
  delete: (id: string) => void;
  getTimer: (id: string) => Timer;
  rename: (id: string, newName: string) => void;
  reset: (id: string) => void;
  tick: (id: string, amount?: number) => void;
}

export const useCountdownTimers = create<State & Actions>()(
  persist(
    (set, get) => ({
      add({ name, total }) {
        const id = uuid();

        set(state => ({
          timers: [
            {
              id,
              name,
              spent: 0,
              total,
            },
            ...state.timers,
          ],
        }));

        return id;
      },

      delete(id) {
        set(state => ({
          timers: state.timers.filter(timer => timer.id !== id),
        }));
      },

      getTimer(id) {
        return get().timers.filter(timer => timer.id === id)[0];
      },

      rename(id, newName) {
        set(state => ({
          timers: state.timers.map(timer => {
            if (timer.id !== id) return timer;

            return { ...timer, name: newName };
          }),
        }));
      },

      reset(id) {
        set(state => ({
          timers: state.timers.map(timer => {
            if (timer.id !== id) return timer;

            return { ...timer, spent: 0 };
          }),
        }));
      },

      spent() {
        return get().timers.reduce((prev, curr) => prev + curr.spent, 0);
      },

      tick(id, amount = 1) {
        set(state => ({
          timers: state.timers.map(timer => {
            if (timer.id !== id) return timer;

            const updatedSpent =
              timer.spent + amount > timer.total
                ? timer.total
                : timer.spent + amount;

            return { ...timer, spent: updatedSpent };
          }),
        }));
      },

      timers: [],

      total() {
        return get().timers.reduce((prev, curr) => prev + curr.total, 0);
      },
    }),
    {
      name: 'moodist-countdown-timers',
      partialize: state => ({ timers: state.timers }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);

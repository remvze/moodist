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
  getTimer: (id: string) => Timer & { first: boolean; last: boolean };
  moveDown: (id: string) => void;
  moveUp: (id: string) => void;
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
        const timers = get().timers;
        const timer = timers.filter(timer => timer.id === id)[0];
        const index = timers.indexOf(timer);

        return {
          ...timer,
          first: index === 0,
          last: index === timers.length - 1,
        };
      },

      moveDown(id) {
        set(state => {
          const index = state.timers.findIndex(timer => timer.id === id);

          if (index < state.timers.length - 1) {
            const newTimers = [...state.timers];

            [newTimers[index + 1], newTimers[index]] = [
              newTimers[index],
              newTimers[index + 1],
            ];

            return { timers: newTimers };
          }

          return state;
        });
      },

      moveUp(id) {
        set(state => {
          const index = state.timers.findIndex(timer => timer.id === id);

          if (index > 0) {
            const newTimers = [...state.timers];

            [newTimers[index - 1], newTimers[index]] = [
              newTimers[index],
              newTimers[index - 1],
            ];

            return { timers: newTimers };
          }

          return state;
        });
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

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import merge from 'deepmerge';
import { v4 as uuid } from 'uuid';

import { addConfetti } from '@/lib/confetti';

interface TodoStore {
  addTodo: (todo: string) => void;
  deleteTodo: (id: string) => void;
  doneCount: () => number;
  editTodo: (id: string, newTodo: string) => void;
  todos: Array<{
    createdAt: number;
    done: boolean;
    id: string;
    todo: string;
  }>;
  toggleTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()(
  persist(
    (set, get) => ({
      addTodo(todo) {
        set({
          todos: [
            {
              createdAt: Date.now(),
              done: false,
              id: uuid(),
              todo,
            },
            ...get().todos,
          ],
        });
      },
      deleteTodo(id) {
        set({
          todos: get().todos.filter(todo => todo.id !== id),
        });
      },

      doneCount() {
        const { todos } = get();

        return todos.filter(todo => todo.done).length;
      },

      editTodo(id, newTodo) {
        set({
          todos: get().todos.map(todo => {
            if (todo.id !== id) return todo;

            return {
              ...todo,
              todo: newTodo,
            };
          }),
        });
      },

      todos: [],

      toggleTodo(id) {
        set({
          todos: get().todos.map(todo => {
            if (todo.id !== id) return todo;

            return {
              ...todo,
              done: !todo.done,
            };
          }),
        });

        if (get().doneCount() === get().todos.length) {
          addConfetti();
        }
      },
    }),
    {
      merge: (persisted, current) =>
        merge(current, persisted as Partial<TodoStore>),

      name: 'moodist-todos',
      partialize: state => ({ todos: state.todos }),
      skipHydration: true,
      storage: createJSONStorage(() => localStorage),
      version: 0,
    },
  ),
);

import { writable } from "svelte/store";
import { adds, tables } from "./categories";

const initialState = {
  ...adds,
  ...tables
};

function createStore() {
  const KEY = "tafels-app-v6";

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    complete: id =>
      update(state => {
        state[id].completed = true;
        return state;
      }),
    reset: () => update(() => initialState),
    useUnlocking: () => {
      subscribe(state => {
        // if question is completed, next question will be unlocked
        for (const id in state) {
          const q = state[id];
          const next = state[q.unlocks];
          if (q.completed && next) next.unlocked = true;
        }
      });
    },
    useLocalStorage: () => {
      // skip localstorage for SSR
      if (!process.browser) return;
      const json = localStorage.getItem(KEY);
      if (json) {
        const stored = JSON.parse(json);
        set(stored);
      }
      subscribe(state => {
        localStorage.setItem(KEY, JSON.stringify(state));
      });
    }
  };
}

export const store = createStore();

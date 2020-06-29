import merge from "lodash.merge";
import { writable } from "svelte/store";
import { subtracts } from "./subtract/subtractQuestions";
import { adds } from "./add/addQuestions";
import { tables } from "./table/tableQuestions";

const initialState = {
  tables: tables.initialState,
  adds: adds.initialState,
  subtracts: subtracts.initialState,
};

function createStore() {
  const KEY = "tafels-app-v9";

  const { subscribe, update } = writable(initialState);

  function useLocalStorage() {
    // skip localstorage for SSR
    if (!process.browser) return;
    const json = localStorage.getItem(KEY);
    if (json) {
      const stored = JSON.parse(json);

      update((state) => {
        let merged = merge(state, stored);
        return merged;
      });
    }
    subscribe((state) => {
      localStorage.setItem(KEY, JSON.stringify(state));
    });
  }

  useLocalStorage();

  return {
    subscribe,
    complete: ({ category, challenge }) =>
      update((state) => {
        state[category][challenge].completed = true;
        return state;
      }),
    unlockNext: ({ category, challenge }) =>
      update((state) => {
        let current = state[category][challenge];
        if (current.unlocks) state[category][current.unlocks].unlocked = true;
        return state;
      }),
    reset: () => update(() => initialState),
  };
}

export const store = createStore();

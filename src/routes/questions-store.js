import { writable } from "svelte/store";
import { subtracts } from "./subtract/subtractQuestions";
import { adds } from "./add/addQuestions";
import { tables } from "./table/tableQuestions";
import { useLocalStorage } from "./store-hooks";

const initialState = {
  tables: tables.initialState,
  adds: adds.initialState,
  subtracts: subtracts.initialState,
  practice: { today: {}, tomorrow: {}, nextWeek: {} },
};

function createStore() {
  const KEY = "tafels-app-v9";

  const { subscribe, update } = writable(initialState);

  useLocalStorage({ subscribe, update, key: KEY });

  return {
    subscribe,
    complete: ({ category, challenge }) =>
      update((state) => {
        state[category][challenge].completed = true;
        return state;
      }),
    unlockNext: ({ category, challenge }) =>
      update((state) => {
        const current = state[category][challenge];
        if (current.unlocks) state[category][current.unlocks].unlocked = true;
        return state;
      }),
  };
}

export const store = createStore();

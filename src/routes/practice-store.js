import { writable } from "svelte/store";
import { useLocalStorage } from "./store-hooks";
import { removeDups } from "./utils";

const initialState = {
  today: [],
  tomorrow: [],
  nextWeek: [],
};

function createStore() {
  const KEY = "tafels-app-practice";
  const { subscribe, update } = writable(initialState);

  useLocalStorage({ subscribe, update, key: KEY });

  return {
    subscribe,
    add: (question) => {
      update((state) => {
        const { today } = state;
        today.push(question);
        state.today = removeDups(today, "q");
        return state;
      });
    },
    improve: (question) => {
      // TODO ??
    },
    reset: () => update(() => initialState),
  };
}

export const store = createStore();

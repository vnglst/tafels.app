import { writable } from "svelte/store";
import { useLocalStorage } from "./store-hooks";

const initialState = { name: "BigHead" };

function createStore() {
  const KEY = "tafels-app-name";
  const { set, subscribe, update } = writable(initialState);
  useLocalStorage({ subscribe, update, key: KEY });

  return {
    subscribe,
    set,
    reset: () => update(() => initialState),
  };
}

export const accountStore = createStore();

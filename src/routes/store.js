import { writable } from "svelte/store";

function createTables() {
  const KEY = "tafels-app";

  const initialState = [
    { completed: 0.0, id: "1" },
    { completed: 0.0, id: "2" },
    { completed: 0.0, id: "3" },
    { completed: 0.0, id: "4" },
    { completed: 0.0, id: "5" },
    { completed: 0.0, id: "6" },
    { completed: 0.0, id: "7" },
    { completed: 0.0, id: "8" },
    { completed: 0.0, id: "9" },
    { completed: 0.0, id: "10" }
  ];

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    updateCompleted: (table, completed) =>
      update(state => {
        state[table - 1].completed = completed;
        return state;
      }),
    reset: () => update(() => initialState),
    useLocalStorage: () => {
      // skip localstorage for SSR
      if (!process.browser) return;
      const json = localStorage.getItem(KEY);
      if (json) {
        set(JSON.parse(json));
      }

      subscribe(current => {
        localStorage.setItem(KEY, JSON.stringify(current));
      });
    }
  };
}

export const tables = createTables();

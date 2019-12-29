import { writable, derived } from "svelte/store";

const initialState = [
  { completed: 0.0, id: "1", type: "table" },
  { completed: 0.0, id: "2", type: "table" },
  { completed: 0.0, id: "3", type: "table" },
  { completed: 0.0, id: "4", type: "table" },
  { completed: 0.0, id: "5", type: "table" },
  { completed: 0.0, id: "6", type: "table" },
  { completed: 0.0, id: "7", type: "table" },
  { completed: 0.0, id: "8", type: "table" },
  { completed: 0.0, id: "9", type: "table" },
  { completed: 0.0, id: "10", type: "table" },
  { completed: 0.0, id: "10", type: "add" },
  { completed: 0.0, id: "15", type: "add" },
  { completed: 0.0, id: "20", type: "add" }
];

function createStore() {
  const KEY = "tafels-app-v2";

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    updateCompleted: (id, completed) =>
      update(state => {
        const idx = state.findIndex(s => id === s.type + s.id);
        state[idx].completed = completed;
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

export const store = createStore();

export const tables = derived(store, $state =>
  $state.filter(t => t.type === "table")
);

export const adds = derived(store, $state =>
  $state.filter(t => t.type === "add")
);

export const initialTables = initialState.filter(t => t.type === "table");
export const allowedTables = initialTables.map(t => t.id);
export const isLegalTable = n => allowedTables.includes(n);

export const initialAdds = initialState.filter(t => t.type === "add");
export const allowedAdds = initialAdds.map(t => t.id);
export const isLegalAdd = n => allowedAdds.includes(n);

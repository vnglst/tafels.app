import { writable, derived } from "svelte/store";

const initialState = {
  "table-1": { completed: 0.1, n: 1, unlocks: "table-10" },
  "table-10": { completed: 0.0, n: 10, unlocks: "table-2" },
  "table-2": { completed: 0.0, n: 2, unlocks: "table-5" },
  "table-5": { completed: 0.0, n: 5, unlocks: "table-3" },
  "table-3": { completed: 0.0, n: 3, unlocks: "table-4" },
  "table-4": { completed: 0.0, n: 4, unlocks: "table-6" },
  "table-6": { completed: 0.0, n: 6, unlocks: "table-7" },
  "table-7": { completed: 0.0, n: 7, unlocks: "table-8" },
  "table-8": { completed: 0.0, n: 8, unlocks: "table-9" },
  "table-9": { completed: 0.0, n: 9, unlocks: "table-11" },
  "table-11": { completed: 0.0, n: 11, unlocks: "table-20" },
  "table-20": { completed: 0.0, n: 20, unlocks: null },
  "add-10": { completed: 0.1, n: 10, unlocks: "add-15" },
  "add-15": { completed: 0.0, n: 15, unlocks: "add-20" },
  "add-20": { completed: 0.0, n: 20, unlocks: "add-25" },
  "add-25": { completed: 0.0, n: 25, unlocks: "add-50" },
  "add-50": { completed: 0.0, n: 50, unlocks: "add-75" },
  "add-75": { completed: 0.0, n: 75, unlocks: "add-100" },
  "add-100": { completed: 0.0, n: 100, unlocks: "add-200" },
  "add-200": { completed: 0.0, n: 200, unlocks: "add-250" },
  "add-250": { completed: 0.0, n: 250, unlocks: "add-500" },
  "add-500": { completed: 0.0, n: 500, unlocks: "add-750" },
  "add-750": { completed: 0.0, n: 750, unlocks: "add-999" },
  "add-999": { completed: 0.0, n: 999, unlocks: null }
};

function createStore() {
  const KEY = "tafels-app-v6";

  const { subscribe, set, update } = writable(initialState);

  // unlocking logic
  subscribe(current => {
    for (const id in current) {
      let unlockNext = false;
      if (current[id].completed >= 1) unlockNext = true;

      let nextId = null;
      if (current[id].unlocks) nextId = current[id].unlocks;

      if (nextId && current[nextId].completed > 0) unlockNext = false;

      if (unlockNext && nextId) {
        current[nextId].completed = 0.01;
      }
    }
  });

  return {
    subscribe,
    updateCompleted: (id, completed) =>
      update(state => {
        state[id].completed = completed;
        return state;
      }),
    reset: () => update(() => initialState),
    useLocalStorage: () => {
      // skip localstorage for SSR
      if (!process.browser) return;
      const json = localStorage.getItem(KEY);
      if (json) {
        const stored = JSON.parse(json);
        set(stored);
      }
      subscribe(current => {
        localStorage.setItem(KEY, JSON.stringify(current));
      });
    }
  };
}

export const store = createStore();

// convert lookup table to array for rendering
export const storeAsArray = derived(store, $state =>
  Object.keys($state).map(key => {
    return { id: key, ...$state[key] };
  })
);

export const tables = derived(storeAsArray, $state =>
  $state.filter(t => t.id.startsWith("table"))
);

export const adds = derived(storeAsArray, $state =>
  $state.filter(t => t.id.startsWith("add"))
);

const isLegal = id => initialState[id];

export const getTableId = n => (isLegal("table-" + n) ? "table-" + n : null);
export const getAddId = n => (isLegal("add-" + n) ? "add-" + n : null);

export const hasPassed = completed => completed >= 0.7;

import { writable, derived } from "svelte/store";

const initialState = {
  "table-1": { completed: 0.0, n: 1 },
  "table-10": { completed: 0.0, n: 10 },
  "table-2": { completed: 0.0, n: 2 },
  "table-5": { completed: 0.0, n: 5 },
  "table-3": { completed: 0.0, n: 3 },
  "table-4": { completed: 0.0, n: 4 },
  "table-6": { completed: 0.0, n: 6 },
  "table-7": { completed: 0.0, n: 7 },
  "table-8": { completed: 0.0, n: 8 },
  "table-9": { completed: 0.0, n: 9 },
  "table-11": { completed: 0.0, n: 11 },
  "table-20": { completed: 0.0, n: 20 },
  "add-10": { completed: 0.0, n: 10 },
  "add-15": { completed: 0.0, n: 15 },
  "add-20": { completed: 0.0, n: 20 },
  "add-25": { completed: 0.0, n: 25 },
  "add-50": { completed: 0.0, n: 50 },
  "add-75": { completed: 0.0, n: 75 },
  "add-100": { completed: 0.0, n: 100 },
  "add-200": { completed: 0.0, n: 200 },
  "add-250": { completed: 0.0, n: 250 },
  "add-500": { completed: 0.0, n: 500 },
  "add-750": { completed: 0.0, n: 750 },
  "add-999": { completed: 0.0, n: 999 }
};

function createStore() {
  const KEY = "tafels-app-v5";

  const { subscribe, set, update } = writable(initialState);

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

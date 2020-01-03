export const tables = {
  "table-1": {
    unlocked: true,
    n: 1,
    type: "table",
    unlocks: "table-10"
  },
  "table-10": { n: 10, type: "table", unlocks: "table-2" },
  "table-2": { n: 2, type: "table", unlocks: "table-5" },
  "table-5": { n: 5, type: "table", unlocks: "table-3" },
  "table-3": { n: 3, type: "table", unlocks: "table-4" },
  "table-4": { n: 4, type: "table", unlocks: "table-6" },
  "table-6": { n: 6, type: "table", unlocks: "table-7" },
  "table-7": { n: 7, type: "table", unlocks: "table-8" },
  "table-8": { n: 8, type: "table", unlocks: "table-9" },
  "table-9": { n: 9, type: "table", unlocks: "table-11" },
  "table-11": { n: 11, type: "table", unlocks: "table-20" },
  "table-20": { n: 20, type: "table", unlocks: null }
};

export const adds = {
  "add-10": { unlocked: true, n: 10, type: "add", unlocks: "add-15" },
  "add-15": { n: 15, type: "add", unlocks: "add-20" },
  "add-20": { n: 20, type: "add", unlocks: "add-25" },
  "add-25": { n: 25, type: "add", unlocks: "add-50" },
  "add-50": { n: 50, type: "add", unlocks: "add-75" },
  "add-75": { n: 75, type: "add", unlocks: "add-100" },
  "add-100": { n: 100, type: "add", unlocks: "add-200" },
  "add-200": { n: 200, type: "add", unlocks: "add-250" },
  "add-250": { n: 250, type: "add", unlocks: "add-500" },
  "add-500": { n: 500, type: "add", unlocks: "add-750" },
  "add-750": { n: 750, type: "add", unlocks: "add-999" },
  "add-999": { n: 999, type: "add", unlocks: null }
};

export const getTableId = n => (tables["table-" + n] ? "table-" + n : null);
export const getAddId = n => (adds["add-" + n] ? "add-" + n : null);

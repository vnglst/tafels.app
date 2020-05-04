export const tables = {
  'tafel-1': {
    unlocked: true,
    n: 1,
    type: 'tafel',
    unlocks: 'tafel-10',
  },
  'tafel-10': { n: 10, type: 'tafel', unlocks: 'tafel-2' },
  'tafel-2': { n: 2, type: 'tafel', unlocks: 'tafel-5' },
  'tafel-5': { n: 5, type: 'tafel', unlocks: 'tafel-3' },
  'tafel-3': { n: 3, type: 'tafel', unlocks: 'tafel-4' },
  'tafel-4': { n: 4, type: 'tafel', unlocks: 'tafel-6' },
  'tafel-6': { n: 6, type: 'tafel', unlocks: 'tafel-7' },
  'tafel-7': { n: 7, type: 'tafel', unlocks: 'tafel-8' },
  'tafel-8': { n: 8, type: 'tafel', unlocks: 'tafel-9' },
  'tafel-9': { n: 9, type: 'tafel', unlocks: 'tafel-11' },
  'tafel-11': { n: 11, type: 'tafel', unlocks: 'tafel-20' },
  'tafel-20': { n: 20, type: 'tafel', unlocks: 'add-15' },
}

export const adds = {
  'add-10': { unlocked: true, n: 10, type: 'add', unlocks: 'add-15' },
  'add-15': { n: 15, type: 'add', unlocks: 'add-20' },
  'add-20': { n: 20, type: 'add', unlocks: 'add-25' },
  'add-25': { n: 25, type: 'add', unlocks: 'add-50' },
  'add-50': { n: 50, type: 'add', unlocks: 'add-75' },
  'add-75': { n: 75, type: 'add', unlocks: 'add-100' },
  'add-100': { n: 100, type: 'add', unlocks: 'add-200' },
  'add-200': { n: 200, type: 'add', unlocks: 'add-250' },
  'add-250': { n: 250, type: 'add', unlocks: 'add-500' },
  'add-500': { n: 500, type: 'add', unlocks: 'add-750' },
  'add-750': { n: 750, type: 'add', unlocks: 'add-999' },
  'add-999': { n: 999, type: 'add', unlocks: 'tafel-1' },
}

export const getTableId = n => (tables['tafel-' + n] ? 'tafel-' + n : null)
export const getTable = id => tables[id]

export const getAddId = n => (adds['add-' + n] ? 'add-' + n : null)
export const getAdd = id => adds[id]

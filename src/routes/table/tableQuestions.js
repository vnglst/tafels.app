import { addRandomOptions, prepare, generateChallenges } from '../utils'

function generateTableQuestions(base, maxValue = 10) {
  const table = []
  for (let i = 1; i <= maxValue; i++) {
    const question = {
      q: `${base} x ${i}`,
      answer: base * i,
      options: [base * i],
    }
    table.push(question)
  }
  return addRandomOptions({
    table,
    total: 9,
    min: 1,
    max: base * maxValue + 10,
  })
}

export const getQuestions = n => prepare(generateTableQuestions((n)))

const definition = {
  title: "Multiplications",
  category: 'tables',
  slug: 'table'
}

const initialState = {
  1: { unlocked: true, unlocks: 2 },
  10: { unlocks: 2 },
  2: { unlocks: 5 },
  5: { unlocks: 3 },
  3: { unlocks: 4 },
  4: { unlocks: 6 },
  6: { unlocks: 7 },
  7: { unlocks: 8 },
  8: { unlocks: 9 },
  9: { unlocks: 11 },
  11: { unlocks: 20 },
  20: { unlocks: null },
}

export const tables = {
  ...definition,
  initialState,
  challenges: generateChallenges({ initialState, definition, getQuestions })
}

import { addRandomOptions, removeDups, rnd, generateChallenges } from '../utils'

function generateQuestions(maxValue = 10, total = 10) {
  let table = []

  while (table.length < total) {
    const i = rnd({ from: 1, to: maxValue })
    const j = rnd({ from: 1, to: maxValue })

    const question = {
      q: `${i} - ${j}`,
      answer: i - j,
      options: [i - j]
    }

    // only add subtractions with positive results
    if (i - j > 0) {
      table.push(question)
      table = removeDups(table, 'q')
    }
  }

  return addRandomOptions({
    table,
    total: 9,
    min: 0,
    max: maxValue,
  })
}

const getQuestions = n => generateQuestions(n)

const definition = {
  title: "Subtractions",
  category: 'subtracts',
  slug: 'subtract'
}

const initialState = {
  10: { unlocked: true, unlocks: 15 },
  15: { unlocks: 20 },
  20: { unlocks: 25 },
  25: { unlocks: 50 },
  50: { unlocks: 75 },
  75: { unlocks: 100 },
  100: { unlocks: 200 },
  200: { unlocks: 250 },
  250: { unlocks: 500 },
  500: { unlocks: 750 },
  750: { unlocks: 999 },
  999: { unlocks: null },
}

export const subtracts = {
  ...definition,
  initialState,
  challenges: generateChallenges({ initialState, definition, getQuestions })
}



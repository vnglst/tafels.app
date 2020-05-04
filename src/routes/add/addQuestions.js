import { addRandomOptions, removeDups, rnd, prepare } from '../utils'

function generateAddQuestions(maxValue = 10, total = 10) {
  let table = []

  while (table.length < total) {
    const i = rnd({ from: 1, to: maxValue - 1 })
    const j = rnd({ from: 1, to: maxValue - i })

    const question = {
      q: `${i} + ${j}`,
      answer: i + j,
      options: [i + j],
    }

    table.push(question)
    table = removeDups(table, 'q')
  }

  const half = Math.floor(maxValue / 2)

  return addRandomOptions({
    table,
    total: 9,
    min: maxValue - half,
    max: maxValue + half,
  })
}

export const getAddQuestions = n =>
  prepare(generateAddQuestions(parseInt(n, 10)))

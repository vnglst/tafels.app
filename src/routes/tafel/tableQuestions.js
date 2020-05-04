import { addRandomOptions, prepare } from '../utils'

function generateTableQuestions(base, maxValue = 1) {
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

export const getTableQuestions = n =>
  prepare(generateTableQuestions(parseInt(n, 10)))

import { addRandomOptions, prepare } from "./utils";

function generateTable(base, maxValue = 10) {
  const table = [];
  for (let i = 1; i <= maxValue; i++) {
    const question = {
      q: `${i} x ${base}`,
      answer: i * base,
      options: [i * base]
    };
    table.push(question);
  }
  return addRandomOptions({ table, total: 9, min: 1, max: 100 });
}

export const getTable = n => prepare(generateTable(parseInt(n, 10)));

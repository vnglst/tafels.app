import { shuffle, shuffleOptions, addRandomOptions } from "./utils";

const prepareTable = table =>
  shuffle(shuffleOptions(addRandomOptions(table, 9)));

function generateTable(base, maxValue = 10) {
  const table = [];
  for (let i = 1; i <= maxValue; i++) {
    const t = {
      q: `${i} x ${base}`,
      answer: i * base,
      options: [i * base]
    };
    table.push(t);
  }
  return table;
}

export const tables10 = prepareTable(generateTable(10));
export const tables9 = prepareTable(generateTable(9));
export const tables8 = prepareTable(generateTable(8));
export const tables7 = prepareTable(generateTable(7));
export const tables6 = prepareTable(generateTable(6));
export const tables5 = prepareTable(generateTable(5));
export const tables4 = prepareTable(generateTable(4));
export const tables3 = prepareTable(generateTable(3));
export const tables2 = prepareTable(generateTable(2));
export const tables1 = prepareTable(generateTable(1));

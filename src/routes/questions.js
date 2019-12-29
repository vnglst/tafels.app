import {
  shuffle,
  shuffleOptions,
  addRandomOptions,
  removeDups,
  rnd
} from "./utils";

const prepare = table => shuffleOptions(shuffle(table));

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
  return addRandomOptions({ table, total: 9 });
}

function generateAdditions(maxValue = 10, total = 10) {
  let table = [];

  while (table.length < total) {
    const i = rnd({ from: 1, to: maxValue - 1 });
    const j = rnd({ from: 1, to: maxValue - i });

    const question = {
      q: `${i} + ${j}`,
      answer: i + j,
      options: [i + j]
    };

    table.push(question);
    table = removeDups(table, "q");
  }

  const half = Math.floor(maxValue / 2);

  return addRandomOptions({
    table,
    total: 9,
    min: maxValue - half,
    max: maxValue + half
  });
}

export const tables10 = prepare(generateTable(5));
export const tables9 = prepare(generateTable(9));
export const tables8 = prepare(generateTable(8));
export const tables7 = prepare(generateTable(7));
export const tables6 = prepare(generateTable(6));
export const tables5 = prepare(generateTable(5));
export const tables4 = prepare(generateTable(4));
export const tables3 = prepare(generateTable(3));
export const tables2 = prepare(generateTable(2));
export const tables1 = prepare(generateTable(1));

export const adds10 = prepare(generateAdditions(10));
export const adds15 = prepare(generateAdditions(15));
export const adds20 = prepare(generateAdditions(20));
export const adds50 = prepare(generateAdditions(50));
export const adds100 = prepare(generateAdditions(100));
export const adds200 = prepare(generateAdditions(100));
export const adds500 = prepare(generateAdditions(500));
export const adds1000 = prepare(generateAdditions(1000));

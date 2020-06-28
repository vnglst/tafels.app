import {
  addRandomOptions,
  removeDups,
  rnd,
  generateChallenges,
} from "../utils";

function generateAddQuestions(maxValue = 10, total = 10) {
  let table = [];

  while (table.length < total) {
    const i = rnd({ from: 1, to: maxValue - 1 });
    const j = rnd({ from: 1, to: maxValue - i });

    const question = {
      q: `${i} + ${j}`,
      answer: i + j,
      options: [i + j],
    };

    table.push(question);
    table = removeDups(table, "q");
  }

  const half = Math.floor(maxValue / 2);

  return addRandomOptions({
    table,
    total: 9,
    min: half,
    max: 2 * maxValue,
  });
}

const getQuestions = (n) => generateAddQuestions(n);

const definition = {
  title: "Additions",
  category: "adds",
  slug: "add",
};

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
};

export const adds = {
  ...definition,
  initialState,
  challenges: generateChallenges({ initialState, definition, getQuestions }),
};

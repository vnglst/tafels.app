import { removeDups, rnd } from "../utils";
import { addRndOptions, generate } from "../question-utils";
import type { Question } from "../../types";

function generateAddQuestions(base = 10) {
  const TOTAL = 10;
  let table: Question[] = [];

  while (table.length < TOTAL) {
    const i = rnd({ from: 1, to: base - 1 });
    const j = rnd({ from: 1, to: base - i });

    const question = {
      q: `${i} + ${j}`,
      answer: i + j,
      options: [i + j],
    };

    table.push(question);
    table = removeDups(table, "q");
  }

  const half = Math.floor(base / 2);

  return addRndOptions({
    table,
    total: 9,
    min: half,
    max: 2 * base,
  });
}

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

export const adds = generate({
  initialState,
  definition,
  generateQuestions: generateAddQuestions,
});

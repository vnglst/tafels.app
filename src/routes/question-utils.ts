import { rnd } from "./utils";
import type { Question } from "../types";

type AddRndOptions = {
  table: Question[];
  total: number;
  min: number;
  max: number;
};

export function addRndOptions({ table, total, min, max }: AddRndOptions) {
  table.forEach((question) => {
    while (question.options.length < total) {
      const newOption = rnd({ from: min, to: max });
      const exists = question.options.find((option) => option === newOption);
      if (!exists) question.options.push(newOption);
    }
    question.options.sort((a, b) => a - b);
  });

  return table;
}

type Generate = {
  definition: {
    title: string;
    category: string;
    slug: string;
  };
  initialState: {
    [key: number]: {
      unlocked?: boolean;
      unlocks: number;
    };
  };
  generateQuestions: (base: number) => Question[];
};

export function generate({
  definition,
  initialState,
  generateQuestions,
}: Generate) {
  const challenges = {};
  for (const n in initialState) {
    challenges[n] = {
      ...definition,
      ...initialState[n],
      id: n,
      questions: generateQuestions(parseInt(n, 10)),
    };
  }

  return {
    ...definition,
    initialState,
    challenges,
  };
}

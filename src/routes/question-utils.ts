import { rnd } from "./utils";
import { Question } from "../types";

export function addRandomOptions({
  table,
  total,
  min,
  max,
}: {
  table: Question[];
  total: number;
  min: number;
  max: number;
}): Question[] {
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

interface Definition {
  title: string;
  category: string;
  slug: string;
}

interface InitialState {
  [key: number]: {
    unlocked?: boolean;
    unlocks: number;
  };
}

interface Generate {
  definition: Definition;
  initialState: InitialState;
  generateQuestions: (base: number) => Question[];
}

export interface Challenge extends Definition {
  id: string;
  questions: Question[];
  unlocked?: boolean;
  unlocks?: number;
}

interface ReturnType extends Definition {
  initialState: InitialState;
  challenges: {
    [key: number]: Challenge;
  };
}

export function generate({
  definition,
  initialState,
  generateQuestions,
}: Generate): ReturnType {
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

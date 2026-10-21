import { assign, fromCallback, setup } from "xstate";
import { getRndEl, removeIdxsFromArray, rnd } from "$lib/utils";
import { nock, squakk, yeah } from "$lib/helpers/soundFx";

type NumberType = { id: number; v: number };

type Event =
  | { type: "TOGGLE_INPUT"; value: number }
  | { type: "ADD_NUMBER" }
  | { type: "LOAD_HIGHSCORE" }
  | { type: "NEW_GAME" };

type Context = {
  highscore: number;
  score: number;
  level: number;
  numbers: NumberType[];
  inputs: (number | null)[];
};

const BASE_INTERVAL = 3000;
export const MAX_NUMBERS = 25;

const INITIAL_STATE: Context = {
  highscore: 0,
  score: 0,
  level: 1,
  numbers: [],
  inputs: [null, null, null, null],
};

// assign an incrementing id for animation keys
let uid = 1;

export const gameMachine = setup({
  types: {} as { context: Context; events: Event },
  actors: {
    ticker: fromCallback<Event, Context>(({ input, sendBack }) => {
      const interval = setInterval(() => {
        sendBack({ type: "ADD_NUMBER" });
      }, BASE_INTERVAL - input.score * 4);

      return () => clearInterval(interval);
    }),
  },
  actions: {
    setHighscore: ({ context }) => {
      if (typeof localStorage === "undefined") return;
      const highscore = Number(localStorage.getItem("highscore"));
      if (context.score > highscore)
        localStorage.setItem("highscore", context.score.toString());
    },
    loadHighscore: assign({
      highscore: () => {
        if (typeof localStorage === "undefined") return 0;
        return Number(localStorage.getItem("highscore"));
      },
    }),
    addNumber: assign({
      numbers: ({ context }) => {
        let n: NumberType;
        const [n1, idx1] = getRndEl(context.numbers);
        const [n2, idx2] = getRndEl(context.numbers);

        if (
          n1 === undefined ||
          n2 === undefined ||
          idx1 === idx2 ||
          n1.v > 10 ||
          n2.v > 10
        ) {
          n = { id: uid++, v: rnd({ from: 1, to: 9 }) };
        } else {
          n = { id: uid++, v: n1.v * n2.v };
        }

        return [...context.numbers, n];
      },
    }),
    toggleInput: assign({
      inputs: ({ context, event }) => {
        if (event.type !== "TOGGLE_INPUT") return;
        const existingIdx = context.inputs.findIndex(
          (input) => input === event.value
        );
        const newInputs = [...context.inputs];

        if (existingIdx > -1) {
          newInputs[existingIdx] = null;
        } else {
          const firstNull = context.inputs.findIndex((input) => input === null);
          newInputs[firstNull] = event.value;
          nock.play();
        }

        return newInputs;
      },
    }),
    handleCorrect: assign({
      numbers: ({ context }) => {
        const inputs = context.inputs;
        yeah.play();
        return removeIdxsFromArray(context.numbers, inputs);
      },
      inputs: () => [null, null, null, null],
      score: ({ context }) => {
        const outcome = context.numbers[context.inputs[2]].v;
        return context.score + outcome;
      },
    }),
    handleWrong: assign({
      inputs: () => {
        squakk.play();
        return [null, null, null, null];
      },
    }),
    newGame: assign({ ...INITIAL_STATE }),
  },
  guards: {
    isGameOver: ({ context }) => context.numbers.length >= MAX_NUMBERS,
    isCorrect: ({ context }) => {
      const [first, second, outcome] = context.inputs.map(
        (idx) => context.numbers[idx]
      );
      return first?.v * second?.v === outcome?.v;
    },
    isWrong: ({ context }) => {
      if (context.inputs[2] === null) return false;
      const [first, second, outcome] = context.inputs.map(
        (idx) => context.numbers[idx]
      );
      return first?.v * second?.v !== outcome?.v;
    },
  },
}).createMachine({
  initial: "playing",
  context: { ...INITIAL_STATE },
  states: {
    playing: {
      invoke: {
        src: "ticker",
        input: ({ context }) => context,
      },
      always: [
        {
          guard: "isGameOver",
          target: "gameover",
        },
        {
          guard: "isCorrect",
          target: "correct",
        },
        {
          guard: "isWrong",
          target: "wrong",
        },
      ],
      on: {
        LOAD_HIGHSCORE: {
          actions: "loadHighscore",
        },
        ADD_NUMBER: {
          actions: "addNumber",
        },
        TOGGLE_INPUT: {
          actions: "toggleInput",
        },
      },
    },
    correct: {
      after: {
        300: { actions: "handleCorrect", target: "playing" },
      },
    },
    wrong: {
      after: {
        300: { actions: "handleWrong", target: "playing" },
      },
    },
    gameover: {
      on: {
        NEW_GAME: {
          actions: ["newGame", "loadHighscore"],
          target: "playing",
        },
      },
      entry: "setHighscore",
    },
  },
});

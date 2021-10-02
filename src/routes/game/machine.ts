import { assign, createMachine } from "xstate";
import { getRndEl, removeIdxsFromArray, rnd } from "../utils";
import { nock, squakk, yeah } from "../../helpers/soundFx";

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

export const gameMachine = createMachine<Context, Event>(
  {
    initial: "playing",
    context: { ...INITIAL_STATE },
    states: {
      playing: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb("ADD_NUMBER");
            }, BASE_INTERVAL - context.score * 4);

            return () => {
              clearInterval(interval);
            };
          },
        },
        always: [
          {
            cond: "isGameOver",
            target: "gameover",
          },
          {
            cond: "isCorrect",
            target: "correct",
          },
          {
            cond: "isWrong",
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
  },
  {
    actions: {
      setHighscore: (context: Context) => {
        const highscore = Number(localStorage.getItem("highscore"));
        if (context.score > highscore)
          localStorage.setItem("highscore", context.score.toString());
      },
      loadHighscore: assign<Context>({
        highscore: () => Number(localStorage.getItem("highscore")),
      }),
      addNumber: assign<Context, Event>({
        numbers: (ctx) => {
          let n: NumberType;
          const [n1, idx1] = getRndEl(ctx.numbers);
          const [n2, idx2] = getRndEl(ctx.numbers);

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

          return [...ctx.numbers, n];
        },
      }),
      toggleInput: assign({
        inputs: (ctx, event) => {
          if (event.type !== "TOGGLE_INPUT") return;
          const existingIdx = ctx.inputs.findIndex(
            (input) => input === event.value
          );
          const newInputs = [...ctx.inputs];

          // if already active, deactivate
          if (existingIdx > -1) {
            newInputs[existingIdx] = null;
          } else {
            // else find first empty input field
            const firstNull = ctx.inputs.findIndex((input) => input === null);
            // make that active
            newInputs[firstNull] = event.value;
            nock.play();
          }

          return newInputs;
        },
      }),
      handleCorrect: assign({
        numbers: (ctx: Context) => {
          const inputs = ctx.inputs;
          yeah.play();
          return removeIdxsFromArray(ctx.numbers, inputs);
        },
        inputs: () => {
          return [null, null, null, null];
        },
        score: (ctx: Context) => {
          const outcome = ctx.numbers[ctx.inputs[2]].v;
          return ctx.score + outcome;
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
      isGameOver: ({ numbers }) => {
        return numbers.length >= MAX_NUMBERS;
      },
      isCorrect: ({ numbers, inputs }) => {
        const [first, second, outcome] = inputs.map((idx) => numbers[idx]);
        return first?.v * second?.v === outcome?.v;
      },
      isWrong: ({ numbers, inputs }) => {
        if (inputs[2] === null) return false;
        const [first, second, outcome] = inputs.map((idx) => numbers[idx]);
        return first?.v * second?.v !== outcome?.v;
      },
    },
  }
);

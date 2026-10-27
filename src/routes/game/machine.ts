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
const initialContext = (): Context => ({
  highscore: 0, score: 0, level: 1, numbers: [], inputs: [null, null, null, null],
});
let uid = 1;
const selected = ({ numbers, inputs }: Context) =>
  inputs.map((index) => index === null ? undefined : numbers[index]);

export const gameMachine = setup({
  types: { context: {} as Context, events: {} as Event },
  actors: {
    ticker: fromCallback<Event, { score: number }>(({ sendBack, input }) => {
      const interval = setInterval(() => sendBack({ type: "ADD_NUMBER" }),
        Math.max(100, BASE_INTERVAL - input.score * 4));
      return () => clearInterval(interval);
    }),
  },
  actions: {
    setHighscore: ({ context }) => {
      if (typeof localStorage === "undefined") return;
      if (context.score > Number(localStorage.getItem("highscore")))
        localStorage.setItem("highscore", context.score.toString());
    },
    loadHighscore: assign({
      highscore: () => typeof localStorage === "undefined" ? 0 : Number(localStorage.getItem("highscore")),
    }),
    addNumber: assign({
      numbers: ({ context }) => {
        const [n1, idx1] = getRndEl(context.numbers);
        const [n2, idx2] = getRndEl(context.numbers);
        const value = !n1 || !n2 || idx1 === idx2 || n1.v > 10 || n2.v > 10
          ? rnd({ from: 1, to: 9 }) : n1.v * n2.v;
        return [...context.numbers, { id: uid++, v: value }];
      },
    }),
    toggleInput: assign({
      inputs: ({ context, event }) => {
        if (event.type !== "TOGGLE_INPUT") return context.inputs;
        const next = [...context.inputs];
        const existing = next.indexOf(event.value);
        if (existing !== -1) next[existing] = null;
        else {
          const empty = next.indexOf(null);
          if (empty !== -1) next[empty] = event.value;
          nock.play();
        }
        return next;
      },
    }),
    handleCorrect: assign(({ context }) => {
      const outcome = selected(context)[2]!;
      yeah.play();
      return {
        numbers: removeIdxsFromArray(context.numbers, context.inputs),
        inputs: [null, null, null, null],
        score: context.score + outcome.v,
      };
    }),
    handleWrong: assign(() => {
      squakk.play();
      return { inputs: [null, null, null, null] };
    }),
    newGame: assign(() => initialContext()),
  },
  guards: {
    isGameOver: ({ context }) => context.numbers.length >= MAX_NUMBERS,
    isCorrect: ({ context }) => {
      const [first, second, outcome] = selected(context);
      return !!first && !!second && !!outcome && first.v * second.v === outcome.v;
    },
    isWrong: ({ context }) => {
      const [first, second, outcome] = selected(context);
      return !!first && !!second && !!outcome && first.v * second.v !== outcome.v;
    },
  },
}).createMachine({
  initial: "playing",
  context: initialContext,
  states: {
    playing: {
      invoke: { src: "ticker", input: ({ context }) => ({ score: context.score }) },
      always: [
        { guard: "isGameOver", target: "gameover" },
        { guard: "isCorrect", target: "correct" },
        { guard: "isWrong", target: "wrong" },
      ],
      on: {
        LOAD_HIGHSCORE: { actions: "loadHighscore" },
        ADD_NUMBER: { actions: "addNumber" },
        TOGGLE_INPUT: { actions: "toggleInput" },
      },
    },
    correct: { after: { 300: { actions: "handleCorrect", target: "playing" } } },
    wrong: { after: { 300: { actions: "handleWrong", target: "playing" } } },
    gameover: {
      entry: "setHighscore",
      on: { NEW_GAME: { actions: ["newGame", "loadHighscore"], target: "playing" } },
    },
  },
});

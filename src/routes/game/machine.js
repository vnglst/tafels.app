import { assign, createMachine } from "xstate";
import { getRndEl, rnd } from "../utils";
import { nock, squakk, yeah } from "../../helpers/soundFx";

const BASE_INTERVAL = 3000;
export const MAX_NUMBERS = 25;

const addNumber = assign({
  numbers: (ctx, event) => {
    const { value = 1 } = event;
    const toAdd = [];

    for (let i = 0; i < value; i++) {
      const [n1, idx1] = getRndEl(ctx.numbers);
      const [n2, idx2] = getRndEl(ctx.numbers);

      if (
        n1 === undefined ||
        n2 === undefined ||
        idx1 === idx2 ||
        n1 > 10 ||
        n2 > 10
      ) {
        toAdd.push(rnd({ from: 1, to: 9 }));
      } else {
        toAdd.push(n1 * n2);
      }
    }

    return [...ctx.numbers, ...toAdd];
  },
});

const toggleInput = assign({
  inputs: (ctx, event) => {
    const existingIdx = ctx.inputs.findIndex((input) => input === event.value);
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
});

const handleCorrect = assign({
  numbers: (ctx) => {
    const inputs = ctx.inputs;

    function removeIdxsFromArray(arr, idxs) {
      return arr.filter((_, i) => idxs.findIndex((idx) => idx === i) === -1);
    }

    yeah.play();

    return removeIdxsFromArray(ctx.numbers, inputs);
  },
  inputs: () => {
    return [null, null, null, null];
  },
  score: (ctx) => {
    const outcome = ctx.numbers[ctx.inputs[2]];
    return ctx.score + outcome;
  },
});

const handleWrong = assign({
  inputs: () => {
    squakk.play();
    return [null, null, null, null];
  },
});

// guards

const isGameOver = ({ numbers }) => {
  return numbers.length >= MAX_NUMBERS;
};

const isCorrect = ({ numbers, inputs }) => {
  const first = numbers[inputs[0]];
  const second = numbers[inputs[1]];
  const outcome = numbers[inputs[2]];
  return first * second === outcome;
};

const isWrong = ({ numbers, inputs }) => {
  if (inputs[2] === null) return false;

  const first = numbers[inputs[0]];
  const second = numbers[inputs[1]];
  const outcome = numbers[inputs[2]];

  return first * second !== outcome;
};

export const gameMachine = createMachine(
  {
    initial: "playing",
    context: {
      score: 0,
      level: 1,
      numbers: [5, 4, 16, 20, 3],
      inputs: [null, null, null, null],
    },
    states: {
      playing: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb("ADD_NUMBER");
            }, BASE_INTERVAL - context.score);

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
          ADD_NUMBER: {
            actions: "addNumber",
          },
          TOGGLE_INPUT: {
            actions: "toggleInput",
          },
        },
        states: {},
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
      gameover: {},
    },
  },
  {
    actions: {
      addNumber,
      toggleInput,
      handleCorrect,
      handleWrong,
    },
    guards: { isGameOver, isCorrect, isWrong },
  }
);

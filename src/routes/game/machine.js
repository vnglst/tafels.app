import { assign, createMachine } from "xstate";
import { nock, squakk, yeah } from "../../helpers/soundFx";

const addNumber = assign({
  numbers: (ctx, event) => {
    let { howMany = 1 } = event;
    let toAdd = [];

    for (let i = 0; i < howMany; i++) {
      toAdd.push(Math.floor(Math.random() * 9));
    }

    return [...ctx.numbers, ...toAdd];
  },
});

const toggleInput = assign({
  inputs: (ctx, event) => {
    const existingIdx = ctx.inputs.findIndex((input) => input === event.index);
    const newInputs = [...ctx.inputs];

    // if already active, deactivate
    if (existingIdx > -1) {
      newInputs[existingIdx] = null;
    } else {
      // else find first empty input field
      const firstNull = ctx.inputs.findIndex((input) => input === null);
      // make that active
      newInputs[firstNull] = event.index;
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
    const result = calcResult(ctx.numbers, ctx.inputs);
    return ctx.score + result;
  },
});

const handleWrong = assign({
  inputs: () => {
    squakk.play();
    return [null, null, null, null];
  },
});

const calcResult = (numbers, inputs) => {
  const idx1 = inputs[2];
  const idx2 = inputs[3];

  if (idx1 === null && idx2 === null) return null;

  const r1 = idx1 === null ? "" : numbers[idx1];
  const r2 = idx2 === null ? "" : numbers[idx2];

  return Number(`${r1}${r2}`);
};

export const resultSelector = ({ context }) =>
  calcResult(context.numbers, context.inputs);

// guards

const isGameOver = ({ numbers }) => {
  return numbers.length >= 20;
};

const isCorrect = ({ numbers, inputs }) => {
  const result = calcResult(numbers, inputs);
  if (result === null) return false;

  const first = numbers[inputs[0]];
  const second = numbers[inputs[1]];

  return first * second === result;
};

const isWrong = ({ numbers, inputs }) => {
  const result = calcResult(numbers, inputs);
  if (result === null) return false;

  const first = numbers[inputs[0]];
  const second = numbers[inputs[1]];

  return first * second > result;
};

export const gameMachine = createMachine(
  {
    initial: "playing",
    context: {
      score: 0,
      level: 1,
      numbers: [2, 6, 1, 2, 8, 0, 0],
      inputs: [null, null, null, null],
    },
    states: {
      playing: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb("ADD_NUMBER");
            }, 2500 - context.score);

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

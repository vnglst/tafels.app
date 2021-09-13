import { assign, createMachine } from "xstate";
import { getRndEl, rnd } from "../utils";
import { nock, squakk, yeah } from "../../helpers/soundFx";

const BASE_INTERVAL = 3000;
export const MAX_NUMBERS = 25;

const INITIAL_STATE = {
  score: 0,
  level: 1,
  numbers: [],
  inputs: [null, null, null, null],
};

const rndNumber = () => rnd({ from: 1, to: 9 });

let uid = 1;

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
        n1.v > 10 ||
        n2.v > 10
      ) {
        toAdd.push({ id: uid++, v: rndNumber() });
      } else {
        toAdd.push({ id: uid++, v: n1.v * n2.v });
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
    const outcome = ctx.numbers[ctx.inputs[2]].v;
    return ctx.score + outcome;
  },
});

const handleWrong = assign({
  inputs: () => {
    squakk.play();
    return [null, null, null, null];
  },
});

const newGame = assign({ ...INITIAL_STATE });

// guards

const isGameOver = ({ numbers }) => {
  return numbers.length >= MAX_NUMBERS;
};

const isCorrect = ({ numbers, inputs }) => {
  const [first, second, outcome] = inputs.map((idx) => numbers[idx]);
  return first?.v * second?.v === outcome?.v;
};

const isWrong = ({ numbers, inputs }) => {
  if (inputs[2] === null) return false;

  const [first, second, outcome] = inputs.map((idx) => numbers[idx]);
  return first?.v * second?.v !== outcome?.v;
};

export const gameMachine = createMachine(
  {
    initial: "playing",
    context: {
      ...INITIAL_STATE,
    },
    states: {
      playing: {
        invoke: {
          src: (context) => (cb) => {
            const interval = setInterval(() => {
              cb("ADD_NUMBER");
            }, BASE_INTERVAL - context.score * 5);

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
      gameover: {
        on: {
          NEW_GAME: {
            actions: "newGame",
            target: "playing",
          },
        },
      },
    },
  },
  {
    actions: {
      addNumber,
      toggleInput,
      handleCorrect,
      handleWrong,
      newGame,
    },
    guards: { isGameOver, isCorrect, isWrong },
  }
);

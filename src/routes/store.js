import { writable } from "svelte/store";

const rnd = ({ from = 0, to = 1 }) => {
  const diff = to - from;
  const rnd = Math.random() * diff + from;
  return Math.round(rnd);
};

const shuffle = arr => arr.sort(() => Math.random() - 0.5);

const getChoices = ({ total, expected }) => {
  const RANGE = 10;
  const min = Math.max(expected - RANGE, 0);
  const max = expected + RANGE;

  const choices = [expected];

  while (choices.length < total) {
    const newChoice = rnd({ from: min, to: max });
    const exists = choices.find(choice => choice === newChoice);
    if (!exists) choices.push(newChoice);
  }

  return shuffle(choices);
};

const newGame = (initialScore = 0) => {
  const n1 = rnd({ from: 1, to: 10 });
  const n2 = rnd({ from: 1, to: 10 });
  const expected = n1 * n2;
  return {
    score: initialScore,
    n1,
    n2,
    expected,
    choices: getChoices({ total: 9, expected }),
    grid: []
  };
};

function createGame() {
  const KEY = "tafels-app";

  const initialState = newGame();
  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    correct: id =>
      update(state => {
        state.grid[id] = "correct";
        state.score = state.score + 1;
        return state;
      }),
    wrong: id =>
      update(state => {
        state.grid[id] = "wrong";
        state.score = Math.max(0, state.score - 1);
        return state;
      }),
    reset: () => update(state => newGame(state.score))
    // useLocalStorage: () => {
    //   // skip localstorage for SSR
    //   if (!process.browser) return;
    //   const json = localStorage.getItem(KEY);
    //   if (json) {
    //     set(JSON.parse(json));
    //   }

    //   subscribe(current => {
    //     localStorage.setItem(KEY, JSON.stringify(current));
    //   });
    // }
  };
}

export const game = createGame();

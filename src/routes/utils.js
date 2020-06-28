export const rnd = ({ from = 0, to = 1 }) => {
  const diff = to - from;
  const rnd = Math.random() * diff + from;
  return Math.round(rnd);
};

export const shuffle = (arr) => {
  return arr.sort(() => Math.random() - 0.5);
};

export function addRandomOptions({ table, total, min, max }) {
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

export function removeDups(arr, property) {
  const newArray = [];
  const lookupObject = {};

  for (let i in arr) {
    lookupObject[arr[i][property]] = arr[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export function generateChallenges({ initialState, definition, getQuestions }) {
  let challenges = {};
  for (let n in initialState) {
    challenges[n] = {
      ...definition,
      ...initialState[n],
      getQuestions,
      id: n,
      questions: getQuestions(n),
    };
  }
  return challenges;
}

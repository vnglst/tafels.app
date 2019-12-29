export const rnd = ({ from = 0, to = 1 }) => {
  const diff = to - from;
  const rnd = Math.random() * diff + from;
  return Math.round(rnd);
};

export const shuffle = arr => arr.sort(() => Math.random() - 0.5);

export function shuffleOptions(table) {
  table.forEach(question => {
    question.options = shuffle(question.options);
  });
  return table;
}

export function addRandomOptions({ table, total, min = 1, max = 100 }) {
  table.forEach(question => {
    const newOptions = generateMoreOptions({
      total,
      existing: question.options,
      min,
      max
    });
    question.options = newOptions;
  });
  return table;
}

export function generateMoreOptions({ total, existing, min, max }) {
  const choices = [...existing];

  while (choices.length < total) {
    const newChoice = rnd({ from: min, to: max });
    const exists = choices.find(choice => choice === newChoice);
    if (!exists) choices.push(newChoice);
  }

  return choices;
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

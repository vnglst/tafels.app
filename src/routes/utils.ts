export const rnd = ({ from = 0, to = 1 }) => {
  const diff = to - from;
  const rnd = Math.random() * diff + from;
  return Math.round(rnd);
};

export const shuffle = <T>(arr: T[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

export function removeDups<T>(arr: T[], property: string) {
  const newArray: T[] = [];
  const lookupObject = {};

  for (let i in arr) {
    lookupObject[arr[i][property]] = arr[i];
  }

  for (let i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

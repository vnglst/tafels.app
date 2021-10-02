export const rnd = ({
  from = 0,
  to = 1,
}: {
  from: number;
  to: number;
}): number => {
  const diff = to - from;
  const rnd = Math.random() * diff + from;
  return Math.round(rnd);
};

export const shuffle = <T>(arr: T[]): T[] => {
  return arr.sort(() => Math.random() - 0.5);
};

export function removeDups<T>(arr: T[], property: string): T[] {
  const newArray: T[] = [];
  const lookupObject = {};

  for (const i in arr) {
    lookupObject[arr[i][property]] = arr[i];
  }

  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

export const getRndEl = <T>(arr: T[]): [T, number] => {
  const rndIdx = Math.floor(Math.random() * arr.length);
  return [arr[rndIdx], rndIdx];
};

export const removeIdxsFromArray = <T>(arr: T[], idxs: number[]): T[] => {
  return arr.filter((_, i) => idxs.findIndex((idx) => idx === i) === -1);
};

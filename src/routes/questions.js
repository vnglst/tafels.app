import { shuffle, shuffleOptions, addRandomOptions } from "./utils";

const prepareTable = table =>
  shuffle(shuffleOptions(addRandomOptions(table, 9)));

export const tables10 = prepareTable([
  { q: "1 x 10", answer: "10", options: ["10", "100", "1", "11"] },
  { q: "2 x 10", answer: "20", options: ["20", "200", "2", "22"] },
  { q: "3 x 10", answer: "30", options: ["30", "300", "3", "33"] },
  { q: "4 x 10", answer: "40", options: ["40", "400", "4", "44"] },
  { q: "5 x 10", answer: "50", options: ["50", "500", "5", "55"] },
  { q: "6 x 10", answer: "60", options: ["60", "600", "6", "66"] },
  { q: "7 x 10", answer: "70", options: ["70", "700", "7", "77"] },
  { q: "8 x 10", answer: "80", options: ["80", "800", "8", "88"] },
  { q: "9 x 10", answer: "90", options: ["90", "900", "9", "99"] },
  { q: "10 x 10", answer: "100", options: ["100", "1000", "1", "111"] }
]);

export const tables9 = prepareTable([
  { q: "1 x 9", answer: "9", options: ["9", "90", "1", "99"] },
  { q: "2 x 9", answer: "18", options: ["18", "81", "28", "29"] },
  { q: "3 x 9", answer: "27", options: ["27", "300", "3", "33"] },
  { q: "4 x 9", answer: "36", options: ["36", "400", "4", "44"] },
  { q: "5 x 9", answer: "45", options: ["45", "500", "5", "55"] },
  { q: "6 x 9", answer: "54", options: ["54", "600", "6", "66"] },
  { q: "7 x 9", answer: "63", options: ["63", "700", "7", "77"] },
  { q: "8 x 9", answer: "72", options: ["72", "800", "8", "88"] },
  { q: "9 x 9", answer: "81", options: ["81", "900", "9", "99"] },
  { q: "10 x 9", answer: "100", options: ["100", "1000", "1", "111"] }
]);
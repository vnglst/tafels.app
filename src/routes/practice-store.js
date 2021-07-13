import { writable } from "svelte/store";
import { useLocalStorage } from "./store-hooks";
import { removeDups } from "./utils";

const initialState = {
  today: [],
  someday: [],
};

function createStore() {
  const KEY = "tafels-app-practice";
  const { subscribe, update } = writable(initialState);
  useLocalStorage({ subscribe, update, key: KEY });

  return {
    subscribe,
    add: (question) => {
      update((state) => {
        question.mistakes = question.mistakes ? question.mistakes + 1 : 1;
        question.lastTry = new Date();
        question.interval = 1;
        state.today.push(question);
        state.today = removeDups(state.today, "q");
        return state;
      });
    },
    practiced: (question) => {
      update((state) => {
        question.lastTry = new Date();
        question.interval *= 2;
        state.someday.push(question);
        state.someday = removeDups(state.someday, "q");
        state.today = state.today.filter((qst) => qst.q !== question.q);
        return state;
      });
    },
    sync: () => {
      update((state) => {
        state.someday.forEach((question) => {
          const now = new Date().getTime();
          const intervalInMs = question.interval * 12 * 60 * 60 * 1000; // 12 hours
          const lastTry = new Date(question.lastTry).getTime();
          if (now > lastTry + intervalInMs) state.today.push(question);
          state.today = removeDups(state.today, "q");
        });
        return state;
      });
    },
  };
}

export const practiceStore = createStore();

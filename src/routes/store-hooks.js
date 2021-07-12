import merge from "lodash.merge";

export function useLocalStorage({ update, subscribe, key }) {
  // skip localstorage for SSR
  if (!process.browser) return;
  const json = localStorage.getItem(key);
  if (json) {
    const stored = JSON.parse(json);

    update((state) => {
      const merged = merge(state, stored);
      return merged;
    });
  }
  subscribe((state) => {
    if (state) localStorage.setItem(key, JSON.stringify(state));
  });
}

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({ pages: 'dist', assets: 'dist', strict: true }),
    prerender: { entries: ['/', '/account', '/game', '/practice/today',
      ...[1, 10, 2, 5, 3, 4, 6, 7, 8, 9, 11, 20].map(n => `/table/${n}`),
      ...['add', 'subtract'].flatMap(category =>
        [10, 15, 20, 25, 50, 75, 100, 200, 250, 500, 750, 999].map(n => `/${category}/${n}`))
    ] }
  }
};

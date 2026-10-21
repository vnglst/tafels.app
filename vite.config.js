import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sveltekit({
      adapter: adapter({
        out: "build",
      }),
      alias: {
        "$lib": "src/lib",
      },
      preprocess: vitePreprocess(),
    }),
  ],
  server: {
    port: 3000,
  },
});

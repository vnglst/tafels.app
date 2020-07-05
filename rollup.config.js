import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import svelte from "rollup-plugin-svelte";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import config from "sapper/config/rollup.js";
import pkg from "./package.json";
import childProcess from "child_process";

const commitHash = childProcess
  .execSync('git log --pretty=format:"%h" -n1')
  .toString()
  .trim();

const mode = process.env.NODE_ENV;
const dev = mode === "development";
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

const onwarn = (warning, onwarn) =>
  (warning.code === "CIRCULAR_DEPENDENCY" &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning);
const dedupe = (importee) =>
  importee === "svelte" || importee.startsWith("svelte/");

const vars = {
  "process.env.NODE_ENV": JSON.stringify(mode),
  "process.env.COMMIT_HASH": JSON.stringify(commitHash),
  "process.env.APP_VERSION": JSON.stringify(pkg.version),
};

console.log("Building with following vars", vars);

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        "process.browser": true,
        ...vars,
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: sveltePreprocess(),
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      typescript(),
      commonjs(),

      legacy &&
        babel({
          extensions: [".js", ".mjs", ".html", ".svelte"],
          runtimeHelpers: "runtime",
          exclude: ["node_modules/@babel/**"],
          presets: [
            [
              "@babel/preset-env",
              {
                targets: "> 0.25%, not dead",
              },
            ],
          ],
          plugins: [
            "@babel/plugin-syntax-dynamic-import",
            [
              "@babel/plugin-transform-runtime",
              {
                useESModules: true,
              },
            ],
          ],
        }),

      !dev &&
        terser({
          module: true,
        }),
    ],
    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        "process.browser": false,
        ...vars,
      }),
      svelte({
        generate: "ssr",
        dev,
        preprocess: sveltePreprocess(),
      }),
      resolve({
        dedupe,
      }),
      commonjs(),
      typescript(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require("module").builtinModules ||
        Object.keys(process.binding("natives"))
    ),
    onwarn,
  },
};

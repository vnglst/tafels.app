# Tafels.App

A simple game to teach kids basic math (multiplication tables, additions, etc.)

Made with:

- `svelte` and `SvelteKit`🎆
- nice animations and page transitions 🍡
- web Audio with Howler 🎺
- UI + colors based on book Refactoring UI 🎉
- the avatars are from <a href="https://bigheads.io" target="_blank">bigheads.io</a> made by <a href="https://twitter.com/robertbrosma">@robertbrosma</a>

## Development

```sh
npm ci --legacy-peer-deps
npm run dev
```

## Static export and release

```sh
npm ci --legacy-peer-deps
npm run check
npm run export
npm run preview
```

Commit `dist/` together with source and lockfile changes. It contains 40 finite
HTML route shells and all local assets. Svelte runs in the browser, retaining
account name, unlocked exercises, highscore and daily practice in the existing
localStorage keys. Avatars use the same seeded options in the browser; no
`/bigheads` endpoint or Node server is required.

The `vnglst/static-sites` hosting repository fetches a pinned source commit and
copies only `dist/`. A source push does not publish it: update the pin there and
deploy the shared host. Keep the production hostname unchanged to retain
browser-local progress. The Dockerfile can also serve the committed export
with Nginx; it does not install dependencies or build the application.

Serve extensionless routes with `try_files $uri $uri.html $uri/ =404`.
`/_app/immutable/` files may be cached immutably; HTML, manifest and unhashed
assets must be revalidated. Unknown routes and missing assets must return 404.

Before release, verify avatar/name persistence, direct visits and refresh on
`/table/1`, `/add/10`, `/subtract/10`, `/account`, `/game` and `/practice/today`;
complete an exercise, check unlocking survives reload, record/practice a wrong
answer, check the game timer and sound, and verify a missing route returns 404.
The 36 exercise routes are enumerated in `svelte.config.js`; keep that list in
sync when adding challenges.

## Verification

```sh
npm ci --legacy-peer-deps
npm run check
npm run export
npm run test:export
npx playwright install chromium firefox webkit
npm run test:e2e
```

`test:export` checks the 40 HTML shells, local asset references, manifest icons
and sound files in `dist/`. Browser tests cover exercises, unlocking, practice,
timeouts, arcade scoring/restart, touch, navigation, saved names and avatars.
To test the committed export through Nginx, build and run the Dockerfile on a
local port, then set `TEST_BASE_URL` to that server when running `test:e2e`.

Security updates stay on SvelteKit 2, Svelte 5 and Vite 6. `npm audit` retains
four low findings: SvelteKit enhanced forms/untrusted prerender cache headers
(features this app does not use), its build-time cookie dependency, and
build-tool deepmerge. The deployed export has no Node server or cookies API.
Shared hosting serves only `dist/`; updating this repository does not deploy it.

## Credits

- Sound files (squakk + nock + restart): https://freesound.org/people/yawfle/packs/367/
- Sound file HooYeah by LemonJolly: https://freesound.org/people/lemonjolly/sounds/273925/
- Icons: Refactoring UI

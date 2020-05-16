# Tafels.App

A simple game to teach kids basic math (multiplication tables, additions, etc.)

Made with:

- `svelte` and `sapper`🎆
- nice animations and page transitions 🍡
- service workers 🌐
- web Audio with Howler 🎺
- UI + colors based on book Refactoring UI 🎉

## Development

```sh
yarn dev
```

## Build

```sh
yarn export
```

## Deploy

```sh
git push # 😸
```

## Conclusions about sapper and svelte

Needs some polishing here and there (lots of bug fixes with every new version) but in general it's pretty cool. Less code & a faster user experience. Built-in animations are a big win (always a pain with React) and the routing solution that sappers offers (also for SPA's) is a godsend compared to React Router.

Still figering out svelte's state management solution, which is an improvement on Redux, but I also ran into some gotcha's.

## PWA tips

- Tried using pwacompat but it wasn't doing anything for me on iOS/Safari. Also: I did not like the idea of using JavaScript to fix issues that can also be manually fixed by adding the correct icons. That's something you'd have to do 1 time for you app using a tool like: https://app-manifest.firebaseapp.com/.

## Credits

- Sound files (squakk + nock + restart): https://freesound.org/people/yawfle/packs/367/
- Sound file HooYeah by LemonJolly: https://freesound.org/people/lemonjolly/sounds/273925/
- Icons: Refactoring UI

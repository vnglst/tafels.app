module.exports = {
  globDirectory: "__sapper__/export",
  globPatterns: ["**/*.{css,js,png,html,json,svg}"],
  swDest: "__sapper__/export/service-worker.js",
  swSrc: "src/service-worker.js",
};

/** this is perfectly acceptable and FAST server side rendering */
module.exports = function render({ count }) {
  return `<!doctype html>
  <html>
  <body>
  <form method=post action=/count>
    <button>Count ${count}</button>
  </form>
  <form method=post action=/reset>
    <button>Reset</button>
  </form>
  </body>
  </html>
      `
}

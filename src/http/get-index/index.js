let arc = require('@architect/functions')
let render = require('./render')

async function home(req) {
  let count = req.session.count || 0
  return {
    html: render({ count }),
  }
}

exports.handler = arc.http.async(home)

let arc = require('@architect/functions')

async function reset(req) {
  return {
    session: {},
    location: '/',
  }
}

exports.handler = arc.http.async(reset)

let arc = require('@architect/functions')

async function counter(req) {
  let count = (req.session.count || 0) + 1
  return {
    session: { count },
    location: '/',
  }
}

exports.handler = arc.http.async(counter)

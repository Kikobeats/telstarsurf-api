'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    all: client.bind(client, {path: 'windsurf-sails'}),
    used: client.bind(client, {path: 'windsurf-sails/used-sails'})
  }

  return client
}

module.exports = createClient

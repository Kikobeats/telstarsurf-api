'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.sails = {
    all: client.bind(client, {path: 'windsurf-sails'}),
    wave: client.bind(client, {path: 'windsurf-sails/wave-sails'}),
    freestyle: client.bind(client, {path: 'windsurf-sails/freestyle-sails'}),
    freeride: client.bind(client, {path: 'windsurf-sails/freeride-sails'}),
    freerace: client.bind(client, {path: 'windsurf-sails/freerace-sails'}),
    slalom: client.bind(client, {path: 'windsurf-sails/race-slalom-sails'}),
    used: client.bind(client, {path: 'windsurf-sails/used-sails'})
  }

  client.boards = {
    all: client.bind(client, {path: 'windsurfboards'}),
    wave: client.bind(client, {path: 'windsurfboards/wave-boards'}),
    freestyle: client.bind(client, {path: 'windsurfboards/freestyle-boards'}),
    freeride: client.bind(client, {path: 'windsurfboards/freeride-boards'}),
    freerace: client.bind(client, {path: 'windsurfboards/freerace-boards'}),
    slalom: client.bind(client, {path: 'windsurfboards/race-slalom-boards'}),
    used: client.bind(client, {path: 'windsurfboards/used-windsurfboards'})
  }

  client.masts = {
    rdm: client.bind(client, {path: 'windsurfmasts/sdm-windsurfmasts'}),
    sdm: client.bind(client, {path: 'windsurfmasts/rdm-windsurfmasts'})
  }

  client.booms = {
    aluminum: client.bind(client, {path: 'windsurf-booms/aluminum-booms'}),
    carbon: client.bind(client, {path: 'windsurf-booms/carbon-booms'})
  }

  client.fins = {
    wave: client.bind(client, {path: 'windsurf-fins/wave-freestyle-fins'}),
    freeride: client.bind(client, {path: 'windsurf-fins/freeride-fins'}),
    slalom: client.bind(client, {path: 'windsurf-fins/slalom-race-fins'})
  }

  return client
}

module.exports = createClient

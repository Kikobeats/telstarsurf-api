'use strict'

const url = require('url')
const reduce = require('lodash.reduce')

const createNormalizePrice = require('./create-normalize-price')
const CONSTANTS = require('../constants')

const transform = {
  newPrice: createNormalizePrice('newPrice'),
  oldPrice: createNormalizePrice('oldPrice'),
  rawPrice: createNormalizePrice('rawPrice'),
  link: (item) => {
    const {link} = item
    const {URL} = CONSTANTS
    return url.resolve(URL, link)
  }
}

function normalize (item) {
  const normalizedItem = reduce(transform, function (acc, value, key) {
    const fn = transform[key]
    if (item[key]) acc[key] = fn(item)
    return acc
  }, {})
  return Object.assign({}, item, normalizedItem)
}

module.exports = normalize

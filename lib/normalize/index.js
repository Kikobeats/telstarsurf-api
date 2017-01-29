'use strict'

const url = require('url')

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
  Object.keys(transform).forEach(function (key) {
    const fn = transform[key]
    if (item[key]) item[key] = fn(item)
  })

  return item
}

module.exports = normalize

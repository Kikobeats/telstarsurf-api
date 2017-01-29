'use strict'

const reduce = require('lodash.reduce')
const normalize = require('./normalize')

function getPrice (item) {
  const {rawPrice, newPrice} = item
  return newPrice || rawPrice
}

function getItem (item, size) {
  const normalizedItem = normalize(item)
  const {image, link, name, brand} = normalizedItem
  const price = getPrice(normalizedItem)

  // clean duplicate size from title
  const model = name.replace(size, '')
  const title = `${brand} ${model} ${size} €${price}`

  return {
    title,
    price,
    name,
    brand,
    image,
    link,
    size
  }
}

function getItems (collection) {
  const items = reduce(collection, function (acc, item) {
    item.sizes.forEach(function (size) {
      const newItem = getItem(item, size)
      acc.push(newItem)
    })
    return acc
  }, [])

  return items
}
module.exports = getItems
module.exports.getItems = getItems
module.exports.getItem = getItem

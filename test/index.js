'use strict'

const isAbsoluteUrl = require('is-absolute-url')
const find = require('lodash.find')
const should = require('should')

const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

describe('telstarsurf-api', function () {
  const client = createClient({
    key: process.env.API_KEY,
    itemsPerPage: 400,
    pages: 1
  })

  const stream = client.boards.all()
  let count = 0
  let buffer = []

  it('fetch data', function (done) {
    stream.on('data', function (item) {
      log(++count, item)
      buffer.push(item)
    })

    stream.on('error', done)

    stream.on('end', function () {
      should(count > 1).be.true()

      const item = find(buffer, 'brand')
      should(item).be.an.Object()

      describe('url', function () {
        ;[
          'link',
          'image'
        ].forEach(function (prop) {
          it(prop, () => should(isAbsoluteUrl(item[prop])).be.true())
        })
      })

      describe('rest of props', function () {
        it('size', () => should(item.size).be.an.String())
        it('brand', () => should(item.brand).be.an.String())
        it('name', () => should(item.name).be.an.String())
        it('price', () => should(item.price).be.a.Number())
      })

      done()
    })
  })
})

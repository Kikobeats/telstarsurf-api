'use strict'

const isAbsoluteUrl = require('is-absolute-url')
const find = require('lodash.find')
require('should')

const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

describe('telstarsurf-api', function () {
  const client = createClient({
    key: process.env.API_KEY,
    itemsPerPage: 20
  })

  const stream = client.sails.used()
  let count = 0
  let buffer = []

  it('fetch data', function (done) {
    stream.on('data', function (item) {
      log(++count, item)
      buffer.push(item)
    })

    stream.on('error', done)

    stream.on('end', function () {
      (count > 1).should.be.true()

      const item = find(buffer, 'newPrice')

      item.should.be.an.Object()

      describe('price', function () {
        ;[
          'rawPrice',
          'newPrice',
          'oldPrice'
        ].forEach(function (prop) {
          it(prop, () => item[prop].should.be.a.Number())
        })
      })

      describe('url', function () {
        ;[
          'link',
          'image'
        ].forEach(function (prop) {
          it(prop, () => isAbsoluteUrl(item[prop]).should.be.true())
        })
      })

      describe('rest of props', function () {
        it('size', () => item.size.should.be.an.Array())
        it('brand', () => item.brand.should.be.an.String())
        it('name', () => item.name.should.be.an.String())
      })

      done()
    })
  })
})

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
      (count > 1).should.be.true()

      const item = find(buffer, 'brand')
      item.should.be.an.Object()

      describe('url', function () {
        ;[
          'link',
          'image'
        ].forEach(function (prop) {
          it(prop, () => isAbsoluteUrl(item[prop]).should.be.true())
        })
      })

      describe('rest of props', function () {
        it('size', () => item.size.should.be.an.String())
        it('brand', () => item.brand.should.be.an.String())
        it('name', () => item.name.should.be.an.String())
        it('price', () => item.price.should.be.a.Number())
      })

      done()
    })
  })
})

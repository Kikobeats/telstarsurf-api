'use strict'

const should = require('should')
const {getItem, getItems} = require('../lib/mapper')

function getFixture () {
  return [{
    name: 'E-TYPE',
    brand: 'NORTHSAILS',
    link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
    image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
    rawPrice: '€ 499,95',
    oldPrice: '€ 499,95',
    newPrice: '€ 399,95',
    sizes: [ '7.3', '8.2' ]
  }]
}

function getFixtureWithNoSize () {
  return [{
    name: 'E-TYPE',
    brand: 'NORTHSAILS',
    link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
    image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
    rawPrice: '€ 499,95',
    oldPrice: '€ 499,95',
    newPrice: '€ 399,95',
    sizes: null
  }]
}

describe('telstarsurf-api » mapper', function () {
  describe('.getItem', function () {
    it('get item based on a size', function () {
      const fixture = getFixture()[0]
      const size = fixture.sizes[0]
      const item = getItem(fixture, size)

      should(item).be.eql({
        name: 'E-TYPE',
        title: 'NORTHSAILS E-TYPE 7.3 €399',
        brand: 'NORTHSAILS',
        link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
        image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
        price: 399,
        size: '7.3'
      })
    })
  })

  describe('.getItems', function () {
    it('get items based on the size field', function () {
      const fixture = getFixture()
      const items = getItems(fixture)

      should(items).be.eql([
        {
          name: 'E-TYPE',
          title: 'NORTHSAILS E-TYPE 7.3 €399',
          brand: 'NORTHSAILS',
          link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
          image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
          price: 399,
          size: '7.3'
        },
        {
          name: 'E-TYPE',
          title: 'NORTHSAILS E-TYPE 8.2 €399',
          brand: 'NORTHSAILS',
          link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
          image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
          price: 399,
          size: '8.2'
        }
      ])
    })

    it('avoid items without size', function () {
      const fixture = getFixture().concat(getFixtureWithNoSize())
      const items = getItems(fixture)

      should(items).be.eql([
        {
          name: 'E-TYPE',
          title: 'NORTHSAILS E-TYPE 7.3 €399',
          brand: 'NORTHSAILS',
          link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
          image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
          price: 399,
          size: '7.3'
        },
        {
          name: 'E-TYPE',
          title: 'NORTHSAILS E-TYPE 8.2 €399',
          brand: 'NORTHSAILS',
          link: 'http://www.telstarsurf.com/windsurf/windsurf-sails/used-sails/54235/northsails-e-type/',
          image: 'http://www.telstarsurf.com/cache/img/788690b3da56/500/500/max/max/e-type.jpeg',
          price: 399,
          size: '8.2'
        }
      ])
    })
  })
})

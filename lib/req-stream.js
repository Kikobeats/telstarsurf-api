'use strict'

const from = require('from2').obj
const got = require('got')

const CONST = require('./constants')
const mapper = require('./mapper')

const fetch = (opts) => got.get(CONST.ENDPOINT, opts)

const DEFAULT = {
  itemsPerPage: 9999,
  pages: Infinity
}

function createStream (opts) {
  const {
    key: wrapAPIKey,
    itemsPerPage = DEFAULT.itemsPerPage,
    pages = DEFAULT.pages
  } = opts

  function reqStream (query) {
    Object.assign(query, {itemsPerPage, wrapAPIKey, page: 1})
    const fetchOpts = {json: true, query}

    let lastPageSize = itemsPerPage

    const hasPagesToFetch = () => {
      const {page: currentPage} = query
      return (currentPage - 1 < pages) && (lastPageSize === itemsPerPage)
    }

    const stream = from(function (size, next) {
      if (!hasPagesToFetch()) return next(null, null)

      fetch(fetchOpts)
        .then(res => {
          const {body} = res

          if (!body.success) {
            // this case control when you want to fetch the follow
            // page but it doesn't exist. You need to close the
            // stream gracefully if previous pages was fetched.
            const err = query.page > 1 ? null : body.messages
            return next(err, null)
          }

          ++query.page
          // Page is fetched without items
          const rawItems = body.data.items
          lastPageSize = rawItems.length

          if (!lastPageSize) return

          const items = mapper(rawItems)
          const lastItem = items.pop()
          items.forEach(item => this.push(item))
          next(null, lastItem)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream

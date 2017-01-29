# telstarsurf-api

![Last version](https://img.shields.io/github/tag/Kikobeats/telstarsurf-api.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/telstarsurf-api/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/telstarsurf-api)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/telstarsurf-api.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/telstarsurf-api)
[![Dependency status](http://img.shields.io/david/Kikobeats/telstarsurf-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/telstarsurf-api)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/telstarsurf-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/telstarsurf-api#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/telstarsurf-api.svg?style=flat-square)](https://www.npmjs.org/package/telstarsurf-api)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Programatic API access for telstarsurf.com

## Install

```bash
$ npm install telstarsurf-api --save
```

## Usage

```js
const telstarsurf = require('telstarsurf-api')

const stream = telstarsurf({
  key: process.env.API_KEY, // API Key credentials
  pages: 3, // Numbers or request per each method call [default=Infinity]
  itemsPerPage: 20 // Number of items per page [default=200]
})
```

## License

MIT © [Kiko Beats](http://kikobeats.com)

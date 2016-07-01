# koa-stylus-parser

[![Build Status](https://travis-ci.org/vicanso/koa-stylus-parser.svg?style=flat-square)](https://travis-ci.org/vicanso/koa-stylus-parser)
[![Coverage Status](https://img.shields.io/coveralls/vicanso/koa-stylus-parser/master.svg?style=flat)](https://coveralls.io/r/vicanso/koa-stylus-parser?branch=master)
[![npm](http://img.shields.io/npm/v/koa-stylus-parser.svg?style=flat-square)](https://www.npmjs.org/package/koa-stylus-parser)
[![Github Releases](https://img.shields.io/npm/dm/koa-stylus-parser.svg?style=flat-square)](https://github.com/vicanso/koa-stylus-parser)

Stylus parser middleware for Koa. It is useful for development.

### Installation

```js
$ npm install koa-stylus-parser
```

## Examples

  View the [./examples](examples) directory for working examples.


### API

```js
const parser = require('koa-stylus-parser');
const Koa = require('koa');
const app = new Koa();
app.use(parser(path.join(__dirname, '../assets'), {
  'include css': true,
  }));

app.listen(8080);
```

- `assetsPath` the assets path

- `options` the options for stylus


## License

MIT
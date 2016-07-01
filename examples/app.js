'use strict';
const Koa = require('koa');
const stylusParser = require('..')
const path = require('path');
const app = new Koa();
app.use(stylusParser(path.join(__dirname, '../assets'), {
  'include css': true,
}));

app.listen(3000);
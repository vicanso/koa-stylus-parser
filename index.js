'use strict';
const path = require('path');
const fs = require('fs');
const stylus = require('stylus');
const nib = require('nib');
/**
 * [readFile description]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
}

/**
 * [parser description]
 * @param  {[type]} rootPath [description]
 * @param  {[type]} options  [description]
 * @return {[type]}          [description]
 */
function parser(rootPath, options) {
  return (ctx, next) => {
    const ext = path.extname(ctx.path);
    if (ext !== '.css') {
      return next();
    }
    const file = path.join(rootPath, ctx.path).replace('.css', '.styl');
    return new Promise((resolve, reject) => {
      readFile(file).then(buf => {
        const stylRender = stylus(buf.toString());
        if (options) {
          for (const k of Object.keys(options)) {
            stylRender.set(k, options[k]);
          }
        }
        stylRender.set('filename', file)
        .use(nib())
        .render((err, css) => {
          /* istanbul ignore if */
          if (err) {
            reject(err);
          } else {
            /* eslint no-param-reassign:0 */
            ctx.set('Content-Type', 'text/css; charset=UTF-8');
            ctx.body = css;
            resolve();
          }
        });
      }).catch(() => {
        resolve(next());
      });
    });
  };
}

module.exports = parser;

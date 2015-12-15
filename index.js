'use strict';
const path = require('path');
const fs = require('fs');
const stylus = require('stylus');
const nib = require('nib');

module.exports = parser;

/**
 * [parser description]
 * @param  {[type]} rootPath [description]
 * @return {[type]}          [description]
 */
function parser(rootPath) {
	return (ctx, next) => {
		const ext = path.extname(ctx.path);
		if (ext !== '.css') {
			return next();
		}
		const file = path.join(rootPath, ctx.path).replace('.css', '.styl');
		return new Promise((resolve, reject) => {
			readFile(file).then(buf => {
				stylus(buf.toString()).set('filename', file)
					.use(nib())
					.render((err, css) => {
						/* istanbul ignore if */
						if (err) {
							console.error(err);
							reject(err);
						} else {
							ctx.set('Content-Type', 'text/css; charset=UTF-8');
							ctx.body = css;
							resolve();
						}
					});
			}).catch((err) => {
				resolve(next());
			});
		});
	};
}


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
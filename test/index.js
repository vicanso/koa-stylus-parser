'use strict';
const assert = require('assert');
const Koa = require('koa');
const path = require('path');
const request = require('supertest');

describe('stylus-parser', () => {
  it('should parser stylus to css successful', done => {
    const parser = require('..');
    const app = new Koa();
    const server = app.listen();
    let finishedCount = 0;
    const finished = () => {
      finishedCount++;
      if (finishedCount === 3) {
        done();
      }
    };
    app.use(parser(path.join(__dirname, '../assets'), {
      'include css': true,
    }));
    request(server)
      .get('/nav.css')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.status, 200);
        console.dir(res.text);
        assert.equal(res.text.indexOf('css.css'), -1);
        finished();
      });

    request(server)
      .get('/nav1.css')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.status, 404);
        finished();
      });
    request(server)
      .get('/nav.js')
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        assert.equal(res.status, 404);
        finished();
      });
  });
});
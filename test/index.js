const path = require('path');
const assert = require('assert');
const nock = require('nock');

nock.disableNetConnect();

require('dotenv').load({ path: path.resolve(__dirname, '.env.test') });
const server = require('../server');

const qs = require('../qs');

const PROXY_ENDPOINT = process.env.PROXY_ENDPOINT;
assert(PROXY_ENDPOINT, 'PROXY_ENDPOINT is REQUIRED');

function random() {
  return require('crypto').randomBytes(10).toString('hex');
}

describe('SLACK Proxy', () => {

  ['POST','GET', 'PUT', 'DELETE'].forEach((method) => {

    it(`${method} properly`, (done) => {
      const payload = {token: random() };
      const urlPath = `/api/${random()}`;
      const response = { ok: random() };

      nock(PROXY_ENDPOINT)
        .matchHeader('content-type', /x-www-form-urlencoded/)
        .post(urlPath, qs(payload))
        .reply(200, response);

      const opts = {method: method};

      if (method === 'GET') {
        opts.url = `${urlPath}?${qs(payload)}`;
      } else {
        opts.url =  urlPath;
        opts.payload = payload;
      }

      server.inject(opts, (res) => {
        const result = JSON.parse(res.payload);
        assert.equal(res.statusCode, 200);
        assert.equal(result.ok, response.ok);
        done();
      });
    });
  
    it(`${method} complex payload`, (done) => {
      const payload = {
        token: 'token',
        channel: 'channel',
        text: 'text',
        attachments:[{ fallback: "fallbackurl" }]
      };

      const urlPath = `/api/chat.postMessage`;
      const response = { ok: random() };

      // https://api.slack.com/methods/chat.postMessage/test
      const slackExpected = 'token=token&channel=channel&text=text&attachments=%5B%7B%22fallback%22%3A%22fallbackurl%22%7D%5D';

      nock(PROXY_ENDPOINT)
        .matchHeader('content-type', /x-www-form-urlencoded/)
        .post(urlPath, slackExpected)
        .reply(200, response);

      const opts = {method: method};

      if (method === 'GET') {
        opts.url = `${urlPath}?${qs(payload)}`;
      } else {
        opts.url =  urlPath;
        opts.payload = payload;
      }

      server.inject(opts, (res) => {
        const result = JSON.parse(res.payload);
        assert.equal(res.statusCode, 200);
        assert.equal(result.ok, response.ok);
        done();
      });
    });
  }); //forEach
});

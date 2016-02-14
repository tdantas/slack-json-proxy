const debug = require('debug')('proxy');
const _ = require('lodash');
const request = require('request');
const qs = require('./qs');

if (process.env.DEBUG)
  require('request-debug')(request);

module.exports = { POST, PUT:POST, DELETE:POST, GET };

function POST(req, reply) {
  const token = _.get(req, 'auth.credentials.user');
  const payload = _.merge({ }, req.payload, {token});

  debug(`POST|PUT|DELETE ${this.slack.method} ${JSON.stringify(payload)}`);
  run(this.slack.method, payload).on('response', reply);
}

function GET(req, reply) {
  const token = _.get(req, 'auth.credentials.user');
  const query = _.merge({ }, req.query, {token});
  debug(`GET ${this.slack.method} - ${JSON.stringify(query)}`);

  run(this.slack.method, query).on('response', reply);
}

function run(method, body) {
  const baseUrl =  process.env.SLACK_API_ENDPOINT || 'https://slack.com/api';
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  return request.post(`${baseUrl}/${method}`, { body: qs(body), headers });
}

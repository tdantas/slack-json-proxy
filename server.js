const Hapi = require('hapi');
const package = require('./package.json');
const request = require('request');
const qs = require('./qs');
const _ = require('lodash');

if (process.env.DEBUG)
  require('request-debug')(request);

const server = module.exports = new Hapi.Server();
server.connection({port: process.env.PORT});

server.route({
  method: '*',
  path: '/{slackMethod*}',
  handler: proxy
});

function proxy(req, reply) { 
  const payload = _.merge({ }, req.payload, req.query);
  const headers = {
    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  const slackMethod = req.params.slackMethod;
  var baseUrl = process.env.PROXY_ENDPOINT || `https://slack.com/api`;
  baseUrl = baseUrl.replace(/\$/,'');

  request 
      .post(`${baseUrl}/${slackMethod}`, { body: qs(payload), headers })
      .on('response', reply);

}


const path = require('path');

const env = path.resolve(__dirname, '.env');
require('dotenv').load({path: env});

const server = require('./server');

server.start(() => {
  console.log('Server running:' + server.info.port);
});

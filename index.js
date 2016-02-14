
const server = require('./server');

require('dotenv').load();

server.start(() => {
  console.log('Server running:' + server.info.port);
});

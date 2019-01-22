const http = require('http');
const nowLambda = require('./index');

const hostname = '127.0.0.1';
const port = 8998;

const server = http.createServer(nowLambda);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

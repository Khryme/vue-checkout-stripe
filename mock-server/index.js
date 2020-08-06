const argv = require('yargs').argv;
const mockServer = require('node-mock-server');
const path = require('path');
const port = argv.port !== undefined ? argv.port : 3011;

mockServer({
  restPath: path.join(__dirname, '/rest'),
  uiPath: '/',
  title: 'Api mock server',
  version: 1,
  urlBase: argv.urlBase || `http://localhost:${port}`,
  urlPath: argv.urlPath || '',
  port: port,
  contentType: 'application/json',
  accessControlExposeHeaders: 'X-Total-Count',
  accessControlAllowOrigin: '*',
  accessControlAllowMethods: 'GET, POST, PUT, OPTIONS, DELETE, PATCH, HEAD',
  accessControlAllowHeaders: 'origin, x-requested-with, content-type',
  accessControlAllowCredentials: 'true',
  headers: {},
  open: true,
  dirName: __dirname,
});

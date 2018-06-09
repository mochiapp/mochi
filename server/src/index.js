/* eslint-disable no-console */
const logger = require('winston');
const https = require('https')
const http = require('http')

const app = require('./app');
const port = app.get('port');

const server = createServer(app)
// const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);

function createServer(app) {
  // const serverPort = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT ||
  // 	process.env.PORT || process.argv[2] || 8090
  // const { port: serverPort } = app.get('config').server;
  const fs = require('fs');
  const serverPort = app.get('port')

  let options
  if ( process.env.NODE_ENV !== 'production' && false ){
    const { PRIVKEY_PATH, CERT_PATH } = process.env
    try {
      options = {
	key:  fs.readFileSync(PRIVKEY_PATH),
	cert: fs.readFileSync(CERT_PATH)
      };
      // TODO(Frazier): remove asap, security vulnerability
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    } catch(error) {
      console.log({ error })
    }
  }

  let server
  if ( options ) {
    server = https.createServer(options, app)
  } else {
    // Use HTTP in prod for heroku
    server = http.createServer(app)
  }

  server.listen(serverPort, function (err) {
    // const { applicationServer, mediaServer } = app.get('config').uris;

    if (err) throw err;
    console.log('============================================================')
    console.log('Express server listening on port ' + serverPort)
    console.log('============================================================')
  });

  // Required to connect socket.io
  app.setup(server);
  return server
}

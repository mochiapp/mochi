const path = require('path')
const https = require('https')
// const http = require('http')

function getConfig() {
  const { SERVER_URL, PORT, NODE_ENV } = process.env
  const { MEDIA_SERVER_URL, DATABASE_URL } = process.env;

  return {
    uris: {
      applicationServer: ( NODE_ENV !== 'production' ) ?
	`https://${SERVER_URL}:${PORT}` : `https://${SERVER_URL}`,
      mediaServer: MEDIA_SERVER_URL, postgresDb: DATABASE_URL
    },

    moduleRoot: path.join(__dirname, '..', process.env.MODULE_DIR || 'modules'),

    modulePath(moduleName) {
      return path.join(this.moduleRoot, moduleName);
    },

    server: {
      port: PORT
    },

    setupPath(resourceName) {
      return path.join(this.modulePath('setup'), resourceName)
    },

    servicePath(serviceName) {
      return path.join(this.modulePath('services'), serviceName)
    },

    services: {
      names: []
    },

    staticDirPath: path.join(__dirname, '..', 'static')
  }
}


function createServer(app) {
  const serverPort = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT ||
	process.env.PORT || process.argv[2] || 8090
  // const { port: serverPort } = app.get('config').server;
  let server, options;

  if ( process.env.NODE_ENV !== 'production' ){
    var fs = require('fs');
    const { PRIVKEY_PATH, CERT_PATH } = process.env
    try {
      options = {
	key:  fs.readFileSync(PRIVKEY_PATH),
	cert: fs.readFileSync(CERT_PATH)
      };
    } catch(error) {
      console.log({ error })
      options = {}
    }
    // TODO(Frazier): remove asap, security vulnerability
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
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
  // app.setup(server);
  return server
}

module.exports = {
  getConfig,
  createServer
}

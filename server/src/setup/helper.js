const path = require('path')
const https = require('https')
// const http = require('http')

function getConfig(app) {
  const { SERVER_URL, PORT, NODE_ENV } = process.env
  const { MEDIA_SERVER_URL, DATABASE_URL } = process.env

  const config = {
    uris: {
      applicationServer: ( NODE_ENV !== 'production' ) ?
	`https://${SERVER_URL}:${PORT}` : `https://${SERVER_URL}`,
      mediaServer: MEDIA_SERVER_URL, postgresDb: DATABASE_URL
    },

    moduleRoot: path.join(__dirname, '..', process.env.MODULE_DIR || 'modules'),

    modulePath(moduleName) {
      return path.join(config.moduleRoot, moduleName)
    },

    server: {
      port: PORT
    },

    setupPath(resourceName) {
      return path.join(config.modulePath('setup'), resourceName)
    },

    servicePath(serviceName) {
      return path.join(config.modulePath('services'), serviceName)
    },

    services: [
      { name: 'gun' }
    ],

    staticDirPath: path.join(__dirname, '..', 'static')
  }

  console.log('before', app.get('config'))

  if (app && !app.get('config'))
    app.set('config', config)

  return config
}



module.exports = {
  getConfig,
  createServer
}

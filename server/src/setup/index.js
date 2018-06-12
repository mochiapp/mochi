const { getConfig, createServer } = require('./helper')

module.exports = () => {

  return {
    setConfig(app) {
      const config = getConfig()
      app.set('config', config)
      return config
    }
  }
}

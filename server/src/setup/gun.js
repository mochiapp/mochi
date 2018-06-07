const Gun = require('gun')

module.exports = (app) => {
  app.use(Gun.serve)

  return {
    start(server) {
     Gun({file: 'data.json', web: server})
    }
  }
}

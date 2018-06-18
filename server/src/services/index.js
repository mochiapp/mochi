const gun = require('./gun/gun.service.js')
const files = require('./files/files.service.js')
const uploads = require('./files/uploads.service.js')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(gun)
  app.configure(files)
  app.configure(uploads)
}

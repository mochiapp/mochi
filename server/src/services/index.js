const gun = require('./gun/gun.service.js');
const files = require('./files/files.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(gun);
  app.configure(files);
}

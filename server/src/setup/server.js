const path = require('path')

module.exports = (app) => {
  app.getPath = (type, name) => {
    let requested;
    switch(type) {
    case 'services':
      requested = path.join(app.get('root'), 'services', name)
      break

    case 'setup':
      requested = path.join(app.get('root'), 'setup', name)
      break
    }
    return requested
  }
}

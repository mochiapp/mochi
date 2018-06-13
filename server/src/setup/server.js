const path = require('path')

module.exports = (app) => {
  app.set('staticDir', path.join(app.get('root'), '..', 'dist', 'statics'))

  app.getPath = (type, name) => {
    let requested;
    switch(type) {
    case 'services':
      requested = path.join(app.get('root'), 'services', name)
      break

    case 'setup':
      requested = path.join(app.get('root'), 'src', 'setup', resourceName)
      break
    }
    return requested
  }
}

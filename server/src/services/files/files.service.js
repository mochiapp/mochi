// Initializes the `files` service on path `/api/files`
const createService = require('./files.class.js')
const hooks = require('./files.hooks')

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/files', createService(options))

  // Get our initialized service so that we can register hooks
  const files = app.service('api/files')
  files.hooks(hooks)

};

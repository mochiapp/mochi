// Initializes the `gun` service on path `/api/gun`
const createService = require('./gun.class.js');
const hooks = require('./gun.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api/gun', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/gun');

  service.hooks(hooks);
};

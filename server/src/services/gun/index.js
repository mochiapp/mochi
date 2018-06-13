// const gunService = require('./gun.service');
// const GunMethods = require('./gun.methods');

const gunService = (app) => {
  return {
    get(id) {
      console.log('gun.service.get', id)
      return id
    }
  }
}

// function BaseService() {}

module.exports = (app, config) => {
  app.use(`/${config.name}`, gunService(app));

  const service = app.service(config.name);
  // service.mixin(GunMethods(service, app));
  return service
}

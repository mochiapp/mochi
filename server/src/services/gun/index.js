// const gunService = require('./gun.service');
// const GunMethods = require('./gun.methods');

const gunService = (app) => {
  return {
  }
}

// function BaseService() {}

module.exports = (app, config) => {
  const endpoint = `api/${config.name}`;
  console.log("services.gun", { config, endpoint })
  app.use(`/${endpoint}`, gunService(app));

  // const service = app.service(endpoint);
  // service.mixin(GunMethods(service, app));
  // service.endpoint = endpoint;
  return service
}

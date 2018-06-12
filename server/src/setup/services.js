module.exports = (app) => {
  const { services: serviceConfigs, servicePath } = app.get('config')

  if ( !serviceConfigs || !serviceConfigs.length ) {
    console.error("Must specify services!. No services configured.");
    return {};
  }

  serviceConfigs.forEach((config) => {
    if(!config.name) {
      console.error(`Missing service name. Cannot initialize ${JSON.stringify(config)}`)
      return {}
    }
    const service = require(servicePath(config.name))(app, config);
    const endpoint = service.endpoint || `api/${config.name}`;

    if ( !service && !app.service(endpoint) ) {
      console.error("Missing service for : ", config.name);

    } else if ( service && !app.service(endpoint) ) {
      const apiPath = `/${endpoint}`;
      app.use(apiPath, service);
    }
  });

  return app.services;
};

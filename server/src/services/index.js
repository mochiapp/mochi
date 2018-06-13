// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  const services =  [
      { name: 'gun' }
  ];

  if ( !services.length ) {
    console.error("Must specify services!. No services configured.");
    return {};
  }

  const { servicePath } = app.get('config')
  services.forEach((config) => {
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
}

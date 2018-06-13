const feathers = require('@feathersjs/feathers')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  const services =  [
    { name: 'gun' }
  ]

  if ( !services.length ) {
    console.error("Must specify services!. No services configured.")
    return {}
  }

  const api = feathers()
  services.forEach((config) => {
    if(!config.name) {
      console.error(`Missing service name. Cannot initialize ${JSON.stringify(config)}`)
      return {}
    }

    const service = require(app.getPath('services', config.name))(api, config)
    if ( !service && !app.service(endpoint) ) {
      console.error("Missing service for : ", config.name);
    }
  })
  app.use('/api', api)

  return app.services;
}

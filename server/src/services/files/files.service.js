// Initializes the `files` service on path `/api/files`
const createService = require('./files.class.js');
const hooks = require('./files.hooks');

// Reference: https://github.com/feathersjs/docs/blob/master/guides/advanced/file-uploading.md
// const multer = require('multer')
// const multipartMiddleware = multer()

module.exports = function (app) {
  const blobStorage = require('fs-blob-store')(app.get('uploads'))
  const blobService = require('feathers-blob')({ Model: blobStorage })
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Add storage type: ipfs/https
  // Accept file type.

  // Initialize our service with any options it requires
  app.use('/api/files', createService(options))
  app.use('/api/uploads', blobService)

  // Get our initialized service so that we can register hooks
  const service = app.service('api/files');

  service.hooks(hooks);
};

const hooks = require('./uploads.hooks')

// Reference: https://github.com/feathersjs/docs/blob/master/guides/advanced/file-uploading.md
const dauria = require('dauria')
const multer = require('multer')
const multipartMiddleware = multer()

module.exports = function (app) {
  const blobStorage = require('fs-blob-store')(app.get('uploads'))
  const blobService = require('feathers-blob')({ Model: blobStorage })
  
  // Upload Service with multipart support
  app.use('/api/uploads',

          // multer parses the file named 'uri'.
          // Without extra params the data is
          // temporarely kept in memory
          multipartMiddleware.single('uri'),

          // another middleware, this time to
          // transfer the received file to feathers
          function(req,res,next){
            req.feathers.file = req.file
            next()
          },
          blobService)

  const uploads = app.service('api/uploads')
  uploads.protocol = 'https'
  uploads.hooks(hooks)
}

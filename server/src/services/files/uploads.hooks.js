const { serialize } = require('feathers-hooks-common')

function convertFileToDataURI(context) {
  console.log({ context })
  if (!context.data.uri && context.params.file) {
    const file = context.params.file
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype)
    context.data = { uri }
    console.log( file, uri, context.data )
  }
}

const schema = {
  exclude: [ 'uri' ],
  computed: {
    hash: (upload) => { return upload.id.split('.')[0] },
    location: (upload) => { return `/uploads/${upload.id}` },
    protocol: (_,hook) => { return hook.service.protocol },
    type: (upload) => { return upload.uri.split(';')[0].split(':')[1] },
  }
}

function handleError(context) {
  console.error(`Error in ${context.path} calling ${context.method} method`, context.error);
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ convertFileToDataURI ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [ serialize(schema) ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [ handleError ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

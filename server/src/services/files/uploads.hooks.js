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

function serializeResponse(context) {
  console.log({ result: context.result })
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
    all: [],
    find: [],
    get: [],
    create: [ serializeResponse ],
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

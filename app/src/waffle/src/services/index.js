import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
// import authentication from '@feathersjs/authentication-client';
// import localstorage from 'feathers-localstorage';
// import hooks from 'feathers-hooks';
import io from 'socket.io-client'

import GunMethods from './gun/gun.methods'
import UploadsMethods from './files/uploads.methods'

const origin = (![ 'production', 'staging' ].includes(process.env.NODE_ENV))
  ? process.env.DEFAULT_ORIGIN : window.location.origin
const socket = io(origin, { transports: ['websocket'] })

export const client = feathers()
  .configure(socketio(socket)) // you could use Primus or REST instead
//  .configure(hooks())
//  .configure(authentication({ storage: window.localStorage }));

// https://github.com/feathersjs/feathers-authentication/issues/272#issuecomment-240937322
// socket.on('reconnect', () => {app.authenticate();});

// repeat this line for every service in our backend
export const gun = client.service('api/gun')
gun.mixin(GunMethods(gun, client))
gun.init()

export const files = client.service('api/files')
export const uploads = client.service('api/uploads')
uploads.mixin(UploadsMethods(uploads, client))

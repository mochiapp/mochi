import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
// import authentication from '@feathersjs/authentication-client';
// import localstorage from 'feathers-localstorage';
// import hooks from 'feathers-hooks';
import io from 'socket.io-client'

const socket = io('https://localhost:3030', { transports: ['websocket'] })

export const client = feathers()
  .configure(socketio(socket)) // you could use Primus or REST instead
//  .configure(hooks())
//  .configure(authentication({ storage: window.localStorage }));

// https://github.com/feathersjs/feathers-authentication/issues/272#issuecomment-240937322
// socket.on('reconnect', () => {app.authenticate();});

// repeat this line for every service in our backend
export const postService = client.service('gun')
export const userService = client.service('files')

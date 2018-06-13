const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('winston');

process.env['NODE_CONFIG_DIR'] = path.join(__dirname, '..', 'config/')
const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// Load .env from mochiapp root
const dotenv = require('dotenv').
      config({ path: path.join(__dirname, '..', '..', '.env') })

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

console.log('OB super-peer...')
const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.configure(require('./setup/server'))
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
// app.use('/', express.static(app.get('public')));
// app.use(express.static(__dirname))
app.use('/statics', express.static(app.get('staticDir')))
app.use('/', express.static(path.join(__dirname, '..', 'dist')))

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);


// const config = setup.setConfig(app)
// console.log({ setup, config })

// const holster = require(config.setupPath('gun'))(app)
// const node = require(config.setupPath('ipfs'))(app)
// require(config.setupPath('services'))(app)

// const server = createServer(app, config)

// holster.start(server)

// app.get('/health-check', (req, res) => res.sendStatus(200))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'))
// })

// app.all('*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'))
// })

module.exports = app;

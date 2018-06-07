console.log('OB super-peer...')

const path = require('path')
const dotenv = require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const { getConfig, createServer } = require('./setup/helper')
const config = getConfig()

const express = require('express')
const app = express()

// app.use(express.static(__dirname))
app.use(express.static('static'))
app.use(express.static('dist'))

const holster = require(config.setupPath('gun'))(app)
const node = require(config.setupPath('ipfs'))(app)

app.get('/health-check', (req, res) => res.sendStatus(200))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'))
// })

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})


const server = createServer(app, config)
app.set('config', config)

holster.start(server)

console.log('OB super-peer...')

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

const path = require('path')
const dotenv = require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

var https = require('https')
var express = require('express')
var Gun = require('gun')


var app = express()
app.use(Gun.serve)
// app.use(express.static(__dirname))
app.use(express.static('static'))

const server = createServer(app)

app.get('/health-check', (req, res) => res.sendStatus(200))

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname + '/dist/index.html'))
// })

app.use(express.static('dist'))

app.all('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'))
})

Gun({file: 'data.json', web: server})

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

const IPFS = require('ipfs')
const node = new IPFS()

node.on('ready', () => {
  // Your node is now ready to use \o/
  console.log('IPFS ready')

  node.version((err, version) => {
    if (err) { return console.error('ERROR in node.version', err) }
    console.log('IPFS version:', version.version)
  })

  node.files.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World rh3')
  }, (err, filesAdded) => {
    if (err) { return console.error('node.files.add', err) }

    // Once the file is added, we get back an object containing the path, the
    // multihash and the sie of the file
    console.log('\nAdded file 3:', filesAdded[0].path, filesAdded[0].hash)
    // fileMultihash = filesAdded[0].hash

    // node.files.cat('QmTbhNNgnSzDnQj8mLELcxqZKwUwbzpnHj2iMeqscjpDEF', (err, data) => {
    //   if (err) { return console.error('node.files.cat', err) }

    //   console.log('\nFile content:')
    //   // print the file to the terminal and then exit the program
    //   process.stdout.write(data)
    // })
  })

  // // stopping a node
  // node.stop(() => {
  //   // node is now 'offline'
  //   console.log('IPFS stopped')
  // })
})

function createServer(app) {
  const serverPort = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT ||
      process.env.PORT || process.argv[2] || 8090
  // const { port: serverPort } = app.get('config').server;
  let server, options;

  if ( process.env.NODE_ENV !== 'production' ){
    var fs = require('fs');
    const { PRIVKEY_PATH, CERT_PATH } = process.env
    try {
      options = {
	key:  fs.readFileSync(PRIVKEY_PATH),
	cert: fs.readFileSync(CERT_PATH)
      };
    } catch(error) {
      console.log({ error })
      options = {}
    }
    // TODO(Frazier): remove asap, security vulnerability
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    server = https.createServer(options, app);
  } else {

    // Use HTTP in prod for heroku
    server = http.createServer(app);
  }

  server.listen(serverPort, function (err) {
    // const { applicationServer, mediaServer } = app.get('config').uris;

    if (err) throw err;
    console.log('============================================================')
    console.log('Express server listening on port ' + serverPort)
    console.log('============================================================')
  });

  // Required to connect socket.io
  // app.setup(server);
}

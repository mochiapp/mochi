console.log('OB super-peer...')

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.VCAP_APP_PORT || process.env.PORT || process.argv[2] || 8090

var fs = require('fs')
var path = require('path')
var https = require('https')
var express = require('express')
var Gun = require('gun')

var app = express()
app.use(Gun.serve)
// app.use(express.static(__dirname))
app.use(express.static('static'))

var privateKey = fs.readFileSync('/etc/letsencrypt/live/rh1.breasy.site/privkey.pem')
var certificate = fs.readFileSync('/etc/letsencrypt/live/rh1.breasy.site/cert.pem')

var options = {
  key: privateKey,
  cert: certificate
}

var server = https.createServer(options, app).listen(port, function () {
  console.log('============================================================')
  console.log('Express server listening on port ' + port)
  console.log('============================================================')
})

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

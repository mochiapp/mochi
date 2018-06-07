const IPFS = require('ipfs')

module.exports = (app) => {
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

  return node
}

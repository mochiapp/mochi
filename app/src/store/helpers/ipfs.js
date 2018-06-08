import { loadExternalJs, waitVarExists } from '../../plugins/load'

class Ipfs {
  ipfs = null

  init () {
    let that = this

    return new Promise((resolve, reject) => {
      if (window.ipfs) {
        that.ipfs = window.ipfs
        resolve()
      } else {
        console.log('LOAD ipfs')
        loadExternalJs('https://unpkg.com/ipfs/dist/index.min.js')
        waitVarExists('Ipfs').then((IPFS) => {
          that.ipfs = new IPFS({
            config: {
              // Bootstrap: [
              //   // '/ip4/149.28.235.44/tcp/4001',
              //   // '/ip4/149.28.235.44/tcp/4001/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv'
              //   // '/ip4/149.28.235.44/tcp/443/wss/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv'
              //   // '/ip4/149.28.235.44/tcp/443/wss/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE'
              //   '/dns4/mochi.social/tcp/443/wss/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE',
              //   '/p2p-circuit/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE'
              // ],
              Addresses: {
                // Gateway: '/ip4/149.28.235.44/tcp/8080',
                Swarm: [
                  '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star',
                  // '/ip4/149.28.235.44/tcp/4001/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv'
                  // '/dns4/mochi.social/tcp/443/wss/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE',
                  // '/p2p-circuit/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE',
                  '/dns4/mochi.social/tcp/4443/wss/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv',
                  '/p2p-circuit/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv'
                  // '/p2p-circuit/ipfs/Qmc9fN31e8gFjbGF8tUpoLbTPCNbT1BwV7snEeNfdi3mFS'
                ]
              },
              relay: {
                enabled: true,
                hop: {
                  enabled: true,
                  active: true // false
                }
              }
            }
          })

          // that.ipfs.bootstrap.add('/dns4/mochi.social/tcp/443/wss/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE')
          // that.ipfs.bootstrap.add('/p2p-circuit/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE')

          that.ipfs.on('ready', () => {
            resolve()

            // that.ipfs.swarm.connect('/dns4/mochi.social/tcp/443/wss/ipfs/QmeEypMVf9jQHEwYd4pxin5SX6FGMeUCMrvdbVCP5GWLxE')
            that.ipfs.swarm.connect('/dns4/mochi.social/tcp/4443/wss/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv')

            // setTimeout(_ => {
            //   // this.ipfs.swarm.connect('/ip4/149.28.235.44/tcp/4001/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv', function (err1, v) {
            //   this.ipfs.swarm.connect('/ip4/149.28.235.44/tcp/8089/wss/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv', function (err1, v) {
            //     console.log('connect', err1, v)
            //   })
            // }, 10000)

            setTimeout(_ => {
              this.ipfs.swarm.peers({}, function (err1, peers) {
                console.log('peers', peers)
              })
            }, 5000)
            setTimeout(_ => {
              this.ipfs.swarm.peers({}, function (err1, peers) {
                console.log('peers', peers)
                console.log('ipfs', that.ipfs)
                // that.ipfs.bootstrap.add('/ip4/149.28.235.44/tcp/4001/ipfs/QmYMvCTT9bhx2xqKsQFfURTXEEnGnZ6rUVdGdJ7fj8eCqv')
              })
            }, 15000)
            setTimeout(_ => {
              this.ipfs.swarm.peers({}, function (err1, peers) {
                console.log('peers', peers)
              })
            }, 60000)
          })
        })
      }
    })
  }

  getImage (hash) {
    return new Promise((resolve, reject) => {
      this.ipfs.files.cat(hash, function (err, file) {
        if (err) {
          console.log('getImage err', err)
          // throw err
          reject(err)
        }
        // console.log('got:', file.toString('utf8'))
        var blob = new Blob([file], {type: 'image/jpg'})
        resolve(window.URL.createObjectURL(blob))
      })
    })
  }

  testStore (s) {
    return new Promise((resolve, reject) => {
      this.ipfs.files.add([Buffer.from(s)], function (err, hash) {
        if (err) {
          console.log('testStore err', err)
          reject(err)
        }
        console.log('stored tesStore:', hash, hash[0].hash)
        resolve(hash[0].hash)
      })
    })
  }

  testFetch (h) {
    return new Promise((resolve, reject) => {
      this.ipfs.files.cat(h, function (err, file) {
        if (err) {
          console.log('testFetch err', err)
          reject(err)
        }
        console.log('fetched testFetch:', file, file.toString('utf8'))
        resolve(file.toString('utf8'))
      })
    })
  }
}

const ipfs = new Ipfs()

export default ipfs

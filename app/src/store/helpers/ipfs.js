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
              Addresses: {
                Swarm: [
                  '/dns4/wrtc-star.discovery.libp2p.io/tcp/443/wss/p2p-webrtc-star'
                ]
              }
            }
          })

          that.ipfs.on('ready', () => {
            resolve()
          })
        })
      }
    })
  }

  getImage (hash) {
    return new Promise((resolve, reject) => {
      this.ipfs.files.cat(hash, function (err, file) {
        if (err) {
          throw err
        }
        // console.log('got:', file.toString('utf8'))
        var blob = new Blob([file], {type: 'image/jpg'})
        resolve(window.URL.createObjectURL(blob))
      })
    })
  }
}

const ipfs = new Ipfs()

export default ipfs

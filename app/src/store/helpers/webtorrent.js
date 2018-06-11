import { loadExternalJs, waitVarExists } from '../../plugins/load'
var idb = require('indexeddb-chunk-store')
var parseTorrent = require('parse-torrent')
var Idbkv = require('idb-kv-store')
// var WebTorrent = require('webtorrent')

class OurWebTorrent {
  client = null
  torrents = null
  maxLiveTorrents = 222

  init () {
    let that = this

    return new Promise((resolve, reject) => {
      console.log('LOAD WebTorrent')
      loadExternalJs('https://cdn.jsdelivr.net/npm/webtorrent@latest/webtorrent.min.js')
      waitVarExists('WebTorrent').then((WebTorrent) => {
        that.client = new WebTorrent({
          dht: false,
          tracker: { rtcConfig: null },
          maxConns: 2
        })
        that.torrents = new Idbkv('mochi_torrents')
        that.resurrectAllTorrents()
        resolve()
      })
    })
  }

  testStore (buf) {
    let that = this
    return new Promise((resolve, reject) => {
      // var buf = Buffer.from(s)
      buf.name = 'mochi'
      let torrent = that.client.seed(buf, {'store': idb, maxWebConns: 2}, function (torrent) {
        console.log('seed torrent', torrent, torrent.magnetURI)
        resolve(torrent.magnetURI)
        // resolve(torrent.infoHash)
        // resolve(torrent.infoHashBuffer.toString('hex'))
      })

      torrent.on('metadata', () => {
        // console.log('torrent metadata', parseTorrent(torrent.torrentFile))
        // Once generated, stores the metadata for later use when re-adding the torrent!
        that.torrents.add(parseTorrent(torrent.torrentFile))
        console.log(`[${torrent.infoHash}] Seeding torrent`)
      })
    })
  }

  testFetch (torrentURI) {
    let that = this
    return new Promise((resolve, reject) => {
      // var torrentId = 'magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent'

      that.client.add(torrentURI, {'store': idb, maxWebConns: 2}, function (torrent) {
        console.log('Got torrent:', torrent)
        // torrent.files[0].getBuffer(function (err, buffer) {
        torrent.files[0].getBlob(function (err, buffer) {
          if (err) throw err
          console.log('buffer', buffer) // <Buffer 00 98 00 01 ...>
          // resolve(buffer.toString('utf8'))
          resolve(buffer)
        })
      })
    })
  }

  removeAllTorrents () {
    let that = this
    let i = 0
    this.torrents.iterator((err, cursor) => {
      if (err) throw err
      if (cursor) {
        console.log('removeAllTorrents cursor', cursor.key)
        if (i++ < 222) {
          if (typeof cursor.value === 'object') {
            that.removeTorrent(cursor.value, cursor.key)
          }
        }
        cursor.continue()
      }
    })
  }

  removeTorrent (metadata, ky) {
    let that = this
    if (typeof metadata === 'object' && metadata != null) {
      console.log('remove', metadata)
      try {
        that.client.remove(metadata.infoHash, () => {
          console.log('remove done')
          that.removeIdbTorrent(metadata.infoHash, ky)
        })
      } catch (e) {
        that.removeIdbTorrent(metadata.infoHash, ky)
      }
    }
  }

  removeIdbTorrent (name, ky) {
    var DBDeleteRequest = window.indexedDB.deleteDatabase(name)
    DBDeleteRequest.onerror = function (event) {
      console.log('Error deleting database.')
    }
    DBDeleteRequest.onsuccess = function (event) {
      console.log('Database deleted successfully')
      // console.log(event.result) // should be undefined
    }

    this.torrents.remove(ky, (err) => {
      console.log('Key removed', ky, err)
    })
  }

  resurrectAllTorrents () {
    let that = this
    // Itterates through all metadata from metadata store and attempts to resurrect them!
    let i = 0
    this.torrents.iterator((err, cursor) => {
      if (err) throw err
      if (cursor) {
        if (i++ < that.maxLiveTorrents) {
          if (typeof cursor.value === 'object') {
            that.resurrectTorrent(cursor.value)
          }
        }
        cursor.continue()
      }
    })
  }

  resurrectTorrent (metadata) {
    let that = this
    if (typeof metadata === 'object' && metadata != null) {
      if (that.client.get(metadata.infoHash)) return
      metadata.announce = [
        // 'wss://tracker.btorrent.xyz',
        'wss://tracker.fastcast.nz?numwant=2',
        'wss://tracker.openwebtorrent.com?numwant=2'
      ]
      console.log('ADD', metadata)
      var torrent = that.client.add(metadata, {'store': idb, maxWebConns: 2})
      torrent.on('metadata', () => {
        console.log(`[${metadata.infoHash}] Resurrecting torrent`)
      })
      torrent.on('done', () => {
        console.log(`[${metadata.infoHash}] Loaded torrent from indexedDB store`)
      })
    }
  }

  getTorrents () {
    console.log('getTorrents', this.client.torrents)
    // console.log('WebTorrent', window.WebTorrent)
    // console.log('client', this.client)
    return this.client.torrents
  }
}

const webTorrent = new OurWebTorrent()

export default webTorrent

<template>
  <mochi-page-content>
    ###DEBUG###<br>

    <template v-for="torrent in torrents">
      <q-card :key="torrent.infoHash">
        <q-card-main>
          Hash: {{ torrent.infoHash }}<br>
          Max conns: {{ torrent.maxWebConns }}<br>
          Num peers: {{ torrent.numPeers }}<br>
          Length: {{ torrent.length }}<br>
          Received: {{ torrent.received }}<br>
          Downloaded: {{ torrent.downloaded }}<br>
          Uploaded: {{ torrent.uploaded }}<br>
          Magnet: {{ torrent.magnetURI }}<br>
          <template v-for="ann in torrent.announce">
            <span :key="ann">Announce: {{ ann }}<br></span>
          </template>
        </q-card-main>
      </q-card>
    </template>

    <q-btn
      label="Delete all Webtorrent"
      color="primary"
      @click="clickDeleteAllWT"
    />
  </mochi-page-content>
</template>

<script>
import MochiPageContent from '../components/mochi-page-content.vue'
// import ipfs from '../store/helpers/ipfs'
import webTorrent from '../store/helpers/webtorrent'
// import {limitPixelSize, exifRotate, getBlob, compressWithGuetzli, blobToUrl} from '../store/helpers/image'

export default {
  components: {
    'mochi-page-content': MochiPageContent
  },

  data () {
    return {
      torrents: null
    }
  },

  mounted () {
    // ipfs.init().then(_ => {
    //   console.log('profile ipfs inited 222')
    // })

    webTorrent.init().then(_ => {
      let that = this

      console.log('profile webTorrent inited 222')

      setInterval(_ => {
        that.torrents = webTorrent.getTorrents()
      }, 1000)
    })
  },

  methods: {
    clickDeleteAllWT () {
      webTorrent.removeAllTorrents()
    }
  }
}
</script>

<style scoped lang="stylus">
</style>

<template>
  <mochi-page-content>
    ###DEBUG###<br>

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
    }
  },

  mounted () {
    // ipfs.init().then(_ => {
    //   console.log('profile ipfs inited 222')
    // })

    webTorrent.init().then(_ => {
      console.log('profile webTorrent inited 222')
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

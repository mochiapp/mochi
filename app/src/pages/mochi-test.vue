<template>
  <mochi-page-content>
    ###TEST###<br>

    <img ref="test">
    ===

    <q-input
      ref="inp"
      v-model="inp"
      float-label="New string to store input"
      clearable
    />
    Hash: {{ hashStored }}
    <q-btn
      label="Store in IPFS"
      color="primary"
      @click="clickStore"
    />

    <q-input
      ref="inp2"
      v-model="inp2"
      float-label="Hash input"
      clearable
    />
    Fetched: {{ fetched }}
    <q-btn
      label="Fetch from IPFS"
      color="primary"
      @click="clickFetch"
    />

    <input
      id="file"
      ref="file"
      class="file"
      type="file"
      name="file"
      accept=".png, .jpg, .jpeg, .gif"
      @change="readURL"
    >
    <q-input
      ref="inp"
      v-model="inp3"
      float-label="New string to seed input"
      clearable
    />
    MagnetURI: {{ magnetURIStored }}
    <q-btn
      label="Seed to Webtorrent"
      color="primary"
      @click="clickStoreWT"
    />

    <q-input
      ref="inp4"
      v-model="inp4"
      float-label="MagnetURI input"
      clearable
    />
    Downloaded torrent: {{ downloaded }}
    <q-btn
      label="Fetch from Webtorrent"
      color="primary"
      @click="clickFetchWT"
    />
  </mochi-page-content>
</template>

<script>
import { uploads } from '../store/services'
import MochiPageContent from '../components/mochi-page-content.vue'
import ipfs from '../store/helpers/ipfs'
import webTorrent from '../store/helpers/webtorrent'
import {limitPixelSize, exifRotate, /* getBlob, compressWithGuetzli, */ blobToUrl, /* canvasToBmpUrl, calcSsim, */ compressOptimal} from '../store/helpers/image'

export default {
  components: {
    'mochi-page-content': MochiPageContent
  },

  data () {
    return {
      inp: '',
      hashStored: '',
      inp2: '',
      fetched: '',
      inp3: '',
      magnetURIStored: '',
      inp4: '',
      downloaded: ''
    }
  },

  mounted () {
    // ipfs.init().then(_ => {
    //   console.log('profile ipfs inited 222')
    // })

    webTorrent.init().then(_ => {
      console.log('profile webTorrent inited 222aaa')
    })
  },

  methods: {
    async clickStore () {
      this.hashStored = await ipfs.testStore(this.inp)
    },

    async clickFetch () {
      this.fetched = ''
      this.fetched = await ipfs.testFetch(this.inp2)
    },

    async clickStoreWT () {
      this.magnetURIStored = await webTorrent.testStore(this.inp3)
    },

    async clickFetchWT () {
      this.downloaded = ''
      let blob = await webTorrent.testFetch(this.inp4)
      console.log('blob 333', blob)
      this.$refs.test.src = blobToUrl(blob)
      this.downloaded = blob.length
    },

    readURL () {
      let that = this
      let input = this.$refs.file
      that.magnetURIStored = ''
      if (input.files && input.files[0]) {
        var reader = new FileReader()

        reader.onload = async function (e) {
          var img = new Image()
          img.src = e.target.result

          img.onload = async function () {
            var maxW = 1000 // 1920 // 720
            var maxH = 1000 // 1920 // 720
            let resizedCanvas = await limitPixelSize(img, maxW, maxH)
            let rotatedCanvas = await exifRotate(img, resizedCanvas)

            let opt = await compressOptimal(rotatedCanvas, 'mozjpeg')
            const saved = await uploads.saveImageFromBlob(opt.bestBlob, opt)
            console.log({ saved })

            console.log('img size', rotatedCanvas.width, rotatedCanvas.height)
            console.log('resized to canvas & created blob!', opt.bestBlob)

            let src2 = blobToUrl(opt.bestBlob)
            that.$refs.test.src = src2

            // let blob3 = await compressWithGuetzli(rotatedCanvas)
            that.magnetURIStored = await webTorrent.testStore(opt.bestBlob)
          }
        }

        reader.readAsDataURL(input.files[0])
      }
    }
  }
}
</script>

<style scoped lang="stylus">
</style>

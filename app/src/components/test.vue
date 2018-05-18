<template>
  <app-layout top-title="Test">
    <v-container fluid fill-height class="fab-parent">
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          <blockquote>
            <img src="../assets/logo.png" alt="Vuetify.js" class="mb-5">
            &#8220;Test.3 = {{ msg }}&#8221;
            <footer>
              <small>
                <em>&mdash;Robert Heessels</em>
              </small>
            </footer>
          </blockquote>
        </v-layout>
      </v-slide-y-transition>



      <div>Words:<br>
        <template v-for="(item, index) in words">
          <div>{{item.word}} = {{JSON.stringify(item.posts)}}</div>
        </template>
      </div>


      <div id='root'>
        <div class="form">
          <form id="add-stuff">
            <label class="block" for="stuff">
              Add stuff to IPFS:
            </label>
            <textarea class="block margin-top" id="stuff" name="stuff"></textarea>
            <button class="block margin-top" type="submit">
              Add to IPFS
            </button>
          </form>
        </div>
        <div class="result margin-top"></div>
        <img :src="imgSrc" />
      </div>
  
    </v-container>
  </app-layout>
</template>

<script>
import { mapState } from 'vuex'
import { loadExternalJs, waitVarExists } from '@/modules/load'
import '@/store/modules/words'
// import IPFS from 'ipfs'

export default {
  data () {
    return {
      msg: 'Hello world!',
      imgSrc: ''
    }
  },

  computed: mapState({
    words: state => state.words.words
  }),

  beforeCreate () {
    this.$store.dispatch('words_get')
  },

  mounted () {
    let that = this

    loadExternalJs('https://unpkg.com/ipfs/dist/index.min.js')
    waitVarExists('Ipfs').then((IPFS) => {
      const ipfs = new IPFS()
      const PUBLIC_GATEWAY = 'https://ipfs.io/ipfs'

      function addText (text) {
        return new Promise((resolve, reject) => {
          ipfs.files.add(Buffer.from(text), (error, result) => {
            if (error) {
              return reject(error)
            }

            return resolve(result)
          })
        })
      }

      function logSuccess ([{ hash }]) {
        const url = `${PUBLIC_GATEWAY}/${hash}`
        const link = document.createElement('a')
        const span = document.createElement('span')
        const resultDiv = document.getElementsByClassName('result')[0]

        span.innerText = 'Find your content at '
        link.href = link.innerText = url
        link.target = '_blank'

        resultDiv.innerHTML = ''

        resultDiv
          .appendChild(span)
          .appendChild(link)
      }

      function logError (error) {
        console.error('\nUh oh!\n', error)
      }

      document.getElementById('add-stuff').addEventListener('submit', event => {
        event.preventDefault()
        const text = document.getElementById('stuff').value
        addText(text).then(logSuccess, logError)
      })

      ipfs.on('ready', () => {
        console.log('Connected to IPFS!2')

        ipfs.files.cat('QmTbhNNgnSzDnQj8mLELcxqZKwUwbzpnHj2iMeqscjpDEF', function (err, file) {
          if (err) {
            throw err
          }
          // console.log('got:', file.toString('utf8'))
          var blob = new Blob([file], {type: 'image/jpg'})
          setTimeout(() => {
            that.imgSrc = window.URL.createObjectURL(blob)
          }, 1)
        })
      })
    })
  }
}
</script>

<style>
.fab-parent {
  position: relative;
}
.fab-container {
  position: absolute;
  bottom: 0;
  right: 0;
}
.fab-container v-btn {
  position: relative;
  margin-top: auto;
}
</style>
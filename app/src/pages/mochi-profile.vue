<template>
  <mochi-page-content>
    <q-card>
      <q-card-main>
        <div class="q-subheading q-pb-xs">{{ $t('profile:your_avatar_and_sizes') }}</div>
        <div class="val row items-center">
          <img ref="test" />
          ===
          <mochi-avatar-display
            :avatar="avatar"
            :pub="auth.pub"
            size="100px"
            class="avatar-big"
          />
          <mochi-avatar-display
            :avatar="avatar"
            :pub="auth.pub"
            size="40px"
            class="avatar-medium"
          />
          <mochi-avatar-display
            :avatar="avatar"
            :pub="auth.pub"
            size="24px"
            class="avatar-small"
          />
          <div class="col self-stretch column items-end justify-end">
            <q-btn
              @click="showAvatarDialog = !showAvatarDialog"
            >
              {{ $t('Change') }}
            </q-btn>
          </div>

          <mochi-image-picker
            :show-dialog="showAvatarDialog"
            :title="$t('profile:change_avatar')"
            :src="avatar"
            @image-picked="onImagePicked"
            @dialog-closed="onDialogClosed"
          />
        </div>
      </q-card-main>
    </q-card>

    <q-card>
      <q-card-main>
        <div class="q-subheading q-pb-xs">{{ $t('profile:your_username') }}</div>
        <div class="val">{{ auth.alias }}</div>
      </q-card-main>
    </q-card>

    <q-card>
      <q-card-main>
        <div class="q-subheading q-pb-xs">
          {{ $t('profile:your_id') }}
          <span
            ref="gncopy"
            class="js-copy"
          >
            <q-icon
              name="file_copy"
              color="grey-5"
            />
          </span>
        </div>
        <div class="val">
          <span class="pub">{{ auth.pub }}</span><br>
          <div class="expl">{{ $t('profile:id_explain') }}</div>
        </div>
      </q-card-main>
    </q-card>
  </mochi-page-content>
</template>

<script>
import i18next from 'i18next'
import store from '../store/stores/auth'
import MochiPageContent from '../components/mochi-page-content.vue'
import MochiAvatarDisplay from '../components/mochi-avatar-display.vue'
import MochiImagePicker from '../components/mochi-image-picker.vue'
import ipfs from '../store/helpers/ipfs'

export default {
  components: {
    'mochi-page-content': MochiPageContent,
    'mochi-avatar-display': MochiAvatarDisplay,
    'mochi-image-picker': MochiImagePicker
  },

  data () {
    return {
      showAvatarDialog: false
    }
  },

  fromMobx: {
    auth () { return store.auth },
    avatar: {
      get () { return store.auth.avatar },
      set (data) { store.auth.setAvatar(data) }
    }
  },

  beforeCreate () {
    i18next.loadNamespaces('profile')
  },

  mounted () {
    let that = this

    new Clipboard(this.$refs.gncopy, {
      text: function (trigger) {
        return that.auth.pub
      }
    })
      .on('success', _ => {
        that.$q.notify({
          message: that.$i18n.i18next.t('profile:copied'),
          position: 'bottom',
          type: 'positive'
        })
      })
  
    ipfs.init().then(_ => {
      console.log('profile ipfs inited')
      setTimeout(_ => {
        console.log('getimg')
      ipfs.getImage('QmX7mna7G3BLx2UCdAHviaDastbnvLiVmM2pQ5azBa1H7D').then(src => { // cage
      // ipfs.getImage('QmTbhNNgnSzDnQj8mLELcxqZKwUwbzpnHj2iMeqscjpDEF').then(src => { // injustice
      // ipfs.getImage('QmYqA8GiZ4MCeyJkERReLwGRnjSdQBx5SzjvMgiNwQZfx6').then(src => { // monty
      // ipfs.getImage('QmVbCbGE39kSpgwX33j3s5XiidgFaY8SdE23VBqtbf8rgc/1436016689637.jpg').then(src => { // anime1
      // ipfs.getImage('QmVbCbGE39kSpgwX33j3s5XiidgFaY8SdE23VBqtbf8rgc/1436148958562.png').then(src => { // anime2
      // ipfs.getImage('QmRa2z3zTL2XHtheAjYnsuSDiyDn4sKktWrywg31KdnMmX/0001 - D7rMzsQ.gif').then(src => { // frog
      // ipfs.getImage('QmW2WQi7j6c7UgJTarActp7tDNikE4B2qXtFCfLPdsgaTQ/cat.jpg').then(src => { // cat
        that.$refs.test.src = src
      }).catch(function (error) {
        console.log('gi error', error)
      })
      }, 31000)
    })
  },

  methods: {
    onImagePicked (data) {
      this.avatar = data
      this.showAvatarDialog = false
    },

    onDialogClosed () {
      this.showAvatarDialog = false
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~variables'

.q-subheading
  color #888

.val
  font-weight bold
  margin-top 4px

.expl
  font-weight normal
  margin-top 8px
  font-style italic
  color #888

.js-copy
  cursor pointer
  margin-left 8px

.js-copy i:hover
  color grey !important

.pub
  word-break break-all
  display inline-block

.avatar-big, .avatar-medium
  margin-right $flex-gutter-xs
</style>

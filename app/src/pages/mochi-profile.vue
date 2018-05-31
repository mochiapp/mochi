<template>
  <mochi-page-content>
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

export default {
  components: {
    'mochi-page-content': MochiPageContent
  },

  fromMobx: {
    auth () { return store.auth }
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
  }
}
</script>

<style scoped lang="stylus">
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
</style>

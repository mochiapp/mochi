<template>
  <app-layout :top-title="$t('Profile')">
    <v-container fluid fill-height class="fab-parent ob-profile-container">
      <v-list dense class="pt-0">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="ob-profile-kyt">{{$t('profile:your_username')}}</div>
              <div class="ob-profile-val">{{auth.alias}}</div>
            </div>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="ob-profile-kyt">{{$t('profile:your_id')}}<span ref="gncopy" class="js-copy"><v-icon color="grey lighten-2">file_copy</v-icon></span></div>
              <div class="ob-profile-val">
                <span class="pub">{{auth.pub}}</span><br>
                <div class="expl">{{$t('profile:id_explain')}}</div>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-list>
    </v-container>
  </app-layout>
</template>

<style scoped>
.ob-profile-kyt {
  color: #888;
}

.ob-profile-val {
  font-weight: bold;
  margin-top: 4px;
}

.expl {
  font-weight: normal;
  margin-top: 4px;
  font-style: italic;
  color: #888;
}

.js-copy {
  cursor: pointer;
  margin-left: 8px;
}

.js-copy i:hover {
  color: grey !important;
}

.pub {
  word-break: break-all;
  display: inline-block;
}
</style>

<script>
import i18next from 'i18next'
import store from '@/store/stores/auth'

export default {
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
      // UIkit.notification({ message: 'Copied!', pos: 'bottom-right' })
    })
    .on('error', _ => {
      // UIkit.notification({
      //   message: 'Copy failed!',
      //   status: 'danger',
      //   pos: 'bottom-right'
      // })
    })
  }
}
</script>

<template>
  <app-layout top-title="Profile">
    <v-container fluid fill-height class="fab-parent ob-profile-container">
      <v-list dense class="pt-0">
        <b>Hi there! :-)</b><br><br>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="ob-profile-kyt">Your alias:</div>
              <div class="ob-profile-val">{{auth.alias}}</div>
            </div>
          </v-card-title>
        </v-card>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="ob-profile-kyt">Your public id:<span ref="gncopy" class="js-copy"><v-icon color="grey lighten-2">file_copy</v-icon></span></div>
              <div class="ob-profile-val">
                <span class="pub">{{auth.pub}}</span><br>
                <div class="expl">You can copy this id (by clicking the icon) and send it to someone else so they can connect with you.</div>
              </div>
            </div>
          </v-card-title>
        </v-card>
      </v-list>
    </v-container>
  </app-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
import store from '@/store/stores/auth'

export default {
  fromMobx: {
    auth () { return store.auth }
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

<template>
  <app-layout top-title="Profile">
    <div class="ob-profile">
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
              {{auth.pub}}<br>
              <div class="expl">You can copy this id (by clicking the icon) and send it to someone else so they can connect with you.</div>
            </div>
          </div>
        </v-card-title>
      </v-card>
    </div>
  </app-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ob-profile {
  margin: 16px;
}

.card {
  margin-bottom: 16px;
}

.card__title {
  padding: 8px !important;
}

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
}

.js-copy {
  cursor: pointer;
  margin-left: 8px;
}

.js-copy i:hover {
  color: grey !important;
}
</style>

<script>
export default {
  computed: {
    auth: {
      get () { return this.$store.state.auth }
    }
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

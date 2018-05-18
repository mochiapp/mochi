<template>
  <app-layout top-title="Profile">
    <div class="ob-profile">
      Hi there! :-)<br><br>
      <div class="ob-profile-kyt">Your alias:</div>
      <div class="ob-profile-val">{{auth.alias}}</div>
      <div class="ob-profile-kyt">Your public id:</div>
      <div class="ob-profile-val">
        {{auth.pub}}
        <span ref="gncopy" class="js-copy"><v-icon light>file_copy</v-icon></span>
        <br>
        <span class="expl">You can copy this id (by clicking the icon) and send it to someone else so they can connect with you.</span>
      </div>
    </div>
  </app-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ob-profile {
  margin: 16px;
}

.ob-profile-val {
  font-weight: bold;
  margin-bottom: 18px;
  margin-top: 2px;
}

.expl {
  font-weight: normal;
}

.js-copy {
  cursor: pointer;
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

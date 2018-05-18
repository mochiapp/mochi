<template>
  <app-layout top-title="Home">
    <div class="ob-profile">
      Hi there! :-)<br><br>
      <div class="ob-profile-kyt">Your alias:</div><div class="ob-profile-val">{{auth.alias}}</div>
      <div class="ob-profile-kyt">Your public id:</div><div class="ob-profile-val">{{auth.pub}}</div>
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
</style>

<script>
export default {
  computed: {
    auth: {
      get () { return this.$store.state.auth }
    }
  }
}
</script>

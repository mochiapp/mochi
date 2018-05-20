<template>
  <span>
    {{userAlias}}
  </span>
</template>

<style scoped>
span {
  color: blue;
  font-weight: 500;
}
</style>

<script>
import '@/store/modules/users'

export default {
  props: [
    'pub'
  ],

  computed: {
    userAlias () {
      var user = this.$store.getters.userByPub(this.pub, this.$store.state.users.friends, this.$store.state.auth)
      if (user) {
        return user.alias
      }
      return ''
    }
  },

  beforeCreate () {
    this.$store.dispatch('users_friends_get')
  }
}
</script>

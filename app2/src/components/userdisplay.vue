<template>
  <span class="primary--text">
    {{userAlias}}
  </span>
</template>

<style scoped>
span {
  font-weight: 500;
}
</style>

<script>
import store from '@/store/stores/users'

export default {
  props: [
    'pub'
  ],

  computed: {
    userAlias () {
      var user = store.users.getUserByPub(this.pub, store.auth)
      if (user) {
        return user.alias
      }
      return ''
    }
  },

  beforeCreate () {
    store.users.loadFriends()
  }
}
</script>

<template>
  <span class="text-bold text-primary">
    {{ userAlias }}
  </span>
</template>

<script>
import store from '../store/stores/users'

export default {
  props: {
    pub: {
      type: String,
      default: ''
    }
  },

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

<style scoped lang="stylus">
</style>

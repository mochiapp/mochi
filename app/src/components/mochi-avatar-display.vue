<template>
  <q-item-tile
    :style="getStyles"
    avatar
  >
    <img
      :src="avatar"
      :style="getStyles"
    >
  </q-item-tile>
</template>

<script>
import store from '../store/stores/users'

export default {
  props: {
    pub: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: '38px'
    }
  },

  computed: {
    avatar () {
      var user = store.users.getUserByPub(this.pub, store.auth)
      if (user) {
        return user.avatar
      }
      return ''
    },

    getStyles () { return 'width: ' + this.size + '; height: ' + this.size + ';' }
  },

  beforeCreate () {
    store.users.loadFriends()
  }
}
</script>

<style scoped lang="stylus">
</style>

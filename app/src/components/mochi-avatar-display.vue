<template>
  <q-item-tile
    :style="getStyles"
    avatar
  >
    <img
      :src="xavatar"
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

    avatar: {
      type: String,
      default: ''
    },

    size: {
      type: String,
      default: '38px'
    }
  },

  computed: {
    xavatar () {
      if (this.avatar === '') {
        var user = store.users.getUserByPub(this.pub, store.auth)
        if (user) {
          return user.avatar
        }
        return ''
      } else {
        return this.avatar
      }
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

<template>
  <div class="user row items-center">
    <mochi-avatar-display
      :pub="pub"
      :avatar="avatar"
      :size="avatarSize"
      class="avatar"
    />
    <div class="column">
      <div :class="getUserClasses">
        {{ userAlias }}
      </div>
      <mochi-time-display
        v-if="time > 0"
        :time="time"
        class="time"
      />
    </div>
  </div>
</template>

<script>
import store from '../store/stores/users'
import MochiTimeDisplay from '../components/mochi-time-display.vue'
import MochiAvatarDisplay from '../components/mochi-avatar-display.vue'

export default {
  components: {
    'mochi-time-display': MochiTimeDisplay,
    'mochi-avatar-display': MochiAvatarDisplay
  },

  props: {
    pub: {
      type: String,
      default: ''
    },

    avatar: {
      type: String,
      default: ''
    },

    time: {
      type: Number,
      default: 0
    },

    noColor: {
      type: Boolean,
      default: false
    },

    avatarSize: {
      type: String,
      default: '40px'
    }
  },

  computed: {
    userAlias () {
      var user = store.users.getUserByPub(this.pub, store.auth)
      if (user) {
        return user.alias
      }
      return ''
    },

    getUserClasses () {
      return 'username text-bold' + (this.noColor ? '' : ' text-primary')
    }
  },

  beforeCreate () {
    store.users.loadFriends()
  }
}
</script>

<style scoped lang="stylus">
@import '~variables'

.user
  margin-bottom  $flex-gutter-xs

  &.q-mb-none
    margin-bottom 0 !important

.time
  color #aaa
  font-size 11px
  margin-bottom 6px

.username
  margin-bottom 0

.avatar
  margin-right $flex-gutter-xs
</style>

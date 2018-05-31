<template>
  <div class="flex justify-center">
    <q-btn
      :label="$t('user:add_friend')"
      icon="add"
      flat
      @click="clickAdd"
    />
  </div>
</template>

<script>
import store from '../store/stores/users'

export default {
  beforeCreate () {
    this.$i18n.i18next.loadNamespaces('user')
  },

  methods: {
    clickAdd: function () {
      store.users.setAddFriendDialogState(true)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>

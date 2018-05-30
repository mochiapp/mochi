<template>
  <div class="flex justify-center">
    <q-btn flat icon="add" :label="$t('user:add_friend')" @click="clickAdd" />
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

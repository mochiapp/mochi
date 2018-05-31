<template>
  <div :class="addClass + ' lang-sel'">
    <!-- <v-select
      :items="languages"
      v-model="language"
      :label="$t('Language')"
      single-line
      v-bind="attrs"
    ></v-select> -->

    <q-select
      v-model="language"
      :options="languages"
      v-bind="attrs"
    />
  </div>
</template>

<script>
import store from '../store/stores/app'

export default {
  props: {
    addClass: {
      type: String,
      default: ''
    }
  },

  fromMobx: {
    language: {
      get () { return store.app.language },
      set (v) { store.app.setLanguage(v) }
    }
  },

  computed: {
    languages () {
      let ls = []
      ls.push({label: 'English', value: 'en-US'})
      ls.push({label: 'Nederlands', value: 'nl'})
      ls.push({label: 'عربى', value: 'ar'})
      return ls
    },

    attrs () {
      return this.addClass === 'compact' ? { hideUnderline: true, align: 'right' } : {}
    }
  }
}
</script>

<style scoped lang="stylus">
.compact
  & .q-select
    display inline-flex
    font-size 12px
    text-decoration underline
    color #888 !important
    &:hover
      color #444 !important

.lang-sel.compact /deep/
  & .q-input-target
    color #889 !important
    &:hover
      color #444 !important

  & .q-icon
    display none !important
</style>

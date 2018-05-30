<template>
  <div :class="addclass + ' ob-lang-sel'">
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
  fromMobx: {
    language: {
      get () { return store.app.language },
      set (v) { store.app.setLanguage(v) }
    }
  },

  props: [
    'addclass'
  ],

  computed: {
    languages () {
      let ls = []
      // ls.push(this.$i18n.i18next.t('English'))
      ls.push({label: 'English', value: 'en'})
      ls.push({label: 'Nederlands', value: 'nl'})
      return ls
    },

    attrs () {
      return this.addclass === 'compact' ? { hideUnderline: true, align: 'right' } : {}
    }
  }
}
</script>

<style scoped lang="stylus">
.compact
  & .q-select
    display: inline-flex;
    font-size: 12px;
    text-decoration: underline;
    color: #888 !important;
    &:hover
      color: #444 !important;
</style>
<style lang="stylus">
.ob-lang-sel.compact
  & .q-input-target
    color: #888 !important;
    &:hover
      color: #444 !important;

  & .q-icon
    display: none !important;
</style>

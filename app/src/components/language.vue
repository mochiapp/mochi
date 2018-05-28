<template>
  <div :class="addclass + ' ob-lang-sel'">
    <v-select
      :items="languages"
      v-model="language"
      :label="$t('Language')"
      single-line
      v-bind="attrs"
    ></v-select>
  </div>
</template>

<style scoped>
.card__title > div {
  width: 100%;
}
</style>
<style>
.ob-lang-sel.compact .input-group__details::after, .ob-lang-sel.compact .input-group__details::before {
  height: 0 !important;
}

.ob-lang-sel.compact .icon {
  width: 8px;
  padding: 0;
  display: none;
}

.ob-lang-sel.compact .input-group__selections__comma {
  color: #888 !important;
  font-size: 12px;
  text-decoration: underline;
  
}
.ob-lang-sel.compact .input-group__selections__comma:hover {
  color: #444 !important;
}
</style>

<script>
import store from '@/store/stores/app'

export default {
  fromMobx: {
    language: {
      get() { return store.app.language },
      set(v) { store.app.setLanguage(v) }
    }
  },

  props: [
    'addclass'
  ],

  computed: {
    languages () {
      let ls = []
      // ls.push(this.$i18n.i18next.t('English'))
      ls.push({text: 'English', value: 'en'})
      ls.push({text: 'Nederlands', value: 'nl'})
      return ls
    },

    attrs () {
      return this.addclass === 'compact' ? {dense: true, flat: true, hideDetails: true} : {}
    }
  }
}
</script>

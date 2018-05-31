<template>
  <mochi-page-content>
    <q-card>
      <q-card-main>
        <div class="q-subheading q-pb-xs">{{ $t('Language') }}</div>
        <mochi-language />
      </q-card-main>
    </q-card>

    <br>
    Language test:<br>
    <br>
    <q-datetime-picker
      value=""
      type="date"
    />

  </mochi-page-content>
</template>

<script>
import MochiLanguage from '../components/mochi-language.vue'
import MochiPageContent from '../components/mochi-page-content.vue'
import '../store/stores/app'

export default {
  components: {
    'mochi-language': MochiLanguage,
    'mochi-page-content': MochiPageContent
  }
}
</script>

<style scoped lang="stylus">
</style>

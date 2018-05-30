<template>
  <app-layout :top-title="$t('Options')">
    <v-container fluid fill-height class="fab-parent ob-options-container">
      <v-list dense class="pt-0">
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="ob-options-kyt">{{$t('Language')}}</div>
              <language />
            </div>
          </v-card-title>
        </v-card>
      </v-list>
    </v-container>
  </app-layout>
</template>

<style scoped>
.card__title > div {
  width: 100%;
}
</style>

<script>
import Language from './language.vue'
import store from '@/store/stores/app'

export default {
  components:{
    'language': Language
  }
}
</script>

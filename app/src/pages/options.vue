<template>
  <pagecontent>
    <q-card>
      <q-card-main>
        <!-- <q-list highlight> -->
          <!-- <q-list-header> -->
            <div class="q-subheading q-pb-xs">{{$t('Language')}}</div>
          <!-- </q-list-header> -->
          <!-- <q-item> -->
            <!-- <q-item-main> -->
              <language />
            <!-- </q-item-main> -->
          <!-- </q-item> -->
        <!-- </q-list> -->
      </q-card-main>
    </q-card>

    <br>
    Language test:<br>
    <br>
    <q-datetime-picker value="" type="date" />

  </pagecontent>
</template>

<script>
import Language from '../components/language.vue'
import Pagecontent from '../components/pagecontent.vue'
import '../store/stores/app'

export default {
  name: 'PageOptions',

  components: {
    'language': Language,
    'pagecontent': Pagecontent
  }
}
</script>

<style>
</style>

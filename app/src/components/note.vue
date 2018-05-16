<template>
  <app-layout top-title="Note">
    <div class="ob-note-wrapper">
          <!-- route ID: {{ $route.params.id }}<br> -->
          <template v-if="note">
            <!-- id: {{ note._id }}<br> -->
            <!-- content: {{ note.content }}<br> -->
            <cceditor v-on:editChanged="onEditChanged" :content="note.content"></cceditor>
          </template>
          <template v-else>
            Note not found.
          </template>
    </div>
  </app-layout>
</template>

<style>
.ob-note-wrapper {
  display: flex;
  height: 100%;
}
</style>

<script>
import '@/store/modules/notes'
import '@/store/modules/words'
import Editor from '@/components/editor'

let prevWords = null

export default {
  beforeCreate () {
    this.$store.dispatch('notes_get')
    this.$store.dispatch('words_get')
  },

  computed: {
    note () { return this.$store.getters.getNoteById(this.$route.params.id) }
  },

  components: {
    cceditor: Editor
  },

  methods: {
    onEditChanged (html) {
      // console.log('onEditChanged', html)
      this.$store.dispatch('notes_change', {_id: this.note._id, content: html})

      let txt = html.replace(/<(?:.|\n)*?>/gm, ' ')
      txt = txt.replace(/\s\s+/g, ' ')
      let words = txt.split(' ')
      words = words.filter((v, i, a) => a.indexOf(v) === i && v !== '')
      // console.log('words', words)

      if (!prevWords) {
        prevWords = words
      } else {
        let removedWords = prevWords.filter((i) => { return words.indexOf(i) < 0 })
        let addedWords = words.filter((i) => { return prevWords.indexOf(i) < 0 })
        prevWords = words
        this.$store.dispatch('words_change', {removed: removedWords, added: addedWords, collection: 'notes', _id: this.note._id})
      }
    }
  }
}
</script>
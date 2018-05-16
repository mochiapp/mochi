<template>
  <app-layout top-title="Notes" show-search="true" :search-string="searchString">
    <v-container fluid fill-height class="fab-parent ob-notes-container">
      <v-list dense class="pt-0">
        <template v-for="(item, index) in notesFiltered">
          <v-list-tile :key="item._id" :to="{name: 'note', params: {id: item._id}}" exact>
            <v-list-tile-content>
              <v-list-tile-title v-text="getNoteTitle(item)"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < notes.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-container>

    <div class="fab-container">
      <v-btn
        dark
        fab
        bottom
        right
        color="pink"
        v-on:click="clickAdd"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </div>
  </app-layout>
</template>

<script>
import { mapState } from 'vuex'
import '@/store/modules/notes'
import '@/store/modules/words'

export default {
  computed: {
    searchString: {
      get: function () {
        return this.$store.state.notes.searchString
      },
      set: function (val) {
        this.$store.commit('notes_update_search_string', {val: val})
      }
    },

    notesFiltered () {
      return this.$store.getters.getNotesWithString(this.$store.state.notes.searchString)
    },

    ...mapState({
      notes_test: state => {
        // console.log('notes_test aaa', state.notes)
        return state.notes.notes_test
      },

      notes: state => state.notes.notes
    })
  },

  beforeCreate () {
    this.$store.dispatch('notes_get')
    this.$store.dispatch('words_get')

    this.$root.$on('cc-toolbar-search-changed', (data) => {
      this.searchString = data.searchString
    })
  },

  methods: {
    clickAdd: function (event) {
      this.$store.commit('notes_increment')
      this.$store.dispatch('notes_add', {content: Math.random()})
    },

    getNoteTitle: function (note) {
      if (typeof note.content === 'string') {
        let txt = note.content.replace(/<(?:.|\n)*?>/gm, ' ')
        txt = txt.replace(/\s\s+/g, ' ')
        return txt.substr(0, 80)
      }
      return note.content || note
    }
  }
}
</script>

<style>
.fab-parent {
  position: relative;
}

.fab-container {
  position: absolute;
  bottom: 0;
  right: 0;
}

.fab-container v-btn {
  position: relative;
  margin-top: auto;
}

.ob-notes-container {
  align-items: flex-start !important;
  padding: 8px 0 !important;
}

.ob-notes-container > ul {
  width: 100%;
}
</style>
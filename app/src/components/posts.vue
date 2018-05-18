<template>
  <app-layout top-title="My posts" show-search="true" :search-string="searchString">
    <v-container fluid fill-height class="fab-parent ob-posts-container">
      <v-list dense class="pt-0">
        <template v-for="(item, index) in postsFiltered">
          <v-list-tile :key="item._id" :to="{name: 'post', params: {id: item._id}}" exact>
            <v-list-tile-content>
              <v-list-tile-title v-text="getPostTitle(item)"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < posts.length" :key="index"></v-divider>
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
import '@/store/modules/posts'
import '@/store/modules/words'

export default {
  computed: {
    searchString: {
      get: function () {
        return this.$store.state.posts.searchString
      },
      set: function (val) {
        this.$store.commit('posts_update_search_string', {val: val})
      }
    },

    postsFiltered () {
      return this.$store.getters.getPostsWithString(this.$store.state.posts.searchString)
    },

    ...mapState({
      posts: state => state.posts.posts
    })
  },

  beforeCreate () {
    this.$store.dispatch('posts_get')
    this.$store.dispatch('words_get')

    this.$root.$on('cc-toolbar-search-changed', (data) => {
      this.searchString = data.searchString
    })
  },

  methods: {
    clickAdd: function (event) {
      this.$store.dispatch('posts_add', {content: Math.random()})
    },

    getPostTitle: function (post) {
      if (typeof post.content === 'string') {
        let txt = post.content.replace(/<(?:.|\n)*?>/gm, ' ')
        txt = txt.replace(/\s\s+/g, ' ')
        return txt.substr(0, 80)
      }
      return post.content || post
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

.ob-posts-container {
  align-items: flex-start !important;
  padding: 8px 0 !important;
}

.ob-posts-container > ul {
  width: 100%;
}
</style>
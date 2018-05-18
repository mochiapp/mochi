<template>
  <app-layout top-title="Post">
    <div class="ob-post-wrapper">
          <!-- route ID: {{ $route.params.id }}<br> -->
          <template v-if="post">
            <!-- id: {{ post._id }}<br> -->
            <!-- content: {{ post.content }}<br> -->
            <cceditor v-on:editChanged="onEditChanged" :content="post.content"></cceditor>
          </template>
          <template v-else>
            Post not found.
          </template>
    </div>
  </app-layout>
</template>

<style>
.ob-post-wrapper {
  display: flex;
  height: 100%;
}
</style>

<script>
import '@/store/modules/posts'
import '@/store/modules/words'
import Editor from '@/components/editor'

let prevWords = null

export default {
  beforeCreate () {
    this.$store.dispatch('posts_get')
    this.$store.dispatch('words_get')
  },

  computed: {
    post () { return this.$store.getters.getPostById(this.$route.params.id) }
  },

  components: {
    cceditor: Editor
  },

  methods: {
    onEditChanged (html) {
      // console.log('onEditChanged', html)
      this.$store.dispatch('posts_change', {_id: this.post._id, content: html})

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
        this.$store.dispatch('words_change', {removed: removedWords, added: addedWords, collection: 'posts', _id: this.post._id})
      }
    }
  }
}
</script>
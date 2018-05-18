<template>
  <app-layout top-title="Timeline">
    <v-container fluid fill-height class="fab-parent ob-timeline-container">
      <v-list dense class="pt-0">
        <template v-for="(item, index) in timelineFiltered">
          <v-list-tile :key="item._id" exact>
            <v-list-tile-content>
              <v-list-tile-title v-text="getFeedTitle(item)"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider v-if="index + 1 < feed.length" :key="index"></v-divider>
        </template>
      </v-list>
    </v-container>
  </app-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ob-timeline-container {
  align-items: flex-start !important;
  padding: 8px 0 !important;
}

.ob-timeline-container > ul {
  width: 100%;
}
</style>

<script>
import { mapState } from 'vuex'
import '@/store/modules/feed'

export default {
  computed: {
    timelineFiltered () {
      return this.$store.state.feed.feed
    },

    ...mapState({
      feed: state => state.feed.feed
    })
  },

  beforeCreate () {
    this.$store.dispatch('feed_get', 'myself')
  },

  methods: {
    getFeedTitle: function (post) {
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

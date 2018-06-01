<template>
  <mochi-page-content class="timeline-container">
    <q-card>
      <q-card-main>
        <q-input
          v-model="newPostText"
          :placeholder="$t('feed:whats_on', {alias: alias})"
          type="textarea"
          rows="1"
          hide-underline
        />
        <div
          v-if="isTextInEditor"
          class="row justify-end"
        >
          <q-btn @click.stop="newPostText=''">{{ $t('Cancel') }}</q-btn>
          <div class="q-mr-md" />
          <q-btn
            color="primary"
            @click="clickSendPost()"
          >
            {{ $t('Post') }}
          </q-btn>
        </div>
      </q-card-main>
    </q-card>

    <template v-for="item in timelineFiltered">
      <q-card :key="item['_']['#']">
        <q-card-main>
          <mochi-user-display
            :pub="item['_'].meta.user"
            :time="item._time"
          />
          <div v-html="getFeedTitle(item)" />
        </q-card-main>
      </q-card>
    </template>
  </mochi-page-content>
</template>

<script>
import MochiPageContent from '../components/mochi-page-content.vue'
import i18next from 'i18next'
import {stripTags} from '../plugins/clean'
import MochiUserDisplay from '../components/mochi-user-display.vue'
import store from '../store/stores/posts'

export default {
  components: {
    'mochi-page-content': MochiPageContent,
    'mochi-user-display': MochiUserDisplay
  },

  data () {
    return {
      newPostText: ''
    }
  },

  fromMobx: {
    posts () { return [...store.posts.posts] },
    alias () { return store.auth.alias },
    timelineFiltered () {
      var ar = [...store.posts.posts]
      ar.sort(function (a, b) {
        return (a._time > b._time || (typeof a._time === 'number' && typeof b._time !== 'number'))
          ? -1 : ((b._time > a._time || (typeof b._time === 'number' && typeof a._time !== 'number')) ? 1 : 0)
      })
      return ar
    }
  },

  computed: {
    isTextInEditor () {
      return this.newPostText !== ''
    }
  },

  beforeCreate () {
    i18next.loadNamespaces('feed')
    store.users.loadFriends()
    store.posts.loadPosts('myself')
  },

  methods: {
    getFeedTitle: function (post) {
      var ret = post.content
      if (typeof ret === 'string') {
        var ret1 = ''
        while (ret1 !== ret) {
          ret1 = ret
          ret = ret.replace(/<p>[\s|<br>]*<\/p>\s*$/g, '')
        }
        ret = ret.replace(/\n/g, '<br>')
        ret = stripTags(ret)
      }
      return ret
    },

    clickSendPost: function () {
      store.posts.addPost({content: this.newPostText})
      this.newPostText = ''
    }
  }
}
</script>

<style scoped lang="stylus">
.timeline-container p
  margin-bottom 0 !important
</style>

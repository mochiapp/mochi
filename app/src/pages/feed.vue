<template>
  <pagecontent class="ob-timeline-container">
    <q-card>
      <q-card-main>
        <q-input
          v-model="newPostText"
          type="textarea"
          :placeholder="$t('feed:whats_on', {alias: alias})"
          rows="1"
          hide-underline
        />
        <div v-if="isTextInEditor" class="row justify-end">
          <q-btn @click.stop="newPostText=''">{{$t('Cancel')}}</q-btn>
          <div class="q-mr-md" />
          <q-btn color="primary" @click="clickSendPost()">{{$t('Post')}}</q-btn>
        </div>
      </q-card-main>
    </q-card>

    <template v-for="item in timelineFiltered">
      <q-card :key="item['_']['#']">
        <q-card-main>
          <div class="ob-username"><userdisplay :pub="item['_'].meta.user" /></div>
          <div class="ob-time"><timedisplay :time="item._time" /></div>
          <div v-html="getFeedTitle(item)"></div>
        </q-card-main>
      </q-card>
    </template>
  </pagecontent>
</template>

<script>
import Pagecontent from '../components/pagecontent.vue'
import i18next from 'i18next'
import {stripTags} from '../plugins/clean'
import TimeDisplay from '../components/timedisplay.vue'
import UserDisplay from '../components/userdisplay.vue'
import store from '../store/stores/posts'

export default {
  name: 'PageFeed',

  components: {
    'pagecontent': Pagecontent,
    'timedisplay': TimeDisplay,
    'userdisplay': UserDisplay
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
.ob-time
  color: #aaa;
  font-size: 11px;
  margin-bottom: 6px;

.ob-username
  margin-bottom: 0;

.ob-timeline-container p
  margin-bottom: 0 !important;
</style>

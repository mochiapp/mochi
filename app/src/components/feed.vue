<template>
  <app-layout top-title="Timeline">
    <v-container fluid fill-height class="fab-parent ob-timeline-container">
      <v-list dense class="pt-0">
        <v-card>
          <v-card-title primary-title style="display: flex; flex-direction: column;">
            <v-text-field
              :label="'What\'s on your heart, ' + alias + '?'"
              textarea
              rows=1
              auto-grow
              autofocus
              v-model="newPostText"
          ></v-text-field>
            <div v-if="isTextInEditor" style="display: flex; justify-content: flex-end; width: 100%;">
              <v-btn @click.stop="newPostText=''">Cancel</v-btn>
              <v-btn color="primary" @click="clickSendPost()">Post</v-btn>
            </div>
          </v-card-title>
        </v-card>

        <template v-for="(item, index) in timelineFiltered">
          <v-card :key="index">
            <v-card-title primary-title>
              <div>
                <div class="ob-username"><userdisplay :pub="item['_'].meta.user" /></div>
                <div class="ob-time"><timedisplay :time="item._time" /></div>
                <div v-html="getFeedTitle(item)"></div>
              </div>
            </v-card-title>
          </v-card>
        </template>
      </v-list>
    </v-container>
  </app-layout>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ob-time {
  color: #aaa;
  font-size: 11px;
  margin: 0 0 4px 0 !important;
}
</style>
<style>
.ob-timeline-container p {
  margin-bottom: 0 !important;
}

.ob-timeline-container .input-group__input {
  border: none !important;
  padding: 10px 0 0 0 !important;
  min-height: 10px !important;
}

.ob-timeline-container .input-group--textarea {
  padding: 0 !important;
  margin-bottom: -24px !important;
}

.ob-timeline-container .input-group--text-field label {
  top: 0 !important;
  left: 0 !important;
}
</style>

<script>
import TimeDisplay from './timedisplay.vue'
import UserDisplay from './userdisplay.vue'

import store from '@/store/stores/posts'

export default {
  components:{
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
      ar.sort(function(a,b) {
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

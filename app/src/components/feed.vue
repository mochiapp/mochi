<template>
  <app-layout top-title="Timeline">
    <v-container fluid fill-height class="fab-parent ob-timeline-container">
      <v-list dense class="pt-0">
        <v-card>
          <v-card-title primary-title style="display: flex; flex-direction: column;">
            <v-text-field
              :label="'What\'s on your heart, ' + this.$store.state.auth.alias + '?'"
              textarea
              rows=1
              auto-grow
              autofocus
              v-model="newPostText"
          ></v-text-field>
            <div v-if="isTextInEditor" style="display: flex; justify-content: flex-end; width: 100%;">
              <v-btn @click.stop="newPostText=''">Cancel</v-btn>
              <v-btn color="primary" @click="clickSendPost()">Send</v-btn>
            </div>
          </v-card-title>
        </v-card>

        <template v-for="(item, index) in timelineFiltered">
          <v-card>
            <v-card-title primary-title>
              <div>
                <div class="ob-username"><userdisplay :pub="item._usrpub" /></div>
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
.ob-timeline-container {
  align-items: flex-start !important;
  padding: 16px !important;
}

.ob-timeline-container > ul {
  width: 100%;
  background-color: inherit !important;
}

.card {
  margin-bottom: 16px;
}

.card__title {
  padding: 8px !important;
}

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
import { mapState } from 'vuex'
import '@/store/modules/feed'
import '@/store/modules/users'
import '@/store/modules/posts'
import TimeDisplay from './timedisplay.vue'
import UserDisplay from './userdisplay.vue'

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

  computed: {
    timelineFiltered () {
      var ar = [...this.$store.state.feed.feed]
      ar.sort(function(a,b) {
        return (a._time > b._time || (typeof a._time === 'number' && typeof b._time !== 'number'))
          ? -1 : ((b._time > a._time || (typeof b._time === 'number' && typeof a._time !== 'number')) ? 1 : 0)
      })
      return ar
    },

    isTextInEditor () {
      return this.newPostText !== ''
    },

    ...mapState({
      feed: state => state.feed.feed
    })
  },

  beforeCreate () {
    this.$store.dispatch('feed_get', 'myself')
    this.$store.dispatch('users_friends_get')
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
      this.$store.dispatch('posts_add', {content: this.newPostText})
      this.newPostText = ''
    }
  }
}
</script>

<template>
  <app-layout top-title="Timeline">
    <v-container fluid fill-height class="fab-parent ob-timeline-container">
      <v-list dense class="pt-0">
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
</style>

<script>
import { mapState } from 'vuex'
import '@/store/modules/feed'
import '@/store/modules/users'
import TimeDisplay from './timedisplay.vue'
import UserDisplay from './userdisplay.vue'

export default {
  components:{
    'timedisplay': TimeDisplay,
    'userdisplay': UserDisplay
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
      }
      return ret
    }
  }
}
</script>

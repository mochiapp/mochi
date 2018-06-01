<template>
  <mochi-page-content>
    <template v-for="item in friends">
      <q-card :key="item['_']['#']">
        <q-card-main>
          <mochi-user-display
            :pub="item.pub"
            class="q-mb-none"
          />
        </q-card-main>
      </q-card>
    </template>

    <!-- <template slot="footer">
      <div class="footer flex justify-center">
        <q-btn color="primary" icon="add" :label="$t('user:add_friend')" />
      </div>
    </template> -->

    <q-dialog
      v-model="addFriendDialogState"
      @show="onShow"
    >
      <span slot="title">{{ $t('user:add_friend') }}</span>

      <span
        slot="message"
        v-html="stripTags($t('user:ask_friend'))"
      />

      <div slot="body">
        <q-input
          ref="inp"
          v-model="searchFriendId"
          :float-label="$t('user:friend_id')"
          clearable
        />
        <br>

        <div v-if="userFound">
          <q-card>
            <q-card-main>
              <!-- <span v-html="foundUserWith"></span><br> -->
              <div class="q-subheading q-mb-md">{{ $t('user:found_user_with') }}</div>
              <div class="row items-center">
                <div class="col q-title">{{ foundUserAlias }}</div>
                <q-btn
                  color="primary"
                  @click="clickAddFriend"
                >
                  {{ $t('user:add_to_friends') }}
                </q-btn>
              </div>
            </q-card-main>
          </q-card>
        </div>
        <div v-if="userSearching">
          {{ $t('Searching_dots') }}
        </div>
      </div>

      <template
        slot="buttons"
        slot-scope="props"
      >
        <q-btn
          :label="$t('Close')"
          color="primary"
          @click="props.cancel"
        />
      </template>
    </q-dialog>
  </mochi-page-content>
</template>

<script>
import i18next from 'i18next'
import {stripTags} from '../plugins/clean'
import store from '../store/stores/users'
import MochiPageContent from '../components/mochi-page-content.vue'
import MochiUserDisplay from '../components/mochi-user-display.vue'

export default {
  components: {
    'mochi-page-content': MochiPageContent,
    'mochi-user-display': MochiUserDisplay
  },

  data () {
    return {
      dialogAddFriend: false,
      searchFriendId: ''
    }
  },

  fromMobx: {
    friends () { return [...store.users.friends] },
    userFound () { return typeof store.users.searchFriendId.res === 'object' },
    userSearching () { return store.users.searchFriendId.res === 1 },
    userSearchResult () { return store.users.searchFriendId.res },
    addFriendDialogState: {
      get () { return store.users.addFriendDialogState },
      set (v) { store.users.setAddFriendDialogState(v) }
    },
    foundUserAlias () { return store.users.searchFriendId.res.alias },
    foundUserWith () { return stripTags(i18next.t('user:found_user_with', {alias: '<b>' + store.users.searchFriendId.res.alias + '</b>', interpolation: { escapeValue: false }})) }
  },

  watch: {
    searchFriendId: function (val) {
      store.users.find({pub: val})
    }
  },

  beforeCreate () {
    i18next.loadNamespaces('user')
    store.users.loadFriends()
  },

  methods: {
    clickAdd: function (event) {
      this.dialogAddFriend = true
    },

    clickAddFriend: function (event) {
      let that = this

      var friendData = store.users.searchFriendId.res
      store.users.addFriend(friendData.pub)

      that.$q.notify({
        message: that.$i18n.i18next.t('user:added'),
        position: 'bottom',
        type: 'positive'
      })
    },

    onShow: function () {
      this.$refs.inp.focus()
    },

    stripTags: stripTags
  }
}
</script>

<style scoped lang="stylus">
.footer
  width 100%
  padding 4px
  border-top 1px solid #ddd
</style>

<template>
  <app-layout top-title="Friends">
    <v-container fluid fill-height class="fab-parent ob-friends-container">
      <v-list dense class="pt-0">
        <template v-for="item in friends">
          <v-card :key="item['_']['#']">
            <v-card-title primary-title>
              <div>
                <div v-html="getFriendTitle(item)"></div>
              </div>
            </v-card-title>
          </v-card>
        </template>
      </v-list>
    </v-container>

    <v-dialog v-model="dialogAddFriend" max-width="500px">
      <v-card>
        <v-card-title>
          Add a friend
        </v-card-title>
        <v-card-text>
          Ask your friend to send you their id and paste it here.<br>
          The id can be found in the 'Profile' page.<br>
          <br>
          <v-text-field
            label="Friend id"
            autofocus
            v-model="searchFriendId"
          ></v-text-field>
          <div v-if="userFound">
            We have found a user with that id: <b>{{userSearchResultAlias}}</b><br>
            <v-btn color="primary" v-on:click="clickAddFriend">Add this user to my friends</v-btn>
          </div>
          <div v-if="userSearching">
            Searching...
          </div>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: flex-end;">
          <v-btn color="primary" @click.stop="dialogAddFriend=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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

<style scoped>
.dialog__content .card__title {
  font-size: 16px;
  font-weight: bold;
}

.dialog__content .card__text button {
  margin-left: 0;
}

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
</style>

<script>
import store from '@/store/stores/users'

export default {
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
    userSearchResultAlias () { return store.users.searchFriendId.res.alias }
  },

  watch: {
    searchFriendId: function (val) {
      store.users.find({pub: val})
    }
  },

  beforeCreate () {
    store.users.loadFriends()
  },

  methods: {
    getFriendTitle: function (friend) {
      return friend.alias
    },

    clickAdd: function (event) {
      this.dialogAddFriend = true
    },

    clickAddFriend: function (event) {
      var friendData = store.users.searchFriendId.res
      store.users.addFriend(friendData.pub)
    }
  }
}
</script>

<template>
  <app-layout top-title="Friends">
    <v-container fluid fill-height class="fab-parent ob-friends-container">
      <v-list dense class="pt-0">
        <template v-for="(item, index) in friendsFiltered">
          <v-card>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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

.ob-friends-container {
  align-items: flex-start !important;
  padding: 16px !important;
}

.ob-friends-container > ul {
  width: 100%;
  background-color: inherit !important;
}

.card {
  margin-bottom: 16px;
}

.card__title {
  padding: 8px !important;
}
</style>

<script>
import '@/store/modules/users'

export default {
  data () {
    return {
      dialogAddFriend: false,
      searchFriendId: ''
    }
  },

  computed: {
    friendsFiltered () {
      return this.$store.state.users.friends
    },

    userFound () {
      return typeof this.$store.state.users.searchFriendId.res === 'object'
    },

    userSearching () {
      return this.$store.state.users.searchFriendId.res === 1
    },

    userSearchResult () {
      return this.$store.state.users.searchFriendId.res
    },

    userSearchResultAlias () {
      return this.$store.state.users.searchFriendId.res.alias
    }
  },

  watch: {
    searchFriendId: function (val) {
      this.$store.dispatch('users_find', {pub: val})
    }
  },

  beforeCreate () {
    this.$store.dispatch('users_friends_get')
  },

  methods: {
    getFriendTitle: function (friend) {
      return friend.alias
    },

    clickAdd: function (event) {
      this.dialogAddFriend = true
    },

    clickAddFriend: function (event) {
      console.log('clickAddFriend', this.$store.state.users.searchFriendId)
      var friendData = this.$store.state.users.searchFriendId.res
      this.$store.dispatch('users_friends_add', friendData.pub)
    }
  }
}
</script>

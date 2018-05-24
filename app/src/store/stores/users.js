import {observable, action} from 'mobx'
import store from '@/store/store'

class Users {
  @observable friends = []
  @observable searchFriendId = { src: '', res: 0 }

  @action.bound loadFriends () {
    store.subscribeData(store.getUserNode('ob/friends'), 'users/friends', {fn: this.friendRefLoaded})
  }

  @action.bound friendRefLoaded (data) {
    store.getGunUserByPub(data.data, {fn: this.friendLoaded})
    store.posts && store.posts.loadPosts(data.data) // Todo Move somewhere else?
  }

  @action.bound friendLoaded (data) {
    store.upsertArray(this.friends, data.data)
  }

  @action.bound find (data) {
    this.searchFriendId.src = data.pub
    this.searchFriendId.res = 1
    store.getGunUserByPub(data.pub, {fn: this.found})
  }

  @action.bound found (data) {
    data = data.data
    if (typeof data === 'object' && data.pub === this.searchFriendId.src) {
      this.searchFriendId.res = data
    }
  }

  @action.bound getUserByPub (pub, me) {
    if (pub === 'myself') {
      return me
    }
    return this.friends.find(user => user.pub === pub)
  }

  @action.bound addFriend (data) {
    store.addToSet(store.getUserNode('ob/friends'), data)
  }
}

store.setSubStore('users', new Users())

export default store

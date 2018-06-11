import {observable, action} from 'mobx'
import store from '../store'
import generateAvatar from '../helpers/avatar'

class Users {
  @observable friends = []
  @observable searchFriendId = { src: '', res: 0 }
  @observable addFriendDialogState = false

  @action.bound loadFriends () {
    store.subscribeData(store.getUserNode('ob/friends'), 'users/friends', {fn: this.friendRefLoaded})
  }

  @action.bound friendRefLoaded (data) {
    store.getGunUserByPub(data.data, {fn: this.friendLoaded})
    store.posts && store.posts.loadPosts(data.data) // Todo Move somewhere else?
  }

  @action.bound async friendLoaded (dat) {
    let data = dat.data
    if (!data.avatar) {
      data.avatar = await generateAvatar(data['_']['#'])
    }
    store.upsertArray(this.friends, data)
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
    if (pub === 'myself' || pub === me.pub) {
      return me
    }
    return this.friends.find(user => user.pub === pub)
  }

  @action.bound addFriend (data) {
    store.addToSet(store.getUserNode('ob/friends'), data)
  }

  @action.bound setAddFriendDialogState (data) {
    this.addFriendDialogState = data
  }
}

store.setSubStore('users', new Users())

export default store

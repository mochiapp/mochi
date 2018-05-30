import {observable, action} from 'mobx'
import store from '@/store/store'

class Posts {
  @observable posts = []

  @action.bound loadPosts (who) {
    if (who === 'myself') {
      store.subscribeData(store.getUserNode('ob/posts'), 'posts/posts/myself', {fn: this.postLoaded, addmeta: {user: who}})
      // subscribeTimeData(getUserXNode('ob/posts'), 'feed_ob/posts', {fn: commit.bind(this, '__feed_add_or_change'), usrpub: who})
    } else {
      // this.subscribeData(getUserNodeByPub(who).get('ob/posts'), 'feed_ob/posts/' + who, {fn: commit.bind(this, '__feed_add_or_change'), usrpub: who})
      store.subscribeData(store.getUserNodeByPub(who).get('ob/posts'), 'posts/posts/' + who, {fn: this.postLoaded, addmeta: {user: who}})
      // subscribeTimeData(getUserXNodeByPub(who, 'ob/posts'), 'feed_ob/posts/' + who, {fn: commit.bind(this, '__feed_add_or_change'), usrpub: who})
    }
  }

  @action.bound postLoaded (data) {
    store.upsertArray(this.posts, data.data)
  }

  @action.bound addPost (data) {
    data._time = (new Date()).getTime()
    store.addToSet(store.getUserNode('ob/posts'), data)
    // addToTimeSet(getUserXNode('ob/posts'), data)
  }
}

store.setSubStore('posts', new Posts())

export default store

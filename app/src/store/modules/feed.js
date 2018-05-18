import {subscribeData, addToSet, updateNode, getUserNode, getUserNodeByPub} from '@/store/plugins/gun'
import store from '@/store'

const state = {
  feed: []
}

const getters = {
  getFeedById: (state) => (id) => {
    return state.feed.find(feed => feed._id === id)
  }
}

const actions = {
  feed_get ({dispatch, commit, state}, data) {
    // console.log('feed_get', /* dispatch, commit, */ state)

    // if (!state.feed) {
    //   // state.feed = []
    //   commit('feed_delete_all')
    // }

    if (data === 'myself') {
      subscribeData(getUserNode('ob/posts'), 'feed_ob/posts', {fn: commit.bind(this, '__feed_add_or_change')})
    } else {
      console.log('===', data)
      subscribeData(getUserNodeByPub(data).get('ob/posts'), 'feed_ob/posts/' + data, {fn: commit.bind(this, '__feed_add_or_change')})
    }
  }
}

const mutations = {
  feed_delete_all (state) {
    // console.log('feed_delete_all')
    state.feed = []
  },

  __feed_add_or_change (state, data) {
    data = data.data

    let feed2 = [...state.feed]

    var ix = state.feed.findIndex(obj => obj._id === data._id)
    // console.log('__feed_add_or_change', ix, data)
    if (ix < 0) {
      feed2.push(data)
    } else {
      feed2[ix] = {...feed2[ix], ...data}
    }

    state.feed = feed2
  }
}

let feed = {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// store.registerModule('feed', feed, { preserveState: true })
store.registerModule('feed', feed, { preserveState: false })

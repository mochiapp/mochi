import {getUserByPub, getNode, addToSet, getUserNode, subscribeData} from '@/store/plugins/gun'
import store from '@/store'

const state = {
  friends: [],
  searchFriendId: { src: '', res: 0 }
}

const getters = {
  userByPub: (state) => (pub, users, me) => {
    if (pub === 'myself') {
      return me ? me : null
    }
    return users ? users.find(user => user.pub === pub) : null
  }
}

let friendsSubscribed = false

const actions = {
  users_friends_get ({dispatch, commit, state}) {
    // console.log('users_friends_get', /* dispatch, commit, */ state)

    if (!state.friends) {
      // state.friends = []
      commit('users_friends_delete_all')
    }

    if (!friendsSubscribed) {
      // subscribeData(getUserNode('ob/friends'), 'friends_ob/friends', {fn: commit.bind(this, '__users_friends_add_or_change')})
      subscribeData(getUserNode('ob/friends'), 'friends_ob/friends', {fn: dispatch.bind(this, '__users_friends_pub_add_or_change')})
      friendsSubscribed = true
    }
  },

  __users_friends_pub_add_or_change ({dispatch, commit, state}, data) {
    // console.log('__users_friends_pub_add_or_change', /* dispatch, commit, */ state, data)
    getUserByPub(data.data, {fn: commit.bind(this, '__users_friends_add_or_change')})
    dispatch('feed_get', data.data)
  },

  users_find ({dispatch, commit, state}, data) {
    // console.log('users_find', /* dispatch, commit, */ state, data)
    commit('users_set_search_src', data.pub)
    // subscribeData(getNode('pub/' + data.pub), 'pub/' + data.pub, {fn: commit.bind(this, '__users_found')})
    getUserByPub(data.pub, {fn: commit.bind(this, '__users_found')})
  },

  users_friends_add (state, data) {
    addToSet(getUserNode('ob/friends'), data)
  }
}

const mutations = {
  users_friends_delete_all (state) {
    // console.log('users_friends_delete_all')
    state.friends = []
  },

  __users_friends_add_or_change (state, data) {
    data = data.data

    let friends2 = [...state.friends]

    var ix = state.friends.findIndex(obj => obj._id === data._id)
    // console.log('__users_friends_add_or_change', ix, data)
    if (ix < 0) {
      friends2.push(data)
    } else {
      friends2[ix] = {...friends2[ix], ...data}
    }

    state.friends = friends2
  },

  users_set_search_src (state, val) {
    // console.log('users_set_search_src', val)
    state.searchFriendId.src = val
    state.searchFriendId.res = 1
  },

  __users_found (state, data) {
    data = data.data

    console.log('__users_found', data)
    if (typeof data === 'object' && data.pub === state.searchFriendId.src) {
      // console.log('__users_found 222')
      state.searchFriendId.res = data
    }
  }
}

let users = {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// store.registerModule('users', users, { preserveState: true })
store.registerModule('users', users, { preserveState: false })

import {subscribeData, addToSet, updateNode, getUserNode} from '@/store/plugins/gun'
import store from '@/store'

const state = {
  posts: [],
  searchString: ''
}

const getters = {
  getPostById: (state) => (id) => {
    return state.posts.find(post => post._id === id)
  },

  getPostsWithString: (state, getters) => (searchString) => {
    if (!searchString || searchString === '') {
      return state.posts
    } else {
      let postIds = getters.getWordsCollectionIdsForString({searchString, collection: 'posts'})
      return state.posts.filter(post => postIds.indexOf(post._id) >= 0)
    }
  }
}

let postsSubscribed = false

const actions = {
  posts_get ({dispatch, commit, state}) {
    // console.log('posts_get', /* dispatch, commit, */ state)

    if (!state.posts) {
      // state.posts = []
      commit('posts_delete_all')
    }

    if (!postsSubscribed) {
      subscribeData(getUserNode('ob/posts'), 'posts_ob/posts', {fn: commit.bind(this, '__posts_add_or_change')})
      postsSubscribed = true
    }
  },

  posts_add (state, data) {
    addToSet(getUserNode('ob/posts'), data)
  },

  posts_change ({dispatch, commit, state}, data) {
    var ix = state.posts.findIndex(obj => obj._id === data._id)
    if (ix >= 0) {
      updateNode(data)
    }
  }
}

const mutations = {
  posts_delete_all (state) {
    console.log('posts_delete_all')
    state.posts = []
  },

  posts_update_search_string (state, val) {
    state.searchString = val.val
  },

  __posts_add_or_change (state, data) {
    data = data.data

    let posts2 = [...state.posts]

    var ix = state.posts.findIndex(obj => obj._id === data._id)
    // console.log('__posts_add_or_change', ix, data)
    if (ix < 0) {
      posts2.push(data)
    } else {
      posts2[ix] = {...posts2[ix], ...data}
    }

    state.posts = posts2
  }
}

let posts = {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// store.registerModule('posts', posts, { preserveState: true })
store.registerModule('posts', posts, { preserveState: false })

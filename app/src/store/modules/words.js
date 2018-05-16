import {subscribeData, addToSet, getNode, getUserNode} from '@/store/plugins/gun'
import store from '@/store'
import Vue from 'vue'

const wordsPath = 'ob/words'

const state = {
  words: {}
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

function updateWordCollectionStatus (wordId, collection, itemId, newState) {
  getNode(wordId).get(collection).get(itemId).put(newState)
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

const getters = {
  getWordsCollectionIdsForString: (state, getters) => (data) => {
    let ids = []
    for (let word of Object.keys(state.words).filter(word => word.indexOf(data.searchString) >= 0)) {
      word = state.words[word]
      let col = word['__' + data.collection] || {}
      ids = [...ids, ...Object.keys(col).filter(id => col[id] === 1 && ids.indexOf(id) < 0)]

      store.dispatch('words_load_word', {word, collection: data.collection})
    }
    return ids
  }
}

/*
--------------------------------------------------------------------------
*/

const actions = {
  words_get ({dispatch, commit, state}) {
    subscribeData(getUserNode(wordsPath), 'words_' + wordsPath, {fn: commit.bind(this, '__words_add_or_change')})
  },

  words_load_word ({dispatch, commit, state}, data) {
    let word = data.word
    let collection = data.collection
    if (word[collection] && word[collection]['#']) {
      subscribeData(getNode(word[collection]['#']), 'words_' + word[collection]['#'], {fn: commit.bind(this, '__words_collection_add_or_change'), collection: collection, word: word.word})
    }
  },

  words_change ({dispatch, commit, state}, data) {
    for (let word of data.added) {
      if (typeof state.words[word] !== 'undefined') {
        updateWordCollectionStatus(state.words[word]._id, data.collection, data._id, 1)
      } else {
        addToSet(getUserNode(wordsPath), {
          word: word,
          [data.collection]: {[data._id]: 1}
        })
      }
    }

    for (let word of data.removed) {
      if (typeof state.words[word] === 'object') {
        // unsetNode(state.words[word][data.collection]['#'], data._id) // todo: Discuss with Mark.
        updateWordCollectionStatus(state.words[word]._id, data.collection, data._id, 2)
      }
    }
  }
}

/*
--------------------------------------------------------------------------
*/

const mutations = {
  __words_add_or_change (state, data) {
    data = data.data
    Vue.set(state.words, data.word, {
      ...state.words[data.word],
      ...data
    })
  },

  __words_collection_add_or_change (state, data) {
    let word = state.words[data.pdat.word]
    let collection = '__' + data.pdat.collection
    if (typeof word[collection] !== 'object') {
      Vue.set(word, collection, {})
    }
    if (data.data !== null && data.date !== 2) {
      Vue.set(word[collection], data.ky, data.data)
    } else {
      Vue.delete(word[collection], data.ky)
    }
  }
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

let words = {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// store.registerModule('words', words, { preserveState: true })
store.registerModule('words', words, { preserveState: false })

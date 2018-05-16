import {subscribeData, addToSet, updateNode, getUserNode} from '@/store/plugins/gun'
import store from '@/store'

const state = {
  notes_test: 5,
  notes: [],
  searchString: ''
}

const getters = {
  getNoteById: (state) => (id) => {
    return state.notes.find(note => note._id === id)
  },

  getNotesWithString: (state, getters) => (searchString) => {
    if (!searchString || searchString === '') {
      return state.notes
    } else {
      let noteIds = getters.getWordsCollectionIdsForString({searchString, collection: 'notes'})
      return state.notes.filter(note => noteIds.indexOf(note._id) >= 0)
    }
  }
}

let notesSubscribed = false

const actions = {
  notes_get ({dispatch, commit, state}) {
    // console.log('notes_get', /* dispatch, commit, */ state)

    if (!state.notes) {
      // state.notes = []
      commit('notes_delete_all')
    }

    if (!notesSubscribed) {
      subscribeData(getUserNode('ob/notes'), 'notes_ob/notes', {fn: commit.bind(this, '__notes_add_or_change')})
      notesSubscribed = true
    }

    commit('notes_increment')
  },

  notes_add (state, data) {
    addToSet(getUserNode('ob/notes'), data)
  },

  notes_change ({dispatch, commit, state}, data) {
    var ix = state.notes.findIndex(obj => obj._id === data._id)
    if (ix >= 0) {
      updateNode(data)
    }
  }
}

const mutations = {
  notes_delete_all (state) {
    console.log('notes_delete_all')
    state.notes = []
  },

  notes_increment (state) {
    state.notes_test++
  },

  notes_update_search_string (state, val) {
    state.searchString = val.val
  },

  __notes_add_or_change (state, data) {
    data = data.data

    let notes2 = [...state.notes]

    var ix = state.notes.findIndex(obj => obj._id === data._id)
    // console.log('__notes_add_or_change', ix, data)
    if (ix < 0) {
      notes2.push(data)
    } else {
      notes2[ix] = {...notes2[ix], ...data}
    }

    state.notes = notes2
  }
}

let notes = {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

// store.registerModule('notes', notes, { preserveState: true })
store.registerModule('notes', notes, { preserveState: false })

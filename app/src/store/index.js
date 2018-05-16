import Vue from 'vue'
import Vuex from 'vuex'
// import VuexPersistence from 'vuex-persist'

import GunPlugin from './plugins/gun'

import auth from './modules/auth'
// import notes from './modules/notes'

/*
--------------------------------------------------------------------------
*/

Vue.use(Vuex)

// const vuexLocal = new VuexPersistence({
//   // key: 'ccvx',
//   storage: window.localStorage
// })

// const vuexGunStorage = {
//   getItem: (key/* : string */) => { /* : Promise<T> */
//     console.log('vuexGunStorage getItem', key)
//   },
//   setItem: (key/* : string */, data/* : T */) => { /* : Promise<T> */
//     console.log('vuexGunStorage setItem', key, data)
//   },
//   removeItem: (key/* : string */) => { /* : Promise<void> */
//     console.log('vuexGunStorage removeItem', key)
//   },
//   clear: () => { /* : Promise<void> */
//     console.log('vuexGunStorage clear')
//   },
//   length: () => { /* : Promise<number> */
//     console.log('vuexGunStorage length')
//   },
//   key: (keyIndex/* : number */) => { /* : Promise<string> */
//     console.log('vuexGunStorage key', keyIndex)
//   }
// /*   _config?: {
//     name: string
//   } */
// }

// const vuexGun = new VuexPersistence({
//   asyncStorage: true,
//   storage: vuexGunStorage/* ,
//   restoreState: (key, storage) => {
//     console.log('vuexGun restoreState', key, storage)
//   },
//   saveState: (key, state, storage) => {
//     console.log('vuexGun saveState', key, state, storage)
//   } */
// })

let drwr = parseInt(window.innerWidth) > 639

const store = new Vuex.Store({
  state: {
    test_count: 3,

    layout: {
      drawer: drwr,
      clipped: true,
      miniVariant: false,
      vApp: {
        light: true,
        dark: false
      },
      menuItems: [{
        // icon: 'bubble_chart',
        icon: 'home',
        title: 'Home',
        routeName: 'home'
      }, {
        icon: 'dashboard',
        title: 'Test',
        routeName: 'test'
      }, {
        // icon: 'question_answer',
        icon: 'note',
        title: 'Notes',
        routeName: 'notes'
      }, {
        icon: 'lock',
        title: 'Logout',
        click: 'logout'
      }]
    }
  },
  mutations: {
    test_increment (state) {
      state.test_count++
    },

    layout_drawer (state, v) {
      state.layout.drawer = v
    },

    layout_clipped (state, v) {
      state.layout.clipped = v
    },

    layout_miniVariant (state, v) {
      state.layout.miniVariant = v
    },

    __route_changed (state) {
      if (parseInt(window.innerWidth) <= 639) {
        state.layout.drawer = false
      }
    }
  },
  actions: {
    test_init ({ commit }) {
      commit('test_increment')
    },

    route_changed ({ commit }) {
      commit('__route_changed')
    }
  },
  modules: {
    auth
  //   notes
  },
  // plugins: [vuexLocal.plugin]
  plugins: [GunPlugin]
  // plugins: [vuexGun.plugin]
})

export default store

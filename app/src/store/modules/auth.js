import {signUp, login, logout, checkSession} from '@/store/plugins/gun'

const state = {
  loggedIn: false,
  successText: '',
  errorText: '',
  pub: '',
  alias: ''
}

const getters = {
}

const actions = {
  auth_signup ({commit, state}, data) {
    // console.log('auth_signup', state, commit, data)
    signUp(data.u, data.p).then((result) => {
      commit('auth_signup_success', result)
    }).catch((reason) => {
      commit('auth_signup_fail', reason)
    })
  },
  auth_login ({commit, state}, data) {
    // console.log('auth_login', state, commit, data)
    login(data.u, data.p).then((result) => {
      commit('auth_login_success', result)
    }).catch((reason) => {
      commit('auth_login_fail', reason)
    })
  },
  auth_logout ({commit, state}, data) {
    // console.log('auth_logout', state, commit, data)
    logout().then((result) => {
      commit('auth_logout_success', result)
    }).catch((reason) => {
      commit('auth_logout_fail', reason)
    })
  },
  auth_check_session ({commit, state}, data) {
    // console.log('auth_check_session', state, commit, data)
    checkSession().then((result) => {
      commit('auth_check_session_success', result)
    }).catch((reason) => {
      commit('auth_check_session_fail', reason)
    })
  }
}

const mutations = {
  auth_signup_success (state, data) {
    state.loggedIn = false
    state.successText = 'Registration succesfull! Now please log in.'
    state.errorText = ''
    state.pub = ''
    state.alias = ''
  },
  auth_signup_fail (state, data) {
    state.loggedIn = false
    if (data.toLowerCase().indexOf('user already created') >= 0) {
      state.errorText = 'Sorry, that username is already registered!'
    } else {
      state.errorText = 'Sorry, something went wrong! (' + data + ')'
    }
    state.successText = ''
    state.pub = ''
    state.alias = ''
  },
  auth_login_success (state, data) {
    state.loggedIn = true
    state.successText = 'Login succesfull!'
    state.errorText = ''
    state.pub = data.pub
    state.alias = data.alias
  },
  auth_login_fail (state, data) {
    state.loggedIn = false
    state.errorText = 'Sorry, login failed. Please try again.'
    state.successText = ''
    state.pub = ''
    state.alias = ''
  },
  auth_check_session_success (state, data) {
    state.loggedIn = true
    state.successText = 'Auto login succesfull!'
    state.errorText = ''
    state.pub = data.pub
    state.alias = data.alias
  },
  auth_check_session_fail (state, data) {
    state.loggedIn = false
    state.errorText = ''
    state.successText = ''
    state.pub = ''
    state.alias = ''
  },
  auth_logout_success (state, data) {
    state.loggedIn = false
    state.successText = 'Logout succesfull!'
    state.errorText = ''
    state.pub = ''
    state.alias = ''
  },
  auth_logout_fail (state, data) {
    state.errorText = 'Sorry, logout failed. Please try again.'
    state.successText = ''
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}

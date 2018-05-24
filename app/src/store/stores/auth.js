import {observable, action} from 'mobx'
import store from '@/store/store'

class Auth {
  @observable loggedIn = false
  @observable successText = ''
  @observable errorText = ''
  @observable pub = ''
  @observable alias = ''

  @action.bound login (data) {
    store.login(data.u, data.p).then((result) => {
      this.setVals(true, result.alias, result.pub)
      this.successText = 'Login succesfull!'
    }).catch((reason) => {
      this.setVals(false, '', '')
      this.errorText = 'Sorry, login failed. Please try again.'
    })
  }

  @action.bound logout (data) {
    store.logout().then((result) => {
      this.setVals(false, '', '')
      this.successText = 'Logout succesfull!'
    }).catch((reason) => {
      this.successText = ''
      this.errorText = 'Sorry, logout failed. Please try again.'
    })
  }

  @action.bound register (data) {
    store.register(data.u, data.p).then((result) => {
      this.setVals(false, '', '')
      this.successText = 'Registration succesfull! Now please log in.'
    }).catch((reason) => {
      this.setVals(false, '', '')
      if (reason.toLowerCase().indexOf('user already created') >= 0) {
        this.errorText = 'Sorry, that username is already registered!'
      } else {
        this.errorText = 'Sorry, something went wrong! (' + reason + ')'
      }
    })
  }

  @action.bound checkSession (data) {
    store.checkSession().then((result) => {
      this.setVals(true, result.alias, result.pub)
      this.successText = 'Auto login succesfull!'
    }).catch((reason) => {
      this.setVals(false, '', '')
    })
  }

  @action.bound setVals (li, alias, pub) {
    this.loggedIn = li
    this.successText = ''
    this.errorText = ''
    this.pub = pub
    this.alias = alias
  }
}

store.setSubStore('auth', new Auth())

export default store

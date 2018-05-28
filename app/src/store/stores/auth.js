import '@/modules/i18n'
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
      this.successText = 'auth:login_suc'
    }).catch((reason) => {
      this.setVals(false, '', '')
      this.errorText = 'auth:login_fail'
    })
  }

  @action.bound logout (data) {
    store.logout().then((result) => {
      this.setVals(false, '', '')
      this.successText = 'auth:logout_suc'
    }).catch((reason) => {
      this.successText = ''
      this.errorText = 'auth:logout_fail'
    })
  }

  @action.bound register (data) {
    store.register(data.u, data.p).then((result) => {
      this.setVals(false, '', '')
      this.successText = 'auth:register_suc'
    }).catch((reason) => {
      this.setVals(false, '', '')
      if (reason.toLowerCase().indexOf('user already created') >= 0) {
        this.errorText = 'auth:register_user_exists'
      } else {
        this.errorText = 'auth:register_fail, {"reason": "' + reason + '"}'
      }
    })
  }

  @action.bound checkSession (data) {
    store.checkSession().then((result) => {
      this.setVals(true, result.alias, result.pub)
      this.successText = 'auth:auto_logout_suc'
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

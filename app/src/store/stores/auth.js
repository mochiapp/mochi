import '../../plugins/i18n'
import {observable, action} from 'mobx'
import store from '../store'
import generateAvatar from '../helpers/avatar'

class Auth {
  @observable loggedIn = false
  @observable successText = ''
  @observable errorText = ''
  @observable pub = ''
  @observable alias = ''
  @observable avatar = ''

  @action.bound login (data) {
    store.login(data.u, data.p).then((result) => {
      this.setVals(true, result)
      this.successText = 'auth:login_suc'
    }).catch((reason) => {
      this.setVals(false, null)
      this.errorText = 'auth:login_fail'
    })
  }

  @action.bound logout (data) {
    store.logout().then((result) => {
      this.setVals(false, null)
      this.successText = 'auth:logout_suc'
    }).catch((reason) => {
      this.successText = ''
      this.errorText = 'auth:logout_fail'
    })
  }

  @action.bound register (data) {
    store.register(data.u, data.p).then((result) => {
      this.setVals(false, null)
      this.successText = 'auth:register_suc'
    }).catch((reason) => {
      this.setVals(false, null)
      if (reason.toLowerCase().indexOf('user already created') >= 0) {
        this.errorText = 'auth:register_user_exists'
      } else {
        this.errorText = 'auth:register_fail, {"reason": "' + reason + '"}'
      }
    })
  }

  @action.bound checkSession (data) {
    store.checkSession().then((result) => {
      this.setVals(true, result)
      this.successText = 'auth:auto_logout_suc'
    }).catch((reason) => {
      this.setVals(false, null)
    })
  }

  @action.bound async setVals (li, userData) {
    this.loggedIn = li
    this.successText = ''
    this.errorText = ''
    if (userData) {
      this.pub = userData.pub
      this.alias = userData.alias
      if (!this.avatar) {
        this.avatar = await generateAvatar(this.pub)
      }
    } else {
      this.pub = ''
      this.alias = ''
    }
  }

  @action.bound setAvatar (data) {
    this.avatar = data.src
  }
}

store.setSubStore('auth', new Auth())

export default store

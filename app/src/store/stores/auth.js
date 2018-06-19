import {observable, action} from 'mobx'
import { gun } from '../../waffle/src/services'
import generateAvatar from '../helpers/avatar'
import '../../plugins/i18n'
// import store from '../store'

class Auth {
  @observable loggedIn = false
  @observable successText = ''
  @observable errorText = ''
  @observable pub = ''
  @observable alias = ''
  @observable avatar = ''

  @action.bound login (data) {
    gun.login(data.u, data.p).then((result) => {
      this.setVals(true, result)
      this.successText = 'auth:login_suc'
    }).catch((reason) => {
      this.setVals(false, null)
      this.errorText = 'auth:login_fail'
    })
  }

  @action.bound logout (data) {
    gun.logout().then((result) => {
      this.setVals(false, null)
      this.successText = 'auth:logout_suc'
    }).catch((reason) => {
      this.successText = ''
      this.errorText = 'auth:logout_fail'
    })
  }

  @action.bound register (data) {
    gun.register(data.u, data.p).then((result) => {
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
    gun.checkSession().then((result) => {
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

export default Auth

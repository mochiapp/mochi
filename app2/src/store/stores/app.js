import {i18next, i18nextInited} from '@/modules/i18n'
import {observable, action, observe} from 'mobx'
import store from '@/store/store'

class App {
  @observable drawer = parseInt(window.innerWidth) > 639
  @observable clipped = true
  @observable miniVariant = false
  @observable vApp = {
    light: true,
    dark: false
  }
  @observable language = 'en'
  @observable inited = false

  @observable menuItems = []

  constructor () {
    let that = this

    i18nextInited.then(_ => {
      that.setMenu()

      observe(that, 'language', (change) => {
        i18next.changeLanguage(change.newValue, (_err, t) => {
          that.setMenu()
        })
        window.localStorage.setItem('language', change.newValue)
      })

      // setTimeout(_ => {
      that.language = window.localStorage.getItem('language') || (window.navigator && (window.navigator.language + '')).substr(0, 2) || 'en'
      that.inited = true
      // }, 1)
    })
  }

  setMenu () {
    this.menuItems = [
      {
        icon: 'inbox',
        title: i18next.t('Timeline'),
        routeName: 'feed'
      }, {
        icon: 'group',
        title: i18next.t('Friends'),
        routeName: 'friends'
      }, {
        icon: 'face',
        title: i18next.t('Profile'),
        routeName: 'profile'
      }, {
        icon: 'settings',
        title: i18next.t('Options'),
        routeName: 'options'
      }, {
        icon: 'lock',
        title: i18next.t('Logout'),
        click: 'logout'
      }
    ]
  }

  @action.bound setDrawer (v) {
    this.drawer = v
  }

  @action.bound setClipped (v) {
    this.clipped = v
  }

  @action.bound setMiniVariant (v) {
    this.miniVariant = v
  }

  @action.bound setLanguage (v) {
    this.language = v
  }

  @action.bound routeChanged () {
    if (parseInt(window.innerWidth) <= 639) {
      this.drawer = false
    }
  }
}

store.setSubStore('app', new App())

export default store

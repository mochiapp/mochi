import {observable, action} from 'mobx'
import store from '@/store/store'

class App {
  @observable drawer = parseInt(window.innerWidth) > 639
  @observable clipped = true
  @observable miniVariant = false
  @observable vApp = {
    light: true,
    dark: false
  }

  menuItems = [
    {
      icon: 'inbox',
      title: 'Timeline',
      routeName: 'feed'
    }, {
      icon: 'group',
      title: 'Friends',
      routeName: 'friends'
    }, {
      icon: 'face',
      title: 'Profile',
      routeName: 'profile'
    }, {
      icon: 'lock',
      title: 'Logout',
      click: 'logout'
    }
  ]

  @action.bound setDrawer (v) {
    this.drawer = v
  }

  @action.bound setClipped (v) {
    this.clipped = v
  }

  @action.bound setMiniVariant (v) {
    this.miniVariant = v
  }

  @action.bound routeChanged () {
    if (parseInt(window.innerWidth) <= 639) {
      this.drawer = false
    }
  }
}

store.setSubStore('app', new App())

export default store

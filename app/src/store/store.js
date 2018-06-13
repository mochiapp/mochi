// import {GunStore} from 'waffle'
import * as services from './services'
import {GunStore} from './gun-mobx'

class Store extends GunStore {
}

const store = new Store({
  peers: 'https://rh1.breasy.site:8090/gun'
})

store.services = services

export default store

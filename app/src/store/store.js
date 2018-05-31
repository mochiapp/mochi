import {GunStore} from './gun-mobx'

class Store extends GunStore {
}

const store = new Store({
  peers: 'https://rh1.breasy.site:8090/gun'
})

export default store

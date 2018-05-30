import Movue from 'movue'
import * as mobx from 'mobx'
import {i18next} from '../plugins/i18n'
import VueI18Next from '@panter/vue-i18next'

export default ({ app, router, Vue }) => {
  Vue.use(Movue, mobx)

  Vue.use(VueI18Next)

  app.i18n = new VueI18Next(i18next)
}

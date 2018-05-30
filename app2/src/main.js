// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import AppLayout from '@/components/applayout'
import Movue from 'movue'
import * as mobx from 'mobx'
import {i18next} from '@/modules/i18n'
import VueI18Next from '@panter/vue-i18next'

/*
--------------------------------------------------------------------------
*/

Vue.use(Movue, mobx)

/*
--------------------------------------------------------------------------
*/

Vue.use(VueI18Next)

const i18n = new VueI18Next(i18next)

/*
--------------------------------------------------------------------------
*/

Vue.use(Vuetify, {
  theme: {
    primary: '#2196F3' // '#673AB7' // , // '#3f51b5',
    // secondary: '#b0bec5',
    // accent: '#8c9eff',
    // error: '#b71c1c'
  }
})

/*
--------------------------------------------------------------------------
*/

Vue.component('appLayout', AppLayout)

/*
--------------------------------------------------------------------------
*/

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  i18n: i18n
})
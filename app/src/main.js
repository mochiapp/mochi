// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.css'
import AppLayout from '@/components/applayout'

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
  store,
  template: '<App/>',
  components: { App }
})

<template>
  <span>
    <template v-if="inited">
      <template v-if="loggedIn">
        <router-view></router-view>
      </template>
      <template v-else>
        <v-app>
          <auth></auth>
        </v-app>
      </template>
    </template>
  </span>
</template>

<style>
html {
  overflow-y: hidden !important;
}

:root {
  --ob-shadow-color: rgba(0,0,0,0.07);
  --ob-shadow-top: inset 0 8px 10px -6px var(--ob-shadow-color);
  --ob-ed-font-family: "Roboto";
  --ob-ed-font-size: 14.7px;
}

.ob-content > .container {
  max-width: 582px !important;
  align-items: flex-start !important;
  padding: 16px !important;
}

.ob-content > .container > .list {
  width: 100%;
  background-color: inherit !important;
}

.ob-content > .container > .list > .card {
  margin-bottom: 16px;
}

.ob-content > .container > .list > .card > .card__title {
  padding: 8px !important;
}
</style>

<script>
import auth from '@/components/auth.vue'
import store from '@/store/stores/app'
import '@/store/stores/auth'

export default {
  name: 'app',

  components: { auth },

  data () {
    return {
      fixed: false,
      right: true,
      rightDrawer: false
    }
  },

  fromMobx: {
    inited () { return store.app.inited },
    loggedIn () { return store.auth.loggedIn }
  },

  watch: {
    $route: {
      handler () {
        store.app.routeChanged()
      }
    }
  }
}
</script>

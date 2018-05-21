<template>
  <v-app v-bind="vApp" id="ob-app" class="ob-app">
    <sidemenu></sidemenu>
    
    <div class="ob-content-wrapper">
      <topbar :top-title="topTitle" :show-search="showSearch" :search-string="searchString" :auth="auth"></topbar>

      <div class="ob-content">
        <slot></slot>
      </div>

      <!-- <v-footer :qqqfixed="'fixed'" qqqapp class="ob-footer">
        <span>&copy; 2018 OpenBook (version: {{getAppVersion()}})</span>
      </v-footer> -->
    </div>
  </v-app>
</template>

<style>
.ob-app {
  display: flex;
  height: 100vh;
}

.ob-app > div {
  min-height: 0 !important;
  flex-direction: row !important;
}

.ob-content-wrapper {
  display: flex !important;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  max-width: 100vw;
}

.ob-content {
  overflow: auto;
  flex: 1 1 auto;
  position: relative;
}

.ob-footer {
  padding: 0 16px;
  box-shadow: 0 -8px 10px -6px var(--ob-shadow-color) !important;
}
</style>

<script>
import SideMenu from '@/components/sidemenu'
import TopBar from '@/components/topbar'

export default {
  components: {
    sidemenu: SideMenu,
    topbar: TopBar
  },

  props: [
    'showSearch',
    'searchString',
    'topTitle'
  ],

  computed: {
    vApp: {
      get () { return this.$store.state.layout.vApp }
    },
    auth: {
      get () { return this.$store.state.auth }
    }
  },

  mounted () {
    // This fixes the 100vh height problem on mobiles (where 100vh is often wrong / including the address-bar)
    window.onresize = function () {
      document.getElementById('ob-app').style.height = window.innerHeight + 'px'
    }
    window.onresize()
  },

  methods: {
    getAppVersion: function () {
      return __glob_app_version_ === '==GLOBAPPVERSION==' ? 'dev' : __glob_app_version_
    }
  }
}
</script>
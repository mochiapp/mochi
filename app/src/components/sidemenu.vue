<template>
  <div class="ob-sidemenu-wrapper">
    <div
      qqqfixed
      :qqqmini-variant="miniVariant"
      :qqqclipped="clipped"
      v-model="drawer"
      qqqwidth="220"
      class="ob-sidemenu"
      qqqapp
      :style="getStyle()"
    >
      <div class="ob-sidemenu-inner">
        <div class="ob-sidemenu-header">
          <img src="@/assets/globe.svg">
          <div>OpenBook</div>
        </div>
    
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.routeName ? {name: item.routeName} : null" exact :class="getLinkClass(item)" @click="click(item.click, $event)">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <div class="ob-sidemenu-footer">
          <div>&copy; 2018 OpenBook</div>
          <div class="version">{{getAppVersion()}}</div>
        </div>
      </div>
    </div>

    <div v-if="drawer" class="ob-sidemenu-bg" v-on:click="clickBg"></div>
  </div>
</template>

<style scoped>
.list {
  flex: 1 1 auto;
}

.ob-sidemenu-footer {
  padding: 4px 16px;
  border-top: 1px solid #e8e8e8;
}

.version {
  color: #aaa;
  font-size: 10px !important;
  margin: -4px 0 0 0;
}
</style>
<style>
.ob-sidemenu-wrapper {
  display: flex;
  flex: 0 0 auto;
  z-index: 100;
}

.ob-sidemenu {
  width: 220px;
  background-color: white;
  /* box-shadow: 8px 0 10px -6px var(--ob-shadow-color); */
  border-right: 1px solid #d0d0d0;

  flex: 0 0 auto;

  /* All below to make the sidebar slide in and out nicely */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  transition: all 0.5s ease;
}

.ob-sidemenu-bg {
  display: none;
  cursor: pointer;
}

@media (max-width: 639px) {
  .ob-sidemenu {
    position: fixed !important;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 0;
  }

  .ob-sidemenu-bg {
    display: block;
    z-index: 99;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5)
  }
}

.ob-sidemenu-inner {
  width: 220px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.ob-sidemenu ul {
  margin-top: 12px;
}

.ob-sidemenu .primary--text i {
  color: inherit !important;
}

.ob-sidemenu .navigation-drawer__border {
  width: 0 !important;
}

.ob-sidemenu-header {
  height: 64px;
  width: 100%;
  /* box-shadow: 0 8px 10px -6px var(--ob-shadow-color) !important; */
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding-left: 18px;
  color: #2196F3;
}

.ob-sidemenu-header > div {
  height: 20px !important;
  background-color: inherit !important;
  font-size: 20px !important;
  font-weight: 500;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.ob-sidemenu-header > img {
  height: 28px;
  margin-right: 8px;
}

</style>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      menuItems: state => state.layout.menuItems
    }),

    drawer: {
      get () { return this.$store.state.layout.drawer },
      set (value) { this.$store.commit('layout_drawer', value) }
    },

    clipped: {
      get () { return this.$store.state.layout.clipped },
      set (value) { this.$store.commit('layout_clipped', value) }
    },

    miniVariant: {
      get () { return this.$store.state.layout.miniVariant },
      set (value) { this.$store.commit('layout_miniVariant', value) }
    }
  },

  methods: {
    click: function (fn, event) {
      if (fn === 'logout') {
        this.logout(event)
      }
    },

    clickBg: function () {
      this.drawer = !this.drawer
    },

    logout: function (event) {
      window.sessionStorage.removeItem('alias')
      window.sessionStorage.removeItem('tmp')
      this.$store.dispatch('auth_logout')
    },

    getLinkClass: function (item) {
      return this.$route.path.indexOf('/' + item.routeName) === 0 ? 'primary--text' : ''
    },

    getStyle: function () {
      let style = 'width: ' + (this.drawer ? '220px' : '0') + ';'
      style += 'border-right-width: ' + (this.drawer ? '1px' : '0') + ';'
      return style
    },

    getAppVersion: function () {
      return __glob_app_version_ === '==GLOBAPPVERSION==' ? 'dev' : __glob_app_version_
    }
  }
}
</script>
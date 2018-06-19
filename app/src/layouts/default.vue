<template>
  <q-layout view="lHh Lpr lFf">
    <template v-if="loggedIn">
      <q-layout-header key="logged-in">
        <q-toolbar
          :inverted="$q.theme === 'ios'"
          color="primary"
        >
          <q-btn
            flat
            dense
            round
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          >
            <q-icon name="menu" />
          </q-btn>

          <q-toolbar-title>
            {{ getTitle }}
            <!-- <div slot="subtitle">Running on Quasar v{{ $q.version }}</div> -->
          </q-toolbar-title>

          <router-view name="subheader"/>

          <q-btn
            flat
            no-caps
            @click="clickUser"
          >
            <mochi-user-display
              :avatar="avatar"
              pub="myself"
              class="q-mb-none"
              avatar-size="24px"
              no-color
            />
          </q-btn>
        </q-toolbar>
      </q-layout-header>

      <q-layout-footer v-if="hasFooter">
        <q-toolbar
          :xxxinverted="$q.theme === 'ios'"
          color="primary"
          inverted
        >
          <router-view name="footer"/>
        </q-toolbar>
      </q-layout-footer>

      <q-layout-drawer
        v-model="leftDrawerOpen"
        :xxxcontent-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
        class="side"
      >
        <div
          class="column"
          style="height: 100%;"
        >
          <div class="sidemenu-header">
            <img src="../assets/mochi-logo.svg">
            <div>Mochi</div>
          </div>

          <q-list
            no-border
            link
            class="col"
          >
            <!-- <q-list-header>Mochi</q-list-header> -->
            <template v-for="item in menuItems">
              <template v-if="typeof item.routeName !== 'undefined'">
                <q-item
                  :to="item.routeName ? {name: item.routeName} : null"
                  :key="item.title"
                  exact
                >
                  <q-item-side :icon="item.icon" />
                  <q-item-main
                    :label="item.title"
                    sublabel=""
                  />
                </q-item>
              </template>
              <template v-else>
                <q-item
                  :key="item.title"
                  @click.native="click(item.click, $event)"
                >
                  <q-item-side :icon="item.icon" />
                  <q-item-main
                    :label="item.title"
                    sublabel=""
                  />
                </q-item>
              </template>
            </template>
          </q-list>

          <div class="sidemenu-footer">
            <div>&copy; 2018 Mochi</div>
            <div class="version">{{ getAppVersion() }}</div>
          </div>
        </div>
      </q-layout-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </template>
    <template v-else>
      <auth key="logged-out" />
    </template>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
import Auth from '../pages/mochi-auth.vue'
import MochiUserDisplay from '../components/mochi-user-display.vue'

import store from '../store/stores/app'
import { auth } from '../store/stores'
import router from '../router'

export default {
  components: {
    'auth': Auth,
    'mochi-user-display': MochiUserDisplay
  },

  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },

  fromMobx: {
    inited () { return store.app.inited },
    loggedIn () { return auth.loggedIn },
    menuItems () { return [...store.app.menuItems] },
    langTrick () { return store.app.langTrick },
    alias () { return auth.alias },
    avatar () { return auth.avatar }
  },

  computed: {
    getTitle () {
      return this.$i18n.i18next.t(this.$route.meta.title) + (this.langTrick > 0 ? '' : '')
    },

    hasFooter () {
      return this.$route.meta && this.$route.meta.showFooter
    }
  },

  methods: {
    // openURL,

    logout: function (event) {
      auth.logout()
    },

    click: function (fn, event) {
      if (fn === 'logout') {
        this.logout(event)
      }
    },

    clickUser () {
      router.push('profile')
    },

    getAppVersion: function () {
      /* eslint camelcase: 0 */
      return __glob_app_version_ === '==GLOBAPPVERSION==' ? 'dev' : __glob_app_version_
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~variables'

.router-link-exact-active
  background-color inherit !important

.sidemenu-header
  height 50px
  width 100%
  /* box-shadow 0 8px 10px -6px var(--ob-shadow-color) !important */
  border-bottom 1px solid #e8e8e8
  display flex
  align-items center
  padding-left 18px
  // color #2196F3
  color $primary

  & > div
    height 20px !important
    background-color inherit !important
    font-size 20px !important
    font-weight 500
    line-height 1 !important
    letter-spacing 0.02em !important

  & > img
    height 28px
    margin-right $flex-gutter-sm

.sidemenu-footer
  padding $flex-gutter-xs $flex-gutter-sm
  border-top 1px solid #e8e8e8
  font-size 14px !important

.version
  color #aaa
  font-size 10px !important
  margin -4px 0 0 0

.side /deep/ .q-item:hover
  background-color inherit !important

  & .q-item-label, i
    color $primary !important

.side /deep/ .router-link-exact-active
  & .q-item-label, i
    color $primary !important
</style>

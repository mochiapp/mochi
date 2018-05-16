<template>
  <span>
    <template v-if="loggedIn">
      <router-view></router-view>

      <!-- <v-navigation-drawer
        fixed
        :mini-variant="miniVariant"
        :clipped="clipped"
        v-model="drawer"
        app
      >
        <v-toolbar flat>
          <v-list>
            <v-list-tile>
              <v-list-tile-title class="title">
                OpenBook
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-divider></v-divider>
        <v-list dense class="pt-0">
          <v-list-tile v-for="item in items" :key="item.title" :to="{name: item.routeName}" exact @click="click(item.click, $event)">
            <v-list-tile-action>
              <v-icon light v-html="item.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar fixed app :clipped-left="clipped">
        <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
        <v-btn
          icon
          light
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
        </v-btn>
        <v-btn
          icon
          light
          @click.stop="clipped = !clipped"
        >
          <v-icon>web</v-icon>
        </v-btn>
        <v-btn
          icon
          light
          @click.stop="fixed = !fixed"
        >
          <v-icon>remove</v-icon>
        </v-btn>
        <v-toolbar-title v-text="title"></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn
          icon
          light
          @click.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>menu</v-icon>
        </v-btn>
      </v-toolbar>

      <v-content>
      </v-content>

      <v-navigation-drawer
        temporary
        :right="right"
        v-model="rightDrawer"
        fixed
      >
        <v-list>
          <v-list-tile @click="right = !right">
            <v-list-tile-action>
              <v-icon light>compare_arrows</v-icon>
            </v-list-tile-action>
            <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-footer :fixed="fixed" app>
        <span>&copy; 2018</span>
      </v-footer> -->
    </template>
    <template v-else>
      <v-app>
        <auth></auth>
      </v-app>
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
</style>

<script>
  import { mapState } from 'vuex'
  import auth from '@/components/auth.vue'

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

    computed: mapState({
      loggedIn: state => state.auth.loggedIn
    }),

    watch: {
      $route: {
        handler () {
          this.$store.dispatch('route_changed')
          // this.setPageTitle(this.$route.params.page, this.navigation)
        }
      }
    }
  }
</script>

<template>
  <v-toolbar qqqfixed qqqapp flat :clipped-left="clipped" dark class="ob-topbar">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    <!-- <v-btn
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
    </v-btn> -->

    <!-- <v-toolbar-title v-text="title"></v-toolbar-title> -->

    <div class="ob-top-title">
      <!-- <v-list-tile> -->
        <!-- <v-list-tile-title class="title"> -->
          {{topTitle}}
        <!-- </v-list-tile-title> -->
      <!-- </v-list-tile> -->
    </div>

    <v-spacer></v-spacer>

    <div v-if="showSearch" class="ob-topbar-search-wrapper">
      <div class="spacer">
        <v-text-field v-if="searchOpen || searchString + '' !== ''" label="Search" single-line v-model="searchString" ref="ccSearchInput"></v-text-field>
      </div>
      <v-btn icon v-on:click="clickSearchOpen()">
        <v-icon>search</v-icon>
      </v-btn>
    </div>

    <!-- <v-btn
      icon
      light
      @click.stop="rightDrawer = !rightDrawer"
    >
      <v-icon>menu</v-icon>
    </v-btn> -->

  </v-toolbar>
</template>

<style>
.ob-topbar {
  background-color: #2196F3 !important;
  box-shadow: 0 8px 10px -6px var(--ob-shadow-color) !important;
}

.ob-topbar > div > * {
  height: 30px;
}

.ob-topbar .spacer {
  /* flex-grow: inherit !important; */
  min-width: 16px;
  /* flex: 1 1 auto; */
}

.ob-topbar input {
  caret-color: white !important;
}

.ob-top-title {
  height: 20px !important;
  background-color: inherit !important;
  font-size: 20px !important;
  font-weight: 500;
  line-height: 1 !important;
  letter-spacing: 0.02em !important;
}

.ob-topbar-search-wrapper {
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  max-width: 300px;
}

.ob-topbar-search-wrapper button {
  margin: 0;
  margin-right: -8px;
}
</style>

<script>
export default {
  data () {
    return {
      searchOpen: false
    }
  },

  props: [
    'showSearch',
    'searchString',
    'topTitle'
  ],

  computed: {
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

  watch: {
    searchString: function (val) {
      this.$root.$emit('cc-toolbar-search-changed', {searchString: val})
    }
  },

  methods: {
    clickSearchOpen () {
      if (this.searchOpen || this.searchString + '' !== '') {
        this.searchOpen = false
      } else {
        this.searchOpen = true
        setTimeout(() => {
          this.$refs.ccSearchInput.focus()
        }, 1)
      }
      if (!this.searchOpen) {
        this.searchString = ''
      }
    }
  }
}
</script>
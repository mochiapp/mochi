<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Pacifico"
      rel="stylesheet"
      type="text/css"
    >
    <div class="screen" />
    <div class="screen2">
      <div class="logincard">
        <div>
          <h1>{{ $t('auth:Welcome') }}</h1>

          <div class="tabbwrapper">
            <div
              id="tabLogin"
              :class="{ active: loginOrReg }"
              class="tabb"
              @click="clickTabb"
            >
              {{ $t('auth:Login') }}
            </div>
            <div
              id="tabRegister"
              :class="{ active: !loginOrReg }"
              class="tabb"
              @click="clickTabb"
            >
              {{ $t('auth:Register') }}
            </div>
          </div>

          <div class="logininner">
            <q-input
              id="username"
              v-model="username"
              :float-label="$t('auth:Username')"
              name="username"
            />

            <q-input
              v-model="password"
              :float-label="$t('auth:Passphrase')"
              name="password"
              type="password"
            />

            <div v-if="errorText">
              <p class="errortxt">{{ errorText }}</p>
            </div>

            <div v-if="successText">
              <p class="successtxt">{{ successText }}</p>
            </div>

            <!-- <div>
              <p>pub: {{ pub }}</p>
            </div> -->

            <div class="row">
              <q-btn
                v-if="loginOrReg"
                key="login"
                class="vbtn"
                color="primary"
                @click="clickLogin"
              >
                {{ $t('auth:Log_in') }}
              </q-btn>
              <q-btn
                v-else
                key="register"
                class="vbtn"
                color="primary"
                @click="clickRegister"
              >
                {{ $t('auth:Register') }}
              </q-btn>
            </div>

            <div class="row justify-end lnks">
              <template v-if="loginOrReg">
                <div class="lnk pw">{{ $t('auth:pass_lost') }}</div>
              </template>
              <mochi-language add-class="compact" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18next from 'i18next'
import MochiLanguage from '../components/mochi-language.vue'
import store from '../store/stores/auth'

export default {
  components: {
    'mochi-language': MochiLanguage
  },

  data () {
    return {
      hidePassword: true,
      username: '',
      password: '',
      loginOrReg: true
    }
  },

  fromMobx: {
    successText () { return i18next.t(store.auth.successText) },
    errorText () {
      let s = store.auth.errorText
      let as = s.split(', {')
      let o = {}
      if (as.length > 1) {
        s = as[0]
        try {
          o = JSON.parse('{' + as[1])
        } catch (_) {}
      }
      return i18next.t(s, o)
    },
    pub () { return store.auth.pub }
  },

  beforeCreate () {
    i18next.loadNamespaces('auth')
    store.auth.checkSession()
  },

  methods: {
    clickTabb: function (event) {
      this.$data.loginOrReg = !this.$data.loginOrReg
    },

    clickLogin: function (event) {
      store.auth.login({u: this.$data.username, p: this.$data.password})
      this.$data.password = ''
    },

    clickRegister: function (event) {
      store.auth.register({u: this.$data.username, p: this.$data.password})
      this.$data.password = ''
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~variables'

*
  box-sizing content-box

.wrapper-btns
    margin-top 15px

.logincard
    /*max-width 300px*/
    width 300px
    margin auto
    background transparent
    /*border 0px solid white*/
    box-shadow none
    padding 16px

.logininner
    background rgba(255, 255, 255, 0.8)
    padding 8px 16px 16px 16px

.screen
    display flex
    justify-content center
    align-items center
    width 100vw
    height 100vh
    /*background url("media/antigua-2042824_640.jpg")*/
    /*background url("media/sun-2307753_640.jpg")*/
    /*background linear-gradient(135deg, #9575cd 0%,#512da8 100%)*/
    /*background linear-gradient(135deg, #9575cd 38%,#512da8 99%)*/
    /*background linear-gradient(135deg, #9575cd 27%,#673ab7 100%)*/
    /* background linear-gradient(135deg, #9575cd 27%,#7e57c2 100%) */
    /* background linear-gradient(135deg, #64B5F6 27%,#2196F3 100%) */
    // background-color #64B5F6
    background-color $primary
    background-size cover
    background-repeat no-repeat
    background-attachment fixed
    background-position center
    /*filter blur(8px)*/

.screen2
    display flex
    justify-content center
    align-items center
    width 100%
    height 100%
    position absolute
    top 0
    overflow auto

h1
    font-family 'Pacifico', cursive
    font-size 40px
    font-weight normal
    text-align center
    color white
    margin-bottom 28px
    margin-top 0
    text-shadow 2px 2px 2px #757575

.tabbwrapper
    display flex

.tabb
    /*flex 1 1 auto*/
    width 50%
    text-align center
    /*float left*/
    height 40px
    display flex
    justify-content center
    align-items center
    background rgba(255, 255, 255, 0.6)
    cursor pointer

.tabb.active
    background rgba(255, 255, 255, 0.8)
    /* height 46px */
    margin-top -6px
    padding-top 6px
    font-weight bold

.vbtn
    /* width 100% */
    /* margin 0 */
    /* border-radius 0 */
    margin-top 12px
    flex 1 1 auto

.lnk
    /*float right*/
    /*text-align center*/
    cursor pointer
    text-decoration underline
    font-size 12px
    text-align right
    /* width 100% */
    /* margin 24px 0 4px 0 */
    line-height 24px

.errortxt
    color red

.successtxt
    color green

.pw
  color #888 !important
  margin-right 12px
.pw:hover
  color #444 !important

.q-input
  margin 0 0 16px 0
  padding-bottom 0

.lnks
  margin-top 16px
</style>

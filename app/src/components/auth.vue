<template>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Pacifico' rel="stylesheet" type="text/css">
    <div class="screen">
    </div>
    <div class="screen2">
      <div class="logincard">
        <div>
            <h1>Welcome!</h1>

            <div class="tabbwrapper">
                <div id="tabLogin" class="tabb" v-bind:class="{ active: loginOrReg }" @click="clickTabb">
                    Login
                </div>
                <div id="tabRegister" class="tabb" v-bind:class="{ active: !loginOrReg }" @click="clickTabb">
                    Register
                </div>
            </div>
            
            <div class="logininner">
                <v-text-field
                  v-model="username"
                  name="username"
                  label="Username"
                  id="username"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  name="password"
                  label="Passphrase or password"
                  hint="At least 9 characters"
                  min="9"
                  :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                  :append-icon-cb="() => (hidePassword = !hidePassword)"
                  :type="hidePassword ? 'password' : 'text'"
                  counter
                ></v-text-field>
                
                <div v-if="errorText">
                  <p class="errortxt">{{ errorText }}</p>
                </div>

                <div v-if="successText">
                  <p class="successtxt">{{ successText }}</p>
                </div>

                <!-- <div>
                  <p>pub: {{ pub }}</p>
                </div> -->

                <v-btn v-if="loginOrReg" class="vbtn" color="primary" @click="clickLogin">Log in</v-btn>
                <v-btn v-else class="vbtn" color="primary" @click="clickRegister">Register</v-btn>
        
                <div class="lnkwrapper" v-if="loginOrReg">
                  <p class="lnk">Password lost?</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      hidePassword: true,
      username: '',
      password: '',
      loginOrReg: true
    }
  },

  beforeCreate () {
    this.$store.dispatch('auth_check_session')
  },
  computed: mapState({
    successText: state => state.auth.successText,
    errorText: state => state.auth.errorText,
    pub: state => state.auth.pub
  }),
  methods: {
    clickTabb: function (event) {
      this.$data.loginOrReg = !this.$data.loginOrReg
    },
    clickLogin: function (event) {
      this.$store.dispatch('auth_login', {u: this.$data.username, p: this.$data.password})
      this.$data.password = ''
    },
    clickRegister: function (event) {
      this.$store.dispatch('auth_signup', {u: this.$data.username, p: this.$data.password})
      this.$data.password = ''
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: content-box;
}

.wrapper-btns {
    margin-top: 15px;
}

iron-icon {
    margin-right: 8px;
}

.logincard {
    /*max-width: 300px;*/
    width: 300px;
    margin: auto;
    background: transparent;
    /*border: 0px solid white;*/
    box-shadow: none;
    padding: 16px;
}

.logininner {
    background: rgba(255, 255, 255, 0.8);
    padding: 8px 16px 16px 16px;
}

.screen {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    /*background: url("media/antigua-2042824_640.jpg");*/
    /*background: url("media/sun-2307753_640.jpg");*/
    /*background: linear-gradient(135deg, #9575cd 0%,#512da8 100%);*/
    /*background: linear-gradient(135deg, #9575cd 38%,#512da8 99%);*/
    /*background: linear-gradient(135deg, #9575cd 27%,#673ab7 100%);*/
    /* background: linear-gradient(135deg, #9575cd 27%,#7e57c2 100%); */
    /* background: linear-gradient(135deg, #64B5F6 27%,#2196F3 100%); */
    background-color: #64B5F6;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    /*filter: blur(8px);*/
}

.screen2 {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    overflow: auto;
}

h1 {
    font-family: 'Pacifico', cursive;
    font-size: 40px;
    font-weight: normal;
    text-align: center;
    color: white;
    margin-bottom: 28px;
    margin-top: 0;
    text-shadow: 2px 2px 2px #757575;
}

.tabbwrapper {
    display: flex;
}

.tabb {
    /*flex: 1 1 auto;*/
    width: 50%;
    text-align: center;
    /*float: left;*/
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
    cursor: pointer;
}

.tabb.active {
    background: rgba(255, 255, 255, 0.8);
    /* height: 46px; */
    margin-top: -6px;
    padding-top: 6px;
    font-weight: bold;
}

.vbtn {
    width: 100%;
    margin: 0;
    border-radius: 0;
    margin-top: 12px;
}

.lnk {
    /*float: right;*/
    /*text-align: center;*/
    cursor: pointer;
    text-decoration: underline;
    font-size: 12px;
    text-align: right;
    width: 100%;
    margin: 24px 0 4px 0;
}

.errortxt {
    color: red;
}

.successtxt {
    color: green;
}
</style>
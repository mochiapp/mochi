const Gun = require('gun/gun')
require('gun/sea')

export default (service, app) => {
  function init () {
    const gunServer = `${process.env.DEFAULT_ORIGIN || window.location.origin}/gun`
    const gun = Gun([ gunServer ])
    app.set('gun', gun)
    return gun
  }

  function login (alias, pass) {
    return new Promise(function (resolve, reject) {
      const user = app.get('gun').user()
      user.auth(alias, pass, function (ack) {
        user.recall({sessionStorage: true}) // Todo This should not be needed.
        if (ack.err) reject(ack.err)
        if (ack.pub) resolve({pub: ack.pub, ack})
      })
    })
  }

  function logout () {
    return new Promise(function (resolve, reject) {
      window.sessionStorage.removeItem('alias') // Todo This should not be needed.
      window.sessionStorage.removeItem('tmp')
      const user = app.get('gun').user()
      user.leave(function (ack) { // Todo This has no callback?
        resolve()
      }).then(() => {
        resolve()
      }) // todo Catch fail?
    })
  }

  function register (alias, pass) {
    return new Promise(function (resolve, reject) {
      const user = app.get('gun').user()
      user.create(alias, pass, function (ack) {
        if (ack.err) {
          reject(ack.err)
        }
        if (ack.pub) {
          resolve({pub: ack.pub, ack})
        }
      })
    })
  }

  function checkSession () {
    return new Promise(function (resolve, reject) {
      login(window.sessionStorage.alias, window.sessionStorage.tmp)
        .then(function (props) {
          // Todo This should be changed to NOT use sessionStorage.
          // user.recall(12 * 60) .then(function (props) {
          // user.recall({sessionStorage:true}).then(function (props) {
          // const { ok, err = ''} = props
          const {err = ''} = props
          if (err) {
            reject(err)
          } else if (props.pub) {
            resolve({pub: props.pub, alias: props.ack.alias, props})
          }
        })
    })
  }

  return {
    init, login, logout, checkSession, register
  }
}

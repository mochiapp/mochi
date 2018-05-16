import '../lib/gun/gun'
import '../lib/gun/sea'

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

export default store => {
  // called when the store is initialized
  // store.subscribe((mutation, state) => {
  //   // called after every mutation.
  // })
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

var gun = Gun('https://rh1.breasy.site:8090/gun')
// var gun = Gun()
var user = gun.user()

let subscriptions = []

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

Gun.chain.unset = function (node) {
  const rel_ = Gun.val.rel._  // '#'
  const node_ = Gun.node._  // '_'
  if (this && node && node[node_] && node[node_].put && node[node_].put[node_] && node[node_].put[node_][rel_]) {
    this.put({ [node[node_].put[node_][rel_]]: null })
  }
  return this
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

gun.on('auth', function (at) {
  console.log('GUN on auth', at)
  // if('sign' === c.hash){ c.hash = '' }
  // as.route(c.hash || 'people');
})

/*
--------------------------------------------------------------------------
*/

gun.on('secure', function (at) {
  /* enforce some rules about shared app level data */

  console.log('GUN on secure', at)

  // if (!at.put || !at.put.users) { return }
  // var no
  // Gun.node.is(at.put.users, function (val, key) {
  //   Gun.SEA.read(val, false, function (val) {
  //     if ('alias/' + key === Gun.val.rel.is(val)) { return }
  //     no = true
  //   })
  //   if (no) { return no }
  // })
  // if (no) { return }
  this.to.next(at)
})

/*
--------------------------------------------------------------------------
*/

export function signUp (alias, pass) {
  // console.log('GUN signUp', alias, pass)
  return new Promise(function (resolve, reject) {
    var data = {alias, pass}
    data.born = Gun.time.is()
    // if (!data.alias || data.alias.length < 5) {
    //   console.log('Alias needs to be longer than 5 characters.')
    //   return
    // }
    // if (!data.pass || data.pass.length < 9) {
    //   console.log('Passphrase needs to be longer than 9 characters.')
    //   return
    // }
    user.create(data.alias, data.pass, function (ack) {
      // console.log('GUN signUp user.create', ack)
      if (ack.err) {
        reject(ack.err)
      }
      if (ack.pub) {
        // gun.get('users').get(data.alias).put(gun.get('alias/' + data.alias))

        // user.auth(data.alias, data.pass, undefined, function (ack) {
        resolve({pub: ack.pub, ack})
        // })
      }
    })
  })
}

/*
--------------------------------------------------------------------------
*/

export function login (alias, pass) {
  // console.log('GUN login', alias, pass)
  return new Promise(function (resolve, reject) {
    var data = {alias, pass}
    // }
    // if (!data.alias || data.alias.length < 5) {
    //   console.log('Alias needs to be longer than 5 characters.')
    //   return
    // }
    // if (!data.pass || data.pass.length < 9) {
    //   console.log('Passphrase needs to be longer than 9 characters.')
    //   return
    // }
    user.auth(data.alias, data.pass, function (ack) {
      // console.log('GUN login user.auth', ack)
      if (ack.err) {
        reject(ack.err)
      }
      if (ack.pub) {
        resolve({pub: ack.pub, ack})
      }
    })
  })
}

/*
--------------------------------------------------------------------------
*/

export function logout () {
  // console.log('GUN logout')
  return new Promise(function (resolve, reject) {
    user.leave(function (ack) {
      resolve()
    }).then(() => {
      resolve()
    })
  })
}

/*
--------------------------------------------------------------------------
*/

export function checkSession () {
  // console.log('GUN checkSession')
  return new Promise(function (resolve, reject) {
    user.recall(12 * 60).then(function (props) {
      // const { ok, err = ''} = props
      const {err = ''} = props
      if (err) {
        reject(err)
      } else if (props.pub) {
        resolve({pub: props.pub, props})
      }
    })
  })
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

export function getNode (gunPath) {
  return gun.get(gunPath)
}

/*
--------------------------------------------------------------------------
*/

export function getUserNode (gunPath) {
  return user.get(gunPath)
}

/*
--------------------------------------------------------------------------
*/

export function addToSet (node, obj) {
  node.set(obj)
}

/*
--------------------------------------------------------------------------
*/

export function updateNode (obj) {
  let id = obj._id
  let data = {...obj}
  delete data._id
  gun.get(id).put(data)
}

/*
--------------------------------------------------------------------------
*/

export function unsetNode (set, id) {
  gun.get(set).unset(gun.get(id))
}

/*
--------------------------------------------------------------------------
*/

export function subscribeData (node, subscribeKey, pdat) {
  if (subscriptions.indexOf(subscribeKey) < 0) {
    subscriptions.push(subscribeKey)

    let fn = pdat.fn
    // console.log('subscribeData', node, fn, pdat)
    node.map().on(function (dat, ky) {
      // console.log('subscribeData ON', dat, ky)
      let data = dat
      if (typeof dat === 'object' && dat !== null) {
        data = {...dat}
        if (dat['_']) {
          data._id = dat['_']['#']
          delete data._
        }
      }
      fn({data, ky, pdat})
    })
  }
}

/*
--------------------------------------------------------------------------
--------------------------------------------------------------------------
*/

// function uuidv4 () {
//   return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
//     (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
//   )
// }

// // Convert GUID string to Base-64 in Javascript
// // by Mark Seecof, 2012-03-31

// // GUID string with four dashes is always MSB first,
// // but base-64 GUID's vary by target-system endian-ness.
// // Little-endian systems are far more common.  Set le==true
// // when target system is little-endian (e.g., x86 machine).
// //
// function guidToBase64 (g, le) {
//   var hexlist = '0123456789abcdef'
//   var b64list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789&%'

//   var s = g.replace(/[^0-9a-f]/ig, '').toLowerCase()
//   if (s.length !== 32) return ''

//   if (le) {
//     s = s.slice(6, 8) + s.slice(4, 6) + s.slice(2, 4) + s.slice(0, 2) +
//     s.slice(10, 12) + s.slice(8, 10) +
//     s.slice(14, 16) + s.slice(12, 14) +
//     s.slice(16)
//   }
//   s += '0'

//   var a, p, q
//   var r = ''
//   var i = 0
//   while (i < 33) {
//     a = (hexlist.indexOf(s.charAt(i++)) << 8) |
//       (hexlist.indexOf(s.charAt(i++)) << 4) |
//       (hexlist.indexOf(s.charAt(i++)))

//     p = a >> 6
//     q = a & 63

//     r += b64list.charAt(p) + b64list.charAt(q)
//   }
//   // r += '=='

//   return r
// } // guid_to_base64()

// function generateUuid () {
//   var newId = '%'
//   var uuid = ''
//   // var tries = 0
//   while (newId.indexOf('%') >= 0 || newId.indexOf('&') >= 0) {
//     uuid = uuidv4()
//     newId = guidToBase64(uuid)
//     // tries++
//   }
//   // console.log('tries', tries)
//   // console.log('uuidv4', uuid)
//   // console.log('new id', newId)

//   return newId
// }

// /*
// --------------------------------------------------------------------------
// */

// export {generateUuid}

export function loadExternalJs (fn) {
  let sc = document.createElement('script')
  sc.setAttribute('src', fn)
  document.head.appendChild(sc)
}

export function waitVarExists (vn) {
  return new Promise((resolve, reject) => {
    function wait () {
      if (typeof window[vn] !== 'undefined') {
        resolve(window[vn])
      } else {
        setTimeout(wait, 10)
      }
    }
    wait()
  })
}

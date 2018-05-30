import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'

i18next.use(XHR).init({
  // debug: true,
  lng: 'en',
  fallbackLng: 'en',
  defaultNS: 'common',
  fallbackNS: 'common',
  ns: ['common'],
  backend: {
    loadPath: '/statics/i18n/{{lng}}/{{ns}}.json'
  }
})

let i18nextInited = new Promise(function (resolve, reject) {
  i18next.on('initialized', function (options) {
    resolve()
  })
})

export {i18next, i18nextInited}

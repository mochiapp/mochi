export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'feed', component: () => import('pages/mochi-feed'), meta: { title: 'Timeline' } },
      {
        path: 'friends',
        name: 'friends',
        components: {
          default: () => import('pages/mochi-friends'),
          // footer: () => import('pages/friendsfooter'),
          subheader: () => import('pages/mochi-friends-subheader')
        },
        meta: {
          title: 'Friends' // ,
          // showFooter: true
        }
      },
      { path: 'options', name: 'options', component: () => import('pages/mochi-options'), meta: { title: 'Options' } },
      { path: 'profile', name: 'profile', component: () => import('pages/mochi-profile'), meta: { title: 'Profile' } },
      { path: 'debug', name: 'debug', component: () => import('pages/mochi-debug'), meta: { title: 'Debug' } },
      { path: 'test', name: 'test', component: () => import('pages/mochi-test'), meta: { title: 'Test' } }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

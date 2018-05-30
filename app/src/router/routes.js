export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', name: 'feed', component: () => import('pages/feed'), meta: { title: 'Feed' } },
      {
        path: 'friends',
        name: 'friends',
        components: {
          default: () => import('pages/friends'),
          // footer: () => import('pages/friendsfooter'),
          subheader: () => import('pages/friendssubheader')
        },
        meta: {
          title: 'Friends' // ,
          // showFooter: true
        }
      },
      { path: 'options', name: 'options', component: () => import('pages/options'), meta: { title: 'Options' } },
      { path: 'profile', name: 'profile', component: () => import('pages/profile'), meta: { title: 'Profile' } }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]

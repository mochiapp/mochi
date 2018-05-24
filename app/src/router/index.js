import Vue from 'vue'
import Router from 'vue-router'
const Profile = () => import('@/components/profile.vue') // Will be loaded async / only when needed.
const Friends = () => import('@/components/friends.vue')
const Feed = () => import('@/components/feed.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/friends',
      name: 'friends',
      component: Friends
    },
    {
      path: '/',
      name: 'feed',
      component: Feed
    }
  ]
})

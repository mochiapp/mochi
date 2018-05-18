import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Home = () => import('@/components/home.vue') // Will be loaded async / only when needed.
const Test = () => import('@/components/test.vue')
const Posts = () => import('@/components/posts.vue')
const Post = () => import('@/components/post.vue')
const Profile = () => import('@/components/profile.vue')
const Friends = () => import('@/components/friends.vue')
const Feed = () => import('@/components/feed.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    },
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

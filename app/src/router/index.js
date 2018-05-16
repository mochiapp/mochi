import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
const Home = () => import('@/components/home.vue') // Will be loaded async / only when needed.
const Test = () => import('@/components/test.vue')
const Notes = () => import('@/components/notes.vue')
const Note = () => import('@/components/note.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/notes',
      name: 'notes',
      component: Notes
    },
    {
      path: '/notes/:id',
      name: 'note',
      component: Note
    }
  ]
})

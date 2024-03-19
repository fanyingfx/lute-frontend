import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ReadingView from '@/views/ReadingView.vue'
import DictView from '@/views/DictView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: HomeView
    },
    {
      path: '/reading/:bookId',
      name: 'reading',
      component: ReadingView
    },
    {
      path: '/',
      redirect: '/home'
    },
    { path: '/dict', name: 'dict', component: DictView }
  ]
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa/qa.vue')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video/video.vue')
      },

      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my.vue')
      },
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    props: true //开启props传参
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile'),
    props: true //开启props传参
  },
]

const router = new VueRouter({
  routes
})

export default router

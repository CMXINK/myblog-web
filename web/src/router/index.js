import Vue from 'vue'
import VueRouter from 'vue-router'
import Prev from '@/views/prev/Prev'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Prev',
    component: Prev
  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

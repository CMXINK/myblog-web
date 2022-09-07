import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Prev',
    component: () => import('@/views/prev/Prev')
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue'),
    redirect: '/home/new',
    children: [{
      path: '/home/new',
      name: 'singleArticle',
      component: () => import('../components/singleArticle/SingleArticle.vue')
    }, {
      path: '/home/list',
      name: 'articleList',
      component: () => import('../components/list/List.vue')
    }
    ]
  },
  {
    path: '/writeArticle',
    name: 'writeArticle',
    component: () => import('../views/writeArticle/WriteArticle.vue')
  },
  {
    path: '/cardList',
    name: 'cardList',
    component: () => import('../views/cardList/cardList.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router

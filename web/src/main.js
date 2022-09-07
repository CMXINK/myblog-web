import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { service, baseURL } from './utils/API'
import store from '@/store'
// 引入插件
import VueLazyload from 'vue-lazyload'

// animate 全局指令, 进入可视区域添加动画
Vue.directive('animate', {
  inserted: function (el, binding) {
    // 聚焦元素
    binding.addClass = () => {
      const { top } = el.getBoundingClientRect()
      const h = document.documentElement.clientHeight || document.body.clientHeight
      if (top < h) {
        if (el.className.indexOf(binding.value) === -1) {
          el.className = binding.value + ' ' + el.className
        }
        if (binding.addClass) {
          window.removeEventListener('scroll', binding.addClass)
        }
      }
    }
    window.addEventListener('scroll', binding.addClass, true)
    binding.addClass()
  },
  unbind: function (el, binding) {
    if (binding.addClass) {
      window.removeEventListener('scroll', binding.addClass)
    }
  }
})
// 懒加载图片
Vue.use(VueLazyload, {
  // loading: 'https://www.keaidian.com/uploads/allimg/190424/24110307_8.jpg' // 懒加载默认图片
})

library.add(fas, fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$http = service
Vue.prototype.$baseurl = baseURL
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

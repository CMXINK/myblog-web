import Vue from 'vue'
import Vuex from 'vuex'
import writeArticleOptions from './writeArticleOptions'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    writeArticleOptions
  }
})

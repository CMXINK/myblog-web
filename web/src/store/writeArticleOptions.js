export default {
  namespaced: true,
  actions: {},
  mutations: {
    contentSetter(state, value) {
      state.content = value
    }
  },
  state: {
    title: '', // 标题,
    description: '', // 描述
    cover: '', // 封面
    isPublic: '', // 是否发布
    date: '', // 发布日期
    content: '', // 文章内容
    isOverhead: '', // 是否顶置
    loverNum: '' // 喜欢的数量
  }
}

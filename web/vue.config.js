module.exports = {
  // 配置代理服务器, 用于解决跨域问题

  /*
  //  这种方式仅能配置一台代理服务器, 且当可以在public找到文件时优先拿去public下的文件作为请求内容返回
  devServer: {
    proxy: 'http://localhost:4000'
  },
  */

  devServer: {
    // 通过设置不同的请求前缀来控制是否走代理服务器及配置多台代理服务器
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5000', // 代理的目标的基础路径
        ws: true, // 是否开启WebSocket
        changeOrigin: true, // 设置为true时代理服务的host 值为 5000(与目标服务器端口号保持一致), 设置为 false host时值为8080(如果目标服务器设置了限制,可能会导致无法请求失败),
        pathRewrite: { '^/api': '' } // 必须配置, 用于解决请求替换到请求前缀(这里的请求前缀是'/api')
      }
    }
  }

}

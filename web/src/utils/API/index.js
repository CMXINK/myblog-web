import axios from 'axios'
import qs from 'qs'
import { MessageBox, Loading } from 'element-ui'

let loading
let loadingNum = 0 //  内存中正在请求的数量
const baseURL = 'http://localhost:8080/api' // productURL

// const bgcGroup = [
//   'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
//   'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)',
//   'linear-gradient(0deg, #08AEEA 0%, #2AF598 100%)',
//   'linear-gradient(90deg, #FEE140 0%, #FA709A 100%)',
//   'linear-gradient(203deg, #7b90e5 0%, #70d0db 19%, #ccc70f 39%, #edc1c1 60%, #f5c2c2 80%, #c487ef 100%)',
//   'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
//   'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
//   'linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)'
// ]

function startLoading() {
  if (loadingNum === 0) {
    loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      background: 'rgba(0,0,0,0.5)',
      target: document.querySelector('.content'),
      color: '#fff'
    })
    endLoading()
  }
  loadingNum++
}

function endLoading() { //  关闭加载动画
  loadingNum--
  if (loadingNum <= 0) {
    loading.close()
    startLoading()
  }
}

/*
  baseURL：基本地址
  所有发送到后端的请求都会经过这里，然后在访问的url前拼接上baseURL，从而获得真正的访问地址
  举例：  url: /request
       经过这里后，与baseURL进行拼接，变成：baseURL/request
  所以在使用封装的Axios时，url只需写baseURL后的地址即可
*/
const service = axios.create({
  baseURL: process.env.API_ROOT, //  基本地址
  responseType: 'json',
  withCredentials: true, //  允许跨域设置，不然可能因为拿不到cookie而报错
  timeout: 1000 * 10 //  设置请求超时时间，单位为毫秒
})

/*
  环境的切换，可以根据不同的环境设置不同的请求基本地址
  根据需要进行修改即可
*/
if (process.env.NODE_ENV === 'development') {
  service.defaults.baseURL = baseURL
} else if (process.env.NODE_ENV === 'debug') {
  // service.defaults.baseURL = 'http://192.168.74.1:8888/'
} else if (process.env.NODE_ENV === 'production') {
  service.defaults.baseURL = 'http://192.168.74.1:8888/'
}

//  请求拦截器
service.interceptors.request.use(
  config => {
    startLoading() //  打开加载动画
    if (config.meth === 'post' && !(config.data instanceof FormData)) {
      config.data = qs.stringify(config.data, {
        arrayFormat: 'repeat' //  后端要求传数组的时候做的设置
      })
    }

    // 将token放到请求头中发送给服务器
    if (window.localStorage.getItem('token')) {
      config.headers.common['Access-Token'] = window.localStorage.getItem('token')
    }

    return config
  },
  error => {
    return Promise.error(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    endLoading() //  关闭加载动画

    /*
          如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
          否则的话抛出错误
        */
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },

  /*
      服务器状态码不是2开头的的情况
        要和后台统一的错误状态码
        然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    */
  error => {
    // endLoading() //  关闭加载动画
    if (error && error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          MessageBox({
            message: '未授权，请重新登录',
            type: 'error',
            title: '提示'
          })
          break
        case 402:
          MessageBox({
            message: '登录过期，请重新登录',
            type: 'error',
            title: '提示'
          })
          break
        case 403:
          MessageBox({
            message: '拒绝访问',
            type: 'error',
            title: '提示'
          })
          break
        case 404:
          MessageBox({
            message: '网络请求不存在',
            type: 'error',
            title: '提示'
          })
          break
        case 405:
          MessageBox({
            message: '请求方法不允许',
            type: 'error',
            title: '提示'
          })
          break
        case 408:
          MessageBox({
            message: '请求超时，请稍后再试',
            type: 'error',
            title: '提示'
          })
          break
        case 429:
          MessageBox({
            message: '服务器繁忙，请稍后再试',
            type: 'error',
            title: '提示'
          })
          break
        case 500:
          MessageBox({
            message: '服务器端错误',
            type: 'error',
            title: '提示'
          })
          break
        case 501:
          MessageBox({
            message: '网络未实现',
            type: 'error',
            title: '提示'
          })
          break
        case 502:
          MessageBox({
            message: '网络错误',
            type: 'error',
            title: '提示'
          })
          break
        case 503:
          MessageBox({
            message: '服务不可用',
            type: 'error',
            title: '提示'
          })
          break
        case 504:
          MessageBox({
            message: '网络超时',
            type: 'error',
            title: '提示'
          })
          break
        case 50:
          MessageBox({
            message: 'http版本不支持该请求',
            type: 'error',
            title: '提示'
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          MessageBox({
            message: '服务器内部错误，请稍后再试',
            type: 'error',
            title: '提示'
          })
      }
      return Promise.reject(error)
    }
  }
)

export { service, baseURL }

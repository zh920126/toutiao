// 引入axios
import axios from 'axios'
// 引入提示
import { Toast } from 'vant'
// 定义一个baseURL
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 将基准路径存起来
localStorage.setItem('baseURL', 'http://127.0.0.1:3000')

// 添加拦截器
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // console.log(config)
  // 如果有token，就将token值添加到请求头中去，避免后面每次请求都需要添加一次token
  const token = localStorage.getItem('toutiao-Authorization')
  // 判断是否有token
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log(response)
  // 在响应的时候如果没有token值就需要重定向到login页面
  if (response.data.message === '用户信息验证失败') {
    // 提示用户
    Toast({
      type: 'fail',
      message: '登录过期，请重新登录'
    })
    // 就需要重定向到登录页面
    window.location = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 向外暴露
export default axios

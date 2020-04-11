// 引入axios
import axios from '../utils/myaxios.js'

// 向外暴露接口
// 登录接口
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 注册接口
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

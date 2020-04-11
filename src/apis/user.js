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

// 根据ID来获取用户的数据
export const getUserInfoById = (id) => {
  return axios({
    method: 'get',
    // 需要验证token,必须在请求头中设置
    // 在拦截器里面已经添加了token值，因此路由中就不需要再次添加了
    // headers: { Authorization: localStorage.getItem('toutiao-Authorization') },
    url: `/user/${id}`
  })
}

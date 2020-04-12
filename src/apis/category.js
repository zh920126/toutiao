// 引入axios
import axios from '@/utils/myaxios.js'

// 获取全部的文章分类列表
export const getAllCategory = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}

// 根据ID来获取单项的数据
export const getOnecategory = (params) => {
  return axios({
    method: 'get',
    url: '/post',
    params
  })
}

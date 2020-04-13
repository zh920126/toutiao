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
// 根据文章的ID来获取文章的详情
export const getDetailById = (id) => {
  return axios({
    method: 'get',
    url: `/post/${id}`
  })
}

// 关注用户
export const userFollow = (id) => {
  return axios({
    method: 'get',
    url: `/user_follows/${id}`
  })
}

// 取消用户关注
export const unuserFollow = (id) => {
  return axios({
    method: 'get',
    url: `/user_unfollow/${id}`
  })
}
// 点赞文章
export const postlike = (id) => {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}

// 用户关注列表
export const userfollows = () => {
  return axios({
    method: 'get',
    url: '/user_follows'
  })
}

// 收藏文章
export const myStar = (id) => {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}

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

// 获取用户收藏文章的列表
export const userStar = () => {
  return axios({
    type: 'get',
    url: '/user_star'
  })
}

// 获取评论列表
export const comment = (id) => {
  return axios({
    type: 'get',
    url: `/post_comment/${id}`
  })
}

// 发布评论
export const publishComment = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}

// 搜索文章
export const searchPost = (keyword) => {
  return axios({
    method: 'get',
    url: '/post_search',
    params: {
      keyword
    }
  })
}

// 搜索推荐
export const searchRecommend = () => {
  return axios({
    type: 'get',
    url: '/post_search_recommend'
  })
}

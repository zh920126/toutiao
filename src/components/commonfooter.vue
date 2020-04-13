<template>
  <div class="commonfooter">
    <div class="box1" v-show="isShow">
      <input type="text" placeholder="写跟帖" @click="getFocus">
      <div class="comment" @click="goTocomments">
        <van-icon class="iconfont" name="comment-o" />
        <span>{{post.comment_length}}</span>
      </div>
      <van-icon class="iconfont" :class="{red:post.has_star}" name="star-o" @click="getstar"/>
      <van-icon class="iconfont" name="cluster-o" />
    </div>
    <div class="demo" v-show="!isShow">
      <textarea ref="textareafocus" :placeholder="placeholder"></textarea>
      <div class="btns">
        <p @click="cancle">取消</p>
        <p @click="sendComment">发送</p>
      </div>
    </div>
  </div>
</template>

<script>
import { myStar, publishComment } from '@/apis/category.js'

import { Toast } from 'vant'
export default {
  props: ['post', 'replayobj'],
  data () {
    return {
      isShow: true,
      isStar: false,
      id: '',
      placeholder: ''
    }
  },
  watch: {
    // 对于父组件点击回复时，传递过来的数据进行监听
    replayobj () {
      // console.log(this.replayobj)
      // 监听到数据之后，就需要提起文本域
      if (this.replayobj) {
        this.isShow = false
        this.placeholder = '@' + this.replayobj.user.nickname
        // 在vue中让文本域获得焦点必须使用异步操作
        setTimeout(() => {
          this.$refs.textareafocus.focus()
        }, 0)
      }
    }
  },
  methods: {
    // 发布评论
    async sendComment () {
      const obj = {
        content: this.$refs.textareafocus.value,
        parent_id: this.replayobj.id || null
      }
      const res = await publishComment(this.post.id, obj)
      // console.log(res)
      if (res.data.message === '评论发布成功') {
        Toast({
          type: 'success',
          message: res.data.message
        })
        // 让文本框里面的内容为空
        this.$refs.textareafocus.value = ''
        this.isShow = true
        // 同时要告诉父组件，让他刷新页面
        this.$emit('refresh')
        // 让页面滚动到顶部
        window.scrollTo(0, 0)
      }
    },
    // 跳转到评论详情页面时，需要带上文章的ID信息
    goTocomments () {
      this.$router.push({ path: `/comments/${this.post.id}` })
    },
    // 文章收藏
    async getstar () {
      console.log(this.post)
      const res = await myStar(this.post.id)
      console.log(res)
      if (res.data.message === '收藏成功') {
        // 提示用户
        Toast({
          type: 'success',
          message: '收藏成功'
        })
        this.post.has_star = true
      } else {
        Toast({
          type: 'success',
          message: '取消收藏成功'
        })
        this.post.has_star = false
      }
    },
    getFocus () {
      this.isShow = !this.isShow
      // 同时让文本域自动获取焦点
      setTimeout(() => {
        this.$refs.textareafocus.focus()
      }, 0)
    },
    cancle () {
      this.isShow = !this.isShow
      // 取消的时候要告诉父组件取消了这个事件，否则不能被再次调起
      this.$emit('cancleobj')
    }
  }
}
</script>

<style lang="less" scoped>
.red{
    color: red!important;
  }
  .commonfooter{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    padding: 10px 20px;
    box-sizing: border-box;
    background: #f2f2f2;
   .box1{
     width: 100%;
     display: flex;
     justify-content: space-between;
    align-items: center;
      input{
      flex: 4;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      border: none;
      background-color: #ccc;
      padding-left: 20px;
      margin-right: 20px;
      font-size: 14px;
    }
    .comment{
      flex: 1;
      position: relative;
      span{
        position: absolute;
        top: -6px;
        right: 12px;
        padding: 0 7px;
        height:15px;
        line-height: 15px;
        border-radius: 15px;
        background: red;
        color: #fff;
      }
    }
    .iconfont{
      flex: 1;
      font-size: 20px;
    }
   }
   .demo{
     width: 100%;
     height: 100px;
     display: flex;
     textarea{
       flex: 3;
     }
     .btns{
       flex: 1;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       align-items: center;
       resize: none;
       p{
         margin-right: 15px;
         padding: 5px 10px;
         border-radius: 15px;
         background: red;
       }
     }
   }
  }
</style>

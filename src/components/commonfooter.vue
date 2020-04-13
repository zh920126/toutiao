<template>
  <div class="commonfooter">
    <div class="box1" v-if="isShow">
      <input type="text" placeholder="写跟帖" @focus="getFocus">
      <van-icon class="iconfont" name="comment-o" />
      <van-icon class="iconfont" :class="{red:post.has_star}" name="star-o" @click="getstar"/>
      <van-icon class="iconfont" name="cluster-o" />
    </div>
    <div class="demo" v-else>
      <textarea></textarea>
      <div class="btns">
        <p @click="cancle">取消</p>
        <p>发送</p>
      </div>
    </div>
  </div>
</template>

<script>
import { myStar } from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  props: ['post'],
  data () {
    return {
      isShow: true,
      isStar: false
    }
  },
  methods: {
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
    },
    cancle () {
      this.isShow = !this.isShow
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
    width: 100%;
    padding: 10px 20px;
   .box1{
     width: 100%;
     display: flex;
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
    .iconfont{
      flex: 1;
      &:last-child{
        margin-right: 10px;
      }
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

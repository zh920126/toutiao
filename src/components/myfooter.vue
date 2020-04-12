<template>
  <div class="myfooter">
    <div class="box1" v-if="isShow">
      <input type="text" placeholder="写跟帖" @focus="getFocus">
      <van-icon class="iconfont" name="comment-o" />
      <van-icon class="iconfont" name="star-o" />
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
export default {
  data () {
    return {
      isShow: true
    }
  },
  methods: {
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
  .myfooter{
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

<template>
  <div class="focus">
      <myheader title='我的关注'>
          <van-icon slot="left" name="arrow-left" @click="$router.back()"/>
      </myheader>
      <div class="list" v-for="(value,index) in userfollow" :key="index">
          <div class="box">
              <img :src="value.head_img" alt="">
              <div class="center">
                  <p>{{value.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="canclefollow(value.id)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { userfollows, unuserFollow } from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      userfollow: []
    }
  },
  components: {
    myheader
  },
  methods: {
    // 取消关注
    async canclefollow (id) {
      // console.log(123)
      console.log(id)
      const res = await unuserFollow(id)
      // console.log(res)
      if (res.data.message === '取消关注成功') {
        // 提示
        Toast({
          type: 'success',
          message: '取消关注成功'
        })
        this.userfollow.forEach((value, index) => {
          if (id === value.id) {
            this.userfollow.splice(index, 1)
          }
        })
      } else {
        Toast({
          type: 'fail',
          message: '取消关注失败'
        })
      }
    }
  },
  async created () {
    const res = await userfollows()
    // console.log(res)
    this.userfollow = res.data.data
    // 将数据进行改造
    this.userfollow.forEach(value => {
      value.head_img = localStorage.getItem('baseURL') + value.head_img
    })
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>

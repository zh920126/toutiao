<template>
  <div class="mystar">
    <myheader title="我的收藏">
      <van-icon name="arrow-left" slot="left" @click="$router.go(-1)"/>
    </myheader>
    <div class="list" v-for="(value,index) in userStar" :key="index">
          <div class="box">
              <img :src="value.user.head_img" alt="">
              <div class="center">
                  <p>{{value.user.nickname}}</p>
                  <span>2019-9-9</span>
              </div>
              <span @click="unUserStar(value.user.id,index)">取消收藏</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { userStar, myStar } from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      userStar: []
    }
  },
  methods: {
    async unUserStar (id, index) {
      // 根据ID来取消收藏
      const res = await myStar(id)
      console.log(res)
      if (this.userStar.length > 0 && res.data.message === '取消成功') {
        Toast({
          type: 'success',
          message: '取消成功'
        })
        // 根据index索引来删除对应的数据
        this.userStar.splice(index, 1)
      }
    }
  },
  // 根据用户的ID来获取用户收藏的数据
  async created () {
    const res = await userStar()
    console.log(res)
    this.userStar = res.data.data
    // 需要对数据进行改造
    this.userStar.forEach((value, index) => {
      value.user.head_img = localStorage.getItem('baseURL') + value.user.head_img
    })
  },
  components: {
    myheader
  }
}
</script>

<style lang="less" scoped>
.mystar{
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
            margin-right: 15px;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
  }
}
</style>

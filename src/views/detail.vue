<template>
<!-- 显示文本 -->
  <div class="detail" v-if="article.type===1">
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <p @click="attention" :class="{red:Isattention===true}">{{attentionv}}</p>
    </div>
    <div class="contain">
      <h2>{{article.title}}</h2>
      <p>
        <span>{{article.user.nickname}}</span>
        <span>2019-10-10</span>
      </p>
      <div class="content" v-html="article.content"></div>
      <div class="dianzan">
        <p @click="postlike">
          <van-icon name="good-job-o" />
          <span>{{article.comment_length}}</span>
        </p>
        <p>
          <van-icon name="chat" color="green"/>
          <span>微信</span>
        </p>
      </div>
    </div>
    <myfooter class="myfooter"></myfooter>
  </div>
  <!-- 显示视频 -->
  <div class="detail-video" v-else>
    <div class="header">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>

    </div>
    <video controls :poster="article.cover[0].url" src="https://video.pearvideo.com/mp4/adshort/20200412/cont-1668333-15077311_adpkg-ad_hd.mp4"></video>
    <div class="head">
      <p>
        <img :src="article.user.head_img" alt="">
        <span>{{article.user.nickname}}</span>
      </p>
      <p>关注</p>
    </div>
   <h2>{{article.title}}</h2>
   <div class="dianzan">
        <p>
          <van-icon name="good-job-o" />
          <span>{{article.comment_length}}</span>
        </p>
        <p>
          <van-icon name="chat" color="green"/>
          <span>微信</span>
        </p>
      </div>
      <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from '@/components/myfooter.vue'
import { getDetailById, userFollow, unuserFollow, postlike } from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      article: {
        cover: [
          {
            url: ''
          }
        ],
        user: {}
      },
      // 关注按钮
      Isattention: '',
      attentionv: ''
    }
  },
  methods: {
    // 文章点赞
    postlike () {
      console.log(123)
      postlike()
    },
    // 点击关注按钮
    async attention () {
      // 点击按钮时，进行判断是否已关注
      if (this.attentionv === '已关注') {
        const res = await unuserFollow(this.article.user.id)
        console.log(res)
        if (res.data.message === '取消关注成功') {
          // 提示用户
          Toast({
            type: 'fail',
            message: '取消关注成功'
          })
          // 同时更改样式
          this.attentionv = '关注'
          this.Isattention = false
        }
      } else {
        const res2 = await userFollow(this.article.user.id)
        console.log(res2)
        if (res2.data.message === '关注成功') {
          // 提示用户
          Toast({
            type: 'success',
            message: '关注成功'
          })
          // 同时更改样式
          this.attentionv = '已关注'
          this.Isattention = true
        }
      }
    }
  },
  // 根据ID来获取文章的数据
  async created () {
    const res = await getDetailById(this.$route.params.id)
    console.log(res)
    this.article = res.data.data
    // 进入页面就需要判断是否已关注过
    this.Isattention = res.data.data.has_follow
    if (res.data.data.has_follow) {
      this.attentionv = '已关注'
      this.Isattention = true
    } else {
      this.attentionv = '关注'
      this.Isattention = false
    }
  },
  components: {
    myfooter
  }
}
</script>

<style lang="less" scoped>
  .detail{
    width: 100%;
    height: 100%;
    padding-bottom: 100px;
    background: #f2f2f2;
    .header{
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      p{
        padding: 5px 10px;
        margin-right: 30px;
        border: 1px solid #000;
        border-radius: 10px;
      }
    }
    .contain{
      h2{
        padding:10px 20px;
        font-size: 16/360*100vw;
        font-weight: 600;
      }
      p{
        padding: 0 20px 20px;
        font-size: 12/360*100vw;
        color: #868686;
        span{
          &:nth-child(1){
            margin-right: 10px;
          }
        }
      }
      .content{
        /deep/img{
          width: 100%;
        }
      }
    }
    .dianzan{
      padding: 30px 0 0 20px;
      display: flex;
      justify-content: space-around;
      p{
        padding: 5px 10px;
        border-radius: 15px;
        border: 1px solid #797979;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          &:last-child{
            margin-left: 5px;
          }
        }
      }
    }
    .myfooter{
      position: fixed;
      left: 0;
      bottom: 0;
      background: #f2f2f2;
    }
  }
  .red{
    border: 1px solid red!important;
    color: red;
  }
  .detail-video{
    width: 100%;
    .header{
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      font-size: 14px;
      background: #f2f2f2;
    }
    video{
      width: 100%;
      height: 250px;
    }
    .head{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      font-size: 16/360*100vw;
      color: #868686;
      p{
        &:nth-child(1){
          display: flex;
          img{
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
        }

        &:last-child{
          color: #333;
          padding: 5px 10px;
          border: 1px solid #000;
          border-radius: 15px;
        }
      }
    }
    h2{
      padding: 0 20px;
      line-height: 25px;
      font-size: 16/360*100vw;
    }
    .dianzan{
      padding: 30px 0 0 20px;
      display: flex;
      justify-content: space-around;
      p{
        padding: 5px 10px;
        border-radius: 15px;
        border: 1px solid #797979;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
          &:last-child{
            margin-left: 5px;
          }
        }
      }
    }
    .myfooter{
      position: fixed;
      left: 0;
      bottom: 0;
      background: #f2f2f2;
    }
  }
</style>

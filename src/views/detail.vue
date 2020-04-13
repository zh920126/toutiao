<template>
  <div class="detailC">
    <!-- 显示文本 -->
    <div class="detail" v-if="article.type===1">
      <div class="header">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
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
          <p @click="postlike" :class="{red:article.has_like===true}">
            <van-icon name="good-job-o" />
            <span>{{article.like_length}}</span>
          </p>
          <p>
            <van-icon name="chat" color="green" />
            <span>微信</span>
          </p>
        </div>
      </div>
    </div>
    <!-- 显示视频 -->
    <div class="detail-video" v-else>
      <div class="header">
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </div>
      <video
        controls
        :poster="article.cover[0].url"
        src="https://video.pearvideo.com/mp4/adshort/20200412/cont-1668333-15077311_adpkg-ad_hd.mp4"
      ></video>
      <div class="head">
        <p>
          <img :src="article.user.head_img" alt />
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
          <van-icon name="chat" color="green" />
          <span>微信</span>
        </p>
      </div>
    </div>
    <div class="commentList">
      <h2>精彩跟帖</h2>
      <div class="item" v-for="value in articleComments" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="sendCommont">回复</span>
        </div>
        <div class="text">{{value.content}}</div>
      </div>
      <div class="more" @click="$router.push({name:'Comments'})">更多跟帖</div>
    </div>
    <!-- 将文章数据传给子组件内，用于文章收藏功能 -->
      <commonfooter :post="article" @refresh="refresh"></commonfooter>
  </div>
</template>

<script>
import commonfooter from '@/components/commonfooter.vue'
import {
  getDetailById,
  userFollow,
  unuserFollow,
  postlike,
  comment
} from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      // 评论数据
      articleComments: [],
      // 文章数据
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
    // 评论后进行页面的刷新
    refresh () {
      this.init()
    },
    // 回复评论
    sendCommont () {
    },
    // 文章点赞
    async postlike () {
      const res = await postlike(this.article.user.id)
      // console.log(res)
      if (res.data.message === '点赞成功') {
        // 点赞成功提示用户，并增加样式
        Toast({
          type: 'success',
          message: '点赞成功'
        })
        ++this.article.like_length
        this.article.has_like = true
      } else {
        Toast({
          type: 'success',
          message: '已取消点赞'
        })
        --this.article.like_length
        this.article.has_like = false
      }
    },
    // 点击关注按钮
    async attention () {
      // 点击按钮时，进行判断是否已关注
      if (this.attentionv === '已关注') {
        const res = await unuserFollow(this.article.user.id)
        // console.log(res)
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
    },
    async init () {
      // 根据ID来获取文章的数据
      const res = await getDetailById(this.$route.params.id)
      // console.log(res)
      this.article = res.data.data
      // 进入页面就需要判断是否已关注过,
      this.Isattention = res.data.data.has_follow
      if (res.data.data.has_follow) {
        this.attentionv = '已关注'
        this.Isattention = true
      } else {
        this.attentionv = '关注'
        this.Isattention = false
      }
      // 判断是否已经点赞过
      if (res.data.data.has_like) {
        this.article.has_like = true
      } else {
        this.article.has_like = false
      }
      // 根据文章ID来获取评论信息
      const res2 = await comment(res.data.data.id)
      // console.log(res2)
      this.articleComments = res2.data.data
      // 评论数据改造
      this.articleComments.forEach(value => {
        value.user.head_img = localStorage.getItem('baseURL') + value.user.head_img
      })
    }
  },
  created () {
    this.init()
  },
  components: {
    commonfooter
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 100vw;
  height: 100%;
  padding-bottom: 100px;
  background: #f2f2f2;
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    p {
      padding: 5px 10px;
      margin-right: 30px;
      border: 1px solid #000;
      border-radius: 10px;
    }
  }
  .contain {
    h2 {
      padding: 10px 20px;
      font-size: 16/360 * 100vw;
      font-weight: 600;
    }
    p {
      padding: 0 20px 20px;
      font-size: 12/360 * 100vw;
      color: #868686;
      span {
        &:nth-child(1) {
          margin-right: 10px;
        }
      }
    }
    .content {
      /deep/img {
        width: 100%;
      }
    }
  }
  .dianzan {
    padding: 30px 0 0 20px;
    display: flex;
    justify-content: space-around;
    p {
      padding: 5px 10px;
      border-radius: 15px;
      border: 1px solid #797979;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }

}
.red {
  border: 1px solid red !important;
  color: red !important;
}
.detail-video {
  width: 100vw;
  .header {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    background: #f2f2f2;
  }
  video {
    width: 100%;
    height: 250px;
  }
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    font-size: 16/360 * 100vw;
    color: #868686;
    p {
      &:nth-child(1) {
        display: flex;
        img {
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }

      &:last-child {
        color: #333;
        padding: 5px 10px;
        border: 1px solid #000;
        border-radius: 15px;
      }
    }
  }
  h2 {
    padding: 0 20px;
    line-height: 25px;
    font-size: 16/360 * 100vw;
  }
  .dianzan {
    padding: 30px 0 0 20px;
    display: flex;
    justify-content: space-around;
    p {
      padding: 5px 10px;
      border-radius: 15px;
      border: 1px solid #797979;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        &:last-child {
          margin-left: 5px;
        }
      }
    }
  }
}
 .commonfooter {
    position: fixed;
    left: 0;
    bottom: 0;
    background: #f2f2f2;
  }
.commentList {
    border-top: 5px solid #ddd;
    padding: 0 15px 50px;
    box-sizing: border-box;
    > h2 {
      line-height: 50px;
      text-align: center;
    }
    .item {
      padding: 10px 0;
      border-bottom: 1px solid #ccc;
      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        > img {
          width: 50/360 * 100vw;
          height: 50/360 * 100vw;
          display: block;
          border-radius: 50%;
        }
        > div {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: 10px;
          > span {
            font-size: 12px;
            color: #999;
            line-height: 25px;
          }
        }
        > span {
          color: #999;
          font-size: 13px;
        }
      }
      .text {
        font-size: 14px;
        color: #333;
        padding: 20px 0 10px 0;
      }
    }
    .more {
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 15px;
      margin: 20px auto;
      font-size: 13px;
    }
  }
</style>

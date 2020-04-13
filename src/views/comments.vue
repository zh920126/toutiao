<template>
  <div class="comments">
    <myheader title="精彩评论">
      <van-icon slot="left" name="arrow-left" @click="$router.go(-1)"/>
    </myheader>
    <div class="commentList">
      <div class="item" v-for="value in articleComments" :key="value.id">
        <div class="head">
          <img :src="value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span @click="sendComment(value)">回复</span>
        </div>
        <div class="text">{{value.content}}</div>
        <commentitem v-if="value.parent" :post="value.parent" @sendCommont="sendCommont"></commentitem>
      </div>
      <div class="more" @click="$router.push({name:'Comments'})">没有更多了</div>
    </div>
    <commentfooter :post="article" @refresh="refresh" :replayobj="obj" @cancleobj="cancleobj"></commentfooter>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import commentitem from '@/components/commonitem.vue'
import commentfooter from '@/components/commonfooter.vue'
import { comment, getDetailById } from '@/apis/category.js'
export default {
  data () {
    return {
      article: {},
      articleComments: [],
      obj: {}
    }
  },
  watch: {
    article () {
      this.init2()
    }
  },
  methods: {
    sendCommont (data) {
      // console.log(data)
      // 将commonitem组件传过来的数据传给commonfooter组件
      this.obj = data
    },
    // 接受子组件点击取消时发送的事件，用来重置数据
    cancleobj () {
      this.obj = null
    },
    // 点击回复时，将当前的评论的用户的数据传递给子组件
    sendComment (value) {
      this.obj = value
    },
    refresh () {
      this.init()
    },
    async init () {
      const id = this.$route.params.id
      const res = await comment(id)
      console.log(res)
      this.articleComments = res.data.data
      this.articleComments.forEach(value => {
        value.user.head_img = localStorage.getItem('baseURL') + value.user.head_img
      })
    },
    async init2 () {
      const id = this.$route.params.id
      const res2 = await getDetailById(id)
      this.article = res2.data.data
    }
  },
  async created () {
    // 获取文章数据
    this.init2()
    // 根据ID来获取文章的评论信息
    this.init()
  },
  components: {
    myheader, commentfooter, commentitem
  }
}
</script>

<style lang="less" scoped>
.myheader{
  background: #eee;
}
  .comments{
    .commentList {
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
  }
</style>

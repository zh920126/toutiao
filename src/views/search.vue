<template>
  <div class="search">
    <div class="title">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <div class="searchbar">
        <van-icon name="search" class="iconfont"/>
        <input type="text" v-model="keyword" placeholder="请输入想搜索的内容">
      </div>
      <span @click="searchkeyword">{{searchbtn}}</span>
    </div>
    <div class="history" v-show="!showSearch&&historyList.length!==0">
      <van-icon name="delete" class="delete" @click="deleteHistory"/>
      <h2>历史记录</h2>
      <p v-for="(value,index) in historyList" :key="index" @click="keyword=value">{{value}}</p>
    </div>
    <div class="hot" v-show="!showSearch&&historyList.length===0">
      <h2>热门搜索</h2>
    </div><p v-for="(value,index) in hotList" :key="index"          @click="$router.push({path: `/detail/${value.id}`})">{{value.title}}</p>
    <div class="hot" v-show="showSearch">
      <h2>搜索记录</h2>
      <p v-for="(value,index) in article" :key="index" @click="$router.push({path: `/detail/${value.id}`})">{{value.title}}</p>
    </div>
  </div>
</template>

<script>
import { searchPost, searchRecommend } from '@/apis/category.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      keyword: '',
      article: [],
      historyList: [],
      hotList: [],
      // 显示搜索记录
      showSearch: false,
      searchbtn: '搜索'
    }
  },
  watch: {
    keyword () {
      if (!this.keyword.trim('')) {
        // 当数据为空时要显示历史记录
        this.showSearch = false
        this.init2()
      }
    }
  },
  methods: {
    // 删除历史记录
    deleteHistory () {
      localStorage.removeItem('toutiao_history')
      this.init()
    },
    async searchkeyword () {
      // 判断是是否是搜索
      if (this.searchbtn === '搜索') {
        // 判断是会否有输入关键字
        if (!this.keyword.trim('')) {
          Toast({
            type: 'fail',
            message: '请输入你想搜索的内容',
            duration: 500
          })
          // 阻止向下执行
          return false
        }
        // 每次搜索的时候都将用户输入的记录存起来,不管搜索是否成功
        var arr = JSON.parse(localStorage.getItem('toutiao_history')) || []
        arr.unshift(this.keyword)
        // 固定一个历史记录的长度
        if (arr.length > 5) {
          arr.pop()
        }
        // 然后将历史记录存储到本地存储中区historyList
        localStorage.setItem('toutiao_history', JSON.stringify(arr))
        // 同时刷新页面
        this.init()
        const res = await searchPost(this.keyword)
        // 搜索成功时
        if (res.status === 200) {
        // 并判断里面是否有数据
          if (res.data.data.length) {
          // 显示搜索记录
            console.log(res)
            this.showSearch = true
            this.article = res.data.data
            this.searchbtn = '取消'
          } else {
            Toast({
              type: 'fail',
              message: '很抱歉，没有搜索到你想查找的内容',
              duration: 500
            })
          }
        } else {
          Toast({
            type: 'fail',
            message: '搜索失败'
          })
        }
      } else {
        // 数据还原
        this.keyword = ''
        this.showSearch = false
        this.searchbtn = '搜索'
      }
    },
    init () {
      this.historyList = JSON.parse(localStorage.getItem('toutiao_history')) || []
    },
    async init2 () {
      if (!JSON.parse(localStorage.getItem('toutiao_history'))) {
        const res = await searchRecommend()
        // console.log(res)
        this.hotList = res.data.data
      }
    }
  },
  async created () {
    // 一进入页面就需要获取历史记录
    this.init()
    // 判断是否有历史记录，如果没有就放推荐的
    this.init2()
  }
}
</script>

<style lang="less" scoped>
.aa{
   margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        display: box;
        display: -webkit-box;
        line-clamp: 1;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
}
  .search{
    width: 100vw;
    height: 100vh;
    background: #f2f2f2;
    .title{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px;
      background: #f2f2f2;
      .searchbar{
        position: relative;
        flex: 1;
        height: 100%;
        margin: 0 20px;
        border-radius: 15px;
        overflow: hidden;
        input{
          width: 100%;
          height: 100%;
          border: none;
          text-indent: 30px;
        }
        .iconfont{
          position: absolute;
          left: 10px;
          top: 4px;
        }
      }
    }
    .history{
      position: relative;
      margin:15px 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d7d7d7;
      .delete{
        position: absolute;
        top: 0;
        right: 0;
      }
      h2{
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 16/360*100vw;
      }
      p{
       .aa()
      }
    }
    .hot{
       margin:15px 10px;
       h2{
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 16/360*100vw;
      }
       p{
        .aa()
      }
    }
  }
</style>

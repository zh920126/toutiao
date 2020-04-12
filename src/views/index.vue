<template>
  <div class="index">
    <div class="header-search">
      <div class="logo">
        <img src="@/../public/u339.png" alt="">
      </div>
      <div class="search" @click="$router.push({name:'Search'})">
        <van-icon name="search" size="1em"/>
        <span>搜索新闻</span>
      </div>
      <div class="user" @click="personal">
        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" size="30px"/>
      </div>
    </div>
    <van-tabs
    v-model="active"
    sticky
    swipeable
    >
      <van-tab
      :title="value.name"
      v-for="(value,index) in categoryList" :key="index"
      >
        <van-list
          v-model="value.loading"
          loading-text="玩命加载中..."
          :finished="value.finished"
          finished-text="没有更多了"
          :offset="1"
          :immediate-check='false'
          @load="onLoad"
        >
          <articel v-for="(sv,si) in value.artList" :key="si" :post="sv"></articel>
        </van-list>
      </van-tab>

    </van-tabs>
  </div>
</template>

<script>
import { getAllCategory, getOnecategory } from '@/apis/category.js'
import articel from '@/components/article.vue'
export default {
  data () {
    return {
      // 定义变量用来接收获取到的分类信息
      categoryList: [],
      // 如果用户已经登录就默认显示关注栏否则显示头条栏
      active: localStorage.getItem('toutiao_id') ? '0' : '1'
    }
  },
  // 使用侦听器来侦听到当前avtive的值
  watch: {
    async active () {
      // console.log(this.categoryList[this.active].id)
      // 根据ID来获取到当前对应ID的数据
      if (this.categoryList[this.active].artList.length === 0) {
        console.log(111)
        this.init()
      }
    }
  },
  methods: {
    // 上拉加载更多
    onLoad () {
      // 每次上拉都需要将页数增加
      this.categoryList[this.active].pageIndex++
      this.init()
    },
    // 根据id来获取数据
    async init () {
      const res = await getOnecategory({ pageIndex: this.categoryList[this.active].pageIndex, pageSize: this.categoryList[this.active].pageSize, category: this.categoryList[this.active].id })
      // console.log(res)
      // 将获取到的数据赋值给哪一项的articleList
      this.categoryList[this.active].artList.push(...res.data.data)
      this.categoryList[this.active].loading = false
      // 判断数据是否已经完全加载完毕
      if (res.data.data.length < this.categoryList[this.active].pageSize) {
        // 不设置，会造成始终可以上拉，但是却无法获取到数据
        this.categoryList[this.active].finished = true
      }
    },
    // 用户中心
    personal () {
      // 当已经登录下就跳转到用户中心页面
      const token = localStorage.getItem('toutiao-Authorization')
      if (token) {
        this.$router.push({ path: `/Personal/${localStorage.getItem('toutiao_id')}` })
      } else {
        this.$router.push({ name: 'Login' })
      }
    }
  },
  // 页面一开始加载就需要获取到新闻的数据
  async created () {
    const res = await getAllCategory()
    // console.log(res)
    this.categoryList = res.data.data
    // 需要对数据进行改造，因为数据没有区分每一项对应的单独的数据
    this.categoryList = this.categoryList.map(value => {
      return {
        ...value,
        artList: [],
        pageIndex: 1,
        pageSize: 5,
        finished: false,
        loading: false
      }
    })
  },
  components: {
    articel
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100vw;
  height: 100%;
  background: #f2f2f2;
  .header-search{
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    background: #ff0000;
    display: flex;
    justify-content: space-between;
    .logo{
      padding:0 20px;
      img{
        height: 40px;
        color: #000;
        filter:grayscale(80%) drop-shadow(0px 0 0 #fff) contrast(50%);
      }
    }
    .search{
      flex: 1;
      margin: 5px 0;
      background: #f97979;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 12/360*100vw;
      border-radius: 30px;
      span{
        margin-left: 10px;
      }
    }
    .user{
      padding: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
    }
  }
}
</style>

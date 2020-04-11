<template>
  <div class="personal">
    <div class="top"></div>
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img src="http://img1.imgtn.bdimg.com/it/u=3757784226,1202878475&fm=26&gp=0.jpg" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>我就是我
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频"></mycell>
    <mycell title="设置" desc=""></mycell>
  </div>
</template>

<script>
// 引入mycell组件
import mycell from '@/components/mycell.vue'
// 引入myaxios
import { getUserInfoById } from '../apis/user.js'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    mycell
  },
  async created () {
    // 刚一进入页面就需要获取到用户的ID来获取用户的数据进行页面的渲染
    // console.log(this.$route)
    const id = this.$route.params.id
    // console.log(id)
    // 根据ID来获取用户的详细信息，进行页面的渲染
    const res = await getUserInfoById(id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      // 当获取用户数据成功后，渲染页面
      this.userInfo = res.data.data
    }
    // console.log(this.userinfo)
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
.top {
    height: 30px;
    background: #757575;
  }
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>

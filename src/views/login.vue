<template>
  <div class="login">
    <!-- 顶部灰色条 -->
    <div class="top"></div>
    <!-- 顶部X图标 -->
    <div class="close" @click="gotoindex">
      <img src="@/../public/u338.png" alt />
    </div>
    <!-- 中间logo图 -->
    <div class="logo">
      <img src="@/../public/u339.png" alt />
    </div>
    <!-- 输入框 -->
    <inp type="text" placeholder="请输入手机号" v-model="userInfo.username" :rules="/^1\d{10}$/"></inp>
    <inp type="password" placeholder="请输入密码" v-model="userInfo.password"></inp>
    <div class="reg">
      <span>没有账号？</span>
      <a href="#/register">去注册</a>
    </div>
    <p class="btn" @click="login">登录</p>
  </div>
</template>

<script>
// 引入封装的输入框组件
import inp from '../components/myinput.vue'
// 引入封装好的axios
import { login } from '../apis/user.js'
// 引入vant中的提示组件
import { Toast } from 'vant'
export default {
  data () {
    return {
      userInfo: {
        username: '14444444444',
        password: '111'
      }
    }
  },
  methods: {
    async login () {
      const res = await login(this.userInfo)
      // console.log(res)
      if (res.data.message === '登录成功') {
        // 当登录成功 时，就需要提示用户
        Toast({
          type: 'success',
          message: '登录成功'
        })
        // 将获取到token存到本地存储中去
        // console.log(res)
        localStorage.setItem('toutiao-Authorization', res.data.data.token)
        localStorage.setItem('toutiao_id', res.data.data.user.id)
        // 跳转到个人中心页面,并将用户的ID号传过去
        this.$router.push({ path: `personal/${res.data.data.user.id}` })
      } else {
        // 登录失败提示用户
        Toast({
          type: 'fail',
          message: '登录失败，请重试'
        })
      }
    },
    gotoindex () {
      this.$router.push({ name: 'Index' })
    },
    // 接收子组件传递来的数据
    getmessage (data) {
      this.userInfo.username = data
    }
  },
  components: {
    inp
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: #f2f2f2;
  .top {
    height: 30px;
    background: #757575;
  }
  .close {
    border-width: 0px;
    position: absolute;
    left: 15px;
    top: 40px;
    width: 27px;
    height: 27px;
    img {
      width: 100%;
    }
  }
  .logo {
    margin: 100px auto 0;
    width: 126px;
    height: 126px;
    img {
      width: 100%;
    }
  }
  .btn {
    width: 60%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin: 30px auto;
    border-radius: 20px;
    background: skyblue;
    font-size: 20px;
  }
  .reg{
    width: 60%;
    margin: auto;
    text-align: right;
  }
}
</style>

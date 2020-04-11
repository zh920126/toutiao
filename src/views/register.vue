<template>
  <div class="register">
    <div class="top"></div>
    <div class="logo">
      <img src="@/../public/u339.png" alt />
    </div>
    <myinput placeholder="请输入手机号" type="text" v-model="userInfo.username" :rules="/^1\d{10}$/"></myinput>
    <myinput placeholder="请输入昵称" type="text" v-model="userInfo.nickname"></myinput>
    <myinput placeholder="请输入密码" type="password" v-model="userInfo.password"></myinput>
    <p @click="register" class="btn">注册</p>
  </div>
</template>

<script>
// 引入封装的组件
import myinput from '../components/myinput.vue'
// 引入封装的myaxios
import { register } from '../apis/user.js'
// 引入vant中的提示组件
import { Toast } from 'vant'
export default {
  data () {
    return {
      userInfo: {
        username: '',
        nickname: '',
        password: ''
      }
    }
  },
  methods: {
    async register () {
      // console.log(this.userInfo)
      // 提交注册之前需要进行验证
      // 验证用户名是否合法
      if (!/^1\d{10}$/.test(this.userInfo.username)) {
        // 提示用户用户名不合法
        Toast({
          type: 'fail',
          message: '请输入正确的手机号',
          overlay: 'true',
          closeOnClick: 'ture'
        })
        return false
      }
      // 验证是否有昵称是否为空
      if (!this.userInfo.nickname.trim('')) {
        // 提示用户昵称不能为空
        Toast({
          type: 'fail',
          message: '昵称不能为空',
          overlay: 'true',
          closeOnClick: 'ture'
        })
        return false
      }
      // 验证密码长度不小于3位
      if (!this.userInfo.password.trim('')) {
        // 密码不能为空
        Toast({
          type: 'fail',
          message: '密码不能为空',
          overlay: 'true',
          closeOnClick: 'ture',
          closeOnClickOverlay: 'true'
        })
        return false
      }
      if (this.userInfo.password.trim('').length < 3) {
        Toast({
          type: 'fail',
          message: '密码不能小于3位',
          overlay: 'true',
          closeOnClick: 'ture',
          closeOnClickOverlay: 'true'
        })
        return false
      }
      console.log(123)
      const res = await register(this.userInfo)
      if (res.data.message === '注册成功') {
        // 提示用户已经注册成功
        // 提示用户注册成功
        Toast({
          type: 'success',
          message: '注册成功'
        })
        // 然后跳转到登录页面
        this.$router.push({ name: 'Longin' })
      } else {
        Toast.fail({
          message: '注册失败，请重试'
        })
      }
    }
  },
  components: {
    // 注册组件
    myinput
  }
}
</script>

<style lang="less" scoped>
.register {
  height: 100vh;
  background: #f2f2f2;
  .top {
    height: 30px;
    background: #757575;
  }
  .logo {
    margin: 100px auto 0;
    width: 126px;
    height: 126px;
    img {
      width: 100%;
    }
  }
  .top {
    height: 30px;
    background: #757575;
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
}
</style>

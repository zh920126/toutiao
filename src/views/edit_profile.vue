<template>
  <div class="edit">
    <div class="top"></div>
    <div class="header">
      <myheader title="编辑个人信息">
        <!-- 点击<时，返回上一层目录 -->
        <span slot="left" @click="$router.go(-1)">&lt;</span>
      </myheader>
    </div>
    <div class="userImg">
      <img :src="userInfo.head_img" alt />
      <van-uploader :after-read="afterRead" :before-read="beforeRead"/>
    </div>
    <mycell title="昵称" :desc="userInfo.nickname"></mycell>
    <mycell title="密码" type="password" :desc="userInfo.password"></mycell>
    <mycell title="性别" :desc="userInfo.gender===1?'男':'女'"></mycell>
  </div>
</template>

<script>
// 引入封装的myheader组件
import myheader from '@/components/myheader.vue'
// 引入封装的mycell组件
import mycell from '@/components/mycell.vue'
// 引入根据ID获取用户信息的api
import { getUserInfoById, updateUserInfo } from '@/apis/user.js'
// 引入上传文件的api
import { uploadFile } from '@/apis/upload.js'
// 引入提示组件
// import { Toast } from 'vant'
import Vue from 'vue'
import { Uploader, Toast } from 'vant'

Vue.use(Uploader)
export default {
  data () {
    return {
      userInfo: {},
      id: ''
    }
  },
  methods: {
    // 图片上传之前需要对图片的格式进行验证，如果不符合要求则提示用户
    beforeRead (file) {
      // console.log(file.type)
      // 对图片格式进行判断，如果不是图片则提示用户
      if (!file.type.includes('image')) {
        Toast({
          type: 'fail',
          message: '请选择正确的图片'
        })
        return false
      } else {
        return true
      }
    },
    // 图片上传
    async afterRead (file) {
      // console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      // 然后上传至服务器
      const res = await uploadFile(formData)
      // console.log(res)
      // 对文件是否上传成功进行判断
      if (res.data.message === '文件上传成功') {
        // 提示用户
        Toast({
          type: 'success',
          message: '上传成功'
        })
        // 仅仅只是暂时替换当前页面的显示
        this.userInfo.head_img = localStorage.getItem('baseURL') + res.data.data.url
        // 同时要将数据发送给服务端进行修改
        const res1 = await updateUserInfo(this.id, { head_img: res.data.data.url }
        )
        console.log(res1)
      } else {
        // 提示用户
        Toast({
          type: 'fail',
          message: '上传失败'
        })
      }
    }
  },
  components: {
    myheader,
    mycell
  },
  async created () {
    // 获取当前登录的用户的ID
    // console.log(this.$route.params.id)
    this.id = this.$route.params.id
    // 根据ID来获取用户的信息数据
    const res = await getUserInfoById(this.$route.params.id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      // 获取成功之后将用户的数据存起来
      this.userInfo = res.data.data
      // 判断用户是否有头像图片
      if (res.data.data.head_img) {
        // 如果有图片就渲染该图片 没有就给一张默认的图片
        this.userInfo.head_img =
          localStorage.getItem('baseURL') + res.data.data.head_img
      } else {
        this.userInfo.head_img = './u339.png'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  .top {
    height: 30px;
    background: #757575;
  }
  .back {
    display: flex;
    padding: 20px;
    justify-content: space-between;
    span {
      font-size: 16/360 * 100vw;
    }
    h3 {
      font-size: 16/360 * 100vw;
      font-weight: 600;
    }
  }
  .userImg {
    position: relative;
    width: 70/360 * 100vw;
    height: 70/360 * 100vw;
    margin: 30/360 * 100vw auto;
    border: 1px solid #000;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
    /deep/ .van-uploader{
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
    }
    /deep/ .van-uploader__upload {
      width: 80/360*100vw;
      height: 80/360*100vw;
    }
  }
}
</style>

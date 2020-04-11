<template>
  <div class="inp">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="value"
      @input="getuserInfo"
      :class="{red:statu ==='error',green:statu==='success'}"
      @blur="checkT"
    />
  </div>
</template>

<script>
// 引入vant的提示框组件
import { Toast } from 'vant'
export default {
  props: ['type', 'placeholder', 'value', 'rules'],
  data () {
    return {
      statu: ''
    }
  },
  methods: {
    // 监听input输入框的变化
    getuserInfo (e) {
      const v = e.target.value
      // 将获取到的值传给父组件,只能是input事件
      this.$emit('input', v)
      if (this.rules && typeof this.rules === 'object') {
        if (this.rules.test(v)) {
          this.statu = 'success'
        } else {
          this.statu = 'error'
        }
      }
      // console.log(this.statu)
    },
    // 注册失去焦点的事件
    checkT (e) {
      const v = e.target.value
      if (this.rules) {
        //   如果不满足传入的规则
        if (!this.rules.test(v)) {
          this.statu = 'error'
          // 给出提示
          Toast.fail({
            message: '请输入11位手机号',
            overlay: 'true',
            forbidClick: 'true',
            duration: 1000
          })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inp {
  width: 80%;
  height: 30px;
  margin: auto;
  margin-bottom: 10px;
  input {
    background: #f2f2f2;
    height: 100%;
    width: 100%;
    border: none;
    border-bottom: 2px solid #000;
    outline: none;
  }
}
.red {
  border-color: red!important;
}
.green {
  border-color: green!important;
}
</style>

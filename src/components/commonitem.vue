<template>
    <div class="sour">
      <p>
        <span>{{post.user.nickname}}&nbsp;&nbsp;&nbsp;&nbsp;2小时前</span>
        <span @click="sendCommont(post)">回复</span>
      </p>
      <div>{{post.content}}</div>
      <comment v-if='post.parent' :post='post.parent' @sendCommont="sendCommont(post.parent)"></comment>
    </div>
</template>

<script>
// import comm from '@/components/commentItem.vue'
export default {
  props: ['post'],
  // name属性就是当前的组件注册，用于组件递归
  name: 'comment',
  components: {
    // comm
  },
  methods: {
    sendCommont (data) {
      // 点击组件中的回复按钮时，需要将该组件对应的ID数据发送给父组件
      this.$emit('sendCommont', data)
    }
  }
}
</script>

<style lang='less' scoped>
.sour {
  border: 1px solid #ddd;
  padding: 5px;
  color: #999;
  line-height: 25px;
  > p {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
  }
  > div {
    font-size: 13px;
  }
}
</style>

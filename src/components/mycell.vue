<template>
  <div class="cell">
    <span>{{title}}</span>
    <span class="user">{{type==='password'?'******':desc}}&gt;</span>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'type'],
  data () {
    return {

    }
  }
}
</script>

<style lang="less" scoped>
  .cell{
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 15px;
    margin: auto;
    border-bottom: 1px solid #e4e4e4;
    font-size: 16/360*100vw;
    .user{
      color: #a1a1a1;
    }
  }
</style>

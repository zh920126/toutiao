<template>
  <div class="myheader">
    <span>
      <slot name="left"></slot>
    </span>
    <h2>{{title}}</h2>
    <span>
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang="less" scoped>
  .myheader{
    display: flex;
    justify-content: space-between;
    padding: 20/360*100vw;
    font-size: 14/360*100vw;
    background: #f2f2f2;
    h2{
      font-weight: 600;
    }
  }
</style>

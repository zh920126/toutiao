<template>
  <div class="search">
    <div class="title">
      <van-icon name="arrow-left" @click="$router.go(-1)"/>
      <div class="searchbar">
        <van-icon name="search" class="iconfont"/>
        <input type="text" placeholder="请输入想搜索的内容">
      </div>
      <span>取消</span>
    </div>
    <div class="history">
      <van-icon name="delete" class="delete"/>
      <h2>历史记录</h2>
      <p>周旭言</p>
      <p>周佳慧</p>
    </div>
    <div class="hot">
      <h2>热门搜索</h2>
      <p>aaa</p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
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
        height: 20px;
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
        height: 20px;
      }
    }
  }
</style>

<template>
  <div class="article" v-if="post.type===1 && post.cover.length <= 2" @click='handlerclick'>
    <div class="left">
      <div class="title">{{post.title}}</div>
      <p class="p_desc">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <div class="right">
      <img :src="post.cover[0].url" alt />
    </div>
  </div>
  <div class="article_video" v-else-if="post.type===2" @click='handlerclick'>
    <div class="title">{{post.title}}</div>
    <div class="img">
        <img :src="post.cover[0].url" alt />
        <van-icon name="play-circle-o" class="iconshipin"/>
    </div>
    <p class="p_desc">
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
  <div class="article_video" v-else-if="post.type===1 && post.cover.length >= 3" @click='handlerclick'>
    <div class="title">{{post.title}}</div>
    <div class="imgs">
        <img :src="value.url" alt  v-for='(value,index) in post.cover' :key='index'/>
    </div>
    <p class="p_desc" style='line-height:25px;'>
      <span>{{post.user.nickname}}</span>
      <span>{{post.comment_length}}跟帖</span>
    </p>
  </div>
</template>

<script>
export default {
  // 当前的文章数据
  props: ['post'],
  methods: {
    handlerclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
.title_style {
  font-size: 16px;
  color: #333;
  line-height: 22px;
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.p_desc {
  font-size: 12px;
  color: #999;
  > span:last-child {
    margin-left: 20px;
  }
}
.article {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .title {
      .title_style();
    }
  }
  .right {
    width: 120/360 * 100vw;
    > img {
      width: 100%;
      height: 75/360 * 100vw;
      display: block;
      object-fit: cover;
    }
  }
}
.article_video {
  padding: 10px;
  .title {
    .title_style();
  }
  > .img {
        width: 100%;
        margin: 10px 0;
        position: relative;
    > img{
        width: 100%;
        display: block;
    }
    > .iconshipin{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        font-size: 50px;
        background-color: rgba(0,0,0,0.15);
        border-radius: 50%;
        color: #fff;
        box-shadow: 0px 0px 10px #fff;
    }
  }
  > .imgs {
      width: 100%;
      display: flex;
      overflow: hidden;
      > img {
          width: 33.33%;
          &:nth-child(2){
            margin: 0 3px;
          }
      }
  }
}
</style>

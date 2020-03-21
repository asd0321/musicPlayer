<template>
  <!-- 左侧导航 -->
  <div class="container">
    <div class="nav">
      <ul>
        <li :class="{on:$route.path==='/discovery'}">
          <i class="el-icon-headset"></i>
          <router-link to="/discovery">发现音乐</router-link>
        </li>
        <li :class="{on:$route.path==='/playlist'}">
          <i class="el-icon-s-grid"></i>
          <router-link to="/playlist">推荐歌单</router-link>
        </li>
        <li :class="{on:$route.path==='/songs'}">
          <i class="el-icon-present"></i>
          <router-link to="/songs">最新音乐</router-link>
        </li>
        <li :class="{on:$route.path==='/mvs'}">
          <i class="el-icon-news"></i>
          <router-link to="/mvs">最新MV</router-link>
        </li>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="player">
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      musicUrl:''
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  display flex
  justify-content center
  .nav
    width 25%
    background-color #f9f9f9
    ul
      li
        list-style none 
        margin 20px
        i
          font-weight bold
          margin 10px
        a
          text-decoration none
          color #000
          &.router-link-active
            color red
      .on
        color red
  .main
    width 75%
    padding 50px
  .player
    position fixed
    bottom 0
    left 0
    width 100%
</style>
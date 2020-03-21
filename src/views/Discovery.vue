<template>
  <div class="discovery">

    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in banners" :key="item.targetId">
        <img class="lbt" :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div>
      <h3>推荐歌单</h3>
      <div class="recommend-songs">
        <div class="recommend-item" v-for="item in recommendSongs" :key="item.id">
          <div class="desc">
            <span class="desc-title">{{item.copywriter}}</span>
            <span class="icon-play">
              <i class="iconfont icon-triangle"></i>
            </span>
          </div>
          <div class="img-wrapper">
            <span><img :src="item.picUrl"></span>
            <span class="img-desc">{{item.name}}</span>
          </div>
        </div>
      </div>
      <h3>最新音乐</h3>
      <div class="recently-songs">
        <div class="recently-item" v-for="item in newSongs" :key="item.id">
          <span>
            <img :src="item.picUrl">
            <span class="icon-play" @click="playMusic(item.id)">
              <i class="iconfont icon-triangle"></i>
            </span>
          </span>
          <span class="recently-desc">
            <span class="desc-title">{{item.name}}</span>
            <span class="desc-author">{{item.song.artists[0].name}}</span>
          </span>
        </div>
      </div>
      <h3>推荐MV</h3>
      <div class="recommend-mvs">
        <div class="mvs-item" v-for="(item,index) in recommendMVs" :key="index">
          <span class="mvs-img">
            <img :src="item.picUrl" alt="">
          </span>
          <span class="mvs-desc">
            <span class="mvs-title">{{item.name}}</span>
            <span class="mvs-name">{{item.artistName}}</span>
          </span>
          <span class="icon-play">
            <i class="iconfont icon-triangle"></i>
            <span>{{item.playCount}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      banners:[],
      recommendSongs:[],
      newSongs:[],
      recommendMVs:[]
    }
  },
  created(){
    this.getBanners()
    this.getRecommendSongs()
    this.getNewSongs()
    this.getMVs()
  },
  methods:{
    getBanners(){
      this.axios.get('https://autumnfish.cn/banner').then(res=>{
        this.banners=res.data.banners
      })
    },
    getRecommendSongs(){
      this.axios.get('https://autumnfish.cn/personalized').then(res=>{
        this.recommendSongs=res.data.result
      })
    },
    getNewSongs(){
      this.axios.get('https://autumnfish.cn/personalized/newsong').then(res=>{
        this.newSongs=res.data.result
      })
    },
    getMVs(){
      this.axios.get('https://autumnfish.cn/personalized/mv').then(res=>{
        this.recommendMVs=res.data.result
        console.log(this.recommendMVs)
      })
    },
    playMusic(id){
      this.axios.get('https://autumnfish.cn/song/url?id='+id).then(res=>{
        this.$parent.musicUrl=res.data.data[0].url
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.discovery
  .lbt
    width 550px
    height 200px
    background-size 100% 100%
  .recommend-songs
    display flex
    flex-direction row
    flex-wrap wrap
    .recommend-item
      display flex
      flex-direction column
      margin 10px 10px 10px 0
      position relative
      .desc 
        display none
      &:hover
        .desc
          display inline-block
          .desc-title
            position absolute
            left 0
            top 0
            background rgba(0,0,0,0.5)
            width 170px
            border-radius 5px 5px 0 0
            color #fff
            font-size 14px
          .icon-play
            position absolute
            bottom 40px
            right 20px
            width 40px
            height 40px
            line-height 40px
            background rgba(255,255,255,0.8)
            border-radius 50%
            z-index 2
            text-align center
            i
              font-size 20px
              color orangered
      .img-wrapper
        display flex
        flex-direction column
        font-size 14px
        img 
          width 170px
          height 170px
          border-radius 5px
        .img-desc
          width 170px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
  .recently-songs
    display flex
    flex-wrap wrap
    .recently-item
      display flex
      align-items center
      width 50%
      margin 5px 0
      position relative
      .icon-play
        display none
      &:hover
        .icon-play
          display block
          z-index 3
          position absolute
          top 25px
          left 25px
          color red
          width 30px
          height 30px
          line-height 30px
          background rgba(255,255,255,0.8)
          border-radius 50%
          text-align center
          i
            font-size 20px
            color orangered
      img
        width 80px
        height 80px
        border-radius 5px
      .recently-desc
        display flex
        flex-direction column
        align-items center
        .desc-title
          font-weight bold
          margin 0 0 20px 10px
        .desc-author
          font-size 12px
  .recommend-mvs
    display flex
    flex-wrap wrap
    .mvs-item
      width 200px
      height 150px
      display flex
      flex-direction column
      margin 10px 10px 10px 0
      position relative
      img
        width 200px
        height 120px
        border-radius 5px
      .mvs-desc
        font-size 14px
        display flex
        flex-direction column
        .mvs-name
          font-size 12px
          color grey
      .icon-play
        color #fff
        position absolute
        right 10px 
        top 5px
        i 
          font-size 12px
          margin 5px
        span
          font-size 12px
</style>
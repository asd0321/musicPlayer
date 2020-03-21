<template>
  <div class="play-list">
    <div class="list-conteiner">
      <div>
        <img :src="topList.coverImgUrl" alt="">
      </div>
      <div class="desc">
        <span class="category">精品歌单</span>
        <span class="title">{{topList.name}}</span>
        <span class="content">{{topList.description}}</span>
      </div>
    </div>
    <div class="tags">
      <span :class="{'on':tag==='全部'}" @click="tag='全部'">全部</span>
      <span :class="{'on':tag==='欧美'}" @click="tag='欧美'">欧美</span>
      <span :class="{'on':tag==='华语'}" @click="tag='华语'">华语</span>
      <span :class="{'on':tag==='流行'}" @click="tag='流行'">流行</span>
      <span :class="{'on':tag==='说唱'}" @click="tag='说唱'">说唱</span>
      <span :class="{'on':tag==='摇滚'}" @click="tag='摇滚'">摇滚</span>
      <span :class="{'on':tag==='民谣'}" @click="tag='民谣'">民谣</span>
      <span :class="{'on':tag==='电子'}" @click="tag='电子'">电子</span>
      <span :class="{'on':tag==='轻音乐'}" @click="tag='轻音乐'">轻音乐</span>
      <span :class="{'on':tag==='影视原声'}" @click="tag='影视原声'">影视原声</span>
      <span :class="{'on':tag==='ACG'}" @click="tag='ACG'">ACG</span>
      <span :class="{'on':tag==='怀旧'}" @click="tag='怀旧'">怀旧</span>
      <span :class="{'on':tag==='治愈'}" @click="tag='治愈'">治愈</span>
      <span :class="{'on':tag==='旅行'}" @click="tag='旅行'">旅行</span>
    </div>
    <div class="list-play">
      <div class="list-item" v-for="(item,index) in playlists" :key="index">
        <span><img :src="item.coverImgUrl" alt=""></span>
        <span class="desc">{{item.name}}</span>
      </div>
    </div>

    <el-pagination @current-change="handleCurrentChange" background 
      layout="prev, pager, next" :total="total" :current-page="page" :page-size="10">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return{
      total:0,
      page:1,
      topList:{},
      playlists:[],
      tag:"全部"
    }
  },
  watch:{
    tag(){
      this.topData()
      this.listData()
      this.page=1
    }
  },
  created(){
    this.topData()
    this.listData()
  },
  methods:{
    handleCurrentChange(val){
      console.log("当前页:",val)
      this.page=val
      this.listData()
    },
    topData(){
      this.axios.get(`https://autumnfish.cn/top/playlist/highquality?limit=1&cat=${this.tag}`).then(res=>{
        this.topList=res.data.playlists[0]
      })
    },
    listData(){
      this.axios.get(`https://autumnfish.cn/top/playlist?limit=10&offset=${(this.page-1)*10}&cat=${this.tag}`).then(res=>{
        this.playlists=res.data.playlists
        this.total=res.data.total
      })
    }

  }
}
</script>

<style lang="stylus" scoped>
.play-list
  .list-conteiner
    width 100%
    height 150px
    background-color rgba(0,0,0,0.5)
    border-radius 5px
    display flex
    align-items top
    img 
      width 120px
      height 120px
      padding 15px
    .desc
      display flex
      flex-direction column
      margin 10px
      .category
        width 60px
        display inline
        color gold 
        border 1px solid gold 
        border-radius 5px
        padding 5px
        font-size 14px
      .title
        font-size 14px
        color #fff
        padding 5px 5px 0 0
      .content
        width 400px
        font-size 10px
        color #ddd
        padding 5px 5px 5px 0
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
  .tags
    display flex
    .on
      color red
    span 
      display inline-block
      width 100px
      margin 5px
      font-size 14px
  .list-play
    display flex
    flex-wrap wrap
    .list-item
      display flex
      flex-direction column
      width 120px
      margin 10px 10px 10px 0
      font-size 12px
      img 
        width 120px
        height 120px
      .desc
        width 120px

</style>
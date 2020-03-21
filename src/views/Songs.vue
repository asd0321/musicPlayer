<template>
  <div class="song">
    <div class="tags">
      <span :class="{'on':tag===0}" @click="tag=0">全部</span>
      <span :class="{'on':tag===7}" @click="tag=7">华语</span>
      <span :class="{'on':tag===96}" @click="tag=96">欧美</span>
      <span :class="{'on':tag===8}" @click="tag=8">日本</span>
      <span :class="{'on':tag===16}" @click="tag=16">韩语</span>
    </div>
    <table class="el-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr v-for="(item,index) in lists" :key="index" class="el-table_row">
          <td>{{index+1}}</td>
          <td class="list-img">
            <span @click="playMusic(item.id)">
              <i class="iconfont icon-triangle"></i>
            </span>
            <img :src="item.album.picUrl" alt="">
          </td>
          <td>{{item.name}}</td>
          <td>{{item.artists[0].name}}</td>
          <td>{{item.album.name}}</td>
          <td>{{item.duration}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data(){
    return {
      lists:[],
      tag:0
    }
  },
  watch:{
    tag(){
      this.getSongsList()
    }
  },
  created(){
    this.getSongsList()
  },
  methods:{
    getSongsList(){
      this.axios.get(`https://autumnfish.cn/top/song?type=${this.tag}`).then(res=>{
        this.lists=res.data.data
        for(let i=0;i<this.lists.length;i++){
          let duration=this.lists[i].duration
          let min=parseInt(duration/1000/60)
          let sec=parseInt(duration/1000%60)
          min=min<10?'0'+min:min
          sec=sec<10?'0'+sec:sec
          this.lists[i].duration=`${min}:${sec}`
        }
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
.song
  .tags
    span 
      margin 10px 10px 10px 0
      &.on
        color red
  table
    .list-img
      position relative
      span 
        position absolute
        left 40px
        top 40px
        background-color rgba(255,255,255,0.8)
        border-radius 50%
        padding 5px
        i 
          color orangered
      img 
        width 80px
        height 80px
        margin 0 10px
        border-radius 10px
</style>
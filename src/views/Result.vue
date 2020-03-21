<template>
  <div class="result">
      <div class="title-wrap">
        <h2 class="title">{{$route.query.q}}</h2>
        <span class="sub-title">找到{{count}}个结果</span>
      </div>
      <el-tabs v-model="activeIndex" @tab-click="handleClick">
        <el-tab-pane label="歌曲" name="songs">
          <table class="el-table">
            <thead>
              <th></th>
              <th>音乐标题</th>
              <th>歌手</th>
              <th>专辑</th>
              <th>时长</th>
            </thead>
            <tbody>
              <tr v-for="(item,index) in songList" :key="index" @dblclick="playMusic(item.id)">
                <td>{{index+1}}</td>
                <td class="td-name">
                  <span  class="alias">
                    <span>{{item.name}}</span>
                    <span v-show="item.alias[0]">{{item.alias[0]}}</span>
                  </span>
                  <span v-if="item.mvid!==0"><i class="iconfont icon-video"></i></span>
                </td>
                <td>{{item.artists[0].name}}</td>
                <td>{{item.album.name}}</td>
                <td>{{item.duration}}</td>
              </tr>
            </tbody>
          </table>
        </el-tab-pane>
        <el-tab-pane label="歌单" name="lists">
          <div class="list">
            <div class="list-item" v-for="(item,index) in playlist" :key="index" @click="toPlayList(item.id)">
              <span>
                <img :src="item.coverImgUrl">
                <span class="play-count">播放量:{{item.playCount}}</span>
              </span>
              <span class="play-desc">{{item.name}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="mvs">
          <div class="mvs">
            <div class="mvs-item" v-for="(item,index) in mvs" :key="index"  @click="toMV(item.id)">
              <span class="mv-img">
                <img :src="item.cover">
                <span class="play-count">
                  <span class="play-time">
                    <i class="iconfont icon-triangle"></i>
                    <span>{{item.playCount}}</span>
                  </span>
                  <span class="duration">{{item.duration}}</span>
                  <span class="play-flag">
                    <i class="iconfont icon-triangle"></i>
                  </span>
                </span>
              </span>
              <span class="mv-title">
                <span>{{item.name}}</span>
                <span>{{item.artistName}}</span>
              </span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <el-pagination background layout="prev, pager, next" 
        :total="1000">
      </el-pagination>
  </div>
</template>

<script>
export default {
    data() {
      return {
        activeIndex: 'songs',
        songList:[],
        playlist:[],
        mvs:[],
        count:0
      }
    },
    created(){
      this.axios.get(`https://autumnfish.cn/search?keywords=${this.$route.query.q}&type=1&limit=10`).then(res=>{
        this.songList=res.data.result.songs
        this.count=res.data.result.songCount
        for(let i=0;i<this.songList.length;i++){
          let min=parseInt(this.songList[i].duration/1000/60)
          let sec=parseInt(this.songList[i].duration/1000%60)
          min=min<10?'0'+min:min
          sec=sec<10?'0'+sec:sec
          this.songList[i].duration=min+':'+sec
        }
      })
    },
    watch:{
      activeIndex(){
        let type=1
        let limit=10
        switch(this.activeIndex){
          case 'songs':
            type=1
            limit=10
            break
          case 'lists':
            type=1000
            limit=10
            break
          case 'mvs':
            type=1004
            limit=8
            break
          default:
            break
        }
        this.axios.get(`https://autumnfish.cn/search?keywords=${this.$route.query.q}&type=${type}&limit=${limit}`).then(res=>{
          if(type===1){
            this.songList=res.data.result.songs
            this.count=res.data.result.songCount
            for(let i=0;i<this.songList.length;i++){
              let min=parseInt(this.songList[i].duration/1000/60)
              let sec=parseInt(this.songList[i].duration/1000%60)
              min=min<10?'0'+min:min
              sec=sec<10?'0'+sec:sec
              this.songList[i].duration=min+':'+sec
            }
          }else if(type===1000){
            this.playlist=res.data.result.playlists
            this.count=res.data.result.playlistCount
            for(let i=0;i<this.playlist.length;i++){
              this.playlist[i].playCount=this.playlist[i].playCount>100000?parseInt(this.playlist[i].playCount/10000)+'万':this.playlist[i].playCount
            }
          }else{
            this.mvs=res.data.result.mvs
            for(let i=0;i<this.mvs.length;i++){
              let min=parseInt(this.mvs[i].duration/1000/60)
              let sec=parseInt(this.mvs[i].duration/1000%60)
              min=min<10?'0'+min:min
              sec=sec<10?'0'+sec:sec
              this.mvs[i].duration=min+":"+sec
              this.mvs[i].playCount=this.mvs[i].playCount>100000?parseInt(this.mvs[i].playCount/100000)+'万':this.mvs[i].playCount
            }
          }
        })
        
      }
    },
    methods: {
      toMV(id){
        this.$router.push(`/mvdetail?q=${id}`)
      },
      toPlayList(id){
        this.$router.push(`/playdetail?q=${id}`)
      },
      handleClick(tab, event) {
        console.log(tab, event);
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
.result
  .title-wrap
    display flex
    align-items center
    .sub-title
      color grey
      margin-left 20px
  .td-name
    display flex
    align-items center
    .alias
      display flex
      flex-direction column
      :last-child
        font-size 12px
        color grey
    .iconfont 
      color red
      margin-left 10px
  .list
    display flex
    flex-wrap wrap
    .list-item
      display flex
      flex-direction column
      width 160px
      margin 10px 10px 10px 0
      position relative
      img
        width 160px
        hieght 160px
        border-radius 5px
      .play-count
        font-size 12px
        color #ffffff
        position absolute
        right 5px
        top 5px
      .play-desc
        font-size 14px
        width 160px
  .mvs
    display flex
    flex-wrap wrap
    .mvs-item
      width 180px
      display flex
      flex-direction column
      margin 10px 10px 10px 0
      .mv-img
        position relative
        img
          width 180px
          height 100px
          border-radius 5px
        .play-flag
          display none
        &:hover
          .play-flag
            position absolute
            left 50%
            top 50%
            transform translate(-50%,-50%)
            background-color rgba(255,255,255,0.8)
            width 40px
            height 40px
            display flex
            align-items center
            justify-content center
            border-radius 50%
            i 
              font-size 20px
              color orangered
              text-align center
        .play-count
          font-size 12px
          color #ffffff
          i 
            font-size 12px
            margin-right 5px
          .play-time
            position absolute
            top 5px
            right 5px
          .duration
            position absolute
            top 80px
            right 5px
          
      .mv-title
        display flex
        flex-direction column
        :first-child
          font-size 14px
        :last-child
          font-size 12px
          color grey

</style>
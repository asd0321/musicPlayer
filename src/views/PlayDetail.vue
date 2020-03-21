<template>
  <div class="playlist-container">
      <div class="top-wrap">
          <div class="img-wrap">
              <img :src="playlist.coverImgUrl" alt="">
          </div>
          <div class="info-wrap">
              <div class="info-title">{{playlist.name}}</div>
              <div class="info-user">
                  <span class="user-avatatr" v-if="playlist.creator.avatarUrl"><img :src="playlist.creator.avatarUrl" alt=""></span>
                  <span class="user-name">{{playlist.creator.nickname}}</span>
                  <span class="user-time">{{playlist.createTime}}创建</span>
              </div>
              <div class="play-all">
                  <el-button type="primary">播放全部</el-button>
              </div>
              <div class="info-flags" v-if="playlist.tags.length>0">
                  <h3>标签:</h3>
                  <span v-for="(item,index) in playlist.tags" :key="index">{{item}}</span>
              </div>
              <div class="info-desc"  v-if="playlist.description">
                  <h3>简介:</h3>
                  <span>{{playlist.description}}</span>
              </div>
          </div>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="歌曲列表" name="songslist">
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
                    <tr v-for="(item,index) in playlist.tracks" :key="index" class="el-table_row">
                        <td>{{index+1}}</td>
                        <td class="list-img">
                            <span class="play-icon">
                                <i class="iconfont icon-triangle"></i>
                            </span>
                            <img :src="item.al.picUrl" alt="">
                        </td>
                        <td>{{item.name}}</td>
                        <td>{{item.ar[0].name}}</td>
                        <td>{{item.alia[0]}}</td>
                        <!-- <td>{{}}</td> -->
                    </tr>
                </tbody>
            </table>
        </el-tab-pane>
        <el-tab-pane label="评论(9)" name="comments">
            <div class="hot-comments">
                <h3>热门评论({{hotCount}})</h3>
                <div class="hot-item" v-for="(item,index) in hotComments" :key="index">
                    <div>
                        <div>
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="user-info">
                            <span class="user-name">{{item.user.nickname}}</span>
                            <span class="user-content">{{item.content}}</span>
                        </div>
                    </div>
                    <div class="re-content" v-if="item.beReplied.length!=0">
                        <div>
                            <span class="name">{{item.beReplied[0].user.nickname}}</span>
                            <span class="comment">{{item.beReplied[0].content}}</span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="hot-comments">
                <h3>精彩评论({{total}})</h3>
                <div class="hot-item" v-for="(item,index) in comments" :key="index">
                    <div>
                        <div>
                            <img :src="item.user.avatarUrl" alt="">
                        </div>
                        <div class="user-info">
                            <span class="user-name">{{item.user.nickname}}</span>
                            <span class="user-content">{{item.content}}</span>
                        </div>
                    </div>
                    <div class="re-content" v-if="item.beReplied.length!=0">
                        <div>
                            <span class="name">{{item.beReplied[0].user.nickname}}</span>
                            <span class="comment">{{item.beReplied[0].content}}</span>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>

            <el-pagination @current-change="handleCurrentPage" background layout="prev, pager, next" 
                :total="total" :current-page="page">
            </el-pagination>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>

<script>
export default {
    data(){
        return{
            activeName:'songslist',
            id:this.$route.query.q,
            playlist:[],
            hotComments:[],
            hotCount:0,
            total:0,
            comments:[],
            page:1
        }
    },
    created(){
        this.axios.get('https://autumnfish.cn/playlist/detail?id='+this.id).then(res=>{
            this.playlist=res.data.playlist
            // for(let i=0;i<this.playlist.length;i++){
            //   let min=parseInt(this.playlist[i].duration/1000/60)
            //   let sec=parseInt(this.playlist[i].duration/1000%60)
            //   min=min<10?'0'+min:min
            //   sec=sec<10?'0'+sec:sec
            //   this.playlist[i].duration=min+":"+sec
            // }
            console.log(this.playlist)
        })
        this.axios.get(`https://autumnfish.cn/comment/hot?id=${this.id}&type=2`).then(res=>{
            this.hotComments=res.data.hotComments
            this.hotCount=res.data.total
        })
        this.axios.get(`https://autumnfish.cn/comment/playlist?id=${this.id}&limit=10&offset=0`).then(res=>{
            console.log(res)
            this.total=res.data.total
            this.comments=res.data.comments
        })
    },
    methods:{
        handleCurrentPage(val){
            this.page=val
            console.log("val:",val)
            this.axios.get(`https://autumnfish.cn/comment/playlist?id=${this.id}&limit=10&offset=${(this.page-1)*10}`).then(res=>{
                this.total=res.data.total
                this.comments=res.data.comments
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.playlist-container
    .top-wrap
        display flex
        .img-wrap
            img 
                width 200px
                height 200px
                border-radius 10px
        .info-wrap
            padding-left 20px
            .info-title
                font-size 16px
                font-weight bold
            .info-user
                dislay flex
                align-items center
                justify-content center
                margin 10px 10px 10px 0
                font-size 12px
                img
                    width 50px
                    height 50px
                    border-radius 50%
            .info-flags
                display flex
                flex-wrap nowrap
                align-items center
                font-size 12px
                h3
                    margin-right 10px
                span::after
                    content '/'  
                span:last-child::after
                    content '' 
            .info-desc
                display flex
                flex-wrap nowrap
                align-items center
                font-size 12px
                h3
                    margin-right 10px
                    width 35px
    .el-table
        img
            width 80px
            height 80px
        .list-img
            position relative
            .play-icon
                position absolute
                left 50%
                top 50%
                transform translate(-50%,-50%)
                background rgba(255,255,255,0.8)
                border-radius 50%
                padding 5px
                i
                    color orangered
    .hot-comments
        display flex
        flex-direction column
        .hot-item
            display flex
            flex-direction row
            img
                width 60px
                height 60px
            .user-info
                display flex
                flex-direction row
                font-size 14px
                align-items center
                margin-left 5px
                :first-child
                    margin-right 5px
                .user-name
                    color red


</style>
<template>
  <div class="mv-container">
      <div class="mv-detail">
          <div class="mv">
            <h3>MV详情</h3>
            <div class="video-wrap">
                <video :src="mvurl" controls></video>
            </div>

            <div class="mv-desc">
                <div class="mv-avatar">
                    <span><img :src="icon" alt=""></span>
                    <span>{{mvInfo.artistName}}</span>
                </div>
                <div class="desc-title">{{mvInfo.name}}</div>
                <div class="desc-time">
                    <span>发布:  {{mvInfo.publishTime}}</span>
                    <span>播放:  {{mvInfo.playCount}}次</span>
                </div>
                <div class="desc-content">{{mvInfo.desc}}</div>
            </div>

            <div class="hot-comments">
                <h3>热门评论({{hotComments.length}})</h3>
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
                    <div class="comments" v-if="item.beReplied.length!=0">
                        <div class="re-content">
                            <span class="name">{{item.beReplied[0].user.nickname}}</span>
                            <span class="comment">{{item.beReplied[0].content}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hot-comments">
                <h3>精彩评论({{total}})</h3>
                <div class="hot-item" v-for="(item,index) in comments" :key="index">
                    <div class="comment-msg">
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
                            <span>回复:</span>
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

          </div>
          <div class="recommend-about">
              <h3>相关推荐</h3>
              <div class="recommend-item" v-for="(item,index) in simiMVs" :key="index">
                  <div>
                    <span><img :src="item.cover" alt=""></span>
                    <span class="play-count">
                        <span><i class="iconfont icon-triangle"></i></span>
                        <span>{{item.playCount}}</span>
                    </span>
                    <span class="play-time">{{item.duration}}</span>
                    <span class="play-icon"><i class="iconfont icon-triangle"></i></span>
                  </div>
                  <div class="recomment-desc">
                    <span>{{item.name}}</span>
                    <span>{{item.artistName}}</span>
                  </div>
              </div>
          </div>

      </div>

  </div>
</template>

<script>
export default {
    data(){
        return{
            id:this.$route.query.q,
            mvurl:'',
            simiMVs:[],
            mvInfo:{},
            icon:'',
            hotComments:[],
            page:1,
            comments:[],
            total:0
        }
    },
    created(){
        this.axios.get(`https://autumnfish.cn/mv/url?id=${this.id}`).then(res=>{
            this.mvurl=res.data.data.url
        })
        this.axios.get(`https://autumnfish.cn/simi/mv?mvid=${this.id}`).then(res=>{
            this.simiMVs=res.data.mvs
            for(let i=0;i<this.simiMVs.length;i++){
                let min=parseInt(this.simiMVs[i].duration/1000/60)
                let sec=this.simiMVs[i].duration/1000%60
                min=min<10?'0'+min:min
                sec=sec<10?'0'+sec:sec
                this.simiMVs[i].duration=min+':'+sec

                this.simiMVs[i].playCount=this.simiMVs[i].playCount>100000?parseInt(this.simiMVs[i].playCount/10000)+'万':this.simiMVs[i].playCount
            }
        })
        this.axios.get(`https://autumnfish.cn/mv/detail?mvid=${this.id}`).then(res=>{
            this.mvInfo=res.data.data
            this.axios.get(`https://autumnfish.cn/artists?id=${this.mvInfo.artists[0].id}`).then(res=>{
                this.icon=res.data.artist.picUrl
            })
        })
        this.axios.get(`https://autumnfish.cn/comment/mv?id=${this.id}&limit=10&offset=0`).then(res=>{
            this.hotComments=res.data.hotComments
            this.comments=res.data.comments
            this.total=res.data.total
        })
    },
    methods:{
        handleCurrentPage(val){
            this.page=val
            this.axios.get(`https://autumnfish.cn/comment/mv?id=${this.id}&limit=10&offset=${(this.page-1)*10}`).then(res=>{
                this.comments=res.data.comments
                console.log(res)
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.mv-container
    .mv-detail
        display flex
        align-items top
        .mv
            .video-wrap
                width 500px
                height 200px
                video 
                    width 100%
                    height 100%
    .recommend-about
        margin-left 50px
        img 
            width 200px
            height 120px
            border-radius 5px
        .recommend-item
            display flex
            align-items center
            width 280px
            position relative
            .play-icon 
                display none
            &:hover
                .play-icon
                    position absolute
                    left 50%
                    top 50%
                    width 30px
                    height 30px
                    margin-left -60px
                    margin-top -30px
                    padding 5px
                    color orangered 
                    background-color rgba(255,255,255,0.8)
                    border-radius 50%
                    display inline-block
                    font-size 20px
                    text-align center
            .recomment-desc
                display flex
                flex-direction column
                margin-left 10px
                :first-child
                    font-weight bold
                    font-size 14px
                :last-child
                    font-size 12px
                    color grey
            .play-time
                font-size 12px
                color red
                position absolute
                bottom 10px
                left 160px
                color #fff
            .play-count
                position absolute
                right 90px
                top 5px
                color #fff
                font-size 12px
    .mv-desc
        width 500px
        margin-top 30px
        .mv-avatar
            display flex
            align-items center
            :first-child
                margin-right 10px
            img 
                width 50px
                height 50px
                border-radius 50%
        .desc-title
            font-weight bold
            font-size 18px
        .desc-time
            font-size 14px
            color grey
            margin-top 10px
            :first-child
                margin-right 50px
        .desc-content
            margin-top 10px
            font-size 14px       
    .hot-comments
        display flex
        flex-direction column
        .hot-item
            display flex
            flex-direction column
            border-bottom 1px solid #ddd
            .comments
                display flex
                flex-direction column
            .comment-msg
                display flex
                flex-direction row
            img
                width 60px
                height 60px
            .user-info
                .user-name
                    color red
        .re-content
            background #ddd
           


</style>
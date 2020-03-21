<template>
  <div class="mvs">
      <div class="mvs-category">
        <div class="areas items">
          <h3>地区</h3>
          <span :class="{'on':area==='全部'}" @click="area='全部'">全部</span>
          <span :class="{'on':area==='内地'}" @click="area='内地'">内地</span>
          <span :class="{'on':area==='港台'}" @click="area='港台'">港台</span>
          <span :class="{'on':area==='欧美'}" @click="area='欧美'">欧美</span>
          <span :class="{'on':area==='日本'}" @click="area='日本'">日本</span>
          <span :class="{'on':area==='韩国'}" @click="area='韩国'">韩国</span>
        </div>
        <div class="types items">
          <h3>类型</h3>
          <span :class="{'on':type==='全部'}" @click="type='全部'">全部</span>
          <span :class="{'on':type==='官方版'}" @click="type='官方版'">官方版</span>
          <span :class="{'on':type==='原声'}" @click="type='原声'">原声</span>
          <span :class="{'on':type==='现场版'}" @click="type='现场版'">现场版</span>
          <span :class="{'on':type==='网易出品'}" @click="type='网易出品'">网易出品</span>
        </div>
        <div class="orders items">
          <h3 :class="{'on':order==='排序'}" @click="order='排序'">排序</h3>
          <span :class="{'on':order==='上升最快'}" @click="order='上升最快'">上升最快</span>
          <span :class="{'on':order==='最热'}" @click="order='最热'">最热</span>
          <span :class="{'on':order==='最新'}" @click="order='最新'">最新</span>
        </div>
      </div>
      <div class="mvs-list">
        <div class="mvs-item" v-for="(item,index) in list" :key="index">
          <div>
            <span>
              <img :src="item.cover" alt="">
            </span>
            <span class="play-count">
              <i class="iconfont icon-triangle"></i>
              <span>881177</span>
            </span>
          </div>
          <div class="mvs-title">{{item.name}}</div>
        </div>
      </div>

      <el-pagination @current-change="handleCurrentChange" background layout="prev, pager, next" 
        :total="total" :page-size="10" :current-page="page">
      </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      total:20,
      page:1,
      limit:10,
      area:'全部',
      type:'全部',
      order:'上升最快',
      list:[]
    }
  },
  watch:{
    area(){
      this.page=1
      this.getList()
    },
    type(){
      this.page=1
      this.getList()
    },
    order(){
      this.page=1
      this.getList()
    }
  },
  created(){
    this.getList()
  },
  methods:{
    handleCurrentChange(val){
      this.page=val

      this.getList()
    },
    getList(){
      this.axios.get(`https://autumnfish.cn/mv/all?limit=${this.limit}&area=${this.area}&order=${this.order}&type=${this.type}&offset=${(this.page-1)*this.limit}`).then(res=>{
        this.list=res.data.data
        for(let i=0;i<this.list.length;i++){
          this.list[i].playCount=this.list[i].playCount>100000?parseInt(this.list[i].playCount/100000)+"万":this.list[i].playCount
        }
        res.data.count&&(this.total=res.data.count)
        console.log(this.list)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.mvs
  .mvs-category
    .items
      margin 10px
      display flex
      flex-wrap nowrap
      align-items center
      :first-child
        font-size 16px
        margin-right 10px
        color red
      span 
        font-size 14px
        margin 0 10px
        &.on
          background-color pink
          padding 5px
          color red
          border-radius 10px
  .mvs-list
    display flex
    flex-wrap wrap
    .mvs-item
      display flex
      flex-direction column
      width 200px
      margin 10px 20px 10px 0
      position relative
      img 
        width 200px
        height 120px
        border-radius 5px
      .play-count
        font-size 12px
        color #ffffff
        position absolute
        right 5px
        top 5px
        i 
          margin-right 5px
      .mvs-title
        font-size 14px
        width 200px
</style>
<template>
  <div class="top">
    <i class="el-icon-search"></i>
    <input type="text" placeholder="搜索" v-model="inputValue" @keyup.enter="toSearch">
    <span class="icon-back" @click="$router.back()">＜</span>
  </div>
</template>

<script>
export default {
  data(){
    return {
      inputValue:''
    }
  },
  methods:{
    toSearch(){
      if(this.inputValue===''){
        this.$message({
          message:'请输入搜索内容',
          type: 'warning'
        })
      }else{
        this.$router.push('/result?q='+this.inputValue)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.top
  display flex
  align-items center
  background-color #eee
  position relative
  padding 10px
  i
    position absolute
    left 15px
    top 20px
  input 
    text-indent 20px
    padding 5px
    font-size 14px
    border-radius 5px
    border 1px solid #ddd
  .icon-back
    font-size 20px
    color grey
    margin 0 20px
    background-color rgba(255,255,255,0.8)
    padding 5px
    border-radius 50%
    display inline-block
    width 30px
    hieght 30px
    text-align center
    cursor pointer
    

</style>
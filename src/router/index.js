import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes:[
        {path:'/',redirect:'/discovery'},
        {path:'/songs',component:()=>import('../views/Songs.vue')},
        {path:'/discovery',component:()=>import('../views/Discovery.vue')},
        {path:'/mvs',component:()=>import('../views/MVs.vue')},
        {path:'/playlist',component:()=>import('../views/PlayList.vue')},
        {path:'/result',component:()=>import('../views/Result.vue')},
        {path:'/playdetail',component:()=>import('../views/PlayDetail.vue')},
        {path:'/mvdetail',component:()=>import('../views/MVDetail.vue')}
    ]
})


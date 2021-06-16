import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '@/views/Recommend'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/recommend',
  },
  {
    path:'/recommend',
    name:'Recommend',
    component:Recommend,
  },
  {
    path:'/recommend_songs/:id',
    name:'RecommendSongs',
    component:() => import('@/views/RecommendSongs'),
    props:true,
    meta:{
      hideNav:true,
    },
  }, 
  {
    path:'/hot',
    name:'Hot',
    component:() => import('@/views/Hot'),
  }, 
  {
    path:'/charts',
    name:'Charts',
    component:() => import('@/views/Charts'),
    meta:{
      hideSearch:true,
    },
  },
  {
    path:'/chart_mv/:id',
    name:'ChartMV',
    component:() => import('@/views/ChartMV'),
    props:true,
    meta:{
      hideNav:true,
    },
  },
  {
    path:'/chart_singer/:id',
    name:'ChartSinger',
    component:() => import('@/views/ChartSinger'),
    props:true,
    meta:{
      hideNav:true,
    },
  },
  {
    path:'/search',
    name:'Search',
    component:() => import('@/views/Search'),
    meta:{
      hideNav:true,
    },
  },
]

const router = new VueRouter({
  routes
})

export default router

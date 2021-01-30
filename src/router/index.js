/*
 * @Description: ent
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 12:50:51
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-11 09:01:07
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:'/recomment/rtstyle'
  },
  {
    path: '/comment',
    name: 'comment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Conent.vue')
  },
  {
    path: '/recomment',
    name: 'Recomment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //通过 箭头函数 import方式导入
    component: () => import(/* webpackChunkName: "about" */ '../views/Recomment.vue'),
    children:[
      {
        path:'/recomment/rtstyle',
        name:'Gexin',
        component:()=>import('../views/Recomment/Gexin.vue')
      },
      {
        path:'/recomment/songlist',
        name:'SongList',
        component:()=>import('../views/Recomment/SongList.vue')
      },
      {
        path:'/recomment/zhubo',
        name:'Zhubo',
        component:()=>import('../views/Recomment/Zhubo.vue')
      },
      {
        path:'/recomment/phang',
        component:()=>import('../views/Recomment/Phang.vue')
      },
      {
        path:'/recomment/singer',
        component:()=>import('../views/Recomment/Singer.vue')
      },
      {
        path:'/recomment/newmusic',
        component:()=>import('../views/Recomment/NewMusic.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router

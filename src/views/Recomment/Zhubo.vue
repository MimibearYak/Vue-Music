<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 13:58:56
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-20 11:44:30
-->
@<template>
  <div class="zhubo-box">
    <!-- 轮播图 -->
    <div class="top">
      <el-carousel :interval="1000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in luboData" :key="index">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img class='medium' :src="item.pic" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 电台分类 -->
    <div class='RadioClass flex-one'>
      <div class='RadioClass-item' v-for='(item,index) in RedioData' :key="index">
        <img :src="item.pic56x56Url" alt="">
        <div>{{item.name}}</div>
      </div>
    </div>
    <!-- 付费精选 -->
    <div>
      <ZhuboCard name='电台个性推荐' :fatherData='recommentData'></ZhuboCard>
      <ZhuboCard name='创作|翻唱' :fatherData='coverList'></ZhuboCard>
      <ZhuboCard name='3D|电子' :fatherData='Dlist'></ZhuboCard>
      <ZhuboCard name='3D|电子' :fatherData='Dlist'></ZhuboCard>
      <ZhuboCard name='3D|电子' :fatherData='Dlist'></ZhuboCard>
    </div>
  </div>
</template>

<script>
import {getlubo,getRedioClass,getRecomment,getRecommentClass,} from "@/network/zhubo"
import ZhuboCard from '@/components/ZhuboCard' //组件引入不用大括号
export default {
  data(){
    return{
      luboData:[],
      RedioData:[],
      recommentData:[],
      coverList:[],
      Dlist:[],

    }
  },
  created(){
    this.getluboM()
    this.getRedioClassM()
    this.getRecommentM()//个性推荐
    this.getCover(2001)//翻唱
    this.getD(10002)
    
  },
  components:{
    ZhuboCard
  },
  methods:{
    //轮播
    getluboM(){
      getlubo('/dj/banner').then(res=>{
        this.luboData=res.data
      })
    },
    //电台分类
    getRedioClassM(){
      getRedioClass('/dj/catelist').then(res=>{
        this.RedioData=res.categories
      })
    },
    //个性
    getRecommentM(){
      getRecomment('/dj/recommend').then(res=>{
        this.recommentData=res.djRadios.splice(0,6)
      })
    },
    //翻唱
    getCover(type){
      getRecommentClass('/dj/recommend/type',{
        type:type,
      }).then(res=>{
        console.log(res)
        this.coverList=res.djRadios
      })
    },
    getD(type){
      getRecommentClass('/dj/recommend/type',{
        type:type,
      }).then(res=>{
        console.log(res)
        this.Dlist=res.djRadios
      })
    }
  },
};
</script>

<style scoped lang='stylus'>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item>img{
    width 100%
    height 100%
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  //
  .zhubo-box
    .top
      padding-top 20px
    .RadioClass
      // border-bottom 2px solid red
      .RadioClass-item
        width 100px
        height 100px
        padding 20px 20px
        margin 0 50px
        margin-bottom 20px
        img 
          height 50px
          width 50px
        div
          font-size 12px
          text-align center
          padding-right 10px
        &:hover
          width 100px
          height 100px
          padding 20px 20px
          margin 0 50px
          margin-bottom 20px
          background rgba(0,0,255,.1)
    .header-tab
      height 40px
      border-bottom 2px solid red

      
        
</style>
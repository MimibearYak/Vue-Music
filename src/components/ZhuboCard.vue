<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-15 21:25:22
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-20 11:25:00
-->
@<template>
    <div class="box">
      <!-- 头部导航 -->
      <div class="top flex">
        <div>{{name}}</div>
        <div v-if='name!="电台个性推荐"'>更多></div>
      </div>
      <!-- list -->
      <div class="list flex">
        <div class="list-item" v-for="(item,index) in fatherData" :key='index'>
          <div class='tops'>
            <img :src="item.picUrl" alt="!">
            <div class="text text-one">{{item.name}}</div>
          </div>
          <div class="text-one">{{item.rcmdtext}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name:'ZhuboCard',
  props:{
    name:{
      type:String
    },
    fatherData:{
      type:Array
    },
  }
}
</script>

<style scoped lang='stylus'>
  .box
    width 100%
    height 260px
    .top
      border-bottom 2px solid skyblue
      padding-bottom 6px
      margin-bottom 10px
    .list
      .list-item
        height 199px
        width 168px
        .tops
          position relative
          img
            width 100%
            height 168px
          .text
            position absolute
            width 100%
            height 20px
            bottom 5px
            color #fff
            background: rgba(1,1,1,.2)
            
            
      
</style>
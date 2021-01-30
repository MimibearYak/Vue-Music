<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 13:59:25
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-18 15:16:43
-->
@<template>
  <div class='phang-box'>
    <!-- 官方榜  -->
    <div class="phang-one flex">
      <div>官方榜</div>
      <div></div>
    </div>
      
    <!-- 官方榜 -->
    <div class="list-top flex-one">
      <PhangCard :cards='soarData' class='cardClass'></PhangCard>
      <PhangCard :cards='newSongData' class='cardClass'></PhangCard>  
      <PhangCard :cards='originalData' class='cardClass'></PhangCard>
      <PhangCard :cards='sing' class='cardClass'></PhangCard>
      <PhangCard :cards='Rap' class='cardClass'></PhangCard>
      <PhangCard :cards='vip' class='cardClass'></PhangCard>
    </div>
    
    <div class="phang-one flex">
      <div>全球榜</div>
      <div></div>
    </div>
    <!-- 全球列表 -->
    <div class="listMusic flex-one">
      <div class='item' v-for='(item,index) in globalData' :key='index'>
        <div class='item-top'>
          <div class="play-num"><i class="el-icon-service">{{item.playCount>=10000?(Math.round(item.playCount/10000))+'万':item.playCount}}</i></div>
          <img :src="item.coverImgUrl" alt="">
          <div class='playMusic'><i class='el-icon-video-play'></i></div>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <!-- 加载效果 -->
    <!-- <Load></Load> -->
  </div>
</template>

<script>
import Load from '@/components/Load'
import {getPhangData,} from '@/network/phang'
import PhangCard from '@/components/PhangCard'
export default {
  data(){
    return{
      globalData:[],
      soarData:{},
      newSongData:{},
      originalData:{},
      sing:{},
      Rap:{},
      vip:{},
      
    }
  },
  created(){
    this.getglobalm()

  },
  // 榜单中子组件
  components:{
    PhangCard,
  },
  methods:{
    getglobalm(){
      getPhangData('/toplist').then(res=>{
        this.globalData=res.list
        this.soarData=res.list[0]//获取飙升榜
        this.newSongData=res.list[1]
        this.originalData=res.list[2]
        this.sing=res.list[3]
        this.Rap=res.list[4]
        this.vip=res.list[5]
      })
    },
  },
}
</script>

<style scoped lang='stylus'>
  .phang-box
    .phang-one
      margin-top 16px
      border-bottom 1px solid blue
      padding-bottom 4px
      font-size 25px
    .list-top
      padding-top 16px
      .cardClass
        margin 0 52px
        margin-bottom 18px
        

    //
    .listMusic
      margin-top 25px
      padding 0 0
      .item
        height 250px
        width 200px
        overflow hidden
        margin-right 30px
        .item-top
          position relative
          width 200px
          height 200px
          .play-num
            position absolute
            right 0
            width 100px
            height 16px
            font-size 8px
            background rgba(19,18,18,.3)
            color #fff 
            text-align right  
            padding-right 20px
          img 
            width 100%
            height 100%
          .playMusic
            position absolute
            right 10px
            bottom 18px
            height 50px
            width 50px
            transform translateX(115%)
            transition .4s
            border-radius 50%
            font-size 50px
            color red
      .item:hover .playMusic
        transform translateX(0)
</style>

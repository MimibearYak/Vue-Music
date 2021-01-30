<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-14 12:25:30
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-15 19:02:51
-->
@<template>
  <div class="card-box">
    <div class="card-top">
      <img :src="cards.coverImgUrl" alt="">
      <div class="top-time">{{cards.createTime |formate}} 更新</div>
      <div class="top-play">
        <i class='el-icon-video-play'></i>
      </div>
    </div>
    <div class=" flex" v-for='(item,index) in Songlist' :key=index :class="index==0?'card-listone':'card-list'">  
      <div class="left">
        <span>{{index+1}}</span>
        <span>{{item[0].al.name}}</span>
      </div>
      <div class="right">{{item[0].ar[0].name}}</div>
    </div>
    <div class="card-bottom">全部</div>
  </div>
</template>

<script>
import {getPhangList,getPhangListDetail,} from '@/network/phang'
import {formatDateTime} from '@/common/common'
export default {
  name:'PhangCard',
  props:{
    cards:{
      type:Object,
    }
  },
  data(){
    return{
      listData:this.cards,
      Songlist:[],

    }
  },
  created(){
    // this.getList()
    // this.getDetailSong(item.id)
    //父组件通过props传递数据 在到子组件中根据props中的数据在发送网络请求 父组件中的props的值
    //this.getList(id)
  },
  watch:{
    cards:function(val,oldValue){
      this.getList(val.id)
    }
  },
  filters:{
    formate:function(val){
      const timeData=formatDateTime(val)//js引入处理时间方法
      return timeData
    }
  },
  methods:{
    getList(id){
      getPhangList('playlist/detail',{id:id}).then(res=>{
       //只是榜单中的id表
        // this.getDetailSong(res.privileges[0].id)
        const list=res.privileges.splice(0,8)
        list.map((item)=>{
          this.getDetailSong(item.id)
        })
        // console.log(156156156156156)
        // console.log(list)
      })
    },  
    //获取榜单中的详细信息
    getDetailSong(ids){
      getPhangListDetail('song/detail',{
        ids:ids,
        
      }).then(res=>{
        this.Songlist.push(res.songs)
      })
    },
  }
}
</script>

<style scoped lang='stylus'>
  .card-box
    width 300px
    border 1px solid #ccc
    .card-top
      position relative
      width 100%
      height 110px
      img 
        width 100%
        height 100%
      .top-play
        position absolute;
        right 4px
        bottom 8px
        width 30px
        height 30px
        font-size 30px
        color #fff
        border-radius 50%
      .top-time
        position absolute
        left 10px
        bottom 8px
        color #fff
    .card-list
      height 26px
      background #fff
      color #666
      padding 4px 10px
      div>span:nth-of-type(1)
        font-weight 600
        color red
      &:hover
        height 26px
        background pink
        color #666
        padding 4px 10px 
    .card-bottom
      height 25px
      line-height 25px
      text-align right 
      padding 0 10px
</style>
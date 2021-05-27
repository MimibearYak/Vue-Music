<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-16 16:46:12
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-17 13:37:41
-->
@<template>
  <div class='list flex-two'>
    <div class="list-item" v-for="(item,index) in collectlist" :key='index'>
      <img :src="item.avatarUrl" alt="">
      <div class='text'>{{item.nickname}}</div>
    </div>
  </div>
</template>

<script>
import {getMusicCollect} from '@/network/MusicList'
export default {
  data(){
    return{
      collectlist:[],

    }
  },
  created(){
    this.getMusicCollectM(this.$route.query.id)
  },
  methods:{
    getMusicCollectM(id){
      getMusicCollect('/playlist/subscribers',{
        id:id
      }).then(res=>{
        console.log(res)
        this.collectlist=res.subscribers
      })
    }
  }
}
</script>

<style scoped lang='stylus'>
  .list
    height: 300px;
    overflow-y auto
    .list-item
      margin 0 22px 
      margin-bottom: 16px;
      img
        height: 100px;
        width: 100px;
        border-radius 50%
      .text
        width: 100px;
        text-align center
        color #ee0000

</style>
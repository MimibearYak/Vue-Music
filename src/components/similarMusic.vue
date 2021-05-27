<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-18 18:09:29
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-18 21:36:51
-->
@<template>
  <div class='card flex-one' @click='playMusics(songDate.id)'>
    <img :src="songDate.album.picUrl" alt="">
    <div class="right">
      <div class='text-one'>
        <span>歌曲</span>
        {{songDate.name}}
      </div>
      <div>{{songDate.duration|timeFormat}}</div>
      <div>{{songDate.artists[0].name}}</div>
    </div>
  </div>
</template>

<script>
import {getUrl,getDetail} from '@/network/play.js'
export default {
  props:{
    songDate:{
      type:Object
    }
  },
  data(){
    return{

    }
  },
  methods:{
    playMusics(id){
      this.getUrlM(id)
      this.getDetailM(id)
    },
    //获取播放地址
    getUrlM(id){
      getUrl('/song/url',{id:id}).then(res=>{
        console.log(res.data[0].url)
        //修改vuex state中的值
        this.$store.commit('getVuexUrl',res.data[0].url)
        
      })
    },
    //获取播放纤细
    getDetailM(id){
      getDetail('/song/detail',{ids:id}).then(res=>{
        console.log(res)
        this.$store.commit('getVuexDetail',res.songs[0])
      })
    }, 
  },
}
</script>

<style scoped lang='stylus'>
  .card
    img
      height: 80px; 
    .right
      width: 200px;
      margin-left: 10px;
      .text-one
        span
          display inline-block
          border 1px solid red
          padding: 2px 2px 
</style>
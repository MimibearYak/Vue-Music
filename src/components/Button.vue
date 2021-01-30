<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 15:02:35
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-30 18:16:26
-->
@<template>
  <div class='button flex-four'>
    <!-- 时间条 -->
    <div class="silder">
      <el-slider v-model="playTime" :max="playMusicTime"></el-slider>
    </div>
    <!-- left -->
    <div class="buttom-left flex">
      <!-- 获取vuex数据 -->
      <img src="@/assets/2.png" alt="" v-if="playUrl==1">
      <img :src="musicDetail.al.picUrl" alt="" v-else>
      <div class="left-center"  v-if="playUrl==1">
        <div>歌手-歌名</div>
        <div>00:00/00:00</div>
      </div>
      <div class="left-center"  v-else>
        <div>{{musicDetail.ar[0].name}}-{{musicDetail.al.name}}</div>
        <div>{{playTime | fromTimeOne}}/{{musicDetail.m.br|fromTime}}</div>
      </div>
      
    </div>
    <!-- center -->
    <div class="button-center ">
      <div class="center-left flex-four">
        
        <i class="el-icon-caret-left"></i>

        <div v-if='showPlay'>
          <i class="el-icon-video-play" v-if="playUrl==1" ></i>
          <i class="el-icon-video-pause" v-else @click='playPause'></i>
        </div>

        <i class="el-icon-video-play" v-else @click='play'></i>

        <i class="el-icon-caret-right"></i>

      </div>
      <audio :src="playUrl"  autoplay ref='audio'></audio>
    </div>
    <!-- right -->
    <div class="button-right flex-four">
      <div class='right-top'>
        <i class="el-icon-mic"></i>
        <div class='silder-box'>
          <el-slider vertical height='60px' v-model="volume" @change="slectVolume"></el-slider>
        </div>
      </div>
      <i class="el-icon-mic"></i>
      <i class="el-icon-mic"></i>
    </div>
  </div>
</template>

<script>
import {timeFormat,currtTime,fromDataTimeOne} from '@/common/common'
import {mapState} from 'vuex'
export default {
  data(){
    return{
      value2:0, //当前歌曲播放时间进度条显示
      showPlay:true,
      playTime:0,
      playMusicTime:100,
      volume:100,
    }
  },
  computed:{
    ...mapState(['playUrl','musicDetail'])
  },
  mounted(){ //渲染完成
    this.selider()
  },
  filters:{
    fromTime:function(val){
      let time=timeFormat(val)
      return time
    },
   currency(price) {
      let priceStr = '' + price
      if (priceStr.indexOf('.') > -1) {
        let arr = priceStr.split('.')
        return arr[0] + ':' + (arr[1] + '0').substr(0, 2)
      } else {
        return priceStr + '.00'
      }
    },
    Rounding(time){
      let curr=currentTime(time)
      return curr
    },
    fromTimeOne:function(val){
      let time =fromDataTimeOne(val)
      return time
    }
  },
  methods:{
    playPause(){
      //获取audio DOM元素
      console.log(this.$refs.audio) //这样获取到audio元素
      let audio=this.$refs.audio
      //暂停
      audio.pause()
      this.showPlay=false
    },
    //开始
    play(){
      let audio=this.$refs.audio
      audio.play()
      this.showPlay=true
    },
    //时间条
    selider(){
      let audio=this.$refs.audio
      audio.addEventListener('timeupdate',()=>{
        this.playTime=audio.currentTime
        this.playMusicTime=audio.duration
      })
    },
    //控制声音
    slectVolume(){
      console.log(this.volume)
      let audio=this.$refs.audio
      audio.volume=this.volume/100
    },
  }
}
</script>

<style scoped lang='stylus'>
  .button
    position relative
    height: 60px;
    background: skyblue;
    .silder
      position absolute
      height 10px
      width 100%
      top -22px
    .buttom-left
      img
        width 50px
        height 50px
        margin 0 15px
      .left-center
        padding-top 4px
    .button-center
      .center-left
        color: blue;
        font-size: 50px;
    .button-right
      margin-right 20px
      .right-top
        position relative
        margin-right 50px
        .silder-box
          position absolute
          top -20px
          left 10px
          width 20px
          opacity 0
        &:hover .silder-box
          position absolute
          top -20px
          left 10px
          width 20px
          opacity 1
      i:nth-of-type(1)
        margin 0 30px
          
</style>
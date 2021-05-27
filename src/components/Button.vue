<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 15:02:35
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-29 00:15:40
-->
@<template>
  <div class='button flex-four'>
    <!-- 时间条 -->
    <div class="silder">
      <el-slider v-model="playTime" :max="playMusicTime" @change='silderTime'></el-slider>
    </div>
    <!-- left -->
    <div class="buttom-left flex">
      <!-- 获取vuex数据 -->
      <img src="@/assets/2.png" alt="" v-if="playUrl==1">
      <div class="hoverMusic" v-else @click='godetailed'>
        <img :src="musicDetail.al.picUrl" alt="">
        <div class='goMusicDetail'>
          <div>
            <i class='el-icon-arrow-up'></i>
          </div>
          <i class='el-icon-arrow-up'></i>    
        </div>
      </div>
      <div class="left-center"  v-if="playUrl==1" >
        <div class='text-one'>歌手-歌名</div>
        <div class='text-one'>00:00/00:00</div>
      </div>
      <div class="left-center"  v-else>
        <div class='text-one'>{{musicDetail.ar[0].name}}-{{musicDetail.al.name}}</div>
        <div class='text-one'>{{playTime | fromTimeOne}}/{{musicDetail.dt|fromTime}}</div>
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
      this.$store.commit('getPlay',true)
    },
    //开始
    play(){
      let audio=this.$refs.audio
      audio.play()
      this.showPlay=true
      this.$store.commit('getPlay',false)
    },
    
    //时间条
    selider(){
      let audio=this.$refs.audio
      audio.addEventListener('timeupdate',()=>{
        this.playTime=audio.currentTime
        this.$store.commit('getTime',this.playTime)
        this.playMusicTime=audio.duration
      })
    },
    //控制声音
    slectVolume(){
      console.log(this.volume)
      let audio=this.$refs.audio
      audio.volume=this.volume/100
    },
    silderTime(){
      let audio=this.$refs.audio
      console.log(this.playTime/100)
      audio.currentTime=this.playMusicTime-(this.playMusicTime-this.playTime)
      // this.playTime=this.playMusicTime-(this.playMusicTime-audio.currentTime)
    },
    godetailed(){
      this.$router.push('/musicDetail')
    },
  }
}
</script>

<style scoped lang='stylus'>
  .button
    position relative
    height: 60px;
    background: #eeaeee ;
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
      .hoverMusic
        position: relative;
        .goMusicDetail
          position absolute
          top: 0;
          left: 15px;
          height: 50px;
          width: 50px;
          color #fff
          text-align center
          background rgba(1,1,1,.3)
          opacity: 0;
      &:hover .goMusicDetail
        opacity: 1;  

      .left-center
        padding-top 4px
        width: 140px;
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
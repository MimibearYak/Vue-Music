<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-17 22:19:04
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-19 21:37:26
-->
@<template>
  <div class='musicDetailBox'>
    <div class="music-top flex-one">
      <div class="top-left">
        <div class='play-two' ref='playImageTwo'>
          <img src="@/assets/player_bar.png" alt="">
        </div>
        <div class="play-img" ref="playImg">
          <img src="@/assets/disc.png" alt="">
          <img class='img-one' :src="mDetail.al.picUrl" alt="">
        </div>
          <div style='margin-top:20px'>
          <el-button size='mini' icon="el-icon-search">喜欢</el-button>
          <el-button size='mini' icon="el-icon-search">收藏</el-button>
          <el-button size='mini' icon="el-icon-search">分享</el-button>
          <el-button size='mini' icon="el-icon-search">VIP下载</el-button>
        </div>
      </div>
      <div>
        <div class='Lyrics-block'
          style="
            width:350px;
            height:350px;
            overflow:auto;
            margin-top:25px;
            transition:scrollTop .3s;
          "
          ref='lyricScroll'
        >
          <ul ref='lyric' style="padding:5px 20px">
            <li 
              v-for="(item,index) in lrcObject"
              :key="index"
              :style="{color:lyricIndex===index?'red':'black'}"
              :ref="[lyricIndex===index?'lyricRef':'']"
            >
              {{item.c}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="music-bottom flex-one">
      <div class="bottom-left">
        <div class='commont-top'>听友评论</div>
        <div>

        </div>
      </div>
      <div class="bottom-right">
        <div class='similar'>相似歌曲</div>
        <div>
          <similarMusic v-for="(item,index) in songs" :key='index' :songDate='item' style="margin-top:10px"></similarMusic>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getSimilar,getLyric,getComment} from '@/network/MusicList'
import similarMusic from '@/components/similarMusic'
export default { 
  data(){
    return{
      routeNum:0,
      setInter:'',
      songs:[],
      lyricIndex:0,
      lrcObject:[],

    }
  },
  components:{
    similarMusic,

  },
  computed:{
    mDetail:function(){
      return this.$store.state.musicDetail
    },
    //播放？暂停
    play:function(){
      return this.$store.state.play
    },
    //c
    GmusicDuration:function(){
      return this.$store.state.time
    }
  },
  watch:{
    play:function(val){
      if(val){
        clearInterval(this.setInter)
        let dom =this.$refs.playImageTwo
        dom.style.transform="rotate(-25deg)"
      }else{
        this.setInter=setInterval(this.rotateDeg,200)
        let dom =this.$refs.playImageTwo
        dom.style.transform="rotate(0deg)"
      }
    },
    GmusicDuration:function(val){
      this.getDuration()
    }
  },
  created(){

  },
  mounted(){
    this.setInter=setInterval(this.rotateDeg,200)
    this.getSimilarM(this.mDetail.id)
    this.getLyricM(this.mDetail.id)
    this.getCommentM(this.mDetail.id)
  },
  destroyed(){
    console.log('页面离开')
    clearInterval(this.setInter)
  },
  methods:{
    //评论
    getCommentM(id){
      getComment('/comment/music',{id:id}).then(res=>{
        console.log(res)
      })
    },
    rotateDeg(){
      let dom=this.$refs.playImg
      dom.style.transform="rotateZ("+this.routeNum+"deg)"
      this.routeNum+=4
      if(this.routeNum==10000)
        this.routeNum=0
    },
    //right song
    getSimilarM(id){
      getSimilar('/simi/song',{
        id:id
      }).then(res=>{
        console.log(res)
        this.songs=res.songs
      })
    },
    //get lyric
    getLyricM(id){
      getLyric('/lyric',{
        id:id
      }).then(res=>{
        console.log(res.lrc.lyric)
        console.log(res)
        this.analysis(res.lrc.lyric)
      })
    },
    //lyric Array
    analysis(lrc){
      let oLRC={
        ms:[],
      };
      if(lrc.length==0) 
        return;
        let lrcs=lrc.split('\n')
        for(let i in lrcs){
          lrcs[i]=lrcs[i].replace(/(^\s*)|(\s*$)/g,''); //去空格
          let arr=lrcs[i].match(/\[(\d+:.+?)\]/g);//提取时间段 
          let start=0;
          for(let k in arr){
            start+=arr[k].length;//计算歌词位置 长度叠加
          }
          let content=lrcs[i].substring(start);//获取歌词内容 相当于减去时间字符串的长度剩下的就是内容 
          console.log(lrcs[i])
          console.log(content)
          for(let k in arr){
            let t=arr[k].substring(1,arr[k].length-1)//取[]间的内容
            let s=t.split(':')//分离 前后文字便于计算成毫秒
            oLRC.ms.push({ //ms.push {t:时间,c:歌词}
              t:(parseFloat(s[0])*60+parseFloat(s[1])).toFixed(3),
              c:content===""?"...........":content,
            })
          }
        }
        oLRC.ms.sort(function(a,b){
          //按实际顺序排序
          return a.t-b.t
        })
        this.lrcObject=oLRC.ms
        console.log(this.lrcObject)
    },
    //c time color 
    getDuration(){
      console.log('动起来')
      // this.duration=this.GmusicDuration;
      /**
       * 对每次进来的进度条进行判断
       * 跟下一句台词时长是否匹配 如果匹配则当前高亮的索引值+1
       * 使用循环找到最接近当前播放时间的歌词
       */
      for(let i=0;i<this.lrcObject.length;i++){
        //使用小于号判断为了 保证回退音乐进度事件的效果实现性
        if(this.GmusicDuration<=parseFloat(this.lrcObject[i].t)){
          if(this.lyricIndex===i-1){
            break
          }
           //找到比当前时间点 大一点的后一位的歌词的索引值
          this.lyricIndex=i-1;
          /**
           * 动态绑定ref 根据距离顶部不同的位置来控制歌词滚动
           * 整理加入了一个效果就是滑下去查看歌词时 不会自动滑动 只有到了高
           * 亮显示在可视区才会滚动
           * 175 时可视区的一般 55时出现离可视区距离 相当于一行高度 可微调
           */
          if(
            this.$refs.lyricScroll.scrollTop+55>
            this.$refs.lyricRef[0].offsetTop
          ){
            console.log('不自动滑动')
          }else{
            if(this.$refs.lyricRef[0].offsetTop>175){
              this.$refs.lyricScroll.scrollTop=this.$refs.lyricRef[0].offsetTop-175
            }
          }
          break;
        }
      }
    },
  }
}
</script>

<style scpred lang='stylus'>
  .musicDetailBox
    height:700px
    overflow: hidden;
    background #fff
    padding-left 230px
    padding-right: 150px;
    padding-top: 50px;
    overflow-y auto
    .music-top
      .top-left
        position relative
        .play-two
          z-index 100
          position absolute
          top: -65px;
          left: 100px;
          tranf: rotate(0deg);
          transform-origin:left top
          transition .5
        .play-img 
          postion: relative;
          width: 250px;
          border-radius 50%
        .img-one
          position absolute
          left: 56px;
          top: 56px;
          width: 144px;
          height: 144px;
          border-radius 50%
    .music-bottom
      .bottom-left
        width: 60%;
        .commont-top
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
      .bottom-right
        width: 35%;
        margin-left: 5%;
        .similar
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-top: 25px;
          

      
</style>
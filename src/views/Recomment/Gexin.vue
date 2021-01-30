<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 13:29:21
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-22 13:54:12
-->
@<template>
  <div class='gexin-box'>
    <div class="top">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in lunblist" :key="index">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <img :src='item.imageUrl' alt="!">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 推荐歌单 -->
    <div class="recomment-list">
      <div class="top flex">
        <div>推荐歌单</div>
        <div>更多></div>
      </div>
      <div class="listMusic flex-one">
        <div class='item' v-for='(item,index) in playlists' :key='index'>
          <div class='item-top'>
            <div class="play-num"><i class="el-icon-service"></i>{{item.commentCount}}</div>
            <div class='top-name'>{{item.description}}</div>
            <img :src="item.coverImgUrl" alt="">
            <div class='playMusic'><i class='el-icon-video-play'></i></div>
          </div>
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- 独家 -->
    <div class="exclusive-list">
      <div class="top flex">
        <div>独家放送</div>
        <div>更多></div>
      </div>
      <div class="listMusic flex-one">
        <div class='item' v-for='(item,index) in result' :key='index'>
          <div class='item-top'>
            <img :src="item.picUrl" alt="">
            <div class='playMusic'><i class='el-icon-video-play'></i></div>
          </div>
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>
    <!-- //最佳音乐 -->
    <div class="newMusic-list">
      <div class="top flex">
        <div>最新音乐</div>
        <div>更多></div>
      </div>
      <div class="listMusic flex-one">
        <div class='item' v-for='(item,index) in newResult' :key='index'>
        <el-card shadow="hover">
          <div class='new-item flex-two'>
            <div v-if='index<9'>0{{index+1}}</div>
            <div v-else>{{index+1}}</div>
            <!-- 添加增加事件 -->
            <div class='img' @click='playMusics(item.id)'>
              <div class='playMusic'><i class='el-icon-video-play'></i></div>
              <img :src="item.picUrl" alt="">
            </div>
            <div>
              <div>{{item.name}}</div>
              <div>{{item.song.album.artists[0].name}}</div>
            </div>
          </div>
        </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import{getLunbos,getListMusic,getClusive,getNewMusic,} from '@/network/gexin.js'
import {getUrl,getDetail} from '@/network/play.js'
export default {
  name:'Gexin',
  data(){
    return{
      lunblist:[],
      playlists:[],
      result:[],
      newResult:[],

    }
  },
    created(){  //获取网络请求
      this.getlunbo()
      this.getListMusicM();
      this.getexclusive();
      this.getnewMusicM()
    },
    methods:{
      //获取播放的数据
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
      //获取轮播图数据
      getlunbo(){
        getLunbos('/banner').then(res=>{
          this.lunblist=res.banners
        })
      },
      //获取歌单
      getListMusicM(){
        getListMusic('top/playlist',{limit:10}).then(res=>{
          this.playlists=res.playlists
        })
      },
      //独家
      getexclusive(){
        getClusive('/personalized/privatecontent').then(res=>{
          this.result=res.result
        })
      },
      getnewMusicM(){
        getNewMusic('personalized/newsong').then(res=>{
          console.log(res)
          this.newResult=res.result
        })
      },
    }
}
</script>

<style scoped lang='stylus'>
  //轮播样式
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-carousel__item>img
    width 100%
    height 200px


  .gexin-box
    .recomment-list
      .top
        height 40px
        border-bottom  2px solid blue
        margin-bottom 16px
      .top>div:nth-of-type(1)
        font-size 20px
      .listMusic
          padding 0 60px
        .item
          height 250px
          width 200px
          overflow hidden
          margin-right 20px
          .item-top
            position relative
            width 200px
            height 200px
            .play-num
              position absolute
              right 0
              width 100px
              height 12px
              font-size 8px
              background rgba(19,18,18,.3)
              color #fff 
              text-align right  
              padding-right 20px
            img 
              width 100%
              height 100%
            .top-name
              position absolute
              transform translate(-100%)
              transition .4s
              height 20px
              width 200px
              line-height 20px
              font-size 10px
              color #fff
              background rgba(19,18,18,.5)
              overflow : hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
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
        .item:hover .top-name
          transform translate(0)
        .item:hover .playMusic
          transform translateX(0)
    
    //独家
    .exclusive-list
      .top
        height 40px
        border-bottom  2px solid blue
        margin-bottom 16px
      .top>div:nth-of-type(1)
        font-size 20px
      .listMusic
          padding 0 115px
        .item
          height 226px
          width 311px
          overflow hidden
          margin-right 20px
          .item-top
            position relative
            width 311px
            height 174px
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
        .item:hover .top-name
          transform translate(0)
        .item:hover .playMusic
          transform translateX(0)

    //最新音乐      
    .newMusic-list
      .top
        height 40px
        border-bottom  2px solid blue
        margin-bottom 16px
      .top>div:nth-of-type(1)
        font-size 20px
      .listMusic
        padding 0 50px
        .item
          width 50%
          .new-item
            height 60px
            .img
              position relative
              .playMusic
                position absolute
                right 12px
                bottom 0
                width 40px
                height 40px
                font-size 30px
                color orange
              img 
                width 100px
                height 60px
                margin-left 20px
                margin-right 22px
            
</style>
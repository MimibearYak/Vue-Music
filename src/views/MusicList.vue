<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-15 18:36:23
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-18 00:15:51
-->
@<template>
  <div class='list'>
    <div class="list-top flex-one">
      <img class="top-left" :src="musicListObj.coverImgUrl">
      <div class="top-right">
        <div class="right-one flex-four">
          <div>
            <span>歌单</span>
            <span>{{musicListObj.name}}</span>
          </div>
          <div class='number flex-four'>
            <div class="num1 flex-0">
              <p>歌曲数</p>
              <p>35</p>
            </div>
            <div class="num2 flex-0">
              <p>播放数</p>
              <p>30W</p>
            </div>
          </div>
        </div>
        <div class="right-one flex-two">
          <img :src="musicName.backgroundUrl" alt="">
          <span>{{musicName.nickname}}</span>
          <span>{{musicListObj.createTime}}</span>
        </div>
        <div class="right-one">
          <el-button size='small' type="primary" icon="el-icon-video-play" >播放全部+</el-button>
          <el-button size='small' icon="el-icon-edit" >下载</el-button>
          <el-button size='small' icon="el-icon-edit" >收藏</el-button>
          <el-button size='small' icon="el-icon-edit" >分享</el-button>
        </div>
        <div class="right-one flex-two">
          标签:<div v-for="(item,index) in musicListObj.tags" :key='index'>{{item}}<span v-if='index<musicListObj.tags.length-1'>/</span></div>
        </div>
        <div class="right-one">
          简介: {{musicListObj.description}}
        </div>
      </div>
    </div>
    <div class="list-bottom">
      <div class="bottom-bar">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="歌曲列表" name="first">
            <musicList :musicListIds='musicListIds'></musicList>
          </el-tab-pane>
          <el-tab-pane :label="commentCount" name="second">
            <Comment></Comment>
          </el-tab-pane>
          <el-tab-pane label="收藏" name="third">
            <Collection></Collection>
          </el-tab-pane>
        </el-tabs>
        <div style='width:200px' class='input'>
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="input2">
        </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import musicList from '@/components/musicList/tableList'
import Collection from '@/components/musicList/Collection'
import Comment from '@/components/musicList/Comment'
import {getMusicList} from '@/network/MusicList'
export default {
  data(){
    return{ 
      commentCount:'',
      musicListObj:{},
      musicName:{},
      activeName: 'first',
      input2:'',
      musicListIds:[],//歌单id


    }
  },
  components:{
    musicList,
    Collection,
    Comment,
  },
  created(){
    console.log(this.$route.query.id)
    this.getMusicListM(this.$route.query.id)
  },
  mounted(){

  },
  methods:{
    //获取歌单列表信息
    getMusicListM(id){
      getMusicList('/playlist/detail',{
        id:id
      }).then((res)=>{
        console.log(res)
        this.commentCount='评论'+'('+res.playlist.commentCount+')'
        this.musicListObj=res.playlist
        this.musicName=res.playlist.creator
        this.musicListIds=res.playlist.trackIds
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
}
</script>

<style scoped lang='stylus'>
  .list
    padding 16px 16px 16px 16px
    // height: 700px
    // overflow-y auto
    // overflow: hidden;
    background #fff
    .list-top
      padding: 0 50px 0 0;
      .top-left
        height: 276px;
        width: 276px;
    .top-right
      flex:1
      margin-left: 20px;
      .right-one:nth-last-of-type(2)>div
        color pink
      .right-one:nth-of-type(1)>div:nth-of-type(1)>span:nth-of-type(1)
        box-box-sizing border-box
        color red
        margin-right: 16px;
        border 1px solid red;
        padding 1px
      .right-one:nth-of-type(2)>span:nth-of-type(1)
        color blue
        margin: 0 16px;
      .right-one
        margin-bottom: 16px;
        img
          height: 40px;
          width: 40px;
          border-radius 50%
        .number
          width: 148px
          text-align right
          .num1
            width: 64px;
            border-right 2px solid #bebebe
          .num2
            width: 66px;
          p
            width: 48px;
            text-align right
            margin: 0;
            color #bebebe  
    .list-bottom
      position: relative;
      margin-top: 20px;      
      .bottom-bar
        .input
          position absolute
          top: -10px;
          right: 0;
          width: 400px
          

</style>
<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 13:58:18
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-13 17:04:32
-->
@<template>
  <div class="songlist-box">
    <!-- 下拉选择 -->
    <div class="box-top">
      <el-dropdown @command='handleCommand'>
        <el-button type="">
          {{className}}<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for='(item,index) in classData' :key='index' :command='item.name'>{{item.name}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 热门 -->
    <div class="hotClass">
      <span>热门标签:</span>
      <!-- 动态获取 -->
      <span
       v-for='(item,index) in classData' 
       :key='index' 
       :class="className==item.name?'redtext':''"
       @click='selectClass(item.name)'>
        {{item.name}}
        <!-- 动态添加样式 -->
        <span v-if='index!=classData.length-1'>|</span>
      </span>
    </div> 
    <!-- 歌单列表 -->
    <div class="listMusic flex-one">
      <div class='item' v-for='(item,index) in listData' :key='index'>
        <div class='item-top'>
          <div class="play-num"><i class="el-icon-service"></i>{{item.playCount>=10000?(Math.round(item.playCount/10000))+'万':item.playCount}}</div>
          <img :src="item.coverImgUrl" alt="">
          <div class="top-name"><i class='el-icon-user'></i>{{item.creator.nickname}}</div>
          <div class='playMusic'><i class='el-icon-video-play'></i></div>
        </div>
        <div>{{item.name}}</div>
      </div>
    </div>
    <!-- //分页 -->
    <div class="songlist-bottom">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="offset"
        :page-size='limit'
        layout="total, prev, pager, next"
        :total=listToatal>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {getClass,getSonglist,} from '@/network/songlist.js'
export default {
  name: "SongList",
  data(){
    return{
      classData:[],
      className:'音乐',
      listData:[],
      limit:30,
      offset:1,//单前页
      listToatal:40,
      
    }
  },
  created(){
    this.getClassM()
    this.getListData(this.limit,this.offset,'')
    
  },
  methods:{
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.offset=val
        if(this.className=='音乐'){
          this.getListData(this.limit,this.offset,'')
        }else{
          this.getListData(this.limit,this.offset,this.className)
        }
      },
    //获取分类
    getClassM(limit){
      getClass('playlist/hot').then(res=>{
        this.classData=res.tags
        
      })
    },
    //修改下拉样式
    handleCommand(command){
      this.className=command
      //根据标签发送请求获取list
      this.offset=1
      this.getListData(this.limit,this.offset,command)
    },
    //获取歌单列表
    getListData(limit,offset,cat){
      getSonglist('/top/playlist',{
        limit:limit, //条数
        offset:offset,
        cat:cat, //分类不写默认全部
      }).then(res=>{
        console.log(res)
        this.listData=res.playlists
        this.listToatal=res.total
      })
    },
    selectClass(item){
      this.className=item
      this.offset=1
      this.getListData(this.limit,this.offset,item)
    }
  },
};
</script>

<style scoped lang='stylus'>

  .redtext
    color red

  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .songlist-box
    .hotClass
      span:nth-of-type(1)
        margin-right 8px
      span:nth-of-type(n-1)>span
        margin 0 8px
        color black
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
          .top-name
            position absolute
            bottom 0
            left 0
            height 20px
            width 200px
            line-height 20px
            font-size 10px
            color #fff
            background:rgba(19,18,18,.5)
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
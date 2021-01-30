<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 14:00:04
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-18 15:44:40
-->
@<template>
  <div class="newMusic-box">
    <!-- 头部选择 -->
    <div class="top">
      <el-button round :class="selectIndex?'selectStyle':''" @click='selectType'>新歌速递</el-button>
      <el-button round :class='!selectIndex?"selectStyle":""' @click='selectTypeOne'>新歌上架</el-button>
    </div>
    <!-- 地区分类 -->
    <div class="areClass">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane label="华语" name="7"></el-tab-pane>
        <el-tab-pane label="欧美" name="96"></el-tab-pane>
        <el-tab-pane label="韩国" name="16"></el-tab-pane>
        <el-tab-pane label="日本" name="8"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- list表格   -->
    <div class="Musiclist">
      <div>热门歌曲</div>
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        empty-text=''
        style="width: 100%"
        :show-header='false'
        v-loading="pictloading"
        element-loading-background='rgba(255,110,180,.5)'
        element-loading-text='数据正在加载中....'
        element-loading-spinner='el-icon-loading'
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column width="120" v-if="selectIndex">
          <template slot-scope="scope">
            <div class='imgStyle'>
              <img :src="scope.row.album.picUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column width="120" v-else>
          <template slot-scope="scope">
            <div class='imgStyle'>
              <img :src="scope.row.blurPicUrl" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column property="name" label="歌名" width="120">
        </el-table-column>
        <el-table-column property="artists" label="作者" width="300" v-if="selectIndex ">
          <template slot-scope='scope'>
            <div>{{scope.row.album.name}}</div>
          </template>
        </el-table-column>
        <el-table-column property="artists" label="作者" width="300" v-else>
          <template slot-scope='scope'>
            <div>{{scope.row.artist.name}}</div>
          </template>
        </el-table-column>
        <!-- 播放时间 -->
        <el-table-column property="artists" label="播放时间" width="300" v-if='selectIndex'>
          <template slot-scope='scope'>
            <div>{{scope.row.bMusic.playTime|formate}}</div>
          </template>
        </el-table-column>
        <!-- 发布时间 -->
        <el-table-column property="artists" label="播放时间" width="300" v-else>
          <template slot-scope='scope'>
            <div>{{scope.row.publishTime|timeFormat}}</div>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
    <!-- 加载效果 -->
    <!-- <Load></Load> -->
  </div>
</template>

<script>
import Load from '@/components/Load'
import{timeFormat,formatDateTimeY} from '@/common/common'
import {getNewMusicList,getNewMusicGo,} from '@/network/newSong' //引入newsong接口
export default {
  data() {
    return {
      pictloading:false,
      selectIndex:true, //样式切换判断
      activeName: "0",  //高亮效果地区
      tableData: [{name:'张三',}],
    };
  },
  components:{
    Load
  },
  created(){
    this.getNewMusicListM(0);
  },
  filters:{
    formate:function(val){
      const time=timeFormat(val)
      return time
    },
    timeFormat:function(val){
      const time=formatDateTimeY(val)
      return time
    }
  },
  methods: {
    //选择地区
    handleClick(tab) {
      console.log(tab.name);
      //新歌速递 
      if(this.selectIndex){
        const types=tab.name*1 //Number
        this.getNewMusicListM(types) 
      }else{ //上架
        switch(tab.name){
          case '0':
            this.getNewMusicGoM('ALL')
            break
           case '7':
            this.getNewMusicGoM('ZH')
            break
           case '16':
            this.getNewMusicGoM('KR')
            break
           case '8':
            this.getNewMusicGoM('JP')
            break
           case '96':
            this.getNewMusicGoM('EA')
            break
        }
      }
       
    },
    //点击表格触发
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    //点击样式
    selectType(){
      this.selectIndex=true
      this.activeName='0'
      this.getNewMusicListM(0)
    },
    selectTypeOne(){
      this.selectIndex=false
      this.getNewMusicGoM('ALL')//点击发送请求
      this.activeName="0"
    },
    //获取新歌数据
    getNewMusicListM(type){
      this.tableData=[]
      this.pictloading=true //发送中 加载效果
      getNewMusicList('/top/song',{
        type:type,
      }).then(res=>{
         this.pictloading=false //已发送取消效果
        this.tableData=res.data.splice(0,10)
        console.log(res)
      })
    },
    //上架数据
    getNewMusicGoM(area){
      this.tableData=[]  
      this.pictloading=true
      getNewMusicGo('/top/album',{area:area,limit:10}).then(res=>{
        this.pictloading=false
        this.tableData=res.monthData.splice(0,10)
        console.log(this.tableData)
      })
    }
  },
};
</script>

<style scoped lang='stylus'>
.selectStyle
  background skyblue 
  color #fff
.newMusic-box 
  .top 
    width: 300px;
    margin: 20px auto 0 ;
  .Musiclist
    .imgStyle>img
      height 60px
      width 60px
  

</style>
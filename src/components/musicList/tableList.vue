<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-16 13:19:19
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-17 14:43:34
-->
@<template>
  <div class="tableList">
    <el-table :data="songList" style="width: 100%" @row-click='playMusic'>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="date" label="操作" width="80"> 
        <i class='el-icon-star-off'></i>
        <i class='el-icon-bottom'></i>
      </el-table-column>  
      <el-table-column prop="name" label="音乐标题" width='210'> </el-table-column>
      <el-table-column prop='ar[0].name'  label="歌手">
      </el-table-column>  
      <el-table-column prop="al.name" label="专辑" width='380'>
      </el-table-column>
      <el-table-column prop="address" label="时长" width='190'>
        <template slot-scope="scope">
          {{scope.row.dt|timeFormat}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getUrl,getDetail} from '@/network/play.js'
import {getMusicInfo} from '@/network/MusicList'
export default {
  props:{
    musicListIds:{
      type:Array
    }
  },

  data() {
    return {
      songList: [
        
      ],
    };
  },
  watch:{
    musicListIds:function(val){
      if(val.length>0){
        val.forEach(item=>{
          this.getsonginfoM(item.id)
        })
      }
    }
  },
  created(){

  },
  methods:{
    getsonginfoM(id){
      getMusicInfo('/song/detail',{
        ids:id
      }).then(res=>{
        // console.log(res)
        this.songList.push(res.songs[0])
      })
    },
    playMusic(row){
       console.log(row)
       this.getUrlM(row.id)
       this.getDetailM(row.id)
    },

    getUrlM(id){
      getUrl('/song/url',{id:id}).then(res=>{
        this.$store.commit('getVuexUrl',res.data[0].url)
      })
    },
    getDetailM(id){
      getDetail('/song/detail',{ids:id}).then(res=>{
        this.$store.commit('getVuexDetail',res.songs[0])
      })
    }
  }
};
</script>
  
<style scoped lang='stylus'>
  .tableList{
    height: 300px;
    overflow-y auto
  }

</style>
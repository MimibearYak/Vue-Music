<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 13:59:47
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-19 14:36:14
-->
@<template>
  <div class="singer-box">
    <Load v-if="loadershow"></Load>
    <!-- 语种 -->
    <div class="">
      <!-- 父组件传递数据 -->
      <singerClass :classData='titleOne' name="语种" @sonData='getArea'></singerClass>
      <singerClass :classData='titleTwo' name="分类" style="margin:16px 0;" @sonData='getClass'></singerClass>
      <singerClass :classData='titleThree' name="筛选" @sonData='filters'></singerClass>
    </div>
    <!-- 列表 -->
    <div class="list flex-three">
      <div class="list-item" v-for="(item,index) in listData" :key='index'>
        <img :src="item.picUrl" alt="">
        <div>
          <div>{{item.name}}</div>
          <div class='flex'>
            <i class="el-icon-s-custom"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Load from "@/components/Load"
import {getListdata} from '@/network/singer'
import singerClass from '@/components/singerClass'
export default {
  data(){
    return{
      loadershow:false,
      listData:[],
      titleOne: ["华语", "欧美", "日本", "韩国", "其他"],
      titleTwo: ["全部", "男歌手", "女歌手", "乐队组合"],
      titleThree: [
        "热门",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "#",
      ],
      area:'7',
      type:'-1',
      initial:'-1',

    }
  },
  components:{
    singerClass,
    Load,
  },
  created(){
    this.getListdataM(this.type,this.area,this.initial)
  },
  methods:{
    getListdataM(type,area,initial){
      this.loadershow=true
      getListdata('/artist/list',{
        type:type,
        area:area,
        initial:initial,
        limit:20,
      }).then(res=>{
        this.listData=res.artists
        this.loadershow=false
      })
    },
    //子组件传过来的数据 语种
    getArea(item){
      console.log(item)
      switch(item){
        case '华语':
          this.area=7
        break
        case '欧美':
          this.area=96
        break
        case '韩国':
          this.area=16
        break
        case '日本':
          this.area=8
        break
        default:
          this.area=0
      }
      this.getListdataM(this.type,this.area,this.initial)
    },
    //分类
    getClass(item){
      console.log(item)
      switch(item){
        case '男歌手':
          this.type=1
        break
        case '女歌手':
          this.type=2
        break
        case '乐队组合':
          this.type=3
        break
        default:
          this.type=0
      }
      this.getListdataM(this.type,this.area,this.initial)
    },
    //筛选
    filters(item){
      console.log(item)
      switch(item){
        case '全部','#':
          this.initial=0
        break
        case '热门':
          this.initial=-1
        break
        default:
          this.initial=item.toLowerCase()
      }
      this.getListdataM(this.type,this.area,this.initial)
    },
  }
}
</script>

<style scoped lang='stylus'>
  .singer-box
    // position relative 
    .list
      .list-item
        height 201px
        width 261px
        img 
          width 100%
          height 176px
</style>
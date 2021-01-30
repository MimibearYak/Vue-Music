<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-10 12:54:37
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-15 15:32:25
-->
@<template>
  <div class="recomment-box">
    <!-- 布局 -->
    <div class="top">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 通过循环 -->
        <el-tab-pane v-for="(item,index) in tabsList" :key='index' :label="item.label" :name="item.name"></el-tab-pane>
  
      </el-tabs>
    </div>
    <!-- 头部导航 -->
    <!-- 根据点击头部导航来对应显示内容 通过路由占位符来实现 -->
    <div class='recomment'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recomment",
  data() {
    return {
      activeName: "/recomment/rtstyle",
      tabsList:[
        {label:'个性推荐',name:'/recomment/rtstyle'},
        {label:'歌单',name:'/recomment/songlist'},
        {label:'主播电台',name:'/recomment/zhubo'},
        {label:'排行榜',name:'/recomment/phang'},
        {label:'歌手',name:'/recomment/singer'},
        {label:'最新音乐',name:'/recomment/newmusic'},
      ]
    };
  },
  mounted(){
    //获取最后点击的值
    const datas=sessionStorage.getItem("selectItem")
    if(datas){
      this.activeName=datas
    }else{
      this.activeName='/recomment/rtstyle'
    } 
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab.name);
      //点击跳转路由
      this.activeName=tab.name
      this.$router.push(tab.name)
      //解决重新刷新页面默认个性
      sessionStorage.setItem("selectItem",tab.name)
    },
  },
};
</script>

<style scoped lang='stylus'>
  .recomment-box
    background #fff
    height 700px
    .top
      height 40px
      width 468px
      margin 0 auto
    .recomment
      background #fff
      height 600px
      padding 0 80px
      overflow-y auto

</style>
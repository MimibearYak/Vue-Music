<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 12:50:51
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-09 17:16:11
-->
<template>
  <div class='main'>
    <img src="./assets/1001750.jpg" width="1920" height="1080" alt="!">
    <div id="app">
      <div id="nav">
        <!-- 结构 -->
        <!-- 头部 -->
        <Top/>
        <Conent/>
        <!-- 内容区域 -->
        <Button/>
        <!-- 底部区域 -->
      </div>
  </div>
  </div>
</template>
<script>
import Top from '@/components/Top.vue'
import Conent from '@/views/Conent.vue'
import Button from '@/components/Button.vue'
export default {
  components:{
    Top,
    Conent,
    Button
  }
}
</script>

// scoped 唯一 加了不会影响到别的样式 局部样式 不会样式渲染
//lang 表示预处理器
<style scoped lang='less'>
  .main{
    height:100%;
    position: relative;
    overflow: hidden;
      img{
        position:absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
        filter: blur(15px);
      }
      #app{
        width: 1400px;
        position: relative; 
        height: 100px;
        margin: 0 auto;
        margin-top: 50px; 
      }
  }
</style>

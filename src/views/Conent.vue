<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 12:50:52
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-11 09:47:11
-->
@<template>
  <div>
    <!-- 头部导航 -->
    <!-- 内容占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name:'Conent',
  data(){
    return{
      obj:''
    }
  },

}
</script>

<style scoped lang='stylus'>
  .content
    background #fff
    height 800px
</style>
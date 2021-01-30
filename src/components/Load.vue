<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-18 14:34:13
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-19 14:43:15
-->
@<template>
  <div class="load-box">
    <div class="center center">
      <div>
        <i class="el-icon-loading"></i>
      </div>
      <div class='text'>正在拼命加载....</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Load'
}
</script>

<style scoped lang='stylus'>
  .load-box
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background rgba(1,1,1,.3)
    z-index 9000 !important
    .center
      font-size 50px
      color #fff
      width 50px
      height 50px
      .text 
        width 1000px
        font-size 35px
        color pink 
        font-weight normal
</style>
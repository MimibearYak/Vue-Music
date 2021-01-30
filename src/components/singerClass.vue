<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-18 15:23:20
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-19 13:10:55
-->
@<template>
  <div class="class-box">
    <span>{{name}}:</span>
    <!-- v-for -->
    <span 
    :class="index==selectIndex?'selectStyle':''" 
    v-for="(item,index) in classData" :key='index'
    @click='clickindex(index,item)'>
    {{item}}
    <i v-if="index!=classData.length-1">
      |
    </i>
    </span>
  </div>
</template>

<script>
export default {
  name:'singerClass',
  props:{
    classData:{
      type:Array
    },
    name:{
      type:String
    },
  },
  data(){
    return{
      selectIndex:0,
    }
  },
  methods:{
    clickindex(index,item){ //index改变样式 item向父组件传递数据对应改变数据
      this.selectIndex=index
      this.$emit('sonData',item)//参数一：自定义事件名称 参二：值
    },
  },
  created(){
    
  },
  
}
</script>

<style scoped lang='stylus'>
  .selectStyle
    color red
  i
    color black
    margin 0 8px
    


</style>
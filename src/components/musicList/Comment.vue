<!--
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-17 13:42:02
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-17 15:56:03
-->
@<template>
  <div class="component">
    <div class="top">
      <el-input
        type="textarea"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="130"
        show-word-limit
      >
      </el-input>
      <div class="top-bottom">
        <el-button size='mini' type="">评论<i class="el-icon-edit el-icon--right"></i></el-button>
      </div>
    </div>
    <div class="comment-List">
      <div class="comment-top">
        最新评论（1）
      </div>
      <div class="comment-item flex-four" v-for="(item,index) in commentList" :key=index>
        <div class="item-left flex-1">
          <img :src="item.user.avatarUrl" alt="">
          <div>
            <div>
              <a href="#">{{item.user.nickname}}</a>
              :
              <span>{{item.content}}</span>
            </div>
            <div class='item-time'>{{item.time|formatDateTimeM}}</div>
          </div>
        </div>
        <div class="item-right">
          <span class='show'>举报!</span>
          <span>|</span>
          <span>分享</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getMusicComment} from '@/network/MusicList'
export default {
  data() {
    return {
      textarea: "",
      commentList:[]
    };
  },
  created(){
    this.getMusicCommentM(this.$route.query.id)
  },
  methods:{
    getMusicCommentM(id){
      getMusicComment('/comment/playlist',{
        id:id
      }).then(res=>{
        console.log(res)
        if(res.hotComments.length>0){
          this.commentList=[...res.comments,res.hotComments]
        }else{
          this.commentList=res.comments
        }
      })
    }
  },
};
</script>

<style scoped lang='stylus'>
  .component
    height: 300px;
    overflow-y auto
    .top
      background #ffe4e1  
      padding 12px 0
      border-radius 1%
      .top-bottom
        margin-top: 15px;
    .comment-List
      padding-top: 20px;
      .comment-top
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
        margin-bottom: 12px;
      .comment-item
        padding-bottom: 20px;
        margin-bottom: 12px;
        border-bottom: 1px solid #ccc;
        .item-left
          width: 90%;
          img
            height: 60px;
            width: 60px;
            margin-right: 10px;
            border-radius 50%
          div
            .item-time
              margin-top: 8px;
              color #c1cdcd
        .item-right
          span:nth-of-type(2)
            color #8b7d6b
            padding 0 6px
          span:nth-of-type(3)
            color #cd4f39
            font-size: 14px;
            font-weight: 700;
            padding-right: 6px;
          .show
            font-size: 14px;
            opacity: 0;
        &:hover .show
          opacity: 1;
          
</style>
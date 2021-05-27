/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-22 10:26:37
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-19 09:22:18
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state:{
    playUrl:1, //歌曲播放地址
    musicDetail:'', //歌曲纤细
    play:true,
    time:0

  },
  mutations:{
    getVuexUrl(state,url){ //定义方法修改值 触发
      state.playUrl=url
    },
    getVuexDetail(state,item){
      state.musicDetail=item
    },
    //暂停播放圆
    getPlay(state,item){
      state.play=item  
    },
    //c time
    getTime(state,item){
      state.time=item
    }
  },
  actions:{

  },
  modules:{

  },
})
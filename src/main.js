/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 12:50:51
 * @LastEditors: Seven
 * @LastEditTime: 2021-03-29 00:14:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'

//引入Elementui 和注册
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import * as fliters from '@/common/common'
import { log } from 'handlebars';
 
Object.keys(fliters).forEach(key=>{
  Vue.filter(key,fliters[key])
})

Vue.config.productionTip = false
//引入公共样式
require('./assets/public.css')

//注册插件
// Vue.filter('formate',timeFormat)
Vue.use(ElementUI)
new Vue({
  router,
  store:store,
  render: h => h(App)
}).$mount('#app')


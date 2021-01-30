/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 15:38:39
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-16 17:37:17
 */
import axios from 'axios' //引入axios
//创建方法 request 暴露出去
export function request(config){
  let instance=axios.create({
    baseURL:'/api',
    timeout:25000
  })
  //添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }); 1
  
  //请求
  return instance(config)
}
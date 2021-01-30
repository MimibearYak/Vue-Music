/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-09 16:22:40
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-13 00:24:58
 */
import{request} from '../network/http'

//获取轮播图
export function getLunbos(url){
  return request({
    url:url,
    method:'get',
  })
}
//推荐 
export function getListMusic(url,params){
  return request({
    url:url,
    params:params
  })
} 
//独家
export function getClusive(url){
  return request({
    url:url,
  })
}
//最新
export function getNewMusic(url){
  return request({
    url:url,
  })
}

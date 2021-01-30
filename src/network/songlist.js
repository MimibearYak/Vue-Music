/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-13 12:52:33
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-13 13:40:39
 */
//歌单
import {request} from '../network/http'

//分类
export function getClass(url){
  return request({
    url:url,
    method:'get',
  })
}
//获取歌单
export function getSonglist(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
    
  })
}

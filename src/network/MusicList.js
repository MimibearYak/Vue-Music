/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-02-15 21:38:04
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-19 21:35:49
 */
import {request} from './http'
export function getMusicList(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
export function getMusicInfo(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
//获取歌单收藏
export function getMusicCollect(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
//评论
export function getMusicComment(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
//相似
export function getSimilar(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
//歌词
export function getLyric(url,params){
  return request({
      url:url,
      method:'get',
    params:params,
  })
}
//听友评论
export function getComment(url,params){
  return request({
      url:url,
      method:'get',
    params:params,
  })
}
/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-15 19:16:16
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-20 11:32:32
 */
import {request} from '../network/http'
//轮播
export function getlubo(url){
  return request({
    url:url,
    method:'get',
    
  })
}
//电台分类
export function getRedioClass(url){
  return request({
    url:url,
    method:'get',
  })
}
//个性推荐
export function getRecomment(url){
  return request({
    url:url,
    method:'get',
  })
}
//翻唱
export function getRecommentClass(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}

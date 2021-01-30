/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-22 11:20:25
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-22 11:22:49
 */
import {request} from '../network/http'

//获取歌曲播放地址
export function getUrl(url,params){
  return request({
    url:url,
    params:params,
    method:'get'
  })
}

//获取播放歌曲纤细
export function getDetail(url,params){
  return request({
    url:url,
    params:params,
    method:'get'
  })
}
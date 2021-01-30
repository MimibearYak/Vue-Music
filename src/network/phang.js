/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-14 11:40:32
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-15 10:38:31
 */
import {request} from '../network/http'

//获取全球榜网络数据
export function getPhangData(url){
  return request({
    url:url,
    method:'get',
  })
}
//获取榜单歌曲数据
export function getPhangList(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
//获取榜单中的详情信息
export function getPhangListDetail(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
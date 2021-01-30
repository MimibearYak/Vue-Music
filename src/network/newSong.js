/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-16 15:08:34
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-16 17:12:59
 */
import {request} from '../network/http'

//新歌速递
export function getNewMusicList(url,params){
  return request({
    url:url,
    method:'get',
    params:params
  })
}
//新歌上架
export function getNewMusicGo(url,params){
  return request({
    url:url,
    method:'get',
    params:params
  })
}
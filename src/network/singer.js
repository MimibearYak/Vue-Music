/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-18 17:27:08
 * @LastEditors: Seven
 * @LastEditTime: 2021-01-19 12:00:25
 */
import{request} from './http'
//获取歌手列表
export function getListdata(url,params){
  return request({
    url:url,
    method:'get',
    params:params,
  })
}
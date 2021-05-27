/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Seven
 * @Date: 2021-01-15 15:28:52
 * @LastEditors: Seven
 * @LastEditTime: 2021-02-17 15:24:14
 */
//时间格式月加日
export function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return  m + '月' + d + "日" ;
}

//处理时间段
export function timeFormat (time){
  let minutes=parseInt((time%(1000*60*60))/(1000*60))
  if(minutes<10){
    minutes='0'+minutes
  }
  let seconds=parseInt((time%(1000*60))/1000)
  if(seconds<10){
    seconds='0'+seconds
  }
  return minutes+':'+seconds
}
//年 月 日
export function formatDateTimeY(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return  y+'年'+m + '月' + d + "日" ;
}
//年月日时分秒
export function formatDateTimeM(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return  y+'年'+m + '月' + d + "日"+minute+'分'+second+'秒' ;
}
export function currentTime(curr){
  curr+=''
  let time=curr.parseInt()
  return time
}

export function fromDataTimeOne(m){
  let minute=m/60
  let minutes=parseInt(minute)
  if(minutes<10){
    minutes="0"+minutes
  }
  let second=m%60
  let seconds=parseInt(second)
  if(seconds<10){
    seconds="0"+seconds
  }
  return `${minutes}:${seconds}`
}

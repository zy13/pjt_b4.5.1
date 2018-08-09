/*
 * @Author: yongquan.wu
 * @Date:   2016-07-26 15:50:43
 * @Last Modified by: yongquan.wu
 * @Last Modified time: 2016-07-26 13:36:01
 */
var md5 = require('md5');


/***
 * md5签名加密
 * @param obj
 * return string 返回加密后的密文
 * {
 *  a:1,
 *  b:2,
 *  c:3
 * }
 * key必须按照约定的顺序输入
 */
function md5Sign(obj) {
    var appKey = '&key=bb9ff049839a478abdcd0876bc498624';
    var arr=[];
    for(var key in obj){
        var item=[key,obj[key]].join('=');
        arr.push(item);
    }
    var str=arr.join('&')+appKey;
    return md5(str).toUpperCase();
}


module.exports=md5Sign;

import {CheckUtil} from "../verify/CheckUtil";
import {ObjectUtil} from "../object/ObjectUtil";

/**
 * @ClassName: UrlUtil
 * @Description: 请求url操作组件
 * @author： zhengchao
 * @date： 2018年5月28日
 */
export class UrlUtil{

    /**
     * 获取url中请求参数的值
     * @param {string} name - 参数名
     * @param {string} [url]
     * @returns {*}
     */
    static getPara(name:string, url = window.location.href){
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let r = url.split('?')[1] ? url.split('?')[1].match(reg) : null;
        return r !== null ? decodeURI(r[2]) : null;
    }
    /**
     * url连接object为后面的参数
     * @param {string} url
     * @param {object} obj
     * @param {boolean} [isLowCase=true]
     * @return {string}
     */
    static addObj(url:string, obj:any, isLowCase=false){
        for(let key in obj){
            if(UrlUtil.getPara(key, url)){
                delete obj[key];
            }
        }
        if (!CheckUtil.isEmpty(obj)) {
            return url + (url.indexOf('?') === -1 ? '?' : '&') + this.toUri(obj, isLowCase);
        } else {
            return url;
        }
    }
    /**
     * 对象转成url参数
     * @param {Object} object
     * @param {boolean} isLowCase
     * @returns {string} urlDataStr
     */
    static toUri(object:any, isLowCase = false){
        let urlDataStr = '';
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                urlDataStr += `&${isLowCase ? key.toLowerCase() : key}=${encodeURIComponent(object[key])}`;
            }
        }
        return urlDataStr.slice(1);
    }
}

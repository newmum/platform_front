import {CheckUtil} from "../verify/CheckUtil";

/**
 * @ClassName: StringUtil
 * @Description: 字符串操作组件
 * @author： zhengchao
 * @date： 2018年5月28日
 */
export class StringUtil{

    /**
     * 移除html标签
     * @param s
     * @return {string}
     */
    static removeHtmlTags(s:string){
        let htmlTagReg = /(&nbsp;|<([^>]+)>)/ig;
        if(typeof s === 'string'){
            return s.replace(htmlTagReg, '').replace(/\s+/g, ' ');
        }else{
            return s;
        }
    }

    /**
     * html encode
     * @param html
     * @return {string}
     */
    static htmlEncode(html: string){
        if(html === null || typeof html === 'undefined'){
            html = '';
        }
        return html.toString().replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\//g, '&#x2F;');
    }

    /**
     * 解析模版 模板中的{{xxx}} 对应 data中的属性名xxx
     * @param tpl
     * @param data
     * @param isEncode
     * @return {string}
     */
    static parseTpl(tpl : string, data : any, isEncode = true){
        let parseReg = /\{\{\S+?}}/g,
            self = this;
        return tpl.replace(parseReg, function (param) {
            param = param.slice(2, -2);
            let [key, param1] = param.split(','),
                isEn = param1 ? param1 === '1' : isEncode;
            return CheckUtil.isEmpty(data[key]) ? '' : (isEn ? self.htmlEncode(data[key]) : data[key]);
        });
    }

    /**
     *
     * @param {string} str
     * @returns {any}
     */
    static removeEmpty(str: string){
        let parseReg = /\s{2,}/g;
        if(typeof str === 'string'){
            return str.replace(parseReg, ' ');
        }
        return str;
    }

    /**
     * 按utf-8编码 截取字符串
     * @param {string} str 字符串
     * @param {int} len 长度
     * @return {string}
     */
    static cut(str:string, len:number) {
        let cutStr = '';
        let realLength = 0;
        if (!CheckUtil.isEmpty(len)) {
            let sLen = str.length;
            for (let i = 0; i < sLen; i++) {
                if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                    realLength += 1;
                } else {
                    realLength += 2;
                }
                if (realLength > len) {
                    continue;
                }
                cutStr += str[i];
            }
            if (cutStr.length > 0 && realLength > len) {
                cutStr += '...';
            }
        } else {
            cutStr = str;
        }
        return cutStr;
    }

    /**
     * 
     * @param {string} str
     * @returns {number}
     */
    static utf8Len(str:string) {
        let sLen = str.length,
            utf8len = 0;
        for (let i = 0; i < sLen; i++) {
            if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 128) {
                utf8len += 1;
            } else {
                utf8len += 2;
            }
        }
        return utf8len;
    }

    /**
     *
     * @param {string} str
     * @returns {any}
     */
    static toBytes(str:string) {
        let pos = 0;
        let len = str.length;
        if (len % 2 != 0) {
            return null;
        }
        len /= 2;
        let hexA = [];
        for (let i = 0; i < len; i++) {
            let s = str.substr(pos, 2);
            let v = parseInt(s, 16);
            hexA.push(v);
            pos += 2;
        }
        return hexA;
    }

    /**
     * 为特定字符串设置为高亮
     * @param {string} str - 整个字符串
     * @param {string} hlstr - 需要设置为高亮的字符串
     * @param {string} hue - 高亮颜色
     * @returns {string}
     */
    static setHeightLight(str:string, hlstr:string, hue:string){
        let color = {
            red: '#dd524d',
        };
        if(Object.prototype.toString.call(str).slice(8, -1) === 'String'){
            return str.replace(hlstr, `<span style="color:${hue}" >${hlstr}</span>`);
        }else{
            return str;
        }
    }
}

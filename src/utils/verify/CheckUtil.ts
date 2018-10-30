/**
 * @ClassName: CheckUtil
 * @Description: 通用验证组件
 * @author： zhengchao
 * @date： 2018年5月28日
 */
export class CheckUtil{

    /**
     * 判断是否是手机号码
     * @param {string} tel
     * @returns {boolean}
     */
    static isTel(tel:string){
        return /^1[34578]\d{9}$/.test(tel);
    }

    /**
     * 判断字符串是否为空(undefined null '' [] {} )
     * @param {*} obj
     * @return {boolean} is_empty
     */
    static isEmpty(obj:any){
        let is_empty = false;
        if (obj === undefined || obj === null || obj === '' || obj === 'undefined') {
            is_empty = true;
        } else if (Array.isArray(obj) && obj.length === 0) {
            is_empty = true;
        } else if (obj.constructor === Object && Object.keys(obj).length === 0) {
            is_empty = true;
        }
        return is_empty;
    }

    /**
     * 判断是否是对象类型
     * @param obj
     * @returns {boolean}
     */
    static isObj(obj:any){
        return Object.prototype.toString.call(obj).substring(8, 1) === 'object';
    }
}

/**
 * @ClassName: ObjectUtil
 * @Description: 对象操作组件
 * @author： zhengchao
 * @date： 2018年5月28日
 */export class ObjectUtil{
    /**
     * object转dom属性
     * @param {Object} object
     * @return {string}
     */
    static toAttr(object:any): string{
        let attrStr = '';
        for (let key in object) {
            if (object.hasOwnProperty(key)) {
                attrStr += (' ' + key + '="' + object[key] + '"');
            }
        }
        return attrStr;
    }

    /**
     * 对象转数组
     * @param {obj} obj
     * @return {Array}
     */
    static toArr(obj : any){
        let arr = [];
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                arr.push(obj[key])
            }
        }
        return arr;
    }

    /**
     * 浅复制Object
     * @param {object} object
     * @return {object}
     */
    static copy(object:any) : any{
        let key, cp:any = {};
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                cp[key] = object[key];
            }
        }
        return cp;
    }

    /**
     * 对象合并，第一个参数为true时，则为深度合并
     * @param args
     * @return {{}}
     */
    static merge(...args:any[]) : Object {
        // Variables
        let extended:any = {};
        let deep = false;
        let i = 0;
        let length = args.length;
        // Check if a deep merge
        if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
            deep = args[0];
            i++;
        }
        // Merge the object into the extended object
        let merge = function (obj:any) {
            for (let prop in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, prop)) {
                    continue;
                }
                // If deep merge and property is an object, merge properties
                let objStr = Object.prototype.toString.call(obj[prop]);
                if (deep && ( objStr === '[object Object]' || objStr === '[object Array]' )) {
                    if (objStr === '[object Object]') {
                        extended[prop] = ObjectUtil.merge(true, extended[prop], obj[prop]);
                    } else {
                        extended[prop] = obj[prop].slice(0);
                    }
                } else {
                    extended[prop] = obj[prop];
                }
            }
        };
        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            let obj = args[i];
            merge(obj);
        }
        return extended;
    }
}


/**
 * @ClassName: LocalStorage
 * @Description: 对本地LocalStorage操作组件
 * @author： zhengchao
 * @date： 2018年5月29日
 */
export class LocalStorage{
    /**
     * 获取数据
     * @param {string} key
     * @returns {any}
     */
    static get(key:string):any {
        return window.localStorage.getItem(key);
    }

    /**
     * 写入数据
     * @param {string} key
     * @param {string} value
     */
    static set(key:string,value:any):void{
        if(typeof value === 'object')
            value = JSON.stringify(value);
        window.localStorage.setItem(key ,value);
    }

    /**
     * 删除数据
     * @param {string} key
     */
    static del(key:string):void{
        window.localStorage.removeItem(key);
    }
}



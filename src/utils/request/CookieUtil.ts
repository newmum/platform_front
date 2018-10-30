/**
 * @ClassName: CookieUtil
 * @Description: Cookie操作组件
 * @author： zhengchao
 * @date： 2018年5月29日
 */
export class CookieUtil{

    /**
     * 添加cookie值并设置失效时间
     * @param {string} name
     * @param {string} value
     * @param {number} days
     */
    static set(name:string, value:string, days?:number) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    /**
     * 获取指定cookie值
     * @param {string} name
     * @returns {any}
     */
    static get(name:string) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    /**
     * 清除指定cookie值
     * @param {string} name
     */
    static clear(name:string) {
        this.set(name, "", 0);
    }
}

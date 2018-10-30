/**
 * @ClassName: DTUtil
 * @Description: 日期时间操作组件
 * @author： zhengchao
 * @date： 2018年5月28日
 */
export class DTUtil{

    /**
     * 获取一天毫秒数
     * @type {number}
     */
    static oneDay = 86400000;

    /**
     * 获取今天日期时间
     * @returns {Date}
     */
    static today(){
        return new Date()
    };

    static add(date: Date, day: number){
        date.setTime(date.getTime() + day * this.oneDay);
        return date;
    }

    static tomorrow(){
        return this.add(new Date(), 1);
    }

    static yesterday(){
        return this.add(new Date(), -1);
    }

    private getRange(date1 : Date, date2: Date){
        date1.setHours(0,0,0,0);
        date2.setHours(23,59,59,999);
        return [date1, date2];
    }

    static format(date: Date, fmt: string){
        if(!fmt){
            return date.toString();
        }
        let o:any = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "H+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds()                 //秒
            // "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

}

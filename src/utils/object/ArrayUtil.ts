/**
 * @ClassName: ArrayUtil
 * @Description: 数组集合操作组件
 * @author： zhengchao
 * @date： 2018年7月5日
 */
export class ArrayUtil {
    /**
     *
     * @param {Array<any>} arr
     * @param {Array<any>} targetArr
     * @returns {boolean}
     */
    static inOf (arr:Array<any>, targetArr:Array<any>) {
        let res = true;
        arr.forEach((item:any) => {
            if (targetArr.indexOf(item) < 0) {
                res = false;
            }
        });
        return res;
    };

    /**
     *
     * @param ele
     * @param {Array<any>} targetArr
     * @returns {boolean}
     */
    static oneOf (ele:any, targetArr:Array<any>) {
        if (targetArr.indexOf(ele) >= 0) {
            return true;
        } else {
            return false;
        }
    };
}
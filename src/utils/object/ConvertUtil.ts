
/**
 * @ClassName: ConvertUtil
 * @Description: 类型装换组件
 * @author： zhengchao
 * @date： 2018年5月31日
 */
export class ConvertUtil{

    /**
     * 将null,undefined,false 转为 ''
     * @param value
     * @param str
     * @return {*|string}
     */
    static toEmpty(value: any, str: string = ''){
        return value || value === 0 ? value : str;
    }

    /**
     * 转换类型为数组类型
     * @param value
     * @returns {any}
     */
    static toArray(value:any) {
        if (!Array.isArray(value)) {
            return [value];
        }
        else {
            return value;
        }
    }
}

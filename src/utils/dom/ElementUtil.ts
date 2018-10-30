
/**
 * @ClassName: ElementUtil
 * @Description: dom元素操作组件
 * @author： zhengchao
 * @date： 2018年5月29日
 */
export class ElementUtil{
    /**
     * 获取滚动条scrollTop
     */
    static scrollTop(){
        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    }

    /**
     * 设置select表单选中
     * @param select
     * @param {string} val
     */
    selectVal(select:any, val:string) {
        for(var i=0; i<select.options.length; i++){
            if(select.options[i].value == val){
                select.options[i].selected = true;
                break;
            }
        }
    }
}

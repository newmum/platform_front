
/**
 * @ClassName: EventUtil
 * @Description: 事件处理组件
 * @author： zhengchao
 * @date： 2018年5月29日
 */
export class EventUtil{
    /**
     * 触发自定义事件
     * @param eventName
     * @param detail
     * @param [win]
     */
    static fire(eventName:string, detail = null, win:EventTarget = window) {
        let e = null;
        if(typeof eventName !== 'string' || !eventName){
            return ;
        }
        if ('CustomEvent' in window) {
            e = new CustomEvent(eventName, {detail: detail, bubbles : true});
        } else {
            e = document.createEvent('CustomEvent');
            e.initCustomEvent(eventName, true, false, {detail: detail});
        }
        win.dispatchEvent(e);
    }
}

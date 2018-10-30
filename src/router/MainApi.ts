import {Ajax} from "../core/service/Ajax";
import {QueryParam} from "../entity/QueryParam";

/**
 * @ClassName: MainApi
 * @Description: 首页后台接口调用类
 * @author： zhengchao
 * @date： 2018年7月4日
 */
export class MainApi{

    /**
     * 获取用户消息列表
     * @returns {Promise<any>}
     */
    static messageList = (id:number) => {
        let ajax = new Ajax()
        let queryParam = new QueryParam()
        queryParam.needPage = false
        queryParam.needTotal = true
        queryParam.append({attrName:'receive_user_id',condition:'=',value:id})
        // queryParam.append({attrN})
        return ajax.send('/resources/message_msg_push/list','POST', {param:JSON.stringify(queryParam.toString())})
    }
    /**
     * 获取用户消息详情
     * @returns {Promise<any>}
     */
    static messageInfo = (id:number) => {
        let ajax = new Ajax()
        return ajax.send('/resources/message_msg_push'+id,'GET')
    }
    /**
     * 获取首页菜单列表
     * @returns {Promise<any>}
     */
    static menuList = () => {
        let ajax = new Ajax()
        return ajax.send('/views/showMain','GET')
    }
    /**
     * 获取页面所需数据
     * @param {number} id
     * @returns {Promise<any>}
     */
    static showView = (id:number) => {
        let ajax = new Ajax()
        return ajax.send('/views/'+id,'GET')
    }

}
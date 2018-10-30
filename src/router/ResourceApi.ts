import {Ajax} from "../core/service/Ajax";
import {QueryParam} from "../entity/QueryParam";

/**
 * @ClassName: ResourceApi
 * @Description: 资源接口调用类
 * @author： zhengchao
 * @date： 2018年7月4日
 */
export class ResourceApi{

    static list = (resource_name:string, queryParam:QueryParam ) => {
        let ajax = new Ajax();
        if(!queryParam){
            queryParam = new QueryParam();
        }
        return ajax.send('/resources/'+resource_name+'/list','POST',{param:JSON.stringify(queryParam.toString())});
    }

    static update = (resourceName:string, data:any, token:number) => {
        let ajax = new Ajax();
        return ajax.send('/resources/'+resourceName,'PUT',{data:JSON.stringify(data)});
    }

    static get = (resource_name:string, id:number) => {
        let ajax = new Ajax();
        return ajax.send('/resources/'+resource_name+'/'+id,'GET');
    }

    static add = (resourceName:string, data:any, token:number) => {
        let ajax = new Ajax();
        return ajax.send('/resources/'+resourceName,'POST',{data:JSON.stringify(data)});
    }

    static del = (resourceName:string, id:number) => {
        let ajax = new Ajax()
        return ajax.send('/resources/'+resourceName+'/'+id,'DELETE')
    }

    static template = (resourceName:string) => {
        let ajax = new Ajax()
        return ajax.send('/resources/'+resourceName+'/importTemplate','POST')
    }
}


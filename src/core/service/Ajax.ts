import {Request} from "../../entity/Request";
import {Result} from "../../entity/Result";
import Axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {UrlUtil} from "../../utils/request/UrlUtil";

/**
 * @Description: Ajax请求操作组件
 * @author： zhengchao
 * @date： 2018年6月29日
 */
export class Ajax {

    public instance:AxiosInstance
    private request:Request

    create(request:Request):AxiosInstance{
        return Axios.create(request)
    }

    async send():Promise<any>

    async send(url:string):Promise<any>

    async send(url:string, method:string):Promise<any>

    async send(url:string, method:string, data:any):Promise<any>

    async send(url?:string, method?:string, data?:any, request?:Request):Promise<any>{
        let result = new Result()
        if(url){
            this.request = new Request();
            this.request.url = url;
        }
        if(method){
            this.request.method = method;
        }
        if(data){
            this.request.data = data;
        }
        if(!request)
            request = this.request
        try {
            let axiosResponse:AxiosResponse;
            if(request.method==='DELETE'){
                let url = UrlUtil.addObj(request.url,data)
                axiosResponse = await Axios.delete(url,request.toString())
            } else if(request.method==='GET'){
                let url = UrlUtil.addObj(request.url,data)
                axiosResponse = await Axios.get(url,request.toString())
            } else{
                axiosResponse = await Axios.request(request.toString())
            }
            result.xhr = axiosResponse.request
            if(axiosResponse.data){
                result.success = axiosResponse.data['success']
                result.code = axiosResponse.data['code']
                result.data = axiosResponse.data['data']
                result.msg = axiosResponse.data['msg']
            }
        } catch (err) {
            result.msg = err
        }
        return result
    }

    private then(){

    }

    private catch(){

    }

    constructor(request?:Request){
        if(request == undefined){
            this.request = new Request();
            //this.instance = this.create(this.request);
        }
    }
}


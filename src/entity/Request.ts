import {AxiosRequestConfig} from "axios";
import {UrlUtil} from "../utils/request/UrlUtil";
import {GlobalConst} from "../constant/GlobalConst";

/**
 * @Description: 统一请求参数对象
 * @author： zhengchao
 * @date： 2018年6月1日
 */
export class Request implements AxiosRequestConfig{

    private _url:string;
    set url(url:string){
        this._url = url;
    }
    get url(){
        if(this._url)
            return GlobalConst.AJAX_PREFIX + this._url
        else
            return ''
    }

    private _method:string;
    set method(method:string){
        this._method = method;
    }
    get method(){
        if(this._method)
            return this._method;
        else
            return 'POST';
    }

    private _data:any;
    set data(data:any){
        if (typeof data === 'function') {
            this._data = data;
        }
        else if (typeof data === 'object') {
            for (let key of Object.keys(data)) {
                if (data[key] !== 0 && !data[key]) {
                    delete data[key]
                }
            }
            this._data = UrlUtil.toUri(data);
        }
        else{
            this._data = data;
        }
    }
    get data(){
        if(this._data)
            return this._data;
        else
            return {};
    }

    private _isCache:boolean;
    set isCache(isCache:boolean){
        this._isCache = isCache;
    }
    get isCache(){
        if(this._isCache)
            return this._isCache;
        else
            return false;
    }

    private _timeout:number;
    set timeout(timeout:number){
        this._timeout = timeout;
    }
    get timeout(){
        if(this._timeout)
            return this._timeout;
        else
            return 0;
    }

    private _headers:any;
    set headers(headers:any){
        this._headers = headers;
    }
    get headers(){
        if (this._headers) {
            // 设置用户自定义的header
            for (let name in this._headers) {
                this.headers[name] = this._headers[name];
            }
        }
        else
            this._headers = {};
        this._headers['Accept'] = this.accepts[this.dataType] || '*/*'
        this._headers['X-Requested-With'] = 'XMLHttpRequest'
        if (this.contentType) {
            // 设置contentType
            this._headers['Content-Type'] = this.contentType;
        }
        return this._headers
    }

    private _contentType:string='';
    set contentType(contentType:string){
        this._contentType = contentType;
    }
    get contentType(){
        this._contentType = 'application/x-www-form-urlencoded; charset=utf-8'
        return this._contentType;
    }

    private _dataType:string;
    set dataType(dataType:string){
        this._dataType = dataType;
    }
    get dataType(){
        if(this._dataType)
            return this._dataType;
        else
            return 'json';//text
    }

    accepts:any = {
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/x-javascript'
    }

    constructor() {
    }

    toString(){
        return {
            url : this.url,
            method :this.method,
            data :this.data,
            headers: this.headers,
            timeout: this.timeout
        }
    }
}

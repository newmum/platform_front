
/**
 * @Description: 统一请求返回对象
 * @author： zhengchao
 * @date： 2018年6月1日
 */
export class Result{
    private _success:boolean;
    set success(success:boolean){
        this._success = success;
    }
    get success(){
        if(this._success)
            return this._success;
        else
            return false;
    }

    private _code:number;
    set code(code:number){
        this._code = code;
    }
    get code(){
        if(this._code)
            return this._code;
        else
            return 0;
    }

    private _msg:string;
    set msg(msg:string){
        this._msg = msg;
    }
    get msg(){
        if(this._msg)
            return this._msg;
        else
            return 'success';
    }

    private _data:IData;
    set data(data:IData){
        this._data = data;
    }
    get data(){
        if(this._data)
            return this._data;
        else
            return {};
    }

    private _xhr:XMLHttpRequest=new XMLHttpRequest();
    set xhr(xhr:XMLHttpRequest){
        this._xhr = xhr;
    }
    get xhr(){
        if(this._xhr)
            return this._xhr;
        else
            return new XMLHttpRequest();
    }

    private _errorThrown:any;
    set errorThrown(errorThrown:any){
        this._errorThrown = errorThrown;
    }
    get errorThrown(){
        if(this._errorThrown)
            return this._errorThrown;
        else
            return {};
    }

    private _config:any;
    set config(config:any){
        this._config = config;
    }
    get config(){
        if(this._config)
            return this._config;
        else
            return {};
    }

    get status(){
        return this.xhr['status'];
    }

    get statusText(){
        return this.xhr['statusText'];
    }

    get headers(){
        return this.xhr.getAllResponseHeaders();
    }

    constructor() {

    }

    toString(){
        return {
            'status':this.status,
            'statusText':this.statusText,
            'success':this.success,
            'code':this.code,
            'data':this.data,
            'msg':this.msg
        }
    }
}
interface IResult {
    success:boolean,
    code:number,
    msg:string,
    data:IData,
   
    xhr:XMLHttpRequest,
    errorThrown:any,
    config:any
}

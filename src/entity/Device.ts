import {LocalStorage} from "../core/storage/LocalStorage";
import {StorageConst} from "../constant/StorageConst";
import {CheckUtil} from "../utils/verify/CheckUtil";

interface IDevice {
    account:string,
    password:string,
    mobile:string
    auth_code:string,
    uuid:string,
    isSavePassword:boolean
}
/**
 * Created by zhengchao on 2017/11/13.
 * 当前设备对象唯一实例
 */
export class Device implements IDevice{

    private _account:string;
    set account(account:string){
        if(account)
            this._account = account;
        else
            this._account = "";
        this.putStorage();
    }
    get account(){
        return this._account;
    }

    private _password:string;
    set password(password:string){
        if(password)
            this._password = password;
        else
            this._password = "";
        this.putStorage();
    }
    get password(){
        return this._password;
    }

    private _mobile:string;
    set mobile(mobile:string){
        if(mobile)
            this._mobile = mobile;
        else
            this._mobile = "";
        this.putStorage();
    }
    get mobile(){
        return this._mobile;
    }

    private _auth_code:string;
    set auth_code(auth_code:string){
        if(auth_code)
            this._auth_code = auth_code;
        else
            this._auth_code = "";
        this.putStorage();
    }
    get auth_code(){
        return this._auth_code;
    }

    private _uuid:string;
    set uuid(uuid:string){
        if(uuid)
            this._uuid = uuid;
        else
            this._uuid = "";
        this.putStorage();
    }
    get uuid(){
        return this._uuid;
    }

    private _isSavePassword:boolean;
    set isSavePassword(isSavePassword:boolean){
        if(!CheckUtil.isEmpty(isSavePassword))
            this._isSavePassword = isSavePassword;
        else
            this._isSavePassword = false;
        this.putStorage();
    }
    get isSavePassword(){
        return this._isSavePassword;
    }

    putStorage(){
        LocalStorage.set(StorageConst.DEVICE_INFO,this.toString());
    }

    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    getOs():String {
        let userAgent = navigator.userAgent,os;
        if(!this.isMobile)
            os = 'pc';
        else if(/OursAndroid/i.test(userAgent))
            os = 'ad';
        else if(/OursIOS/i.test(userAgent))
            os = 'ip';
        else if(/MicroMessenger/i.test(userAgent))
            os = 'wc';
        else
            os = 'h5';
        return os;
    }

    toString(){
        return {
            'account':this.account,
            'password':this.password,
            'auth_code':this.auth_code,
            'uuid':this.uuid,
            'isSavePassword':this.isSavePassword,
            'mobile':this.mobile
        }
    }

    static device:Device;
    private constructor() {
        let device:IDevice = LocalStorage.get(StorageConst.DEVICE_INFO)
        if(!device)
            device = <IDevice>{}
        if(typeof device === 'string')
            device = JSON.parse(<string>device)
        this.account = device.account
        this.password = device.password
        this.auth_code = device.auth_code
        this.uuid = device.uuid
        this.isSavePassword = device.isSavePassword
        this.mobile = device.mobile
    }

    /**
     * 单例模式
     * @returns {Device}
     */
    static get() {
        if (!Device.device)
            Device.device = new Device();
        return Device.device;
    }
}

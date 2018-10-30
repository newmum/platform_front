import {LocalStorage} from "../core/storage/LocalStorage";
import {StorageConst} from "../constant/StorageConst";

interface IUser {
    id          :number,
    account     :string,
    password    :string,
    repassword  :string,
    email       :string,
    mobile      :string,
    validateCode:string,
    department  :string,
    loginType   :number,
    are_id      :string,
}
/**
 * @ClassName: User
 * @Description: 当前用户对象
 * @author： zhengchao
 * @date： 2017年11月13日
 */
export class User implements IUser{

    //validateCode:string;
    repassword:string;

    private _id:number;
    set id(id:number){
        this._id = id;
    }
    get id(){
        if(this._id)
            return this._id;
        else
            return 0;
    }

    private _account:string;
    set account(account:string){
        this._account = account;
    }
    get account(){
        if(this._account)
            return this._account;
        else
            return "";
    }

    private _password:string;
    set password(password:string){
        this._password = password;
    }
    get password(){
        if(this._password)
            return this._password;
        else
            return "";
    }

    private _email:string;
    set email(email:string){
        this._email = email;
    }
    get email(){
        if(this._email)
            return this._email;
        else
            return "";
    }

    private _mobile:string;
    set mobile(mobile:string){
        this._mobile = mobile;
    }
    get mobile(){
        if(this._mobile)
            return this._mobile;
        else
            return "";
    }

    private _validateCode:string;
    set validateCode(validateCode:string){
        this._validateCode = validateCode;
    }
    get validateCode(){
        if(this._validateCode)
            return this._validateCode;
        else
            return "";
    }

    private _department:string;
    set department(department:string){
        this._department = department;
    }
    get department(){
        if(this._department)
            return this._department;
        else
            return "";
    }

    private _are_id:string;
    set are_id(are_id:string){
        this._are_id = are_id;
    }
    get are_id(){
        if(this._are_id)
            return this._are_id;
        else
            return "";
    }

    /**
     * 1:账号密码登录|2:手机短信登录|3:微信扫码登录|4:QQ授权登录
     */
    private _loginType:number;
    set loginType(loginType:number){
        if(loginType)
            this._loginType = loginType;
        else
            this._loginType = 0;
    }
    get loginType(){
        return this._loginType;
    }

    static get():User{
        return JSON.parse(LocalStorage.get(StorageConst.USER_INFO))
    }

    toString(){
        return {
            'id':this.id,
            'account':this.account,
            'email':this.email,
            'mobile':this.mobile,
            'department':this.department,
            'are_id':this.are_id,
            'loginType':this.loginType,
            'validateCode':this.validateCode,
        }
    }

    constructor(user?:IUser) {
        if(!user)
            user = <IUser>{}
        this.id = user.id
        this.account = user.account
        this.email = user.email
        this.mobile = user.mobile
        this.are_id = user.are_id
        this.loginType = user.loginType
    }

}

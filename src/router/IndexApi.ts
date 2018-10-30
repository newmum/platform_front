import { Ajax } from "../core/service/Ajax";
import { User } from "../entity/User";
import { md5 } from "md5js";

/**
 * @ClassName: IndexApi
 * @Description: 入口后台接口调用类
 * @author： zhengchao
 * @date： 2018年7月1日
 */
export class IndexApi {

    /**
     * 发送短信验证码
     * @param {string} mobile
     * @param {string} type 1登录 2注册 3找回4更换手机
     * @returns {}
     */
    static sendSMS = (mobile: string, type: number) => {
        let ajax = new Ajax()
        return ajax.send('/account/sendSMS', 'POST', { mobile: mobile, type: type })
    }

    /**
     * 发送邮箱验证码
     * @param {string} email
     * @param {string} type 1登录(预留,暂不使用)2注册 3找回4更换邮箱
     * @returns {}
     */
    static sendEmail = (email: string, type: number) => {
        let ajax = new Ajax()
        return ajax.send('/account/sendEmail', 'POST', { email: email, type: type })
    }

    /**
     * 账号登录
     * @param {User} user
     * @returns {}
     */
    static loginByAccount = (user: User) => {
        let ajax = new Ajax()
        return ajax.send('/account/login', 'POST', { account: user.account, password: md5(user.password, 32) })
    }

    /**
     * 手机登录
     * @param {User} user
     * @returns {}
     */
    static loginByMobile = (user: User) => {
        let ajax = new Ajax()
        return ajax.send('/account/mobileLogin', 'POST', { mobile: user.mobile, validateCode: user.validateCode })
    }

    /**
     * 用户注册
     * @param {User} user
     * @returns {}
     */
    static register = (user: User) => {
        let ajax = new Ajax()
        return ajax.send('/account/register', 'PUT', {
            account: user.account,
            mobile: user.mobile,
            email: user.email,
            validateCode: user.validateCode,
            password: user.password
        })
    }

    /**
     * 用户验证
     * @param {string} account
     * @param {number} type
     * @returns {}
     */
    static checkUser = (account: string, type: number) => {
        let ajax = new Ajax()
        return ajax.send('/account/checkUser', 'POST', { account: account, type: type })
    }

    /**
     * 找回密码
     * @param {User} user
     * @returns {}
     */
    static passwordRecovery = (user: User) => {
        let ajax = new Ajax()
        return ajax.send('/account/passwordRecovery', 'PUT', {
            mobile: user.mobile,
            email: user.email,
            validateCode: user.validateCode,
            password: user.password

        })
    }

}
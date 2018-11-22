import {Component, Watch} from "vue-property-decorator";
import {BaseView} from "../../core/base/BaseView";
import {User} from "../../entity/User";
import {Device} from "../../entity/Device";
import {IndexApi as Api} from "../../router/IndexApi";
import {Tips} from "../../constant/TipConst";
import {Result} from "../../entity/Result";

/**
 * @ClassName: Index
 * @Description: 入口控制器基类
 * @author： zhengc
 * @date： 2018年9月13日
 */
@Component
export default class Index extends BaseView {
    //校验码开关
    isClickValidateCode = true
    //校验码按钮内容
    validateCodeContent = '发送校验码'
    //设备对象
    device = Device.get()
    //用户对象
    user:User = new User()
    //密码面板开关
    isMobilePanel = false

    /**
     * 表单验证规则
     */
    rules = {
        account: [
            { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [
            { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        mobile: [
            { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        validateCode: [
            { required: true, message: "校验码不能为空", trigger: "blur" }
        ],
        imgCode: [
            { required: true, message: "验证码不能为空", trigger: "blur" }
        ],
        repassword: [
            { required: true, message: "密码不能为空", trigger: "blur" }
        ]
    }

    /**
     * 发送校验码
     * @param {number} sendType
     * @param {boolean} isSMS
     * @returns {Promise<void>}
     */
    async sendValidateCode(sendType:number, isSMS:boolean = true) {
        this.isClickValidateCode = false;
        let result:Result
        if(isSMS){
            result = await Api.sendSMS(this.user.mobile, sendType)
        }else{
            result = await Api.sendEmail(this.user.email, sendType)
        }
        if (result.success) {
            let timeLast = 60;
            let timer = setInterval(() => {
                if (timeLast >= 0) {
                    this.validateCodeContent = timeLast + "秒后重试";
                    timeLast -= 1;
                } else {
                    clearInterval(timer);
                    this.validateCodeContent = "重新发送校验码";
                    this.isClickValidateCode = true;
                }
            }, 1000);
        }else{
            this.$Notice.error({
                title: '错误',
                desc: Tips.get(result.msg)
            });
            this.isClickValidateCode = true;
        }
    }

    /**
     * 跳转账号注册页
     */
    showRegister(){
        this.$router.push({
            name: "register"
        });
    }

    /**
     * 跳转账号找回页
     */
    showForget(){
        this.$router.push({
            name: "forget"
        });
    }

    /**
     * 跳转登录页
     */
    showLogin(){
        this.$router.push({
            name: "login"
        });
    }
}

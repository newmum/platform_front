import {Component, Watch} from "vue-property-decorator";
import {BaseView} from "../../core/base/BaseView";
import {User} from "../../entity/User";
import {Device} from "../../entity/Device";
import {IndexApi as Api} from "../../router/IndexApi";
import {Tips} from "../../constant/TipConst";
import {Result} from "../../entity/Result";

@Component
export default class Index extends BaseView {
    isClickValidateCode = true
    validateCodeContent = '发送校验码'
    device = Device.get()
    user:User = new User()
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

    showRegister(){
        this.$router.push({
            name: "register"
        });
    }

    showForget(){
        this.$router.push({
            name: "forget"
        });
    }

    showLogin(){
        this.$router.push({
            name: "login"
        });
    }
}

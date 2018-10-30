import { Component, Watch } from 'vue-property-decorator'
import './login.less'
import {IndexApi as Api} from "../../../router/IndexApi";
import {Result} from "../../../entity/Result";
import {StorageConst} from "../../../constant/StorageConst";
import {LocalStorage} from "../../../core/storage/LocalStorage";
import {Tips} from "../../../constant/TipConst";
import Index from "../Index";
import {User} from "../../../entity/User";
import MainAction from "../../main/MainAction";

@Component({
  template: require('./login.html')
})
export default class Login extends Index {

    loading: boolean = false;
    loadingMobile: boolean = false;

    chooseLoad() {
        this.isMobilePanel = !this.isMobilePanel;
    }

    /**
     * 账号登录
     */
    accountLogin() {
        this.$refs.loginForm.validate(async (valid :any) => {
            if (valid) {
                this.loading = true;
                let result = await Api.loginByAccount(this.user)
                this.loginSuccess(result)
            }
        });
    }

    /**
     * 手机登录
     */
    mobileLogin() {
        this.$refs.mobilelogin.validate(async (valid :any) => {
            if (valid) {
                this.loadingMobile = true;
                let result = await Api.loginByMobile(this.user)
                this.loginSuccess(result)
            }
        });
    }

    /**
     * 登录成功后操作
     * @param {Result} result
     */
    loginSuccess(result:Result){
        if (result.success) {
            this.$Message.success(Tips.get(result.msg));
            LocalStorage.set(StorageConst.USER_INFO,  new User(result.data.CrmUser).toString());
            if(this.device.isSavePassword){
                this.device.account = this.user.account;
                this.device.password = this.user.password;
                this.device.mobile = this.user.mobile;
            }else{
                this.device.account = '';
                this.device.password = '';
                this.device.mobile = '';
            }
            let currentRouter = MainAction.getBreadcrumb(this);
            if(currentRouter && currentRouter[1] && currentRouter[1].name){
                this.$router.push({
                    name: currentRouter[1].name
                });
            }else{
                this.$router.push({
                    name: "main"
                });
            }
        }else{
            this.$Notice.error({
                title: '错误',
                desc: Tips.get(result.msg)
            });
        }
    }

    created () {
        this.user.account = this.device.account;
        this.user.password = this.device.password;
        this.user.mobile = this.device.mobile;
    }

}

import {Component, Vue, Watch} from 'vue-property-decorator'
import './register.less'
import {IndexApi as Api} from "../../../router/IndexApi";
import { md5 } from "md5js";
import {Tips} from "../../../constant/TipConst";
import Index from "../Index";
import {CheckUtil} from "../../../utils/verify/CheckUtil";

@Component({
    template: require('./register.html')
})
export default class Register extends Index {
    nextStep:boolean = false;
    loadingRegist:boolean = false;
    isFirstPanel:boolean = true
    isA=true
    isB=true

    nextHandle(){
        this.$refs.firstForm.validate(async (valid:any) => {
            if (valid) {
                this.isFirstPanel = false
                if(!CheckUtil.isTel(this.user.mobile)){
                    this.nextStep = true;
                    this.isMobilePanel = false
                    this.user.email = this.user.mobile
                    this.user.mobile = ''
                }else
                    this.isMobilePanel = true
            }
        })
    }

    handleSubmit() {
        this.$refs.registerForm.validate(async (valid:any) => {
            if (valid) {
                this.user.password = md5(this.user.password, 32);
                let result = await Api.register(this.user);debugger
                if (result.success) {
                    this.loadingRegist = true;
                    this.$Message.success(Tips.get(result.msg));
                    this.$router.push({
                        name: "login"
                    });

                } else {
                    this.$Notice.error({
                        title: Tips.get(result.msg),
                    });
                }
            }
        });
    }

}


import { Component, Vue } from 'vue-property-decorator'
import './forget.less'
import { IndexApi as Api } from "../../../router/IndexApi";
import { md5 } from "md5js";
import {Tips} from "../../../constant/TipConst";
import Index from "../Index";
import {CheckUtil} from "../../../utils/verify/CheckUtil";

@Component({
    template: require('./forget.html')
})
export default class Forget extends Index {
    nextForget:boolean = false;
    resetWord:boolean = false;
    isFirstPanel:boolean = true
    isA: boolean = true;
    isB: boolean = true;

    nextHandle(){
        this.$refs.firstForm.validate(async (valid:any) => {
            if (valid) {
                this.isFirstPanel = false
                if(!CheckUtil.isTel(this.user.mobile)){
                    this.isMobilePanel = false
                    this.user.email = this.user.mobile
                    this.user.mobile = ''
                    this.nextForget = true;
                }else
                    this.isMobilePanel = true
            }
        })
    }

    handleFind() {
        this.$refs.findForm.validate(async (valid:any) => {
            if (valid) {
                this.user.password = md5(this.user.password, 32);
                let result = await Api.passwordRecovery(this.user);
                if (result.success) {
                    this.$Message.success(Tips.get(result.msg));
                    this.$router.push({
                        name: "login"
                    });
                    this.resetWord = true;
                } else {
                    this.$Notice.error({
                        title: Tips.get(result.msg)
                    });
                }
            }
        });
    }
}
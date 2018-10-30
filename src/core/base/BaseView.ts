import {Vue} from "vue-property-decorator";
import Axios from "axios";

/**
 * @Description: BaseView视图组件基类
 * @author： zhengchao
 * @date： 2018年6月29日
 */
export class BaseView extends Vue{
    $Notice = Vue.prototype.$Notice
    $Message = Vue.prototype.$Message
    $Modal=Vue.prototype.$Modal
    $refs:any = this.$refs
}

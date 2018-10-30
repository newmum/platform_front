import {Component, Prop, Vue} from "vue-property-decorator";
import './table.less'
import Handsontable, {DefaultSettings} from "handsontable";

/**
 * @ClassName: OperationTable
 * @Description: 操作类复杂表格组件
 * @author： zhengchao
 * @date： 2018年7月15日
 */
@Component({
    template: require('./table.html')
})
export default class OperationTable extends Vue{
    @Prop({default:{}})
    settings:DefaultSettings
    table:Handsontable

    mounted(){
        this.table = new Handsontable(this.$el, this.settings);
    }
}
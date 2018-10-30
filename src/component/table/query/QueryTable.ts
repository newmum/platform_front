import {Component, Prop, Vue} from "vue-property-decorator";
import './table.less'
import {CreateElement} from "vue";

/**
 * @ClassName: QueryTable
 * @Description: 查询类简单表格组件
 * @author： zhengchao
 * @date： 2018年7月15日
 */
@Component({
    template: require('./table.html')
})
export default class QueryTable extends Vue{

    @Prop({ default:'' })
    searchPage:IPage;

    colHeadersdata: any = []

    created() {
        this.colHeadersdata = [
            {
                type: "selection",
                width: 60,
                align: "center",
                title: "ID",
                key: "id"
            },
            {
                title: "地市",
                key: "cityName",
                align: "center",

            },
            {
                title: "区县",
                key: "areaName",
                align: "center",

            },
            {
                title: "证书号码",
                key: "certNum",
                align: "center",

            },
            {
                title: "企业名称",
                key: "name",
                align: "center",
            },
            {
                title: "注册地址",
                key: "certAddress",
                align: "center",
            },
            {
                title: "类别",
                key: "category",
                align: "center",
            },
            {
                title: "经营范围",
                key: "manageScope",
                align: "center",
            },
            {
                title: "经营状态",
                key: "operating",
                align: "center",
            },
        ]
    }

    // render(h:CreateElement){
    //     debugger
    // }
}

import {Component, Watch} from "vue-property-decorator"
import './list.less'
import { ResourceApi as Api } from "../../../router/ResourceApi";
import { Result } from "../../../entity/Result";
import { QueryParam } from "../../../entity/QueryParam";
import { BaseView } from "../../../core/base/BaseView";
import { Tips } from "../../../constant/TipConst";
import {ProcessorChain} from "../ProcessorChain";

/**
 * @ClassName: ChainList
 * @Description: 表单和详情页
 * @author： zhengc
 * @date： 2018年11月22日
 */
@Component({
    template: require('./list.html'),
})
export default class ChainList extends BaseView {
    //列表数据
    result: Result = new Result();
    //列表是否加载中
    loading:boolean = true;
    //条件对象
    queryParam: QueryParam = new QueryParam();
    //表头数据
    colHeadersdata: any = [];
    //链路对象
    processorChain: ProcessorChain  = new ProcessorChain();

    /**
     * 请求列表数据
     */
    async list() {
        this.loading = true;
        this.queryParam.clear();
        this.queryParam.needTotal = true;
        if(this.processorChain.chainName){
            this.queryParam.append(
                {attrName:'CHAIN_NAME',condition:'like',value:this.processorChain.chainName.replace(/(^\s+)|(\s+$)/g,"")}
                );
        }
        this.result = await Api.list('processor_chain', this.queryParam);
        this.loading = false;
    }

    /**
     * 分页切换
     * @param index
     */
    changePage(index: any) {
        this.queryParam.page = index;
        this.list()
    }

    /**
     * 点击删除
     */
    del() {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>是否要删除数据？</p>',
            onOk: async () => {
                let delonly = await Api.del("processor_chain", this.processorChain.id)
                if (delonly.success) {
                    this.$Message.success(Tips.get(delonly.msg));
                } else {
                    this.$Notice.error({
                        title: Tips.get(delonly.msg)
                    });
                }
                this.list()
            },
            onCancel: () => {
            }
        });
    }

    /**
     * 点击新增
     */
    add() {
        this.$router.push({
            path: "/chain/0"
        });
    }

    @Watch('$route')
    router(to: any) {
        if(to.path === '/chain'){
            this.list();
        }
    }

    /**
     * 初始化
     */
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
                title: "链路名称",
                key: "chainName",
                align: "center",
            },
            {
                title: "类型",
                key: "type",
                align: "center",
            },
            {
                title: "操作",
                key: "action",
                align: "center",
                fixed: 'right',
                width: 150,
                render: (h: any, params: any) => {
                    return h("div", [
                        h(
                            "Button",
                            {
                                props: {
                                    type: "success",
                                    size: "small",
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.$router.push({
                                            path: "/chain/"+params.row.id
                                        });
                                    }
                                }
                            },
                            "修改"
                        ),
                        h(
                            "Button",
                            {
                                props: {
                                    type: "error",
                                    size: "small",
                                },
                                style: {
                                    marginRight: "5px"
                                },
                                on: {
                                    click: () => {
                                        this.processorChain.id = params.row.id;
                                        this.del();
                                        this.list();
                                    }
                                }
                            },
                            "删除"
                        ),
                    ]);
                }
            }
        ]
    }

    mounted() {
        this.list();
    }


}

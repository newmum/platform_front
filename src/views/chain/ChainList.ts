import {Component, Watch} from "vue-property-decorator"
import './list.less'
import { ResourceApi as Api } from "../../router/ResourceApi";
import { Result } from "../../entity/Result";
import { QueryParam } from "../../entity/QueryParam";
import { BaseView } from "../../core/base/BaseView";
import { Tips } from "../../constant/TipConst";
import {ProcessorChain} from "./ProcessorChain";

@Component({
    template: require('./list.html'),
})
export default class ChainList extends BaseView {
    tableResult: Result = new Result();//返回的结果数据
    delonlyId: number = 0
    getuserID: number = 0
    DynamicListResult: Result = new Result();
    searchPage: IPage = {
        page: 1,
        pageSize: 5,
        total: 0,
        list: []
    }
    loading:boolean = true;
    qureyDel: Array<any> = []
    queryParam: QueryParam = new QueryParam();
    colHeadersdata: any = []
    processorChain: ProcessorChain  = new ProcessorChain();
    handleSearch() {
        this.getDynamicList()
    }
    async getDynamicList() {
        this.loading = true;
        this.queryParam.clear();
        this.queryParam.needTotal = true;
        if(this.processorChain.chainName){
            this.queryParam.append(
                {attrName:'CHAIN_NAME',condition:'like',value:this.processorChain.chainName.replace(/(^\s+)|(\s+$)/g,"")}
                );
        }
        this.DynamicListResult = await Api.list('processor_chain', this.queryParam);
        this.loading = false;
        this.searchPage = this.DynamicListResult.data.Page;
    }

    //页面切换
    changepage(index: any) {
        this.queryParam.page = index;
        this.getDynamicList()
    }
    //删除单条数据
    delOnlyList() {
        this.$Modal.confirm({
            title: '提示',
            content: '<p>是否要删除数据？</p>',
            onOk: async () => {
                let delonly = await Api.del("processor_chain", this.delonlyId)
                if (delonly.success) {
                    this.$Message.success(Tips.get(delonly.msg));
                } else {
                    this.$Notice.error({
                        title: Tips.get(delonly.msg)
                    });
                }
                this.getDynamicList()
            },
            onCancel: () => {

            }
        });
    }
    handleNewUser() {
        this.$router.push({
            path: "/chain/0"
        });
    }
    async downloadTemplate(){
        
    }
    // 删除全部
    delSelectAll() {
        // this.$Modal.confirm({
        //     title: '提示',
        //     content: '<p>是否要删除数据？</p>',
        //     onOk: async () => {
        //         let delsome = await Api.delsomeList(
        //             "message_sms",
        //             this.qureyDel, 1
        //         );
        //         console.log(delsome)
        //         let self = this
        //         self.queryParam.list = []
        //         self.queryParam.pageSize = 5
        //         self.queryParam.needPage = true
        //         self.queryParam.needTotal = true
        //         self.queryParam.append({ attrName: 'name', condition: 'like', value: this.user.name, relation: "and" })
        //         this.DynamicListResult = await Api.DynamicConditionQuery("message_sms", self.queryParam)
        //         this.settingdata = this.DynamicListResult.data.Page.list
        //         this.Spage.total = this.DynamicListResult.data.Page.total
        //         if (delsome.success) {
        //             this.$Message.success(Tips.get(delsome.msg));
        //         } else {
        //             this.$Notice.error({
        //                 title: Tips.get(delsome.msg)
        //             });
        //         }
        //     },
        //     onCancel: () => {
        //
        //     }
        // });

    }
    //选中某个
    handleRowChange(currentRow: any) {
        this.qureyDel = currentRow.map((v: any) => v.id);
    }
    // 删除全部
    allhandle(selection: any) {
        let del = []
        this.qureyDel = selection.map((v: any) => v.id);
        // this.qureyDel = del.join(",");
    }

    @Watch('$route')
    router(to: any) {
        if(to.path === '/chain'){
            this.getDynamicList();
        }
    }

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
                                        this.delonlyId = params.row.id
                                        this.delOnlyList()
                                        this.getDynamicList()
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
        this.getDynamicList()
    }


}

import {Component, Watch} from "vue-property-decorator";
import './detail.less'
import { BaseView } from "../../core/base/BaseView";
import { ResourceApi } from "../../router/ResourceApi";
import {Tips} from "../../constant/TipConst";

import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import {ProcessorChain} from "./ProcessorChain";

/**
 * @ClassName: Detail
 * @Description: 表单和详情页
 * @author： zhengchao
 * @date： 2018年10月29日
 */
@Component({
    template: require('./detail.html'),
    components: { BaiduMap }
})
export default class ChainDetail extends BaseView {

    detailData: ProcessorChain = new ProcessorChain();    //详情数据

    goBack() {
        window.history.go(-1);
    }

    handler (bmap:any) {
    }

    @Watch('$route')
    router(to: any) {
        if(to.path.indexOf('chaindetail') != -1){
            let id: any = this.$route.params.id;
            if(id!=0){
                this.showDetail(id);
            }else{
                this.detailData = new ProcessorChain();
            }
        }
    }

    /**
     * 保存数据库
     * @returns {Promise<void>}
     */
    async save() {
        let result;
        let id: any = this.$route.params.id;
        if(id!=0){
            result = await ResourceApi.update("processor_chain", this.detailData, 1);
        }else{
            result = await ResourceApi.add("processor_chain", this.detailData, 1);
        }
        if (result.success) {
            this.$Message.success(Tips.get(result.msg));
            this.$router.push({
                name: "chain"
            });
        }else{
            this.$Notice.error({
                title: '错误',
                desc: Tips.get(result.msg)
            });
        }
    }

    /**
     * 请求后台返回详情数据
     * @returns {Promise<void>}
     */
    async showDetail(id: number) {
        let result = await ResourceApi.get('processor_chain', id);
        this.detailData = result.data.ProcessorChain;
    }

    /**
     * 初始化加载
     */
    mounted() {
        let id: any = this.$route.params.id;
        if(id!=0){
            this.showDetail(id);
        }else{
            this.detailData = new ProcessorChain();
        }
    }
}

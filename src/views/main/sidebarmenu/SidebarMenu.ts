import { Component, Prop } from 'vue-property-decorator'
import {ArrayUtil as util} from "../../../utils/object/ArrayUtil"
import {BaseView} from "../../../core/base/BaseView";
import MainAction from "../MainAction";
import {UIRouter} from "../UIRouter";

@Component({
    template: require('./sidebarmenu.html')
})
export default class SidebarMenu extends BaseView {

    @Prop({default: false})
    shrink: Boolean;

    @Prop({ default:'' })
    menuList: Array<any>;

    @Prop({ default:'#363e4f' })
    iconColor: String;

    @Prop({
        default: 'dark',
        validator (val) {
            return util.oneOf(val, ['dark', 'light']);
        }
    })
    theme: String;

    @Prop()
    beforePush: Function;

    @Prop({ type: Array })
    openNames: Array<any>;

    @Prop()
    currentRouter:UIRouter;

    get bgColor () {
        return this.theme === 'dark' ? '#495060' : '#fff';
    }
    get shrinkIconColor () {
        return this.theme === 'dark' ? '#fff' : '#495060';
    }

    selectMenu(active: any) {
        let item = MainAction.addTags(this, active);
        this.$router.push({
            name: item.name
        });
    }


    handleChange(name: any) {
        let willpush = true;
        if (this.beforePush !== undefined) {
            if (!this.beforePush(name)) {
                willpush = false;
            }
        }
        if (willpush) {
            this.$router.push({
                name: name
            });
        }
        this.$emit("on-change", name);
    }



    changeMenu (active: any) {
        this.$emit('on-change', active);
    }

    updated () {
        this.$nextTick(() => {
            if (this.$refs.sideMenu) {
                this.$refs.sideMenu.updateOpened();
                this.$refs.sideMenu.updateActiveName();
            }
        });
    }

}

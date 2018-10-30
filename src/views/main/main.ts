import { Component, Watch } from 'vue-property-decorator'
import './main.less'
import { MainApi as Api } from "../../router/MainApi"
import { User } from "../../entity/User";
import { Result } from "../../entity/Result";

import { treeMag } from "../../entity/treeMag";
import NavTags from "./navtags/NavTags"
import {Tips} from "../../constant/TipConst";
import {BaseView} from "../../core/base/BaseView";
import SidebarMenu from './sidebarmenu/SidebarMenu';
import MainAction from "./MainAction";
//import Scrollbar from '../../component/scrollbar/Scrollbar';

@Component({
    template: require('./main.html'),
    components: { SidebarMenu, NavTags }
})
export default class Main extends BaseView {

    openNames: Array<any> = [];
    menuList:Array<any> = [];
    user = User.get();
    shrink = false;
    get breadcrumb() {
        return this.$store.state.app.breadcrumb;
    }
    //当前选中路由页
    get currentRouter() {
        let breadcrumb = this.$store.state.app.breadcrumb;
        return breadcrumb[breadcrumb.length-1];
    }
    //导航集合
    get tagsList() {
        return this.$store.state.app.tagsList;
    }
    scrollBarResize () {
        this.$refs.scrollBar.resize();
    }

    shrinkImg = false
    isFullScreen = false
    messageCount: Number = 3
//   beforePush(name: any) {

// }
    beforePush:Function =(name: any) => {
        if (name === 'accesstest_index') {
            return false;
        } else {
            return true;
        }
        // return true;
    }
    get lang() {
        return this.$store.state.app.lang;
    }
    get menuTheme() {
        return this.$store.state.app.menuTheme;
    }

    //获取路由名称
    getRouterObjByName(routers: any, name: string): any {
        if (!name || !routers || !routers.length) {
            return null;
        }
        // debugger;
        let routerObj = null;
        for (let item of routers) {
            if (item.name === name) {
                return item;
            }
            routerObj = this.getRouterObjByName(item.children, name);
            if (routerObj) {
                return routerObj;
            }
        }
        return null;
    }

    /**
     * 控制菜单是否展开
     */
    toggleClick() {
        this.shrink = !this.shrink;
    }

    /**
     * 个人信息下拉菜单
     * @param name
     */
    handleUser(name: string) {
        if (name === "account") {
            //this.openNewPage(name, this, "ownSpace");
            this.$router.push({
                name: "ownSpace"
            });
        } else if (name === "logout") {
            this.$router.push({
                name: "login"
            });
        }
    }

    /**
     * 关闭当前标签后回退到当前页
     */
    checkTag(name: string) {
        let item = this.tagsList.filter((item: any) => {
            return item ? item.name === name : [];
        })[0];
        if (!item) {
            MainAction.addTags(this, item.id)
            this.$router.push({
                name: item.name
            });
        }
    }

    @Watch('$route')
    route(to: any) {
        this.$store.state.app.breadcrumb = MainAction.getBreadcrumb(this);
        this.$store.state.app.tagsList = MainAction.getTagsList(this);
        //this.checkTag(to.name);
    }

    mounted() {
        // let tagsList:any = [];
        // let route: any = this.$router;
        // route.options.routes.map((item:any) => {
        //     if (item.children && item.children.length <= 1) {
        //         tagsList.push(item.children[0]);
        //     } else {
        //         tagsList.push(...item.children);
        //     }
        // });
    }

    /**
     * 获取菜单列表
     * @returns {Promise<void>}
     */
    async getMenu(){
        let result: Result = await Api.menuList();
        if (result.success) {
            let treeAarr = []
            for (let i of result.data.user.menuList) {
                treeAarr.push({
                    id: i.id,
                    title: i.title,
                    path: i.path,
                    pId: i.parentId,
                    icon: i.icon,
                    name: i.name,
                    children:[]
                })
                this.openNames.push(i.id);
            }
            let tree = new treeMag()
            tree.data = treeAarr
            let chtree: any = []
            chtree = tree.init(0)
            var tt = JSON.stringify(chtree);
            this.menuList = (JSON.parse(tt));
            this.$store.state.app.menuList = result.data.user.menuList;
        }else{
            this.$Notice.error({
                title: '菜单读取失败',
                desc: Tips.get(result.msg)
            });
        }
    }

    /**
     * 获取消息列表
     * @returns {Promise<void>}
     */
    async getMessage() {
        let result: Result = await Api.messageList(this.user.id);
        if (result.success){
            console.log(result)
        }
    }

    created (){
        this.getMenu();
        this.getMessage();
        this.$store.state.app.breadcrumb = MainAction.getBreadcrumb(this);
        this.$store.state.app.tagsList = MainAction.getTagsList(this);
        let route: any = this.$router;
        //this.checkTag(route.history.current.name);
        //window.addEventListener('resize', this.scrollBarResize);
    }

}

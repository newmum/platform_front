import {BaseView} from "../../core/base/BaseView";
import {ArrayUtil} from "../../utils/object/ArrayUtil";
import {LocalStorage} from "../../core/storage/LocalStorage";
import {StorageConst} from "../../constant/StorageConst";
import {UIRouter} from "./UIRouter";
import {CheckUtil} from "../../utils/verify/CheckUtil";
import Component from "vue-class-component";

/**
 * @ClassName: MainAction
 * @Description: 首页逻辑控制
 * @author： zhengchao
 * @date： 2018年8月9日
 */
export default class MainAction {

    static mainRouter:UIRouter = {
        id: 0,
        name: 'main',
        title: '首页',
        path: '/main',
    }

    /**
     * 获取打开的顶部标签集合
     */
    static getTagsList (vm:any) {
        let tagsList = vm.$store.state.app.tagsList;
        if(CheckUtil.isEmpty(tagsList)){
            tagsList = LocalStorage.get(StorageConst.TAGS_LIST);
        }
        if(CheckUtil.isEmpty(tagsList)){
            tagsList = [];
        }
        if(!Array.isArray(tagsList)){
            tagsList = JSON.parse(tagsList);
        }
        if(tagsList.length<=0){
            tagsList.push(this.mainRouter);
        }
        return tagsList;
    }

    /**
     * 增加新的顶部标签
     */
    static addTags (vm:any, id:number) {
        let tagsList = this.getTagsList(vm);
        let item = tagsList.filter((item:any) => {
            return item.id === id;
        })[0];
        if(CheckUtil.isEmpty(item)){
            item = vm.$store.state.app.menuList.filter((item:any) => {
                return item.id === id;
            })[0]
            tagsList.push(item);
            vm.$store.state.app.tagsList = tagsList;
            LocalStorage.set(StorageConst.TAGS_LIST, tagsList);
        }
        this.addBreadcrumb(vm, item);
        return item;
    }

    /**
     * 获取打开中的顶部标签
     */
    static getBreadcrumb (vm:any) {
        let breadcrumb = vm.$store.state.app.breadcrumb;
        if(CheckUtil.isEmpty(breadcrumb)){
            breadcrumb = LocalStorage.get(StorageConst.CURRENT_ROUTER);
        }
        if(typeof breadcrumb === 'string'){
            breadcrumb = JSON.parse(breadcrumb);
        }
        if(CheckUtil.isEmpty(breadcrumb)){
            breadcrumb = [];
            breadcrumb.push(this.mainRouter);
        }
        return breadcrumb;
    }

    /**
     * 设置顶部标签状态为打开
     */
    static addBreadcrumb (vm:any, uiRouter: UIRouter) {
        vm.$store.state.app.breadcrumb = [];
        vm.$store.state.app.breadcrumb.push(this.mainRouter);
        if(uiRouter.name!='main'){
            vm.$store.state.app.breadcrumb[1] = uiRouter;
        }
        LocalStorage.set(StorageConst.CURRENT_ROUTER, vm.$store.state.app.breadcrumb);
    }

    static title (title:string) {
        title = '气象管理平台'
        window.document.title = title;
    }

    static showThisRoute (itAccess:Array<any>, currentAccess:Array<any>) {
        if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
            return ArrayUtil.oneOf(currentAccess, itAccess);
        } else {
            return itAccess === currentAccess;
        }
    }

    static getRouterObjByName (routers:any, name:string):any {
        if (!name || !routers || !routers.length) {
            return null;
        }
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
        return null
    }

    static handleTitle (vm:any, item:any) {
        if (typeof item.title === 'object') {
            return vm.$t(item.title.i18n);
        } else {
            return item.title;
        }
    }

    static setCurrentPath (vm:BaseView, name:string) {
        let title = '';
        let isOtherRouter = false;
        vm.$store.state.app.routers.forEach((item:any) => {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    title = this.handleTitle(vm, item);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            } else {
                item.children.forEach((child:any) => {
                    if (child.name === name) {
                        title = this.handleTitle(vm, child);
                        if (item.name === 'otherRouter') {
                            isOtherRouter = true;
                        }
                    }
                });
            }
        })
        let currentPathArr = [];
        if (name === 'home_index') {
            currentPathArr = [
                {
                    title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
            currentPathArr = [
                {
                    title: this.handleTitle(vm, this.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: title,
                    path: '',
                    name: name
                }
            ]
        } else {
            let currentPathObj = vm.$store.state.app.routers.filter((item:any) => {
                if (item.children.length <= 1) {
                    return item.children[0].name === name;
                } else {
                    let i = 0;
                    let childArr = item.children;
                    let len = childArr.length;
                    while (i < len) {
                        if (childArr[i].name === name) {
                            return true;
                        }
                        i++;
                    }
                    return false;
                }
            })[0]
            if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
                currentPathArr = [
                    {
                        title: '首页',
                        path: '',
                        name: 'home_index'
                    }
                ]
            } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
                currentPathArr = [
                    {
                        title: '首页',
                        path: '/home',
                        name: 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: name
                    }
                ]
            } else {
                let childObj = currentPathObj.children.filter((child:any) => {
                    return child.name === name;
                })[0];
                currentPathArr = [
                    {
                        title: '首页',
                        path: '/home',
                        name: 'home_index'
                    },
                    {
                        title: currentPathObj.title,
                        path: '',
                        name: currentPathObj.name
                    },
                    {
                        title: childObj.title,
                        path: currentPathObj.path + '/' + childObj.path,
                        name: name
                    }
                ];
            }
        }
        vm.$store.commit('setCurrentPath', currentPathArr);
        return currentPathArr;
    }

    static toDefaultPage (routers:any, name:string, route:any, next:any) {
        let len = routers.length;
        let i = 0;
        let notHandle = true;
        while (i < len) {
            if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
                route.replace({
                    name: routers[i].children[0].name
                });
                notHandle = false;
                next();
                break;
            }
            i++;
        }
        if (notHandle) {
            next();
        }
    }

    static fullscreenEvent (vm:BaseView) {
        vm.$store.commit('initCachepage');
        // 权限菜单过滤相关
        vm.$store.commit('updateMenulist');
        // 全屏相关
    }

}

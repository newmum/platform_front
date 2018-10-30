import Vue from 'vue';
import router from "../router/Router";

const app = {
    state: {
        cachePage: [],
        lang: '',
        isFullScreen: false,
        openedSubmenuArr: [], // 要展开的菜单数组
        menuTheme: 'dark', // 主题
        themeColor: '',
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'main'
        }],
        currentPageName: '',
        currentPath: [{
            title: '首页',
            path: '',
            name: 'main'
        }], // 面包屑数组
        routers: [
            router
        ],
        dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
        noticeid: 0,
        messageList: [],
        menuList: [],
        tagsList: [],
        breadcrumb: [],
    },
    mutations: {
        setMenuList(state:any, list:Array<any>) {
            state.menuList.push(...list);
        },
        updateMenulist(state:any) {
            let menuList:Array<any> = [];
            let route: any = router
            route.options.routes.forEach((item: any, index: any) => {
                if (item.children) {
                    if (item.children.length === 1) {
                         menuList.push(item);
                    } else {
                        let len = menuList.push(item);
                        let childrenArr = item.children.filter((child: any) => {
                                return child;
                        });
                        menuList[len - 1].children = childrenArr;
                    }
                }
            });
            state.menuList = menuList;
        },
        changeMenuTheme(state:any, theme:string) {
            state.menuTheme = theme;
        },
        changeMainTheme(state:any, mainTheme:string) {
            state.themeColor = mainTheme;
        },
        addOpenSubmenu(state:any, name:string) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        closePage(state:any, name:string) {
            state.cachePage.forEach((item:string, index:number) => {
                if (item === name) {
                    state.cachePage.splice(index, 1);
                }
            });
        },
        initCachepage(state:any) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        pageOpenedList(state:any, get:any) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearOtherTags(state:any, vm:Vue) {
            let currentName = vm.$route.name;
            let currentIndex = 0;
            state.pageOpenedList.forEach((item:any, index:number) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            });
            if (currentIndex === 0) {
                state.pageOpenedList.splice(1);
            } else {
                state.pageOpenedList.splice(currentIndex + 1);
                state.pageOpenedList.splice(1, currentIndex - 1);
            }
            let newCachepage = state.cachePage.filter((item:any) => {
                return item === currentName;
            });
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        clearSelfTag(state:any, vm:Vue) {
            let currentName = vm.$route.name
            let currentIndex = 0
            state.pageOpenedList.forEach((item:any, index:number) => {
                if (item.name === currentName) {
                    currentIndex = index;
                }
            })
            state.pageOpenedList.splice(currentIndex)
            let newCachepage = state.cachePage.filter((item:any) => {
                return item === currentName;
            })
            state.cachePage = newCachepage;
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        setOpenedList(state:any) {
            let route: any = router
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [route.options.routes[0]];
        },
        setCurrentPath(state:any, pathArr:Array<any>) {
            state.currentPath = pathArr;
        },
        setCurrentPageName(state:any, name:string) {
            state.currentPageName = name;
        },
        clearOpenedSubmenu(state:any) {
            state.openedSubmenuArr.length = 0;
        },
        increateTag(state:any, tagObj:any) {
            // if (state.dontCache.indexOf(tagObj.name) >= 0) {
            //     state.cachePage.push(tagObj.name);
            //     localStorage.cachePage = JSON.stringify(state.cachePage);
            // }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        }
    }
};

export default app;

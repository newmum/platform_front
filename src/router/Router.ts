import Vue, {AsyncComponent} from 'vue'
import Iview from 'iview'
import Router, {RouteConfig, Route} from 'vue-router'
import Main from '../views/main/Main';
import ChainList from "../views/chain/ChainList";
import ChainDetail from "../views/chain/ChainDetail";
import Login from "../views/index/login/Login";

const register: AsyncComponent = (): any => import('../views/index/register/Register')
const forget: AsyncComponent = (): any => import('../views/index/forget/Forget')

Vue.use(Router)

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'login',
        component: Login
    },{
        path: '/register',
        name: 'register',
        component: register
    }, {
        path: '/forget',
        name: 'forget',
        component: forget
    }, {
        path: '/main',
        name: 'main',
        component: Main,
        children: [
            {
                path: '/chain',
                name: 'chain',
                component: ChainList,
            }, {
                path: '/chain/:id',
                component: ChainDetail,
            }, {
                path: '/xxlReport',
                name: 'xxlReport',
                component: ChainList,
            }
        ]
    }
]

const router: Router = new Router({
    mode: 'history',
    base: '/',
    routes
})

router.afterEach((to) => {
    Iview.LoadingBar.finish();
    window.scrollTo(0, 0);
});
export default router

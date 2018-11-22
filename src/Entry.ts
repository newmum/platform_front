import Vue from "vue";
import Iview from 'iview'
import 'iview/dist/styles/iview.css'
import router from "./router/Router"
import App from "./views/index/app/App";
import store from "./module/Store";

Vue.use(Iview)
Vue.config.productionTip = false
// Vue.use(BaiduMap, {
//     ak: '6rggYiEe9qlFLNbp3BEYHmBEIt9Up3KC'
// })

new Vue({
    el: '#app',
    router: router,
    store,
    template: '<App/>',
    components: { App },
    created (){}
})

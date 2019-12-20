import Vue from 'vue'
import App from './App.vue'

import 'animate.css'
import 'ant-design-vue/dist/antd.less'
import Antd from 'ant-design-vue'


import Alert from './components/common/alert'
import store from './store'
import router from './router'
import '@/permission'

Vue.config.productionTip = false;
Vue.use(Antd);//use the antd.
Vue.use(Alert);

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');

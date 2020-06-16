import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import router from "./router"
import ElementUI from 'element-ui'
import Blob from "./lib/excel/Blob";
import Export2Excel from "./lib/excel/Export2Excel";
import SlideVerify from 'vue-monoplasty-slide-verify'; //图形拼图
Vue.use(SlideVerify);
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Vue.use(ElementUI);
router.beforeEach((to, form, next) => {
  if (to.path === '/login') {
    next();
    return;
  }
  if (to.path === '/index' || to.path === '/join' || to.path === '/contact' || to.path === '/about') {
    next();
  } else {
    let session_store=JSON.parse(sessionStorage.getItem("store"));
    if ((store.state.userInfo.id||session_store.userInfo&&session_store.userInfo.id)) {
      next();
    } else {
      next({
        path: '/login'
      });
    }
  }
})
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
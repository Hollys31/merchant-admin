import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations'
import modules from '@/store/modules'
import actions from '@/store/actions'
Vue.use(Vuex)
const userInfo = JSON.parse(localStorage.getItem('user_info'))
export default new Vuex.Store({
    state: {
        loading:false, // loading的状态
        messageChange:false,
        message:'',//错误信息
        loadTips: '数据加载中', //数据加载提示信息
        userInfo: userInfo ? userInfo : {name: '', photo: 'http://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', date: '2019-09-01'}, //用户信息
        router: {to: '', from: ''} //路由信息
    },
    mutations,
    modules,
    actions
})
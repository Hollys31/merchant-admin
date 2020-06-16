import Vue from 'vue'
import Router from 'vue-router'
/* import store from '@/store'
import types from '@/store/constants/types' */
Vue.use(Router)

const router = new Router({
            // mode: 'history',
            linkActiveClass: 'active',
            routes: [
                { path: '/login',name: 'login', component: () => import('./views/Login.vue')}, // 登录
                { path: '/forgetPassword', name: 'forgetPassword', component: () => import('./views/ForgetPassword.vue')},  /* 忘记密码 */
                { path: '/sevenPayAgr', name: 'sevenPayAgr', component: () => import('./views/Official/SevenPayAgr.vue')},//七分钱协议
                { path: '/officialLayout',name: 'officialLayout', component: () => import('./views/OfficialLayout.vue'),children:[
                    { path: '/index',name: 'index', component: () => import('./views/Index.vue')}, // 首页
                    { path: '/join',name: 'join', component: () => import('./views/Official/Join.vue')}, // 诚聘英才
                    { path: '/contact',name: 'contact', component: () => import('./views/Official/Contact.vue')}, // 联系我们
                    { path: '/about',name: 'about', component: () => import('./views/Official/About.vue')}, // 关于七分钱
                ]},
                { path: '/layout',name: 'layout', component: () => import('./views/layout.vue'),children:[
                    /*经营概括*/
                    {path:'/management',name:'management',component:()=>import('./views/Management/Management.vue')},
                    /*  账户管理 */
                    {path: '/account', name: 'account', component: () => import('./views/Account/Account.vue')},//账户信息
                    {path: '/resetLoginPwd', name: 'resetLoginPwd', component: () => import('./views/Account/ResetLoginPwd.vue')},//修改登陆密码
                    {path: '/resetPayPwd', name: 'resetPayPwd', component: () => import('./views/Account/ResetPayPwd.vue')},//修改支付密码
                    {path:'/forgetPayPwd',name:'forgetPayPwd',component: () => import('./views/Account/ForgetPayPwd.vue')},//忘记支付密码
                    {path:'/cashier',name:'cashier',component: () => import('./views/Account/Cashier.vue')},//收银员管理
                    {path:'/addCashier',name:'addCashier',component: () => import('./views/Account/AddCashier.vue')},//添加收银员
                    {path:'/shopManager',name:'shopManager',component: () => import('./views/Account/ShopManager.vue')},//店长管理
                    {path:'/addShopManager',name:'addShopManager',component: () => import('./views/Account/AddShopManager.vue')},//添加店长
                    {path:'/fiance',name:'fiance',component: () => import('./views/Account/Fiance.vue')},//财务管理
                    {path:'/addFiance',name:'addFiance',component: () => import('./views/Account/AddFiance.vue')},//添加财务
                    {path:'/shop',name:'shop',component: () => import('./views/Account/Shop.vue')},//门店管理
                    {path:'/addShop',name:'addShop',component: () => import('./views/Account/AddShop.vue')},//添加门店
                    /*  交易管理 */
                    {path: '/transaction',name: 'transaction',component: () => import('./views/Transaction/Transaction.vue')},//交易记录
                    {path:'/refundRecord',name:'refundRecord',component: () => import('./views/Transaction/Refund.vue')},//退款记录
                    {path:'/traceSummary',name:'traceSummary',component: () => import('./views/Transaction/Summary.vue')},//交易汇总
                    {path:'/applyRefund',name:'applyRefund',component: () => import('./views/Transaction/ApplyRefund.vue')},//申请退款
                    {path:'/checkingRefund',name:'checkingRefund',component: () => import('./views/Transaction/CheckingRefund.vue')},//退款审核
                    /*结算管理*/
                    {path:'/settleAccounts',name:'settleAccounts',component: () => import('./views/SettleAccounts/SettleAccounts.vue')},
                    /* 密钥管理 */
                    {path:'/secretkey',name:'secretkey',component: () => import('./views/Secretkey/Secretkey.vue')},//密钥管理
                    /* 产品授权 */
                    {path:'/goodsLicense',name:'goodsLicense',component: () => import('./views/GoodsLicense/GoodsLicense.vue')},
                    /* 代付 */
                    {path:'/payingAgent',name:'payingAgent',component: () => import('./views/PayingAgent/PayingAgent.vue')},//代付
                    {path:'/deposit',name:'deposit',component: () => import('./views/PayingAgent/Deposit.vue')},//充值
                    {path:'/payingDetail',name:'payingDetail',component: () => import('./views/PayingAgent/PayingDetail.vue')},//详情记录
                    /* 应用授权 */
                    {path:'/applicationLicense',name:'applicationLicense',component: () => import('./views/ApplicationLicense/ApplicationLicense.vue')},
                ]},
                {path: '/',redirect: {name: 'index'}},
                {path: '*',redirect: {name: 'index'}} //默认
            ]
            })


        export default router
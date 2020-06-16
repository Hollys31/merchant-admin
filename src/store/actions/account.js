import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.ACCOUNT_DATA_INFO](context, amount) { //账户信息
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.accountInfo,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_USER_LOGINPWD](context, amount) { //修改登陆密码
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.editLoginPwd,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_USER_PAYPWD](context, amount) {//修改支付密码
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.editPayPwd,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_CASHIER_LIST](context, amount) { //收银员
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.getCashierList,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_CASHIER_ADD](context, amount) { //收银员  添加
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.cashierAdd,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_CASHIER_EDIT](context, amount) { //收银员 编辑
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.cashierEdit,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_MANAGER_LIST](context, amount) { //店长列表
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.shopManagerList,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_MANAGER_ADD](context, amount) { //添加店长信息
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.shopManagerAdd,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_MANAGER_EDIT](context, amount) { //编辑店长信息
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.shopManagerEdit,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_LIST](context, amount) { //门店
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.getShopList,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_ADD](context, amount) { //添加门店
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.addShop,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_SHOP_EDIT](context, amount) { //编辑门店信息
        const that = this;
        return that.dispatch('ajax', {
            method: 'post',
            url: api.updateShopInfo,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_FIANCE_LIST](context, amount){//财务列表
        const that = this;
        return that.dispatch('ajax', {
            method: 'post',
            url: api.getfianceList,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_FIANCE_ADD](context, amount){//修改财务
        const that = this;
        return that.dispatch('ajax', {
            method: 'post',
            url: api.addFinance,
            data: {
                ...amount
            }
        })
    },
    [types.ACCOUNT_FIANCE_EDIT](context, amount){//编辑财务
        const that = this;
        return that.dispatch('ajax', {
            method: 'post',
            url: api.updateFinance,
            data: {
                ...amount
            }
        })
    }
   



}
import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.LOGIN_POST_IN] (context, amount) { //登录
        const that = this;
       return that.dispatch( 'ajax', {
            method: 'post',
            url: api.postLogin,
            data:{...amount}
        })
    },
    
    [types.LOGIN_POST_OUT] (context, amount) { //退出登录
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.postLogout,
            data:{...amount}
        })
    },
    [types.GET_MESSAGE_CODE] (context, amount) { //获取手机验证码
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.getMessageCode,
            data:{...amount}
        })
    },
    [types.GET_MESSAGE_VALID] (context, amount) { //校验手机验证码
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.validMessage,
            data:{...amount}
        })
    },
    [types.LOGIN_FORGER_PASSWORD] (context, amount) { //忘记登录密码设置新密码
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.forgetLoginPwd,
            data:{...amount}
        })
    },
    [types.GET_PHONE_AUTH] (context, amount) { //查看该手机号是否存在
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.getPhoneAuth,
            data:{...amount}
        })
    }, 
    [types.PAY_FORGET_PASSWORD](context, amount){
        const that = this;
        return that.dispatch( 'ajax', {
            method:'post',
            url:api.forgetPayPwd,
            data:{...amount}
        })
    }
    
}
import axios from 'axios'
import router from '@/router.js'
import types from '@/store/constants/types'
const Qs = require('qs')
const CancelToken = axios.CancelToken
const isProd = process.env.NODE_ENV === 'production';
/* axios.defaults.baseURL = isProd ? 'http://192.168.1.16:6003/api/' : 'api'; */
axios.defaults.timeout = 10000;
export default {
    ajax(context, amount) {
         context.commit(types.APP_SET_LOADING_STATUS, true)
        const source = CancelToken.source()
        if (typeof amount === 'string') {
            return send('get', amount)
        } else {
            switch (amount.method) {
                case 'get':
                    return send('get', amount.url + '?' + Qs.stringify(amount.data))
                case 'post':
                    return send('post', amount.url, Qs.stringify(amount.data, {
                        arrayFormat: 'repeat'
                    }))
                case 'json':
                    return send('post', amount.url, amount.data, 'application/json')
                case 'put':
                    return send('put', amount.url, Qs.stringify(amount.data, {
                        arrayFormat: 'repeat'
                    }))
                case 'delete':
                    return send('delete', amount.url, Qs.stringify(amount.data, {
                        arrayFormat: 'repeat'
                    }))
                case 'form':
                    return send('post', amount.url, amount.data, 'application/x-www-form-urlencoded')
            }
        }

        function send(method, url, data = '', type = '') { //发起网络请求
            if (type) headers['Content-Type'] = type
            axios.defaults.headers.common['token'] =  localStorage.getItem('my_token')||''
            return new Promise((resolve, reject) => {
                axios({
                    method: method,
                    url: url,
                    data: data,
                    cancelToken: source.token
                }).then(response => {
                    if (parseFloat(response.data.resultCode) == 1 || parseFloat(response.data.resultCode) == 200) {
                        context.state.message="";
                        resolve(response.data);
                    }
                    if(url != 'user/webLogin'&&parseFloat(response.data.resultCode) == 0){
                        let msg=response.data.resultMsg;
                        context.state.messageChange=! context.state.messageChange;
                        context.state.message=msg||''
                    }
                    if (url == 'user/webLogin' && parseFloat(response.data.resultCode) == 0) {
                        resolve(response.data);
                    }
                    if(parseFloat(response.data.resultCode)==401){
                        router.push('/login') 
                    }
                    context.commit(types.APP_SET_LOADING_STATUS, false)
                }).catch(error => {
                    console.log(error);
                    return errorHandler(error, error.response ? error.response.status : '')
                })
            })
        }


        function errorHandler(error, status) { //请求失败回调函数
            status = parseInt(status)
            if (/timeout/.test(error.message)) stateHandling('', '请求超时，请刷新重试！')
            else stateHandling(status, error.message)
            context.commit(types.APP_SET_LOADING_STATUS, false)
            return {
                status: status,
                msg: error.message,
                data: {}
            }
        }

        function stateHandling(status, msg) { //请求失败或服务器错误 状态码处理
            console.log(status);
            if (status === 401) context.$router.push('/login') //未登录 | 签名已过期
            if (!msg) {
                switch (status) {
                    case 500:
                        msg = '服务器错误！';
                        break
                    case 404:
                        msg = '未找到服务器文件！';
                        break
                    default:
                        msg = '系统异常！'
                }
            }
           /*  this.$message.error('错了哦，这是一条错误消息'); */
        }
    }
}
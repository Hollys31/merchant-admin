import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.SECRETKEY_INFO](context, amount) { //获取交易列表
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.querySecretkey,
            data: {
                ...amount
            }
        })
    },
}
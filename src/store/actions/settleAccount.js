import api from '@/lib/api'
import types from '@/store/constants/types'
export default {
    [types.TRADE_SETTLE_ACCOUNT](context, amount) { //导出交易列表
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.settleAccount,
            data: {
                ...amount
            }
        })
    },
}
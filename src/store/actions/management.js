import api from '@/lib/api'
import types from '@/store/constants/types'
export default {
    [types.CHART_SUMMARY](context, amount) { //导出交易列表
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.queryMoneyAndCount,
            data: {
                ...amount
            }
        })
    },
}
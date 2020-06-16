import api from '@/lib/api'
import types from '@/store/constants/types'
import util from "@/lib/util.js";
export default {
    [types.TRADE_EXCEL_LIST](context, amount) { //导出交易列表
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.getTradeList,
            data: {
                ...amount
            }
        })
    },
    [types.TRADE_ALL_LIST](context, amount) { //获取交易列表
        const that = this
        that.dispatch('ajax', {
            method: 'post',
            url: api.getTradeList,
            data: {
                ...amount.param
            }
        }).then(res => {
            if (res.resultMsg && res.resultMsg.length > 0) {
                const len = res.resultMsg.length;
                res.resultMsg = res.resultMsg.map(item => {
                    item.orderState = amount._this.stateObj[item.orderState] || "";
                    item.finishTime = util.formatTime1(new Date(item.finishTime));
                    item.channel = amount._this.channelObj[item.channel];
                    return item;
                });
                amount._this.lastTradeTime = res.resultMsg[len - 1].lastTradeTime;
                amount._this.listData = amount._this.listData.concat(res.resultMsg);
            } else {
                amount._this.$message({
                    message: "没有更多数据",
                    type: "warning"
                });
            }
        });
    },
    [types.TRADE_REFUND_LIST](context, amount) { //获取退款记录
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.getRefundList,
            data: {
                ...amount
            }
        })
    },
    [types.TRADE_REFUND_ALL_LIST](context, amount) { //获取退款记录
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.queryRefund,
            data: {
                ...amount
            }
        })
    },
    [types.TRADE_APPLY_REFUND](context, amount) {
        const that = this
        return that.dispatch('ajax', {
            method: 'post',
            url: api.applyRefund,
            data: {
                ...amount
            }
        })
    },
    [types.TRADE_DOWNLOAD_EXCEL](context, amount) { //导出文件
        const that = this
        that.dispatch('ajax', {
            method: 'post',
            url: api.downloadExcel,
            data: {
                ...amount
            }
        }).then(res => {
            console.log(res);
        })
    },
}
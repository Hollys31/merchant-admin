import api from '@/lib/api'
import types from '@/store/constants/types'

export default {
    [types.APPLICATION_LICENSE] (context, amount) { //产品中心
        const that = this
       return that.dispatch( 'ajax', {
            method: 'post',
            url: api.applicationLicense,
            data:{...amount}
        })
    },

    

}
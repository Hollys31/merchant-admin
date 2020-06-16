import types from '@/store/constants/types'
export default {    
    //设置当前登录用户的信息
    [types.APP_SET_USER_INFO] (state, payload) {
        state.userInfo = payload
    },
    [types.APP_SET_LOADING_STATUS] (state, payload) { //Bool
        state.loading = payload
    },
}
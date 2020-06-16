const types = [
    /******************全局状态*********************/
    'APP_SET_LOADING_STATUS', //设置app数据加载状态
    'APP_SET_USER_INFO', //用户信息
    'APP_SET_ERR_MESSAGE',//错误信息

    /*********************登录页*******************/
    'LOGIN_POST_IN', //登录
    'LOGIN_GET_OUT', //退出登录
    'GET_PHONE_AUTH',//手机号是否存在
    'GET_MESSAGE_CODE',//发送短信验证码
    'GET_MESSAGE_VALID',//校验短信验证码
    'LOGIN_FORGER_PASSWORD',//忘记登录密码设置新密码
    'PAY_FORGET_PASSWORD',//忘记支付密码设置新密码
    /* 账户管理 */
    'ACCOUNT_DATA_INFO', //账户信息
    'ACCOUNT_CASHIER_LIST', //收银员
    'ACCOUNT_CASHIER_ADD', //收银员 添加
    'ACCOUNT_CASHIER_EDIT', //收银员编辑
    'ACCOUNT_SHOP_LIST', //门店
    'ACCOUNT_SHOP_ADD', //添加门店
    'ACCOUNT_SHOP_EDIT', //编辑门店
    'ACCOUNT_SHOP_MANAGER_LIST',//获取店长列表
    'ACCOUNT_SHOP_MANAGER_ADD',//添加店长
    'ACCOUNT_SHOP_MANAGER_EDIT',//编辑店长信息
    'ACCOUNT_FIANCE_LIST',//财务列表
    'ACCOUNT_FIANCE_ADD',//添加财务
    'ACCOUNT_FIANCE_EDIT',//编辑财务
    'ACCOUNT_USER_LOGINPWD', //修改登陆密码
    'ACCOUNT_USER_PAYPWD', //修改支付密码
    /* 交易管理 */
    'TRADE_EXCEL_LIST',//导出交易列表
    'TRADE_ALL_LIST', //交易记录
    'TRADE_REFUND_LIST', //退款记录
    'TRADE_APPLY_REFUND', //申请退款
    'TRADE_DOWNLOAD_EXCEL',//导出文件
    /*經營概況*/
    'MANAGEMENT_SUM',
    /**结算管理*/
    'TRADE_SETTLE_ACCOUNT',
    /* 产品中心 */
    'GOODS_CENTER_INFO', //产品中心
     /*应用授权*/
    'APPLICATION_LICENSE',//应用授权
    /* 密钥管理 */
    'SECRETKEY_INFO',//密钥信息
]

const typesObj = {}
types.forEach(type => {
    typesObj[type] = type
})
export default typesObj
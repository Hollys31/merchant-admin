const api = {
    postLogin: '/api/user/webLogin', //登录
    postLogout: '/api/user/loginOut', //退出登录
    getPhoneAuth:'/api/merchant/verifyEnt',//查看手机号是否存在
    getMessageCode:'/api/common/modifyPassword',//获取手机短信验证码
    validMessage:'/api/merchant/merchantForgetPassword',//校验短信验证码
    forgetLoginPwd:'/api/merchant/merchantForgetPwd',//忘记登录密码
    forgetPayPwd:'/api/merchant/merchantForgetPayPwd',//忘记支付密码
    
    accountInfo: '/api/common/queryAllTradeInfo', //获取账户信息
    editLoginPwd: '/api/merchant/modifyLoginPw', //修改登陆密码
    editPayPwd: '/api/merchant/modifyPayPw', //修改支付密码
    getCashierList: '/api/merchant/cashierPageList', //收银员列表
    cashierAdd: '/api/merchant/addCashier', //添加收银员信息
    cashierEdit: '/api/cashier/updateCashierInfo', //编辑收银员信息
    shopManagerList:'/api/merchant/shopmanagerPageList',//获取店长列表
    shopManagerAdd:'/api/merchant/webAddShopManager',//添加店长
    shopManagerEdit:'/api/merchant/webUpdateShopManager',//店长信息编辑
    getShopList: '/api/merchant/getStoreListPage', //门店列表
    addShop: '/api/merchant/addShopManager',
    updateShopInfo: '/api/merchant/updateShopManager', //编辑门店信息
    getfianceList:'/api/merchant/financePageList',//获取财务列表
    addFinance:'/api/merchant/addFinance',//添加财务
    updateFinance:'/api/finance/updateFinanceInfo',//编辑财务信息
   

    getTradeList: '/api/common/queryPageTradeInfo', //获取所有交易列表
    getRefundList: '/api/common/queryRefundOrder', //获取退款记录
    queryRefund:'/api/common/queryRefund',//所有退款列表
    applyRefund: '/api/merchant/verifyPayPw', //申请退款
    downloadExcel:'/api/common/downloadExcel',//导出文件
    
    settleAccount:'/api/merchant/querySettlement',//结算账户

    queryMoneyAndCount:'/api/merchant/queryMoneyAndCount',//门店统计

    goodsInfo: '/api/product/query', //商户产品信息
     
    applicationLicense:'/api/enterprise/pub/auth',//应用授权

    querySecretkey:'/api/enterprise/keymanage.do',//查询商户密钥

}

export default api
const ns = [
    'LOGIN', //登录
    'MANAGEMENT',//經營概況
    'ACCOUNT', //账号管理
    'TRANSACTION',//交易管理
    'SETTLEACCOUNT',//结算管理
    'GOODSCENTER',//产品中心
    'SECRETKEY',//密钥管理
]
const nsObj = {}
ns.forEach(name => {nsObj[name] = name})

export default nsObj
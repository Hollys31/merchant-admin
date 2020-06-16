import ns from '@/store/constants/ns'
import login from '@/store/modules/login' //登陆
import account from '@/store/modules/account' //商户
import transaction from '@/store/modules/transaction' //交易
import goodsCenter from '@/store/modules/goodsLicense' //交易
import application from '@/store/modules/application'//授权
import secretkey from '@/store/modules/secretkey'
import settleAccount from '@/store/modules/settleAccount'//结算
import management from '@/store/modules/management'
export default {
    [ns.LOGIN]: login,
    [ns.ACCOUNT]: account,
    [ns.TRANSACTION]: transaction,
    [ns.GOODSCENTER]: goodsCenter,
    [ns.APPLICATION]:application,
    [ns.SECRETKEY]:secretkey,
    [ns.SETTLEACCOUNT]:settleAccount,
    [ns.MANAGEMENT]:management
}
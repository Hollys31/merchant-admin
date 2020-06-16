const rules = {//校验规则
    loginRules: {//登录
        account: [
          { required: true, message: "请输入登陆账号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入登陆密码", trigger: "blur" }
        ]
      },
    cashierRules: { //收银员信息
        cashierName: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
        }],
        cashierMobile: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
        }],
        shopId: [{
            required: true,
            message: "请选择管理门店",
            trigger: "change"
        }],
        refundAuth: [{
            required: true,
            message: "请选择退款权限",
            trigger: "change"
        }],
        loginPw: [{
            required: true,
            message: "请输入登陆密码",
            trigger: "blur"
        }],
        refundPw: [{
            required: true,
            message: "请输入退款密码",
            trigger: "blur"
        }]
    },

    fianceRules: { //财务信息
        financeName: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
        }],
        financeMobile: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
        }],
        status: [{
            required: true,
            message: "请选择财务状态",
            trigger: "change"
        }],
        loginPw: [{
            required: true,
            message: "请输入登陆密码",
            trigger: "blur"
        }],
    },
    shopRules: { //门店信息
        shopNo: [{
            required: true,
            message: "请输入门店编号",
            trigger: "blur"
        }],
        shopName: [{
            required: true,
            message: "请输入门店名称",
            trigger: "blur"
        }],
        addr: [{
            required: true,
            message: "请输入门店地址",
            trigger: "blur"
        }],
        contact: [{
            required: true,
            message: "请输入联系方式",
            trigger: "blur"
        }]
    },
    shopManagerRules: {//店长信息
        shopmanagerName: [{
            required: true,
            message: "请输入姓名",
            trigger: "blur"
        }],
        shopmanagerMobile: [{
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
        }],
        shopId: [{
            required: true,
            message: "请选择管理门店",
            trigger: "change"
        }],
        status: [{
            required: true,
            message: "请选择店长状态",
            trigger: "change"
        }],
        refundAuth: [{
            required: true,
            message: "请选择退款权限",
            trigger: "change"
        }],
        loginPw: [{
            required: true,
            message: "请输入登陆密码",
            trigger: "blur"
        }],
        refundPw: [{
            required: true,
            message: "请输入退款密码",
            trigger: "blur"
        }]
    }



}
module.exports = rules
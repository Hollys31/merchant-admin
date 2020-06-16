<!--  -->
<template>
  <div class="side-menu">
    <div class="title">我的账户</div>
    <el-tree
      ref="menuTree"
      :data="menu"
      icon-class="el-icon-menu"
      :indent="14"
      highlight-current
      node-key="route"
      :current-node-key="currRoute"
      :default-expanded-keys="[currRoute]"
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currRoute: this.$route.name,
      defaultProps: {
        children: "children",
        label: "label"
      },
      menu: [
       
        {
          label: "账户管理",
          children: [
            {
              label: "账户信息",
              route: "account"
            },
            {
              label: " 收银员管理",
              route: "cashier"
            },
            {
              label: " 店长管理",
              route: "shopManager"
            },
            {
              label: " 门店管理",
              route: "shop"
            },
            {
              label: " 财务管理",
              route: "fiance"
            }
          ]
        },
         /* {
          label: "经营概括",
          children: [
            {
              label: "经营概括",
              route: "management"
            }
          ]
        }, */
        {
          label: "交易管理",
          children: [
            {
              label: "交易记录",
              route: "transaction"
            },
            {
              label: "退款记录",
              route: "refundRecord"
            },
            {
              label: "交易汇总",
              route: "traceSummary"
            },
            {
              label: "申请退款",
              route: "applyRefund"
            }
            /* {
              label: "退款审核",
              route: "checkingRefund"
            } */
          ]
        },
        /* {
          label: "结算管理",
          children: [
            {
              label: "已结算管理",
              route: "settleAccounts"
            }
          ]
        }, */
        {
          label: "密钥管理",
          children: [
            {
              label: "密钥管理",
              route: "secretkey"
            }
          ]
        },
        {
          label: "产品中心",
          children: [
            {
              label: "产品中心",
              route: "goodsLicense"
            }
          ]
        },
        /*  {
          label: "代付",
          children: [
            {
              label: "代付",
              route: "payingAgent"
            },
            {
              label: "充值",
              route: "deposit"
            }
          ]
        }, */
        {
          label: "应用授权",
          children: [
            {
              label: "应用授权",
              route: "applicationLicense"
            }
          ]
        }
      ]
    };
  },

  components: {},
  created: function() {},
  watch: {
    $route(to, from) {
      this.$refs.menuTree.setCurrentKey(to.name);
    }
  },

  methods: {
    handleNodeClick(e) {
      if (e.route && e.route != this.$route.name) {
        this.$router.push({ name: e.route });
      }
    }
  }
};
</script>
<style lang='stylus' scoped>
.title {
  color: #999;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  padding: 0 23px;
}

.side-menu {
  background: #fff;
  width: 260px;
  padding: 30px 0;
  font-size: 16px;
  color: #666;

  i {
    font-size: 18px;
    margin: 0 5px;
  }

  a {
    color: #666;
    display: block;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
  }
}
</style>
<!--  -->
<template>
  <div class="account normal">
    <div class="heading">账户信息</div>
    <div class="part">
      <div class="merchant">
        <div class="item">
          <span>商户号：</span>
          {{userInfo.merchantCode}}
        </div>
        <div class="item">
          <span>商户名称：</span>
          {{userInfo.name}}
        </div>
        <div class="item">
          <span>结算银行：</span>
          {{userInfo.settlementBank}}
        </div>
      </div>
      <div class="turnover">
        <h3>今日成功交易</h3>
        <el-row class="detail">
          <el-col :span="6">
            <div class="grid-content">
              <span class="name">订单总金额</span>
              <span class="num mainColor">{{accountInfo.successSumAmt}}</span>元
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <span class="name">交易笔数</span>
              <span class="num mainColor">{{accountInfo.successNum}}</span>笔
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content">
              <span class="name">退款金额</span>
              <span class="num mainColor">{{accountInfo.refundSumAmt}}</span>元
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content" style="border:none">
              <span class="name">退款笔数</span>
              <span class="num mainColor">{{accountInfo.refundNum}}</span>笔
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="heading">安全信息</div>
    <div class="part">
      <el-row class="line">
        <el-col :span="8">
          登陆密码
          <i class="icon el-icon-lock mainColor"></i>
        </el-col>
        <el-col :span="8" class="pwd">******</el-col>
        <el-col :span="6" class="charge">
          <router-link class="mainColor" :to="{name:'resetLoginPwd'}">
            <i class="el-icon-edit"></i>修改登陆密码
          </router-link>
        </el-col>
      </el-row>
      <el-row class="line">
        <el-col :span="8">
          支付密码
          <i class="icon el-icon-lock mainColor"></i>
        </el-col>
        <el-col :span="8" class="pwd">******</el-col>
        <el-col :span="6" class="charge mainColor">
          <router-link class="mainColor" :to="{name:'forgetPayPwd'}">忘记支付密码</router-link> |
          <router-link class="mainColor" :to="{name:'resetPayPwd'}">
            <i class="el-icon-edit"></i>修改支付密码
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
import {formatTime} from "@/lib/util";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      accountInfo: {}
    };
  },

  components: {},
  mounted() {
    this.getAccountInfo();
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },

  methods: {
    getAccountInfo() {
      const _this = this;
      let today = formatTime(new Date());
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_DATA_INFO, {
          onlyId: _this.userInfo.id,
          shopId: "",
          roleCode: "ent",
          startTime: today,
          endTime: today
        })
        .then(res => {
          _this.accountInfo = res.resultMsg;
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.part {
  box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
  padding: 20px;
  color: #666;
  line-height: 2em;
  margin-bottom: 10px;
  .item {
    padding-left: 20px;
  }
  .line {
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #fcfcfc;
    .icon {
      font-size: 16px;
    }
  }
  .pwd {
    font-size: 18px;
  }
  .charge {
    text-align: right;
    &:hover {
      cursor: pointer;
    }
  }
}
.turnover {
  background: rgb(246, 249, 253);
  padding: 0 20px;
  padding-bottom: 30px;
  margin: 20px 0;
  h3 {
    height: 46px;
    line-height: 46px;
    font-size: 14px;
  }
  .detail {
    border-radius: 3px;
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
    background: #fff;
    .el-col {
      padding: 1% 3%;
      .grid-content {
        border-right: 1px solid #ddd;
        color: #333;

        .name {
          display: block;
          color: #666;
        }
        .num {
          line-height: 1.8em;
          font-size: 30px;
        }
      }
    }
  }
}
</style>
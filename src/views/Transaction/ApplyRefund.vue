<!--申请退款 -->
<template>
  <div class="transaction normal">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="商户订单号">
            <el-input v-model.trim="form.mchOrderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="七分钱订单号">
            <el-input v-model.trim="form.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="退款状态">
            <el-select v-model="form.state" placeholder="请选择状态" @change="changeRefundState">
              <el-option label="未退款" value="00"></el-option>
              <el-option label="退款成功" value="0"></el-option>
              <el-option label="退款中" value="2"></el-option>
              <el-option label="退款失败" value="9"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="交易时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.startTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1" class="line">——</el-col>
        <el-col :span="4">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="form.endTime"
          ></el-date-picker>
        </el-col>
        <el-col :span="6">
          <el-form-item label="分店">
            <el-select v-model="form.shopId" placeholder="请选择分店">
              <el-option
                v-for="(item,index) in shopList "
                :key="index"
                :label="item.shopName"
                :value="item.shopId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="searchList">查询</el-button>
            <el-button size="small" @click="resetForm">清空</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="listData"
      style="width: 100%"
      min-width="800"
      stripe
      v-loading="$store.state.loading"
    >
      <el-table-column prop="finishTime" label="交易时间"></el-table-column>
      <el-table-column prop="mchOrderId" label="商户订单号"></el-table-column>
      <el-table-column prop="orderId" label="七分钱订单号"></el-table-column>
      <el-table-column prop="tradeAmt" label="交易金额（元）"></el-table-column>、
      <el-table-column prop="channel" label="支付方式"></el-table-column>
      <el-table-column prop="orderState" label="状态">
      </el-table-column>
      <el-table-column prop="permission" label="操作">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            @click="applyRefund(scope.row)"
            :disabled="scope.row.orderState!=='支付成功'||scope.row.refundState==2||scope.row.refundState==0"
          >申请退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page" v-if="listData.length>0">
      <el-button @click="handelNextChange">
        下一页
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
    <el-dialog
      class="apply-modal"
      title="申请退款"
      :visible.sync="dialogVisible"
      width="410px"
      autocomplete="off"
    >
      <el-form ref="refundForm" :rules="rules" :model="refundForm" label-width="100px">
        <el-form-item label="退款金额：" prop="refundAmt">
          <el-input v-model.number="refundForm.refundAmt"></el-input>
        </el-form-item>
        <el-form-item label="退款密码：" prop="payPwd">
          <el-input type="password" v-model="refundForm.payPwd"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="margin-left:50px"
            @click="applyRefundSubmit('refundForm')"
          >确认退款</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import {formatTime} from "@/lib/util.js";
import { mapState } from "vuex";
const nameSpaced = ns.TRANSACTION + "/";
export default {
  data() {
    return {
      shopList: [],
      form: {
        startTime: "",
        endTime: "",
        state: "",
        shopId: "",
        orderId: "",
        mchOrderId: "",
        orderState: "",
        orderRefundState: "",
        refundState: ""
      },
      listData: [],
      preTradeTime: "",
      lastTradeTime: "",
      channelObj: {
        wx: "微信支付",
        alipay: "支付宝支付",
        unionpay: "云闪付"
      },
      stateObj: {
        "00": "支付成功",
        "09": "支付失败",
        "0": "退款成功",
        "2": "退款中",
        "9": "退款失败"
      },
      refundForm: {
        //退款参数信息
        refundAmt: null, //退款金额
        payPwd: "" //支付密码
      },
      dialogVisible: false,
      currRowObj: {},
      rules: {
        refundAmt: [
          { required: true, message: "请输入退款金额", trigger: "blur" }
        ],
        payPwd: [{ required: true, message: "请输入退款密码", trigger: "blur" }]
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  mounted() {
    this.getTodayDate();
    this.getRefundList();
    this.getShopList();
  },

  methods: {
    getShopList() {
      //门店类列表数据请求
      const _this = this;
      _this.$store
        .dispatch("ACCOUNT/" + types.ACCOUNT_SHOP_LIST, {
          mchId: _this.custId,
          shopNo: "",
          shopName: "",
          gotoPage: 1,
          pageSize: 100
        })
        .then(res => {
          if (res.resultCode == "1" && res.resultMsg.list) {
            _this.shopList = res.resultMsg.list;
          }
        });
    },
    changeRefundState(val) {
      //退款状态
      if (val == "00") {
        //未退款
        this.form.orderState = val;
        this.form.orderRefundState = val;
        this.form.refundState = "";
      } else {
        //退款成功
        this.form.orderState = "";
        this.form.orderRefundState = "";
        this.form.refundState = val;
      }
    },
    getStateParam() {
      //判断状态筛选参数
    },
    applyRefund(param) {
      //申请退款
      this.currRowObj = param;
      this.refundForm.payPwd = "";
      this.refundForm.refundAmt = param.tradeAmt;
      this.dialogVisible = true;
    },
    applyRefundSubmit(formName) {
      //提交退款申请
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.applyRefundRequest();
        }
      });
    },
    applyRefundRequest() {
      //申请退款请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.TRADE_APPLY_REFUND, {
          mchOrderId: _this.currRowObj.mchOrderId, //商户订单号
          mchId: _this.custId,
          custId: _this.custId,
          ..._this.refundForm
        })
        .then(res => {
          _this.searchList();
          _this.dialogVisible = false;
          _this.$message({
            type: "success",
            message: "退款成功!"
          });

        
        });
    },
    getTodayDate() {
      //获取当天日期
      let today = formatTime(new Date());
      this.form.startTime = today;
      this.form.endTime = today;
    },
    resetForm() {
      //清空 重置
      this.form.refundState = "";
      this.form.orderId = "";
      this.form.mchOrderId = "";
      this.form.state="";
      this.form.shopId = "";
      this.getTodayDate();
    },

    getTodayDate() {
      //获取当天日期
      let today = formatTime(new Date());
      this.form.startTime = today;
      this.form.endTime = today;
    },
    searchList() {
      //查询按钮事件
      this.lastTradeTime = "";
      this.listData = [];
      this.getRefundList();
    },
    handelPreChange() {
      this.getRefundList();
    },
    handelNextChange() {
      this.getRefundList();
    },
    getRefundList() {
      //获取退款列表
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.TRADE_ALL_LIST,{_this:this,param:{
          roleCode: "ent",
          onlyId: _this.custId,
          pageSize: 10,
          lastTradeTime: _this.lastTradeTime,
          ..._this.form
        }} )
    }
  }
};
</script>

<style lang='stylus' scoped>
.line {
  text-align: center;
}
.page .el-button--primary:first-child {
  float: left;
}
.page .el-button--primary:last-child {
  float: right;
}
.apply-modal form {
  width: 300px !important;
}
</style>
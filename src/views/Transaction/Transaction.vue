<!--  -->
<template>
  <div class="transaction normal">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="交易时间">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              v-model="form.startTime"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="line">——</el-col>
        <el-col :span="4">
          <el-date-picker
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期"
            v-model="form.endTime"
          ></el-date-picker>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button size="small" type="primary" @click="getPreDate">前一天</el-button>
            <el-button size="small" type="primary" @click="getTodaDate">今天</el-button>
            <el-button size="small" type="primary" @click="getNextDate">后一天</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
          <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="请选择状态">
              <el-option label="全部" value></el-option>
              <el-option label="支付成功" value="00"></el-option>
              <el-option label="支付失败" value="09"></el-option>
            </el-select>
          </el-form-item>
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
      </el-row>
      <el-form-item>
        <el-button size="small" type="primary" @click="filterTradeList">开始筛选</el-button>
        <el-button size="small" @click="resetFilter">清空</el-button>
        <el-button size="small" type="primary" @click="exportExcelAction">
          按条件导出
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" style="width: 100%;" stripe v-loading="$store.state.loading">
      <el-table-column prop="finishTime" label="交易时间"></el-table-column>
      <el-table-column prop="mchOrderId" label="商户订单号"></el-table-column>
      <el-table-column prop="orderId" label="七分钱订单号"></el-table-column>
      <el-table-column prop="tradeAmt" label="交易金额（元）"></el-table-column>
      <el-table-column prop="channel" label="支付方式"></el-table-column>
      <el-table-column prop="orderState" label="状态">
        <!--  <template slot-scope="scope">{{stateObj[scope.row.orderState]}}</template> -->
      </el-table-column>
    </el-table>
    <div class="page">
      <el-button @click="handelNextChange" v-if="listData.length>0">
        下一页
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import {throttle,formatTime} from "@/lib/util.js";
import { mapState } from "vuex";
const nameSpaced = ns.TRANSACTION + "/";
export default {
  data() {
    return {
      shopList: [],
      form: {
        startTime: "", //开始时间
        endTime: "", //结束时间
        mchOrderId: "", //商户订单号
        orderId: "", //七分钱订单号
        orderState: "", //状态
        shopId: "" //门店ID
        /*orderState:'',
        orderRefundState:'',
        refundState:'' */
      },
      listData: [],
      lastTradeTime: "",
      markDate: "",
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
    this.getShopList();
    this.getTodaDate();
  },
  methods: {
    exportExcelAction: throttle(function() {
      this.exportExcel();
    }, 2000),
    exportExcel() {
      const _this = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/lib/excel/Export2Excel");
        const tHeader = [
          "交易时间",
          "商户订单号",
          "七分钱订单号",
          "交易金额(元)",
          "支付方式",
          "状态"
        ]; // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "finishTime",
          "mchOrderId",
          "orderId",
          "tradeAmt",
          "channel",
          "orderState"
        ]; // 上面的index、nickName、name是tableData里对象的属性
        _this.$store
          .dispatch(nameSpaced + types.TRADE_EXCEL_LIST, {
            roleCode: "ent",
            onlyId: _this.custId,
            ..._this.form
          })
          .then(res => {
            console.log("导出");
            if (res.resultMsg && res.resultMsg.length > 0) {
              res.resultMsg.map(item => {
                item.channel = _this.channelObj[item.channel];
                item.orderState = _this.stateObj[item.orderState];
                return item;
              });
            }
            const list = res.resultMsg || []; //把data里的tableData存到list
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(
              tHeader,
              data,
              _this.form.startTime + "-" + _this.form.endTime + "交易列表"
            ); //标题，数据，文件名
            _this.$message({
              message: "EXCEL文件导出成功",
              type: "success"
            });
          });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
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
    resetFilter() {
      //清空筛选
      this.form.mchOrderId = ""; //商户订单号
      this.form.orderId = ""; //七分钱订单号
      this.form.orderState = ""; //订单状态
      this.form.shopId = ""; //门店ID
    },
    filterTradeList() {
      //筛选交易列表
      this.listData = [];
      this.lastTradeTime = "";
      this.getTradeList();
    },
    handelNextChange() {
      this.getTradeList(this.lastTradeTime);
    },
    searchList() {
      //查询按钮事件
      this.lastTradeTime = "";
      this.listData = [];
      this.etTradeList();
    },
    getTodaDate() {
      //今天
      let today = formatTime(new Date());
      this.form.startTime = today;
      this.form.endTime = today;
      this.markDate = today;
      this.lastTradeTime = "";
      this.listData = [];
      this.getTradeList();
    },
    getPreDate() {
      //前一天
      let date = new Date(this.markDate).getTime() - 24 * 60 * 60 * 1000;
      date = formatTime(new Date(date));
      this.form.startTime = date;
      this.form.endTime = date;
      this.markDate = date;
      this.lastTradeTime = "";
      this.listData = [];
      this.getTradeList();
    },
    getNextDate() {
      //后一天
      let date = new Date(this.markDate).getTime() + 24 * 60 * 60 * 1000;
      date = formatTime(new Date(date));
      this.form.startTime = date;
      this.form.endTime = date;
      this.markDate = date;
      this.lastTradeTime = "";
      this.listData = [];
      this.getTradeList();
    },
    getTradeList() {
      //请求交易列表
      const _this = this;
      _this.$store.dispatch(nameSpaced + types.TRADE_ALL_LIST, {
        _this: this,
        param: {
          roleCode: "ent",
          onlyId: _this.custId,
          pageSize: 10,
          lastTradeTime: _this.lastTradeTime,
          ..._this.form
        }
      });
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
</style>
<!--  -->
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
            <el-select v-model="form.refundState" placeholder="请选择状态">
              <el-option label="退款成功" value="0"></el-option>
              <el-option label="退款中" value="2">退款中</el-option>
              <el-option label="退款失败" value="9"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="退款时间">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.queryStartDate"
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
            v-model="form.queryEndDate"
          ></el-date-picker>
        </el-col>
        <el-col :span="10">
          <el-form-item>
            <el-button size="small" type="primary" @click="searchList">开始筛选</el-button>
            <el-button size="small" @click="resetFilterForm">清空</el-button>
            <el-button size="small" type="primary" @click="exportExcel">
              按条件导出
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="listData" style="width: 100%" stripe v-loading="$store.state.loading">
      <el-table-column prop="refundId" label="退款编号"></el-table-column>
      <el-table-column prop="mchOrderId" label="商户订单号"></el-table-column>
      <el-table-column prop="orderId" label="七分钱订单号"></el-table-column>
      <el-table-column prop="totalAmt" label="交易金额（元）"></el-table-column>、
      <el-table-column prop="refundAmt" label="退款金额（元）"></el-table-column>
      <el-table-column prop="refundTime" label="申请退款日期"></el-table-column>
      <el-table-column prop="refundState" label="退款状态">
        <!-- <template slot-scope="scope">{{stateObj[scope.row.refundState]}}</template> -->
      </el-table-column>
    </el-table>

    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :current-page="currPage"
      :page-size="10"
      :total="totalRecords"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    ></el-pagination>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import {formatTime,formatTime1} from "@/lib/util.js";
import { mapState } from "vuex";
const nameSpaced = ns.TRANSACTION + "/";
export default {
  data() {
    return {
      currPage: 1,
      totalRecords: 1,
      form: {
        //筛选
        orderId: "", //七分钱订单号
        refundState: "", //退款状态
        queryStartDate: "", //查询起始时间
        queryEndDate: "", //查询结束时间
        mchOrderId: "" //商户订单号
      },
      listData: [],
      stateObj: {
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
    this.getTodayList();
  },
  methods: {
    exportExcel() {
      const _this = this;
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/lib/excel/Export2Excel");
        const tHeader = [
          "退款编号",
          "商户订单号",
          "七分钱订单号",
          "交易金额(元)",
          "退款金额(元)",
          "申请退款日期",
          "退款状态"
        ]; // 上面设置Excel的表格第一行的标题
        const filterVal = [
          "refundId",
          "mchOrderId",
          "orderId",
          "totalAmt",
          "refundAmt",
          "refundTime",
          "refundState"
        ]; // 上面的index、nickName、name是tableData里对象的属性

        _this.$store
          .dispatch(nameSpaced + types.TRADE_REFUND_ALL_LIST, {
            mchId: _this.custId,
            ..._this.form
          })
          .then(res => {
            if (res.resultMsg && res.resultMsg.length > 0) {
              res.resultMsg.map(item => {
                item.refundState = _this.stateObj[item.refundState];
                return item;
              });
              const list = res.resultMsg;
              console.log(list);
              const data = this.formatJson(filterVal, list);
              export_json_to_excel(
                tHeader,
                data,
                _this.form.queryStartDate +
                  "-" +
                  _this.form.queryEndDate +
                  "退款列表"
              ); //标题，数据，文件名
              _this.$message({
                message: "EXCEL文件导出成功",
                type: "success"
              });
            }
          });
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.getRefundList();
    },
    getTodayDate() {//今天
      let today = formatTime(new Date());
      this.form.queryStartDate = today;
      this.form.queryEndDate = today;
    },
    resetFilterForm() {
      //清空筛选条件
      this.form.orderId = ""; //七分钱订单号
      this.form.refundState = ""; //退款状态
      this.form.mchOrderId = ""; //商户订单号
      this.getTodayDate();
    },
    getTodayList() {
      this.getTodayDate();
      this.getRefundList();
    },
    searchList() {
      //筛选列表
      this.currPage = 1;
      this.listData = [];
      this.getRefundList();
    },
    getRefundList() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.TRADE_REFUND_LIST, {
          mchId: _this.custId,
          gotoPage: _this.currPage, //当前页
          pageSize: 10,
          ..._this.form
        })
        .then(res => {
          if (res.resultMsg.list) {
            if (res.resultMsg.list.length > 0) {
              res.resultMsg.list.map(item => {
                item.refundState = _this.stateObj[item.refundState];
                item.refundTime = formatTime1(new Date(item.refundTime));
                return item;
              });
            }
            _this.listData = res.resultMsg.list;
            _this.totalRecords = res.resultMsg.totalRecords;
            _this.currPage = res.resultMsg.gotoPage;
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
</style>
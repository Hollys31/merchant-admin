<!--  -->
<template>
  <div class="settleAccounts normal">
    <el-alert title="每日10:00前完成数据更新，当前数据更新至2020-05-07" type="warning"></el-alert>
    <div class="heading">已结算查询</div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-form-item label="结算时间">
          <el-col :span="6">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.beginWorkDate"
            ></el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="form.endWorkDate"
            ></el-date-picker>
          </el-col>
          <el-col :span="10">
            <el-form-item>
              <el-button size="small" type="primary" @click="searchList">查询</el-button>
              <el-button size="small" @click="resetFilterForm">重置</el-button>
              <el-button size="small" type="primary" @click="exportExcel">
                按条件导出
                <i class="el-icon-upload el-icon--right"></i>
              </el-button>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row class="about-rate">
        <span>结算费率</span>线下支付：0.38% 线上支付：0.60% 
        <span>结算周期</span>t+1 第二个工作日
      </el-row>
    </el-form>
    <el-table :data="listData" style="width: 100%" stripe v-loading="$store.state.loading">
      <el-table-column prop="workDate" label="结算日期"></el-table-column>
      <el-table-column prop="receiveTotalAmt" label="支付结算金额(元)"></el-table-column>
      <el-table-column prop="refundTotalAmt" label="退款结算金额(元)"></el-table-column>
      <el-table-column prop="commision" label="手续费(元)"></el-table-column>、
      <el-table-column prop="realAmt" label="入账金额(元)"></el-table-column>
      <el-table-column prop="agentBaseRate" label="自动提现状态"></el-table-column>
      <el-table-column prop="agentCustId" label="操作">
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
    <dl class="tips">
      <dt>注：</dt>
      <dd>1.入账金额=支付结算金额-退款结算金额-手续费</dd>
      <dd>2.入账金额仅作为结算统计参考，实际收到的款项请以提现记录为准</dd>
    </dl>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { formatTime } from "@/lib/util.js";
import { mapState } from "vuex";
const nameSpaced = ns.SETTLEACCOUNT + "/";
export default {
  data() {
    return {
      currPage: 1,
      totalRecords: 1,
      listData: [],
      form: {
        beginWorkDate: null,
        endWorkDate: null
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
    this.searchList();
  },

  methods: {
    getTodayDate() {
      //获取当天日期
      let today = formatTime(new Date());
      this.form.beginWorkDate = today;
      this.form.endWorkDate = today;
    },
    /** 查询*/
    searchList() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.TRADE_SETTLE_ACCOUNT, {
          mchId: _this.custId,
          ..._this.form
        })
        .then(res => {
          _this.listData=res.data;
        });
    },
    /*查询*/
    resetFilterForm() {},
    /*重置*/
    exportExcel() {},
    /*切换分页*/
    handleCurrentChange() {}
  }
};
</script>
<style lang='stylus' scoped>
.about-rate{
  color :#999;
  height :40px;
  line-height :40px;
  span {
    color :#333;
    margin-left :20px;
    margin-right 6px;
  }
}
dl {
  padding: 30px 20px;
  color: #666;
  line-height: 1.6em;

  dt {
    font-size: 14px;
    color: #333;
  }

  dd {
    font-size: 12px;
  }
}
</style>
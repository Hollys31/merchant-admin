<!--  -->
<template>
  <div class="normal">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="退款时间">
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
        <el-col :span="10">
          <el-form-item>
            <el-button size="small" type="primary" @click="getPreSum">前一天</el-button>
            <el-button size="small" type="primary" @click="getTodaySum">今天</el-button>
            <el-button size="small" type="primary" @click="getNextSum">后一天</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button size="small" icon="el-icon-search" type="primary" @click="getSummary">查询</el-button>
        <el-button size="small" @click="resetAll">清空</el-button>
      </el-form-item>
    </el-form>
    <el-row class="sum">
      <el-col :span="5">
        <div class="grid-content">
          <span class="name">支付成功金额</span>
          <span class="num mainColor">{{summaryInfo.successSumAmt||0}}</span> 元
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <span class="name">支付成功笔数</span>
          <span class="num mainColor">{{summaryInfo.successNum||0}}</span> 笔
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content">
          <span class="name">退款金额</span>
          <span class="num mainColor">{{summaryInfo.refundSumAmt||0}}</span> 元
        </div>
      </el-col>
      <el-col :span="4">
        <div class="grid-content">
          <span class="name">退款笔数</span>
          <span class="num mainColor">{{summaryInfo.refundNum||0}}</span> 笔
        </div>
      </el-col>
      <el-col :span="5">
        <div class="grid-content" style="border-right:none">
          <span class="name">
            净交易金额
            <el-tooltip effect="dark" content="备注： 净交易金额=支付成功金额 - 退款金额" placement="top-start">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </span>
          <span class="num mainColor">{{summaryInfo.netTransAmt||0}}</span> 元
        </div>
      </el-col>
    </el-row>
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
      form: {
        startTime: "",
        endTime: ""
      },
      summaryInfo: {},
     markDate:''
    };
  },

  components: {},
  mounted() {
    this.getTodaySum();
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },

  methods: {
    getPreSum() {
      let date = new Date(this.markDate).getTime() - 24 * 60 * 60 * 1000;
      date = formatTime(new Date(date));
      this.form = {
        startTime: date,
        endTime: date
      };
       this.markDate = date;
      this.getSummary();
    },
    getTodaySum() {
      let today = formatTime(new Date());
      this.form = {
        startTime: today,
        endTime: today
      };
      this.markDate = today;
      this.getSummary();
    },
    getNextSum() {
      let date = new Date(this.markDate).getTime() + 24 * 60 * 60 * 1000;
      date = formatTime(new Date(date));
      this.form = {
        startTime: date,
        endTime: date
      };
      this.markDate = date;
      this.getSummary();
    },
    resetAll() {
      //清空重置
      this.getTodaySum();
    },
    getSummary() {
      const _this = this;
      _this.$store
        .dispatch("ACCOUNT/" + types.ACCOUNT_DATA_INFO, {
          onlyId: _this.custId,
          roleCode: "ent",
          ..._this.form
        })
        .then(res => {
          _this.summaryInfo = res.resultMsg;
        });
    }
  }
};
</script>

<style lang='stylus' scoped>
.line {
  text-align: center;
}
.sum {
  border-radius: 3px;
  -webkit-box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
  box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
  .el-col {
    padding-top: 1.2%;
    padding-bottom: 1%;
    padding-left: 2%;
  }
  .grid-content {
    border-right: 1px solid #efefef;
    .name {
      color: #666;
      display: block;
    }
    .num {
      font-size: 28px;
      line-height: 1.8em;
    }
  }
}
</style>
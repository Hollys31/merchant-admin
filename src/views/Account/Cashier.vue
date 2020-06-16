<!--  -->
<template>
  <div class="cashier normal">
    <div class="heading">收银员管理</div>
    <el-form ref="searchForm" :model="form" label-width="120px" :inline="true">
      <el-form-item label="收银员手机号">
        <el-input v-model.trim="searchForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="退款权限">
        <el-select v-model="searchForm.refund" placeholder="请选择">
          <el-option
            v-for="item in refuntOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchCashier">查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addCashier">添加收银员</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" style="width: 100%;" stripe v-loading="$store.state.loading">
      <el-table-column prop="cashierMobile" label="收银员手机号"></el-table-column>
      <el-table-column prop="cashierName" label="收银员姓名"></el-table-column>
      <el-table-column prop="shopName" label="关联门店"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status==0?'不启用':'启用'}}</template>
      </el-table-column>

      <el-table-column prop="refundAuth" label="退款权限">
        <template slot-scope="scope">{{scope.row.refundAuth==0?'无':'有'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="cashierDele(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="cashierEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑收银员" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="手机号" prop="cashierMobile">
          <el-input v-model="form.cashierMobile"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="cashierName">
          <el-input v-model="form.cashierName"></el-input>
        </el-form-item>
        <el-form-item label="关联门店" prop="shopId">
          <el-select v-model="form.shopId" placeholder="请选择门店">
            <el-option
              v-for="item in shopData"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收银员状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!--    <el-form-item label="是否有退款权限" prop="refundAuth">
          <el-select v-model="form.refundAuth">
            <el-option label="无" value="0"></el-option>
            <el-option label="有" value="1"></el-option>
          </el-select>
        </el-form-item>-->
        <el-form-item label="退款权限">
          <el-radio-group v-model="refundLimit" @change="changeRefundLimits">
            <el-radio :label="0">全不启用</el-radio>
            <el-radio :label="1">全启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="PC端退款">
          <el-radio-group v-model="form.webRefundAuth" @change="changeSingleLimit">
            <el-radio :label="0">不启用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="设备退款">
          <el-radio-group v-model="form.machineRefundAuth" @change="changeSingleLimit">
            <el-radio :label="0">不启用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="移动端退款">
          <el-radio-group v-model="form.officialRefundAuth" @change="changeSingleLimit">
            <el-radio :label="0">不启用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="cashierEditSubmit('form')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- :before-close="handleClose" -->
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :current-page="currPage"
      :page-size="10"
      :total="totalPage*10"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    ></el-pagination>
  </div>
</template>

<script>
import { throttle } from "@/lib/util.js";
import { cashierRules } from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      refundLimit: null,
      shopData: [],
      rowData: {},
      searchForm: {
        phone: "",
        refund: null
      },
      refuntOptions: [
        { label: "无", value: 0 },
        { label: "有", value: 1 }
      ],
      listData: [],
      totalPage: 1,
      currPage: 1,
      dialogVisible: false,
      form: {
        cashierMobile: "",
        cashierName: "",
        shopId: "",
        status: "",
        refundAuth: 0,
        webRefundAuth: 0, //网站退款权限
        machineRefundAuth: 0, //机器退款权限
        appRefundAuth: 0, //pp退款权限
        officialRefundAuth: 0, //公众号退款权限
        miniRefundAuth: 0 //小程序退款权限
      },
      rules: cashierRules,
      currRowObj: {}, //选择行信息
      chargeStatus: ""
    };
  },

  components: {},
  mounted() {
    this.getCashierList();
    this.getShopList();
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  methods: {
    getShopList() {
      //门店类列表数据请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_LIST, {
          mchId: _this.custId,
          gotoPage: 1,
          pageSize: 100
        })
        .then(res => {
          if (res.resultCode == "1" && res.resultMsg.list) {
            _this.shopData = res.resultMsg.list;
          }
        });
    },
    handleCurrentChange(val) {
      this.currPage = val;
      this.getCashierList();
    },
    searchCashier() {
      //查询收银员
      this.getCashierList();
    },
    addCashier() {
      //添加收银员
      this.$router.push({ name: "addCashier" });
    },
    cashierEdit(param) {
      //编辑收银员
      console.log(param.webRefundAuth);
      this.form.cashierMobile = param.cashierMobile;
      this.form.cashierName = param.cashierName;
      this.form.shopId = param.shopId;
      this.form.status = param.status;
      this.form.webRefundAuth = parseInt(param.webRefundAuth) || 0; //网站退款权限
      this.form.machineRefundAuth = parseInt(param.machineRefundAuth) || 0; //机器退款权限
      this.form.officialRefundAuth = parseInt(param.officialRefundAuth) || 0; //公众号退款权限
      this.currRowObj = param;
      this.dialogVisible = true;
      if (
        this.form.webRefundAuth === this.form.machineRefundAuth &&
        this.form.webRefundAuth === this.form.officialRefundAuth &&
        this.form.machineRefundAuth === this.form.officialRefundAuth
      ) {
        this.refundLimit = this.form.webRefundAuth;
      }
    },
    cashierEditSubmit(formName) {
      //提交已编辑的收银员信息
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.cashierEditRequest();
        } else {
          return false;
        }
      });
    },
    cashierDele(param) {
      //删除收银员
      const _this = this;
      this.form = {
        cashierMobile: param.cashierMobile,
        cashierName: param.cashierName,
        shopId: param.shopId,
        refundAuth: param.refundAuth,
        status: 2
      };
      this.currRowObj = param;
      this.chargeStatus = 0;
      this.$confirm("请确认是否删除该收银员?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.cashierEditRequest();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    cashierEditRequest: throttle(function() {
      //编辑收银员信息请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_CASHIER_EDIT, {
          ..._this.form,
          onlyId: _this.currRowObj.onlyId,
          oldShopId: _this.currRowObj.shopId,
          oldMobile: _this.currRowObj.cashierMobile
        })
        .then(res => {
          _this.dialogVisible = false;
          _this.$message({
            message: "操作成功",
            type: "success"
          });
          _this.getCashierList();
        });
    }, 2000),
    getCashierList() {
      //请求数据列表
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_CASHIER_LIST, {
          merchantCustId: _this.custId,
          cashierMobile: this.form.phone,
          refundAuth: this.form.refund,
          gotoPage: _this.currPage,
          pageSize: 10
        })
        .then(res => {
          if (res.resultMsg && res.resultMsg.list) {
            _this.listData = res.resultMsg.list;
            _this.totalPage = res.resultMsg.totalRecords;
            _this.currPage = res.resultMsg.gotoPage;
          }
        });
    },
    changeRefundLimits(e) {
      //全选
      this.form.webRefundAuth = e;
      this.form.machineRefundAuth = e;
      this.form.officialRefundAuth = e;
    },
    changeSingleLimit(e) {
      if (
        this.form.webRefundAuth != this.form.machineRefundAuth ||
        this.form.webRefundAuth != this.form.officialRefundAuth ||
        this.form.machineRefundAuth != this.form.officialRefundAuth
      ) {
        this.refundLimit = "";
      } else {
        if (
          this.form.webRefundAuth == e &&
          this.form.machineRefundAuth == e &&
          this.form.officialRefundAuth == e
        ) {
          this.refundLimit = e;
        }
      }
    }
  }
};
</script>
<style lang='stylus' scoped></style>
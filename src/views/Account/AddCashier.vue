<template>
  <div class="normal">
    <div class="heading">新增收银员</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="手机号" prop="cashierMobile">
        <el-input v-model.number="form.cashierMobile"></el-input>
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

     <!--  <el-form-item label="是否有退款权限" prop="refundAuth">
        <el-select v-model="form.refundAuth">
          <el-option label="无" value="0"></el-option>
          <el-option label="有" value="1"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="登陆密码" prop="loginPw">
        <el-input v-model="form.loginPw"></el-input>
      </el-form-item>
      <el-form-item label="退款密码" prop="refundPw">
        <el-input v-model="form.refundPw"></el-input>
      </el-form-item>
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
        <el-button type="primary" @click="onSubmit('form')">添加收银员</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import { cashierRules } from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      refundLimit: 0,
      form: {
        cashierMobile: "",
        cashierName: "",
        shopId: "",
        refundAuth:0,
        loginPw: "123456",
        refundPw: "123456",
        webRefundAuth: 0,
        machineRefundAuth: 0,
        appRefundAuth: 0,
        officialRefundAuth: 0,
        miniRefundAuth: 0
      },
      shopData: [],
      rules: cashierRules
    };
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  mounted() {
    this.getShopList();
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
    addCashierRequest: throttle(function() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_CASHIER_ADD, {
          ..._this.form,
          merchantCustId: _this.custId,
          status: 1
        })
        .then(res => {
          _this.$message({
            message: "添加收银员成功",
            type: "success"
          });
          _this.$router.push({ name: "cashier" });
        });
    }, 2000),
    onSubmit(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("请确认添加收银员信息?", "温馨提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.addCashierRequest();
            })
            .catch(() => {});
        } else {
          return false;
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
      if (this.form.webRefundAuth != this.form.machineRefundAuth ||this.form.webRefundAuth != this.form.officialRefundAuth ||this.form.machineRefundAuth != this.form.officialRefundAuth) {
        this.refundLimit = "";
      } else {
        if (this.form.webRefundAuth == e&&this.form.machineRefundAuth==e&&this.form.officialRefundAuth==e) {
          this.refundLimit = e;
        }
      }
    }
  }
};
</script>

<style scoped>
form {
  max-width: 800px;
  margin-top: 40px;
}
</style>>

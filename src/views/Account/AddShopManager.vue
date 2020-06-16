<template>
  <div class="normal">
    <div class="heading">新增店长</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="店长手机号" prop="shopmanagerMobile">
        <el-input v-model.number="form.shopmanagerMobile"></el-input>
      </el-form-item>
      <el-form-item label="店长姓名" prop="shopmanagerName">
        <el-input v-model="form.shopmanagerName"></el-input>
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
      <el-form-item label="店长状态" prop="status">
        <el-select v-model="form.status">
          <el-option label="不启用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否有退款权限" prop="refundAuth">
        <el-select v-model="form.refundAuth">
          <el-option label="无" value="0"></el-option>
          <el-option label="有" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登陆密码" prop="loginPw">
        <el-input v-model="form.loginPw"></el-input>
      </el-form-item>
      <el-form-item label="退款密码" prop="refundPw">
        <el-input v-model="form.refundPw"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">添加店长</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import {shopManagerRules} from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      form: {
        cashierMobile: "",
        cashierName: "",
        shopId: "",
        refundAuth: "",
        loginPw: "123456",
        refundPw: "123456"
      },
      shopData: [],
      rules:shopManagerRules
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
          ..._this.form
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
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_MANAGER_ADD, {
          ..._this.form,
          custId: _this.custId
        })
        .then(res => {
          _this.$message({
            message: "添加店长成功",
            type: "success"
          });
          _this.$router.push({ name: "shopManager" });
        });
    }, 2000),
    onSubmit(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("请确认添加店长信息?", "温馨提示", {
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

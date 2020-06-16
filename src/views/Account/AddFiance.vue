<template>
  <div class="normal">
    <div class="heading">新增财务</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <el-form-item label="财务手机号" prop="financeMobile">
        <el-input v-model.number="form.financeMobile"></el-input>
      </el-form-item>
      <el-form-item label="财务姓名" prop="financeName">
        <el-input v-model="form.financeName"></el-input>
      </el-form-item>
      <el-form-item label="店长状态" prop="status">
        <el-select v-model="form.status">
          <el-option label="不启用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="登陆密码" prop="loginPw">
        <el-input v-model="form.loginPw"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">添加财务</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import {fianceRules} from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default{
  data() {
    return {
      form: {
        financeMobile: "",
        financeName: "",
        status: "",
        loginPw: "123456",
      },
      shopData: [],
      rules: fianceRules
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
    addFianceRequest: throttle(function() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_FIANCE_ADD, {
          ..._this.form,
          custId: _this.custId
        })
        .then(res => {
          _this.$message({
            message: "添加财务成功",
            type: "success"
          });
          _this.$router.push({ name: "fiance" });
        });
    }, 2000),
    onSubmit(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("请确认添加财务信息?", "温馨提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.addFianceRequest();
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

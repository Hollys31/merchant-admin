<template>
  <div class="normal">
    <div class="heading">新增门店</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="120px">
      <!--   <el-form-item label="门店编号" prop="shopNo">
        <el-input v-model="form.shopNo"></el-input>
      </el-form-item>-->
      <el-form-item label="门店名称" prop="shopName">
        <el-input v-model="form.shopName"></el-input>
      </el-form-item>

      <el-form-item label="门店地址" prop="addr">
        <el-input v-model="form.addr"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="contact">
        <el-input v-model.number="form.contact"></el-input>
      </el-form-item>
      <el-form-item label="门店状态" prop="shopStatus">
        <el-select v-model="form.shopStatus">
          <el-option label="不启用" value="0"></el-option>
          <el-option label="启用" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">添加门店</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import {shopRules} from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      form: {
        shopmanagerMobile: "",
        shopmanagerName: "",
        refundAuth: "",
        /*      shopNo: "", */
        addr: "",
        contact: "",
        shopName: "",
        status: "",
        shopStatus: "1" //默认启用
      },
      rules: shopRules
    };
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  methods: {
    onSubmit(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$confirm("请确认添加店铺?", "温馨提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              _this.addShopRequest();
            })
            .catch(() => {});
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addShopRequest: throttle(function() {
      //添加店铺
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_ADD, {
          ..._this.form,
          custId: _this.custId
        })
        .then(res => {
          _this.$message({
            message: "添加店铺成功",
            type: "success"
          });
          _this.$router.push({ name: "shop" });
        });
    },2000),
  }
};
</script>


<style scoped>
form {
  max-width: 800px;
  margin-top: 40px;
}
</style>>
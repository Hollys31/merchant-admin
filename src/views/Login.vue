<template>
  <div class="login">
    <div class="nav">
      <div class="main">
        <span>七分钱商户</span>
        <div class="r">
          <router-link to="/">七分钱首页</router-link>|
          <router-link to="/">帮助中心</router-link>
        </div>
      </div>
    </div>
    <img class="bg" src="@/assets/bg.jpg" />
    <el-form class="form" ref="form" :rules="rules" :model="form" label-width="0">
      <img class="logo" src="@/assets/logo.png" />
      <el-form-item prop="account">
        <el-input v-model="form.account" placeholder="请输入邮箱/手机号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <router-link to>立即注册</router-link>
          </el-col>
          <el-col :span="12" style="text-align:right">
            <router-link to="/forgetPassword">忘记密码？</router-link>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button class="btn" type="primary" @click="onSubmit('form')">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import ns from "@/store/constants/ns";
import { loginRules } from "@/lib/rules.js";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.LOGIN + "/";

export default {
  name: "Login",
  data() {
    return {
      form: {
        account: "",
        password: "",
        roleCode: "ent"
      },
      rules: loginRules
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.onSubmit("form"); // 登录方法名
        return false;
      }
    };
  },
  methods: {
    onSubmit: throttle(function(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.$store
            .dispatch(nameSpaced + types.LOGIN_POST_IN, _this.form)
            .then(res => {
              if (parseFloat(res.resultCode) == 0) {
                _this.$message.error(res.resultMsg);
              } else {
                _this.$store.commit(types.APP_SET_USER_INFO, res.data);
                localStorage.setItem("my_token", res.data.token);
                _this.$router.push({ name: "account" });
              }
            });
        } else {
          return false;
        }
      });
    }, 2000)
  }
};
</script>

<style lang="stylus" scoped>
.login {
  height: 100vh;
  overflow: hidden;

  .nav {
    width: 100%;
    padding: 10px;
    min-width: 1280px;
    position: fixed;
    z-index: 9;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(26, 31, 44, 0.2);
    color: #fff;

    .main {
      width: 1280px;
      margin: 0 auto;
      display: flex;
    }

    span {
      width: 100px;
      color: #ecf1f4;
    }

    .r {
      flex: auto;
      text-align: right;

      a {
        color: #e6e8ee;
        margin: 0 8px;
      }
    }
  }

  .bg {
    position: fixed;
    width: 100%;
    height: auto;
    z-index: 1;
  }

  .form {
    width: 400px;
    padding: 20px 40px;
    background: rgba(0, 0, 0, 0.3);
    position: fixed;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-55%);
    border-radius: 5px;
    color: #fff;

    a {
      color: #fff;
    }

    .logo {
      display: block;
      width: 130px;
      margin: 20px auto;
    }

    .form-tit {
      height: 70px;
      line-height: 70px;
      font-size: 18px;
      text-align: center;
      color: #fff;
    }

    .el-input {
      width: 100% !important;
    }

    .btn {
      width: 254px;
      height: 40px;
      line-height: 40px;
      padding: 0;
      margin-left: 40px;
    }
  }

  .link {
    display: flex;

    a {
      flex: 1;
    }
  }
}
</style>

<!-- 忘记密码 -->
<template>
  <div class="forget normal">
    <the-nav></the-nav>
    <div class="main">
      <el-steps class="step" :space="200" :active="currStep-1" finish-status="success" align-center>
        <el-step title="输入账号"></el-step>
        <el-step title="进行安全验证"></el-step>
        <el-step title="设置新密码"></el-step>
        <el-step title="找回成功"></el-step>
      </el-steps>
      <el-form
        :model="accountForm"
        status-icon
        :rules="rules"
        ref="accountForm"
        label-width="100px"
        class="form"
        v-if="currStep==1"
      >
        <el-form-item label="账号" prop="mobile">
          <el-input v-model.number="accountForm.mobile" placeholder="请输入邮箱/手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证" prop="code">
          <slide-verify
            :l="42"
            :r="10"
            :w="310"
            :h="155"
            slider-text="向右滑动"
            @success="onSuccess"
            @fail="onFail"
            @refresh="onRefresh"
          ></slide-verify>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep('accountForm')">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="validForm"
        status-icon
        :rules="rules"
        ref="validForm"
        label-width="100px"
        class="form"
        v-if="currStep==2"
      >
        <el-form-item label="登录账号" prop="mobile">
          <el-col :span="15">
            <el-input v-model.number="validForm.mobile"></el-input>
          </el-col>
          <el-col :span="9">
            <el-button plain :disabled="sendBtnAble" @click="sendMessage">{{msg}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="验证码" prop="verifyCode">
          <el-input v-model.number="validForm.verifyCode" placeholder="请输入您的验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep('validForm')">下一步</el-button>
        </el-form-item>
      </el-form>
      <el-form
        :model="setPwdForm"
        status-icon
        :rules="rules"
        ref="setPwdForm"
        label-width="120px"
        class="form"
        v-if="currStep==3"
      >
        <el-form-item label="新登录密码" prop="loginNewPw">
          <el-input type="password" v-model="setPwdForm.loginNewPw" placeholder="请输入新登录密码"></el-input>
        </el-form-item>
        <el-form-item label="确认新登录密码" prop="reNewPw">
          <el-input type="password" v-model="setPwdForm.reNewPw" placeholder="请确认新登录密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep('setPwdForm')">下一步</el-button>
        </el-form-item>
      </el-form>
      <div class="success" v-if="currStep==4">
        <i class="el-icon-circle-check"></i>
        恭喜你，登录密码已经修改成功!
        <router-link class="toLogin" to="/login">开始登录</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {throttle,formatTel} from "@/lib/util.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.LOGIN + "/";
import theNav from "@/components/theNav";
export default {
  data() {
    return {
      currStep: 1,
      msg: "发送验证码",
      sendBtnAble: false,
      accountForm: {
        mobile: "",
        code: ""
      },
      validForm: {
        mobile: "",
        verifyCode: ""
      },
      setPwdForm: {
        loginNewPw: "",
        reNewPw: ""
      },
      rules: {
        mobile: [{ required: true, message: "请输入账号", trigger: "blur" }],
        code: [{ required: true, message: "请验证拼图", trigger: "change" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        loginNewPw: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ],
        reNewPw: [
          { required: true, message: "请输入确认新密码", trigger: "blur" }
        ]
      }
    };
  },

  components: { theNav },

  computed: {},

  methods: {
    onSuccess() {
      this.accountForm.code = "1";
    },
    onFail() {
      this.accountForm.code = "";
    },
    onRefresh() {
      this.accountForm.code = "";
    },
    cutDownTime(time) {
      //倒计时
      let timmer = null;
      const _this = this;
      if (time > 0) {
        _this.sendBtnAble = true;
        timmer = setTimeout(function() {
          time = time - 1;
          _this.msg = "重新发送(" + time + "s)";
          _this.cutDownTime(time);
        }, 1000);
      } else {
        _this.sendBtnAble = false;
        _this.msg = "发送验证码";
        clearTimeout(timmer);
      }
    },
    getPhoneAuth: throttle(function() {
      //是否存在该手机号
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.GET_PHONE_AUTH, {
          mobile: _this.accountForm.mobile,
          roleCode: "ent"
        })
        .then(res => {
          console.log(res);
          _this.validForm.mobile =
            "密码手机" + formatTel(_this.accountForm.mobile);
          _this.currStep = 2;
        });
    }, 2000),
    sendMessage: throttle(function() {
      //发送验证码
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.GET_MESSAGE_CODE, {
          mobile: _this.accountForm.mobile,
          roleCode: "ent",
          type: "SMSLOGIN"
        })
        .then(res => {
          _this.cutDownTime(60);
        });
    }, 2000),
    validCodeToNext: throttle(function() {
      //验证短信验证码
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.GET_MESSAGE_VALID, {
          mobile: _this.accountForm.mobile,
          roleCode: "ent",
          verifyCode: _this.validForm.verifyCode
        })
        .then(res => {
          _this.currStep = 3;
        });
    }, 2000),
    resetLoginPwd:throttle(function() {
      //重置密码
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.LOGIN_FORGER_PASSWORD, {
          mobile: _this.accountForm.mobile,
          loginNewPw: _this.setPwdForm.loginNewPw
        })
        .then(res => {
          console.log(res);
          _this.currStep = 4;
        });
    }, 2000),
    nextStep(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "accountForm") {
            _this.getPhoneAuth();
          }
          if (formName == "validForm") {
            _this.validCodeToNext();
          }
          if (formName == "setPwdForm") {
            if (_this.setPwdForm.loginNewPw == _this.setPwdForm.reNewPw) {
              this.resetLoginPwd();
            } else {
              _this.$message({
                message: "新登录密码与确认密码不一致！",
                type: "warning"
              });
            }
          }
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.forget {
  .main {
    width: 1400px;
    margin: 0 auto;
    background: #fff;
    padding: 60px 40px;
    min-height: 90vh;
    box-sizing: border-box;
    .step {
      width: 800px;
      margin: 50px auto;
      text-align: center;
    }
  }
  .form,
  .success {
    width: 400px;
    margin: 80px auto;
    button {
      width: 100%;
    }
  }
  .success {
    font-size: 26px;
    text-align: center;
    color: #666;
    line-height: 1.8em;
    .el-icon-circle-check {
      font-size: 100px;
      display: block;
      color: #09bb9a;
      margin-bottom: 15px;
    }
    .toLogin {
      display: block;
      width: 180px;
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
      color: #fff;
      margin: 30px auto;
      background: #09bb9a;
      font-size: 18px;
      background: -webkit-linear-gradient(
        left,
        to right,
        #06e4bb 0%,
        #24f3cd 80%,
        #0ae7bf 100%
      );
      background: linear-gradient(
        to right,
        #06e4bb 0%,
        #24f3cd 80%,
        #0ae7bf 100%
      );
    }
  }
}
</style>
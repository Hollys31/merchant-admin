<template>
  <div class="main normal">
    <el-steps class="step" :space="200" :active="currStep-1" finish-status="success" align-center>
      <el-step title="进行安全验证"></el-step>
      <el-step title="设置新密码"></el-step>
      <el-step title="找回成功"></el-step>
    </el-steps>
    <el-form
      :model="validForm"
      status-icon
      :rules="rules"
      ref="validForm"
      label-width="100px"
      class="form"
      v-if="currStep==1"
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
        <el-button type="primary" class="next" @click="nextStep('validForm')">下一步</el-button>
      </el-form-item>
    </el-form>
    <el-form
      :model="setPwdForm"
      status-icon
      :rules="rules"
      ref="setPwdForm"
      label-width="120px"
      class="form"
      v-if="currStep==2"
    >
      <el-form-item label="新支付密码" prop="payPwd">
        <el-input type="password" v-model="setPwdForm.payPwd" placeholder="请输入新支付密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新支付密码" prop="rePayPwd">
        <el-input type="password" v-model="setPwdForm.rePayPwd" placeholder="请确认新支付密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="next" @click="nextStep('setPwdForm')">下一步</el-button>
      </el-form-item>
    </el-form>
    <div class="success" v-if="currStep==3">
      <i class="el-icon-circle-check"></i>
      恭喜你，登录密码已经修改成功!
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
        mobile: ""
      },
      validForm: {
        mobile: "",
        verifyCode: ""
      },
      setPwdForm: {
        payPwd: "",
        rePayPwd: ""
      },
      rules: {
        mobile: [{ required: true, message: "请输入账号", trigger: "blur" }],
        code: [{ required: true, message: "请验证拼图", trigger: "change" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" }
        ],
        payPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        rePayPwd: [
          { required: true, message: "请输入确认新密码", trigger: "blur" }
        ]
      }
    };
  },

  components: { theNav },
  mounted() {
    this.accountForm.mobile = this.userInfo.account;
    this.validForm.mobile = "密码手机" + formatTel(this.userInfo.account);
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },

  methods: {
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
    sendMessage: throttle(function() {
      //发送验证码
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.GET_MESSAGE_CODE, {
          mobile: _this.accountForm.mobile,
          roleCode: "ent",
          type: "SMSTRADE"
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
          _this.currStep = 2;
        });
    }, 2000),
    resetPayPwd: throttle(function() {
      //设置新密码
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.PAY_FORGET_PASSWORD, {
          custId: _this.userInfo.id,
          payPw: _this.setPwdForm.payPwd
        })
        .then(res => {
          console.log(res);
          _this.currStep = 3;
        });
    }, 2000),
    nextStep(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "validForm") {
            _this.validCodeToNext();
          }
          if (formName == "setPwdForm") {
            if (_this.setPwdForm.payPwd == _this.setPwdForm.rePayPwd) {
              this.resetPayPwd();
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
.main {
  width: 900px;
  margin: 0 auto;
  background: #fff;
  padding: 10px 40px 60px;
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
  margin: 80px;
  .next {
    width: 120px;
    margin-left: 80px;
    margin-top: 40px;
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
</style>
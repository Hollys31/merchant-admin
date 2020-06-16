<!--  -->
<template>
  <div class="normal">
    <div class="heading">修改支付密码</div>
    <div class="tips">
      <div class="head">温馨提示</div>
      <div class="item">1.请确保登录密码与支付密码不同！</div>
      <div class="item">2.建议密码采用字母和数字混合，并且不短于6位。</div>
    </div>
    <el-form ref="form" :rules="rules" :model="form" label-width="150px">
      <el-form-item label="当前支付密码" prop="oldPwd">
        <el-input type="password" v-model="form.oldPwd"></el-input>
      </el-form-item>
      <el-form-item label="新的支付密码" prop="newPwd">
        <el-input type="password" v-model="form.newPwd"></el-input>
      </el-form-item>

      <el-form-item label="确认新的支付密码" prop="rePasword">
        <el-input type="password" v-model="form.rePasword"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">确认</el-button>
      </el-form-item>
    </el-form>
   <!--  <div class="heading">忘记支付密码</div>
    <div class="item">
      <i class="i el-icon-message mainColor"></i>
      <div class="text">
        <h3>通过“验证邮箱+验证银行卡信息”</h3>
        <p>如果您的150******@163.com邮箱还在正常使用，且记得账户绑定的银行卡号,请选择此方式</p>
      </div>
      <el-button type="primary">立即重置</el-button>
    </div>
    <div class="item">
      <i class="i el-icon-lock mainColor"></i>
      <div class="text">
        <h3>原密码验证</h3>
        <P>输入原密码，完成密码修改</P>
      </div>
      <el-button size type="primary">立即重置</el-button>
    </div> -->
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.LOGIN + "/";
export default {
  data() {
    return {
      form: {
        oldPwd: "",
        newPwd: "",
        rePasword: ""
      },
      rules: {
        oldPwd: [
          { required: true, message: "请输入当前支付密码", trigger: "blur" }
        ],
        newPwd: [
          { required: true, message: "请输入新的支付密码", trigger: "blur" }
        ],
        rePasword: [
          { required: true, message: "请输入确认新的支付密码", trigger: "blur" }
        ]
      }
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
          if (_this.form.newPwd == _this.form.rePasword) {
            _this.getAccountInfo();
          } else {
            _this.$message({
              message: "新密码与确认密码不一致！",
              type: "warning"
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getAccountInfo() {
      const _this = this;
      this.$alert("是否确认修改密码？", "温馨提示", {
        confirmButtonText: "确定",
        callback: action => {
          _this.$store
            .dispatch(nameSpaced + types.ACCOUNT_USER_PAYPWD, {
              custId: _this.custId,
              ..._this.form
            })
            .then(res => {
              _this.$message({
                message: "恭喜你，支付密码修改成功！",
                type: "success"
              });
              _this.$router.push({'name':'account'})
            });
        }
      });
    }
  }
};
</script>


<style lang='stylus' scoped>
.tips {
  box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
  padding: 20px;
  color: #666;
  margin-bottom: 40px;
  .head {
    line-height: 2em;
    font-weight: 600;
  }
  .item {
    color: #999;
  }
}
/* .item {
  display: flex;
  color: #999;
  padding: 20px;
  margin-top: 50px;
  box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);

  .i {
    width: 100px;
    font-size: 62px;
    font-weight: 300;
  }
  button {
    width: 80px;
    height: 40px;
    padding: 0;
    margin-top: 15px;
  }
  .text {
    flex: auto;
    h3 {
      line-height: 2em;
      color: #666;
    }
  }
} */
</style>
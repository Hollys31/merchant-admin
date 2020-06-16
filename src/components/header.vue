<!--  -->
<template>
  <div>
    <div class="header">
      <!--  <div class="top">
        登录
      </div>-->
      <div class="nav">
        <img src="@/assets/logo1.png" />
        <ul>
          <li>
            <router-link to="/index">首页</router-link>
          </li>
          <li>
            <router-link to="/join">诚聘英才</router-link>
          </li>
          <li>
            <router-link to="/contact">联系我们</router-link>
          </li>
          <li>
            <router-link to="/about">关于七分钱</router-link>
          </li>
          <li>
            <span v-if="!custId" @click="showLogin">登录</span>
            <router-link class="admin" to="/account" v-if="custId" >管理中心</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="white-box"></div>
    <el-dialog :close-on-click-modal="false" :visible.sync="dialogVisible" width="460px">
      <el-form class="hform" ref="form" :rules="rules" :model="form" label-width="0">
        <h3>七分钱商户登录</h3>
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
              <router-link  to="/forgetPassword">忘记密码？</router-link>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit('form')">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import util from "@/lib/util.js";
import ns from "@/store/constants/ns";
import { loginRules } from "@/lib/rules.js";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.LOGIN + "/";

export default {
  data() {
    return {
      form: {
        account: "",
        password: "",
        roleCode: "ent"
      },
      rules: loginRules,
      dialogVisible: false,
      currRoute: this.$route.name
    };
  },

  components: {},

  computed: {
    ...mapState({
      custId: state => state.userInfo.id||''
    })
  },

  mounted() {},

  methods: {
    showLogin() {
      this.dialogVisible = true;
    },
    onSubmit: util.throttle(function(formName) {
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
<style lang='stylus' scoped>
.hform {
  padding: 0 30px;

  h3 {
    height: 60px;
    line-height: 30px;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    color: #333;
  }

  a {
    color: #189efd;
  }

  button {
    width: 240px;
    height: 50px;
    line-height: 50px;
    margin-left: 70px;
    padding: 0;
    font-size: 16px;
  }
}

.white-box {
  height: 70px;
  background: #fff;
}

.header {
  width: 100%;
  min-width: 1280px;
  max-width: 1920px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background: #fff;

  .top {
    width: 100%;
    height: 40px;
    line-height: 40px;
    min-width: 1280px;
    max-width: 1920px;
    margin: 0 auto;
    padding: 0 30px;
    background: rgba(17, 17, 34, 1);
    color: #fcfcfc;
    display: flex;
    overflow: hidden;
    color: #333;

    a {
      color: #fcfcfc;

      &:hover {
        color: #fff;
      }
    }
  }

  .nav {
    padding: 15px 50px;
    display: flex;
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);

    img {
      width: 260px;
      height: 43px;
    }

    ul {
      flex: auto;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      height: 40px;
      line-height: 40px;

      li {
        width: 120px;
        font-size: 16px;
        height: 40px;
        line-height: 40px;
      }

      a {
        color: #666;
      }

      .active {
        color: #189efd;
      }
      span,.admin {
        color: #444;
        font-weight: 600;
        display: block;
        width: 100px;
        height: 30px;
        line-height: 30px;
        margin: 5px auto;
        border: 1px solid #ddd;
        text-align: center;
        border-radius: 6px;

        &:hover {
          cursor: pointer;
        }
      }
      .admin{
        font-weight:500;
      }
    }
  }
}

@media screen and (max-width: 1279px) {
  .header {
    position: absolute;
  }
}
</style>
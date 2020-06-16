<!-- 顶部导航 -->
<template>
  <div class="nav">
    <div class="logo">
      <img src="@/assets/logo.png" />
      <span>第三方电子支付平台</span>
    </div>
    <ul v-if="userInfo.name">
      <li>
        <router-link to="/index">首页</router-link>
      </li>

      <li>
        <router-link to="/account">我的账户</router-link>
      </li>
      <li>
        <router-link :to="{name:'contact',params:{currIdx:1}}">帮助中心</router-link>
      </li>
    </ul>
    <div class="login" v-if="!userInfo.name">
      <router-link to="/login">登陆</router-link>
    </div>
    <div class="user" v-if="userInfo.name">
      <!-- <span>
        <i class="el-icon-bell"></i>
      </span>-->
      <span>
        <i class="el-icon-user"></i>
        {{userInfo.name}}
      </span>
      <span class="logout" @click="loginOutEvent">
        <i class="el-icon-switch-button"></i> 安全退出
      </span>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.LOGIN + "/";
export default {
  data() {
    return {};
  },

  components: {},

  computed: {
    ...mapState({
      message:state=>state.message,
      messageChange: state => state.messageChange,
      userInfo: state => state.userInfo
    })
  },
  watch: {
    messageChange(newVal) {
      this.$message.error(this.message);
    }
  },

  created: function() {},
  methods: {
    loginOutEvent() {
      const _this = this;
      this.$confirm("请确认是否退出登陆?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.loginOut();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出登陆"
          });
        });
    },
    loginOut() {
      //退出登录
      const _this = this;
      this.$store
        .dispatch(nameSpaced + types.LOGIN_POST_OUT, {
          token: _this.userInfo.token || localStorage.getItem("my_token")
        })
        .then(res => {
          _this.$message({
            message: "成功退出登陆！",
            type: "success"
          });
          _this.$store.commit(types.APP_SET_USER_INFO, {});
          _this.$router.push({ name: "login" });
          sessionStorage.clear();
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.nav {
  width: 100%;
  height: 60px;
  line-height: 60px;
  min-width: 1280px;
  margin: 0 auto;
  padding: 0 30px;
  background: #171e49;
  color: #8b93a7;
  display: flex;
  overflow: hidden;
  a {
    color: #8b93a7;
    &:hover {
      color: #fff;
    }
  }
  .logo {
    color: #fff;
    img {
      width: 120px;
      height: auto;
      margin-right: 10px;
      margin-top: 10px;
      float: left;
    }
    span {
      font-size: 16px;
      padding-left: 10px;
      border-left: 1px solid #8b93a7;
    }
  }
  .login {
    flex: auto;
    text-align: right;
    font-size: 16px;
    padding-right: 100px;
    a {
      color: #fff;
    }
  }
  ul {
    display: flex;
    flex: auto;
    height: 60px;
    line-height: 60px;
    padding-left: 50px;
    li {
      width: 120px;
      height: 60px;
      line-height: 60px;
      padding: 0 2%;
      text-align: center;
      &:hover {
        background: #121838;
      }
    }
  }
  .logout:hover {
    cursor: pointer;
  }
  .user {
    width: 260px;
    i {
      margin: 0 3px;
      font-size: 18px;
      font-weight: bold;
    }
    span {
      margin: 0 10px;
    }
  }
}
</style>
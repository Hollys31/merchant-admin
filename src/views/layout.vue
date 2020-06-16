<!--  -->
<template>
  <div>
    <the-nav></the-nav>
    <div class="container">
      <side-menu></side-menu>
      <div class="content">
        <router-view />
      </div>
    </div>

    <footer>
      <div class="main">
        <div class="link">
          <router-link to="/about">关于七分钱</router-link>|
          <router-link :to="{name:'contact',params:{currIdx:1}}">帮助中心</router-link>|
          <router-link to="/join">诚聘英才</router-link>|
          <router-link to="/contact">联系我们</router-link>
        </div>
        <div class="copy-right">
          七分钱钱包（国银证保旗下支付平台）版权所有 2015-2017 粤ICP备15078231号使用七分钱前必读
          <router-link to="/sevenPayAgr">七分钱钱包协议</router-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const theNav = () => import("@/components/theNav");
const sideMenu = () => import("@/components/sideMenu");
export default {
  data() {
    return {};
  },

  components: { theNav, sideMenu },

  computed: {},

  methods: {}
};
</script>

<style lang='stylus' scoped>
footer {
  background: #fff;
  padding: 40px 0 20px;
  color: #999;
  text-align: center;
  line-height: 30px;

  a {
    color: #888;
  }
}
</style>
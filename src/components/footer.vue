<!--  -->
<template>
  <div class="footer-wrap">
    <footer>
      <ul class="link">
        <li>
          合作银行：
          <span>中国银行</span>
          <span>富民银行</span>
          <span>浦发银行</span>
          <span>光大银行</span>
          <span>华润银行</span>
          <span>中信银行</span>
        </li>
        <li>
          客服热线：&nbsp;&nbsp;0755-83026070&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;客服邮箱：
          <a>kefu@szgyzb.com</a>
        </li>
        <li>
          深圳市七分钱网络科技有限公司&nbsp;&nbsp;&nbsp;&nbsp;|
          <router-link to="/about">关于七分钱</router-link>|
          <router-link to="/join">诚聘英才</router-link>|
          <router-link to="/contact">联系我们</router-link>|
          <a href="https://www.qifenqian.com/open/openCenter.do">开放平台</a>
        </li>
        <li>
          七分钱（国银证保旗下支付平台）版权所有 2015-2018
          <a
            href="http://beian.miit.gov.cn"
            target="_blank"
          >粤ICP备15078231号</a> 七分钱协议
        </li>
      </ul>
      <ul class="code">
        <li class="bg-code-01">七分钱公众号</li>
        <li class="bg-code-02">七分钱APP下载</li>
        <li class="bg-code-03">七分钱头条号</li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {}
};
</script>
<style lang='stylus' scoped>
.footer-wrap {
  background: #fff;
}

footer {
  height: 240px;
  width: 1220px;
  margin: 0 auto;
  padding: 40px 0;
  color: #999;
  font-size: 14px;
  display: flex;
  background: #fff;

  a {
    color: #999;
    margin: 0 8px;
  }

  .link {
    flex: 1;

    li {
      height: 50px;
      line-height: 50px;

      span {
        margin: 0 8px;
      }
    }
  }

  .code {
    display: flex;

    li {
      width: 130px;
      height: 130px;
      margin-left: 60px;
      padding-top: 130px;
      line-height: 3em;
      text-align: center;
    }

    .bg-code-01 {
      background: url('./../assets/pics_code_01.png') #efefef center no-repeat;
    }

    .bg-code-02 {
      background: url('./../assets/pics_code_02.png') #efefef center no-repeat;
    }

    .bg-code-03 {
      background: url('./../assets/pics_code_03.png') #efefef center no-repeat;
    }
  }
}
</style>
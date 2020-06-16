<!--  -->
<template>
  <div class="main official">
    <ul class="left">
      <li
        :class="{'active':currIdx==index}"
        @click="changeModel(index)"
        v-for="(item,index) in menu"
        :key="index"
      >{{item}}</li>
    </ul>
    <div class="right">
      <div v-show="currIdx==0" class="section section1">
        <div class="headline">公司简介</div>
        <h3>深圳市七分钱网络科技有限公司（简称“七分钱”）</h3>
        <p>致力于打造国际专业化的第三方支付平台，旨在为各类企业及个人提供安全、便捷和专业的 互联网支付解决方案。七分钱自创 立至今，凝聚了横跨产品、研发、互联网金融及部分细分行业的资深专家团队， 拥有国内一流的产品研发和创新能力，可以为 合作伙伴提供创新、便捷、稳定、专业的支付 解决方案和资金清算服务。七分钱控股母公司深圳市国银证保信息技术有限公司 ，在交通、医疗、快速供应链、社区电 商等领域多年的产业布局及大数据沉淀，势必为公司的稳健发展提供强力支撑，目前七分 钱 已经和中国银行、中国银联等银行与卡组织建立了良好的合作关系。</p>
       <!--  <video id="myVideo" class="video-js">
          <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
        </video> -->
      </div>
      <div v-show="currIdx==1" class="section section2">
        <div class="headline">企业文化</div>
        <dl>
          <dt>企业使命</dt>
          <dd>满足不断变化的支付需求，为各行业及持卡人提供安全便捷的互联网支付及金融解决方案。</dd>
          <dt>企业愿景</dt>
          <dd>成为中国领先的资金管理及支付服务的供应商。</dd>
          <dt>企业目标</dt>
          <dd>通过业务创新和服务创新，为用户提供多元化的支付服务产品、渠道和方式，满足不断变化的支付需求，为股东和社会创造更多的财富。</dd>
          <dt>企业的核心价值观</dt>
          <dd>【1】开放与共享 【2】诚实守信</dd>
          <dd>【3】客户至上 【4】完美主义</dd>
          <dd>【5】勇于创新 【6】以人为本</dd>
          <dd>【7】团队协作 【8】言出必行</dd>
          <dd>【9】人尽其才 【10】结果导向</dd>
        </dl>
      </div>
      <div v-show="currIdx==2" class="section section3">
        <div class="headline">合作伙伴</div>
        <img src="@/assets/bank1.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: ["公司简介", "企业文化", "合作伙伴"],
      currIdx: 0
    };
  },

  components: {},

  computed: {},

  mounted() {
   // this.initVideo();
  },

  methods: {
    changeModel(idx) {
      this.currIdx = idx;
    },
    initVideo() {
      //初始化视频方法
      let myPlayer = this.$video(myVideo, {
        //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
        controls: true,
        //自动播放属性,muted:静音播放
        autoplay: "muted",
        //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
        preload: "auto",
        //设置视频播放器的显示宽度（以像素为单位）
        width: "800px",
        //设置视频播放器的显示高度（以像素为单位）
        height: "400px"
      });
    }
  }
};
</script>
<style lang="stylus">
.section {
  color: #999;
  font-size: 14px;
}

.section1 {
    #myVideo{
        margin :20px auto;
    }
  h3 {
    line-height: 30px;
    font-weight: 500;
    font-size: 16px;
    color: #333;
  }

  p {
    font-size: 14px;
    line-height: 28px;
  }
}

.section2 {
  dt {
    color: #333;
    margin-top: 20px;
    line-height: 30px;
  }

  dd {
    line-height: 28px;
  }
}

.section3 {
  text-align: center;
}
</style>
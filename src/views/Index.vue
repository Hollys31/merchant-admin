<!--  -->
<template>
  <div class="index">
    <!-- 轮播 -->
    <el-carousel class="carousel" height="100%">
      <el-carousel-item>
        <img src="@/assets/pics_01.jpg" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="@/assets/pics_02.jpg" />
      </el-carousel-item>
    </el-carousel>
    <div class="main">
      <h3>核心产品</h3>
      <div class="section">
        <div class="tab">
          <div
            v-for="(item,index) in goodsTabBar"
            :key="index"
            class="item"
            :class="{'active':currTabbarIdx==index}"
            @click="changeGoodsTabbar(index)"
          >{{item}}</div>
        </div>
        <div class="product" v-show="currTabbarIdx==0">
          <div class="img-box">
            <img src="@/assets/pics_pos_01.jpg" />
          </div>
          <div class="detail">
            <div class="stit">七分钱收银台</div>
            <p>商家收银台输入收款金额，使用扫码枪或小白盒扫描消费者的二维码完成收款，支持微信、七分钱、支付宝二维码收款，不找零不付现、方便快捷。</p>
            <ul class="bg_pos_01">
              <li>一步到位</li>
              <li>不设限额</li>
              <li>功能齐全</li>
              <li>安全可靠</li>
            </ul>
          </div>
        </div>
        <div class="product" v-show="currTabbarIdx==1">
          <div class="img-box">
            <img src="@/assets/pics_pos_03.jpg" />
          </div>
          <div class="detail">
            <div class="stit">QR65收银</div>
            <p>QR65集时尚与商务感于一体，是一款便捷的扫码收单设备，支持扫描用户动态收款码。支持GPRS和WiFi多种网络环境，同时还配备有语音提示等功能，操作便捷，扫码精准，快速。</p>
            <ul class="bg_pos_02">
              <li>扫描快准</li>
              <li>操作便捷</li>
              <li>声光提示</li>
              <li>移动支付</li>
            </ul>
          </div>
        </div>
        <div class="product" v-show="currTabbarIdx==2">
          <div class="img-box">
            <img src="@/assets/pics_pos_02.jpg" />
          </div>
          <div class="detail">
            <div class="stit">智能POS</div>
            <p>全智能高清触屏。支持磁条卡、IC卡、非接/NFC等多种支付方式内置专业扫码模块，前后双摄像头配置，轻松实现微信支付、支付宝支付等二维码支付。支持4G全网通、Wi-Fi、蓝牙等多种网络环境随时随地完成交易。</p>
            <ul class="bg_pos_03">
              <li>数据报表</li>
              <li>进销存</li>
              <li>功能齐全</li>
              <li>安全可靠</li>
            </ul>
          </div>
        </div>
        <div class="product" v-show="currTabbarIdx==3">
          <div class="img-box">
            <img src="@/assets/pics_pos_04.jpg" />
          </div>
          <div class="detail">
            <div class="stit">传统POS</div>
            <p>24寸彩屏，炫彩外观磨砂质感，按键手感卓越；支持IC卡，磁条卡，可选配非接，蓝牙/WIFI，可选电子签名。</p>
            <ul class="bg_pos_04">
              <li>数据报表</li>
              <li>小巧便捷</li>
              <li>功能齐全</li>
              <li>安全可靠</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="section section2">
      <h3>产品优势</h3>
      <div class="main">
        <div class="item">
          <div class="ptit">安全保障</div>
          <p>七分钱拥有强大的技术和风控团队，以及主流银行进行资金管控确保系统和资金的安全和稳定。</p>
          <div class="num">01</div>
        </div>
        <div class="item">
          <div class="ptit">通道稳定</div>
          <p>接入数家主流银行，提供接口和技术支持，通道稳定，覆盖广，费率低。</p>
          <div class="num">02</div>
        </div>
        <div class="item">
          <div class="ptit">产品多样</div>
          <p>平台拥有扫码支付、公众号支付、APP支付、H5支付网关支付多样的支付产品供商家选择。</p>
          <div class="num">03</div>
        </div>
        <div class="item">
          <div class="ptit">接入便捷</div>
          <p>提供标准的产品接入文档接入方便快捷。</p>
          <div class="num">04</div>
        </div>
      </div>
    </div>
    <h3>服务行业</h3>
    <div class="section section3">
      <div class="main">
        <div class="item bg-trade-01">酒店</div>
        <div class="item bg-trade-02">电商</div>
        <div class="item bg-trade-03">餐饮</div>
        <div class="item bg-trade-04">教育</div>
        <div class="item bg-trade-05">医疗</div>
        <div class="item bg-trade-06">金融</div>
        <div class="item bg-trade-07">游戏</div>
        <div class="item bg-trade-08">支付不止于此</div>
      </div>
    </div>

    <div class="section section4">
      <h3>合作伙伴</h3>
      <div class="main">
        <img src="@/assets/bank.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currTabbarIdx: 0,
      goodsTabBar: ["pc收银台", "QR65收银", "智能POS", "传统POS"]
    };
  },

  components: {},

  computed: {},

  mounted() {
   
  },

  methods: {
    changeGoodsTabbar(e) {
      //
      this.currTabbarIdx = e;
    }
  }
};
</script>
<style lang='stylus' scoped>
.index {
  background: #fff;
}

.carousel {
  width: 100%;
  min-width: 1280px;
  margin: 0 auto;
  max-width: 1920px;
  overflow: hidden;
  height: 640px;

  img {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
  }
}

.index {
  h3 {
    font-size: 40px;
    font-family: 'Microsoft Yahei';
    font-weight: 500;
    text-align: center;
    position: relative;
    padding: 20px 0;
    margin-top: 20px;

    &:after {
      content: '';
      width: 60px;
      height: 4px;
      background: #189efd;
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

.section {
  background: #fff;
  width: 100%;
  min-width: 1280px;
  margin: 0 auto;

  .stit {
    font-size: 24px;
    color: #189efd;
    height: 60px;
    line-height: 60px;
    position: relative;

    &:after {
      content: '';
      width: 34px;
      height: 3px;
      background: #189efd;
      position: absolute;
      bottom: 3px;
      left: 0;
    }
  }

  .detail {
    font-size: 18px;
    color: #999;
    height: 160px;
    margin-top: 20px;
    line-height: 34px;

    p {
      width: 500px;
    }

    ul {
      display: flex;
      width: 80%;
      margin: 10px 0;
      padding-top: 80px;

      li {
        flex: 1;
        text-align: center;
        font-size: 16px;
        color: #189efd;
      }
    }
  }

  .bg_pos_01 {
    background: url('./../assets/pics_pos_04.png') center no-repeat;
  }

  .bg_pos_02 {
    background: url('./../assets/pics_pos_01.png') center no-repeat;
  }

  .bg_pos_03 {
    background: url('./../assets/pics_pos_02.png') center no-repeat;
  }

  .bg_pos_04 {
    background: url('./../assets/pics_pos_03.png') center no-repeat;
  }
}

.tab {
  width: 700px;
  display: flex;
  height: 46px;
  line-height: 46px;
  margin: 20px auto 10px;
  font-size: 18px;

  .item {
    width: 190px;
    height: 46px;
    line-height: 46px;
    color: #a0a0a0;
    background: #f1f1f1;
    border-radius: 4px;
    margin: 0 20px;
    text-align: center;

    &:hover {
      cursor: pointer;
    }
  }

  .active {
    background: #189efd;
    color: #fff;
  }
}

.product {
  display: flex;
  padding: 50px 0;

  img {
    transition: all 0.5s;

    &:hover {
      transform: scale(1.06);
    }
  }

  .img-box {
    text-align: center;
  }

  &>div {
    flex: 1;
  }
}

.section2 {
  background: #f8fafb;
  padding: 20px 0;

  .main {
    display: flex;
    padding-left: 30px;
  }

  .item {
    margin: 20px 22px;
    width: 260px;
    height: 310px;
    padding: 30px;
    line-height: 30px;
    color: #999;
    font-size: 16px;
    text-align: center;
    border: 1px solid #eee;
    box-shadow: 0px 5px 15px 0px #eee;
    overflow: hidden;
    position: relative;
    background: #fff;

    .num {
      width: 100%;
      position: absolute;
      bottom: 4px;
      text-align: center;
      font-size: 140px;
      color: #edf7ff;
      font-weight: bold;
    }

    .ptit {
      font-size: 22px;
      color: #2b2b2b;
      line-height: 70px;
    }
  }
}

.section3 {
  .main {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 0 130px;
    box-sizing: border-box;
    margin: 20px auto;

    .item {
      width: 220px;
      height: 220px;
      font-size: 30px;
      color: #fff;
      text-align: center;
      line-height: 220px;
      margin: 0 15px 40px;
      transition: all 0.5s;

      &:hover {
        transform: scale(1.1);
      }
    }

    .bg-trade-01 {
      background: url('./../assets/pics_trade_01.jpg') #ccc center no-repeat;
    }

    .bg-trade-02 {
      background: url('./../assets/pics_trade_02.jpg') #ccc center no-repeat;
    }

    .bg-trade-03 {
      background: url('./../assets/pics_trade_03.jpg') #ccc center no-repeat;
    }

    .bg-trade-04 {
      background: url('./../assets/pics_trade_04.jpg') #ccc center no-repeat;
    }

    .bg-trade-05 {
      background: url('./../assets/pics_trade_05.jpg') #ccc center no-repeat;
    }

    .bg-trade-06 {
      background: url('./../assets/pics_trade_06.jpg') #ccc center no-repeat;
    }

    .bg-trade-07 {
      background: url('./../assets/pics_trade_07.jpg') #ccc center no-repeat;
    }

    .bg-trade-08 {
      color: #666;
      font-size: 22px;
      line-height: 280px;
      background: url('./../assets/pics_trade_08.png') #f1f1f1 center 50px no-repeat;
    }
  }
}

.section4 {
  background: #f8fafb;
  text-align: center;

  .main {
    padding: 30px 0;
  }
}
</style>
<!--  -->
<template>
  <div class="normal">
    <div class="heading">应用授权</div>
    <div class="detail">
      <div class="code" id="qrcode" ref="qrcode"></div>
      <div class="tips mainColor">直接扫描二维码或者访问下面的链接进行授权</div>

      <div class="link">{{info.path}}</div>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
import QRCode from "qrcodejs2";
const nameSpaced = ns.APPLICATION_LICENSE + "/";
export default {
  data() {
    return {
      info: {}
    };
  },

  components: {},
  mounted() {
    this.getApplicationInfo();
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },

  methods: {
    qrcode(path) {
      let qrcode = new QRCode("qrcode", {
        width: 200, // 二维码宽度，单位像素
        height: 200, // 二维码高度，单位像素
        text: path // 生成二维码的链接
      });
    },
    getApplicationInfo() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.APPLICATION_LICENSE, {
          custId: _this.custId
        })
        .then(res => {
          if (res.data) {
            _this.info = res.data;
            if (res.data&&res.data.path) {
              _this.qrcode(res.data.path);
            }
          }
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.detail {
  padding-top: 20px;
  text-align: center;
  .code {
    width: 240px;
    margin: 0 auto;
  }
  .tips {
    height: 50px;
    line-height: 50px;
  }
  .link {
    width: 500px;
    padding: 20px;
    word-break: break-all;
    word-wrap: break-word;
    margin: 0 auto;
    text-align: left;
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
    background: #fff;
  }
}
</style>
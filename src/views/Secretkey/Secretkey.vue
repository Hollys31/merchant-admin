<!--  -->
<template>
  <div class="normal">
    <div class="heading">密钥管理</div>
    <div class="detail">
      <div class="stit">商户名称</div>
      <div class="data mainColor name">{{userInfo.name}}</div>
      <div class="stit">商户密钥</div>
      <div class="data">{{secretkey}}</div>
      <div class="stit">上传/更新商户密钥</div>
      <el-upload
        class="upload"
        :data="param"
        :limit="1"
        name="file"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :headers="headers"
        drag
        action="/enterprise/uploadMerchantKey.do"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">请上传密钥文件，且不超过1M</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.SECRETKEY + "/";
export default {
  data() {
    return {
      secretkey: "",
      param: {
        custId: "",
      },
      headers:{
        token:''
      }
    };
  },

  components: {},
  mounted() {
    this.param.custId=this.userInfo.id;
    this.headers.token=this.userInfo.token;
    this.getSecretkeyInfo();
  },
  computed: {
    ...mapState({
      userInfo: state => state.userInfo
    })
  },
  methods: {
    uploadSuccess(file) {
      this.$message({
          message: '商户密钥更新成功！',
          type: 'success'
        });
       this.getSecretkeyInfo();
    },
    uploadError(err) {
      console.log(err);
    },
    getSecretkeyInfo() {
      const _this = this;
      console.log(nameSpaced);
      _this.$store
        .dispatch(nameSpaced + types.SECRETKEY_INFO, {
          custId: _this.userInfo.id
        })
        .then(res => {
          _this.secretkey = res.data.control.merchantPubKey;
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.detail {
  padding: 20px;
  padding-bottom: 40px;
  background: rgb(246, 249, 253);
  .stit {
    height: 50px;
    line-height: 50px;
    color: #666;
    font-weight: 600;
  }
  .data {
    width: 500px;
    padding: 20px;
    word-break: break-all;
    word-wrap: break-word;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
    margin-left: 20px;
  }
  .name {
    font-size: 16px;
  }
  .upload {
    margin-left: 20px;
  }
}
</style>
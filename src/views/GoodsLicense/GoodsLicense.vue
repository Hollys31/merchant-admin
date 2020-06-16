<!-- 产品中心 -->
<template>
  <div class="normal">
    <div class="heading">产品中心</div>
    <div class="goods">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="name">{{item.productName}}</div>
        <div class="time">开通时间: {{item.createTime}}</div>
        <div class="data">费率: {{item.productRate}} %</div>
        <div v-if="item.sn" class="sn">SN: {{item.sn}}</div>
        <div>
          产品状态：
          <span>{{state[item.productStatus]}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { formatTime1 } from "@/lib/util.js";
import { mapState } from "vuex";
const nameSpaced = ns.GOODSCENTER + "/";
export default {
  data() {
    return {
      state: {
        "00": "开通成功",
        "09": "开通失败",
        "99": "开通异常"
      },
      listData: []
    };
  },

  components: {},

  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  mounted() {
    this.getGoogsInfo();
  },
  methods: {
    getGoogsInfo() {
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.GOODS_CENTER_INFO, {
          custId: _this.custId
        })
        .then(res => {
          console.log(res.data);
          if (res.data) {
            res.data = res.data.map(item => {
              item.createTime = formatTime1(new Date(item.createTime));
              return item;
            });
            _this.listData = res.data;
          }
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 360px;
    height: 160px;
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
    padding: 20px;
    color: #666;
    line-height: 1.8em;
    margin-bottom :25px;
    span {
      color: #333;
      font-weight: 600;
    }

    .name {
      font-size: 18px;
      height: 40px;
      line-height: 40px;
      overflow: hidden;
      color: #1677ff;
      font-weight: 600;
    }

    .time {
      font-size: 14px;
    }
  }
}
</style>
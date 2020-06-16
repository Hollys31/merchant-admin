<!--  -->
<template>
  <div class="management">
    <div class="statics">
      <el-form ref="form" :model="form" label-width="100px">
        <el-row :gutter="24">
          <el-form-item label="结算时间">
            <el-col :span="6">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.startDate"
              ></el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                v-model="form.endDate"
              ></el-date-picker>
            </el-col>
            <el-col :span="10">
              <el-form-item>
                <el-button size="small" type="primary">近7天</el-button>
                <el-button size="small" type="primary">近14天</el-button>
                <el-button size="small" type="primary" @click="searchList">查询</el-button>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
      <div id="myChart"></div>
    </div>
    <div class="rank">
      <div class="shop-rank rank_block">
        <div class="stit">门店排名</div>
        <ul>
          <li class="tab_title">
            <div class="name">名称</div>
            <div class="count active">
              笔数排名
              <i class="el-icon-sort"></i>
            </div>
            <div class="amount">
              金额排名
              <i class="el-icon-sort"></i>
            </div>
          </li>
          <li>
            <div class="name">
              <span>1</span>麻辣烫总店
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
          <li>
            <div class="name">
              <span>2</span>麻辣烫总店
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
          <li>
            <div class="name">
              <span>3</span>麻辣烫总店
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
          <li>
            <div class="name">
              <span>4</span>麻辣烫总店
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
        </ul>
      </div>
      <div class="cashier-rank rank_block">
        <div class="stit">收银员排名</div>
        <ul>
          <li class="tab_title">
            <div class="name">名称</div>
            <div class="count active">
              笔数排名
              <i class="el-icon-sort"></i>
            </div>
            <div class="amount">
              金额排名
              <i class="el-icon-sort"></i>
            </div>
          </li>
          <li>
            <div class="name">
              <span>1</span>欧阳消息
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
          <li>
            <div class="name">
              <span>2</span>欧阳消息
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
          <li>
            <div class="name">
              <span>3</span>欧阳消息
            </div>
            <div class="count">26000笔</div>
            <div class="amount">8054.32元</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce,formatTime } from "@/lib/util";
import options from "@/lib/echartOptions";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.MANAGEMENT + "/";
export default {
  data() {
    return {
      form: {
        startDate:null,
        endDate:null
      }
    };
  },

  components: {},

  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },

  mounted() {
    const _this = this;
    this.getTodayDate();
    this.getChartData();
    this.drawLine();
    
  },
  watch: {
   
  },
  methods: {
     getTodayDate() {
      //获取当天日期
      let today = formatTime(new Date());
      this.form.startDate = today;
      this.form.endDate = today;
    },
    getChartData(){//获取图表数据
      const _this=this;
       _this.$store
        .dispatch(nameSpaced + types.CHART_SUMMARY, {
          custId: _this.custId,
          ..._this.form
        })
        .then(res => {
          _this.listData=res.data;
        });
    },
    /*查询*/
    searchList() {
    this.getChartData();
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption(options);
    }
  }
};
</script>
<style lang='stylus' scoped>
.management {
  display: flex;
  background: #f6f9fd;

  .statics {
    background: #fff;
    flex: 1;
    padding: 20px 5px;
    overflow: hidden;
    text-align: center;
    min-height: 800px;

    form {
      display: inline-block;
      text-align: left;
    }

    #myChart {
      width: 800px;
      max-width: 800px;
      height: 640px;
      margin: 20px auto 0;
    }
  }

  .rank {
    width: 260px;
    margin-left: 50px;
    color: #606266;
    font-size: 12px;

    .stit {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #efefee;
      padding: 0 20px;
      font-size: 14px;
    }

    ul {
      padding: 0 5px;

      li {
        height: 40px;
        line-height: 40px;
        display: flex;
      }

      li:nth-child(2) {
        span {
          background: #e8d474;
          color: #fff;
        }
      }

      li:nth-child(3) {
        span {
          background: #dcdcdc;
          color: #fff;
        }
      }

      li:nth-child(4) {
        span {
          background: #d8a888;
          color: #fff;
        }
      }

      .tab_title {
        .name {
          padding-left: 20px;
        }

        .active {
          color: #409EFF;
        }
      }

      .name {
        width: 120px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        span {
          display: inline-block;
          width: 16px;
          height: 16px;
          line-height: 16px;
          border-radius: 50%;
          text-align: center;
          margin-right: 4px;
        }
      }

      .count {
        width: 70px;
      }

      .amount {
        flex: 1;
      }
    }

    .rank_block {
      background: #fff;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
    }
  }
}

@media screen and (max-width: 1480px) {
  .management {
    .statics {
      #myChart {
        width: 650px;
      }
    }

    .rank {
      margin-left: 30px;
    }
  }
}
</style>
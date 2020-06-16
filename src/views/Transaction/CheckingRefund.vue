<!--  -->
<template>
  <div class="normal">
    <el-form ref="form" :model="form" label-width="100px">
      <el-row :gutter="24">
        <el-col :span="6">
          <el-form-item label="商户订单号">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="七分钱订单号">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
           <el-form-item>
            <el-button size="small"  icon="el-icon-search"  type="primary">查询</el-button>
            <el-button size="small">清空</el-button>

          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-table :data="listData" style="width: 100%" stripe v-loading="$store.state.loading">
      <el-table-column prop="phone" label="商户退款编号"></el-table-column>
      <el-table-column prop="name" label="七分钱订单号"></el-table-column>
      <el-table-column prop="shop" label="商户订单号"></el-table-column>
      <el-table-column prop="permission" label="订单总金额"></el-table-column>、
      <el-table-column prop="permission" label="申请退款金额"></el-table-column>
      <el-table-column prop="permission" label="操作">
         <el-button size="small" type="primary">通过</el-button>
         <el-button size="small" type="danger">拒绝</el-button>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        state: "",
        date1: "",
        date2: "",
        shoop: ""
      },
      listData: [
        {
          phone: "18888888888",
          name: "Holly",
          shop: "港式奶茶南山店",
          permission: "是"
        },
        {
          phone: "18888888888",
          name: "Holly",
          shop: "港式奶茶南山店",
          permission: "是"
        },
        {
          phone: "18888888888",
          name: "Holly",
          shop: "港式奶茶南山店",
          permission: "是"
        }
      ]
    };
  },

  components: {},

  computed: {},

  methods: {}
};
</script>
<style lang='stylus' scoped>
.line {
  text-align: center;
}
</style>
<!--  -->
<template>
  <div>
    <div class="heading">批量详细记录<el-button class="back" @click="backPrePage" type="primary" size="small" icon="el-icon-back">返回汇总记录</el-button></div>
    <el-table :data="listData" style="width: 100%;" stripe>
      <el-table-column prop="phone" label="总批次号"></el-table-column>
      <el-table-column prop="name" label="批次号"></el-table-column>
      <el-table-column prop="shop" label="商户订单号"></el-table-column>
      <el-table-column prop="permission" label="收款人姓名"></el-table-column>
      <el-table-column prop="permission" label="收款人账号"></el-table-column>
      <el-table-column prop="permission" label="收款银行名称"></el-table-column>
      <el-table-column prop="permission" label="收款金额"></el-table-column>
      <el-table-column prop="permission" label="手续费"></el-table-column>
      <el-table-column prop="permission" label="创建时间"></el-table-column>
      <el-table-column prop="permission" label="交易状态"></el-table-column>
    </el-table>
    <el-pagination class="page" background layout="prev, pager, next" :total="1000"></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

  methods: {
     backPrePage(){
       this.$router.go(-1);
     }
  }
};
</script>
<style lang='stylus' scoped>
.back{
  float: right;
}

</style>
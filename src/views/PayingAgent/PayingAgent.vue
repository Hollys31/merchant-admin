<!--  -->
<template>
  <div>
    <div class="heading">批量汇总记录</div>
    <el-row :gutter="20" class="data">
      <el-col :span="16">
        <div class="money">
          可用余额
          <span class="mainColor">18.20</span>元
        </div>
      </el-col>
      <el-col :span="4">
        <el-button class="add" type="primary" icon="el-icon-plus" @click="addFileBtnEvent">新增</el-button>
      </el-col>
    </el-row>
    <el-table :data="listData" style="width: 100%;" stripe>
      <el-table-column prop="phone" label="交易号"></el-table-column>
      <el-table-column prop="name" label="笔数"></el-table-column>
      <el-table-column prop="shop" label="付款金额"></el-table-column>
      <el-table-column prop="permission" label="手续费"></el-table-column>
      <el-table-column prop="permission" label="成功笔数"></el-table-column>
      <el-table-column prop="permission" label="失败笔数"></el-table-column>
      <el-table-column prop="permission" label="失败金额"></el-table-column>
      <el-table-column prop="permission" label="交易状态"></el-table-column>
      <el-table-column prop="permission" label="创建时间"></el-table-column>
      <el-table-column label="详情">
        <router-link class="mainColor" :to="{name:'payingDetail'}">查看详情</router-link>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary">代付</el-button>
      </el-table-column>
    </el-table>
    <el-pagination class="page" background layout="prev, pager, next" :total="1000"></el-pagination>
    <el-dialog title="批量代付文件上传" :visible.sync="dialogVisible">
      <el-upload class="upload" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">文件大小不超过2M</div>
      </el-upload>
      <div class="charge">
        <el-button type="primary" icon="el-icon-upload">点击上传</el-button>
        <el-button type="primary" icon="el-icon-download">下载批量文件模板</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
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
      addFileBtnEvent(){
        this.dialogVisible=true;
      },
  }
};
</script>
<style lang='stylus' scoped>
.money {
  width: 260px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.2);
  margin-left: 30px;
  span {
    font-size: 30px;
  }
}
.add {
  margin-top: 20px;
}
.data {
  margin-top: 20px;
  margin-bottom: 40px;
}
.upload {
  text-align: center;
  width: 300px;
  margin: 0 auto 20px;
}
.charge{
    text-align: center;
}
</style>
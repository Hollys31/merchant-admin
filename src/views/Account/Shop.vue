<!--  -->
<template>
  <div class="cashier normal">
    <div class="heading">门店管理</div>
    <el-form ref="form" :model="form" label-width="120px" :inline="true">
      <el-form-item label="门店编号">
        <el-input v-model.trim="form.shopNo"></el-input>
      </el-form-item>
      <el-form-item label="门店名称">
        <el-input v-model.trim="form.shopName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchShop">查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addShop">添加门店</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" style="width: 100%;" stripe v-loading="$store.state.loading">
      <el-table-column prop="shopNo" label="门店编号"></el-table-column>
      <el-table-column prop="shopName" label="门店名称"></el-table-column>
      <el-table-column prop="addr" label="门店地址"></el-table-column>
      <el-table-column prop="contact" label="门店联系方式"></el-table-column>
      <el-table-column prop="status" label="门店状态">
        <template slot-scope="scope">{{scope.row.status==1?'启用':'不启用'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--  <el-button size="mini" type="danger" @click="forbiddenShop(scope.row)">删除</el-button> -->
          <el-button
            size="mini"
            type="primary"
            @click="shopInfoEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :current-page="currPage"
      :page-size="10"
      :total="totalPage*10"
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
    ></el-pagination>
    <el-dialog title="编辑门店信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="editForm" :rules="rules" :model="editForm" label-width="120px">
        <el-form-item label="门店编号" prop="shopNo">
          <el-input v-model="editForm.shopNo" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="门店名称" prop="shopName">
          <el-input v-model="editForm.shopName"></el-input>
        </el-form-item>
        <el-form-item label="门店地址" prop="addr">
          <el-input v-model="editForm.addr"></el-input>
        </el-form-item>
        <el-form-item label="门店联系方式" prop="contact">
          <el-input v-model="editForm.contact"></el-input>
        </el-form-item>
        <el-form-item label="门店状态" prop="shopStatus">
          <el-select v-model="editForm.shopStatus">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shopEditSubmit('editForm')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import {shopRules} from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      form: {
        shopNo: "",
        shopName: ""
      },
      refuntOptions: [
        { label: "是", value: 1 },
        { label: "否", value: 0 }
      ],
      listData: [],
      totalPage: 1,
      currPage: 1,
      dialogVisible: false,
      editForm: {
        shopNo: "",
        shopName: "",
        addr: "",
        contact: "",
        shopStatus: ""
      },
      rules: shopRules,
      currRowObj: {} //当前编辑行信息
    };
  },

  components: {},
  mounted() {
    this.getShopList();
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },

  methods: {
    handleCurrentChange(val) {
      this.currPage = val;
      this.getShopList();
    },
    searchShop() {
      //条件查找门店
      this.getShopList();
    },
    getShopList() {
      //门店类列表数据请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_LIST, {
          mchId: _this.custId,
          shopNo: _this.form.shopNo,
          shopName: _this.form.shopName,
          gotoPage: _this.currPage,
          pageSize: 10
        })
        .then(res => {
          if (res.resultCode == "1" && res.resultMsg.list) {
            _this.listData = res.resultMsg.list;
            _this.totalPage = res.resultMsg.totalRecords;
            _this.currPage = res.resultMsg.gotoPage;
          }
        });
    },
    addShop() {
      //新增门店
      this.$router.push({ name: "addShop" });
    },
    shopInfoEdit(param) {
      //编辑按钮事件
      this.editForm = {
        shopNo: param.shopNo,
        shopName: param.shopName,
        addr: param.addr,
        contact: param.contact,
        shopStatus: param.status
      };
      this.currRowObj = param;
      this.dialogVisible = true;
    },
    forbiddenShop(param) {
      //删除门店
      const _this = this;
      this.$confirm("请确认是否删除该门店?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.editForm = {
            shopNo: param.shopNo,
            shopName: param.shopName,
            addr: param.addr,
            contact: param.contact,
            shopStatus: 0
          };
          _this.currRowObj = param;
          _this.editShopInfoRequest();
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    editShopInfoRequest: throttle(function() {
      //编辑门店信息请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_EDIT, {
          custId: _this.custId,
          shopId: _this.currRowObj.shopId,
          ..._this.editForm
        })
        .then(res => {
          _this.$message({
            message: "操作成功",
            type: "success"
          });
          _this.getShopList();
          this.dialogVisible = false;
        });
    }, 2000),
    shopEditSubmit(formName) {
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.editShopInfoRequest();
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.page {
  text-align: center;
  margin: 40px auto;
}
</style>
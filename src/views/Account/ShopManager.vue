<!-- 店长管理 -->
<template>
  <div class="shopManager normal">
    <div class="heading">店长管理</div>
    <el-form ref="searchForm" :model="form" label-width="120px" :inline="true">
      <el-form-item label="店长姓名">
        <el-input v-model.trim="searchForm.shopmanagerName"></el-input>
      </el-form-item>
      <!--  <el-form-item label="退款权限">
        <el-select v-model="form.refund" placeholder="请选择">
          <el-option
            v-for="item in refuntOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchshopManager">查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addshopManager">添加店长</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" style="width: 100%;" stripe v-loading="$store.state.loading">
      <el-table-column prop="shopmanagerMobile" label="店长手机号"></el-table-column>
      <el-table-column prop="shopmanagerName" label="店长姓名"></el-table-column>
      <el-table-column prop="shopName" label="关联门店"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">{{scope.row.status==0?'不启用':'启用'}}</template>
      </el-table-column>

      <el-table-column prop="refundAuth" label="退款权限">
        <template slot-scope="scope">{{scope.row.refundAuth==0?'无':'有'}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
           <el-button size="mini" type="danger" @click="shopManagerDele(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="shopManagerEdit(scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑收店长" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="店长手机号" prop="shopmanagerMobile">
          <el-input v-model="form.shopmanagerMobile"></el-input>
        </el-form-item>
        <el-form-item label="店长姓名" prop="shopmanagerName">
          <el-input v-model="form.shopmanagerName"></el-input>
        </el-form-item>
        <el-form-item label="关联门店" prop="shopId">
          <el-select v-model="form.shopId" placeholder="请选择门店">
            <el-option
              v-for="item in shopData"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="店长状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否有退款权限" prop="refundAuth">
          <el-select v-model="form.refundAuth">
            <el-option label="无" value="0"></el-option>
            <el-option label="有" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="shopManagerEditSubmit('form')">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- :before-close="handleClose" -->
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
  </div>
</template>

<script>
import {throttle} from "@/lib/util.js";
import {shopManagerRules} from "@/lib/rules.js";
import ns from "@/store/constants/ns";
import types from "@/store/constants/types";
import { mapState } from "vuex";
const nameSpaced = ns.ACCOUNT + "/";
export default {
  data() {
    return {
      shopData: [],
      rowData: {},
      searchForm: {
        shopmanagerName: ""
      },
      refuntOptions: [
        { label: "无", value: 0 },
        { label: "有", value: 1 }
      ],
      listData: [],
      totalPage: 1,
      currPage: 1,
      dialogVisible: false,
      form: {
        shopmanagerMobile: "",
        shopmanagerName: "",
        shopId: "",
        status: "",
        refundAuth: "",
      },
      rules:shopManagerRules,
      currRowObj: {}, //选择行信息
      chargeStatus: ""
    };
  },

  components: {},
  mounted() {
    this.getshopManagerList();
    this.getShopList();
  },
  computed: {
    ...mapState({
      custId: state => state.userInfo.id
    })
  },
  methods: {
    getShopList() {
      //门店类列表数据请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_LIST, {
          mchId: _this.custId,
          gotoPage: 1,
          pageSize: 100
        })
        .then(res => {
          if ( res.resultMsg.list) {
            _this.shopData = res.resultMsg.list;
          }
        });
    },
    handleCurrentChange(val) {//切换
      this.currPage = val;
      this.getshopManagerList();
    },
    searchshopManager() {
      //查询收银员
      this.getshopManagerList();
    },
    addshopManager() {
      //添加收银员
      this.$router.push({ name: "addShopManager" });
    },
    shopManagerEdit(param) {
      //编辑收银员
      this.form = {
        shopmanagerMobile: param.shopmanagerMobile,
        shopmanagerName: param.shopmanagerName,
        shopId: param.shopId,
        refundAuth: param.refundAuth,
        status: param.status,
        loginPw:'123456',
        refundPw:'123456'
      };
      this.currRowObj = param;
      this.dialogVisible = true;
    },
    shopManagerEditSubmit(formName) {
      //提交已编辑的收银员信息
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.shopManagerEditRequest();
        } else {
          return false;
        }
      });
    },
    shopManagerDele(param) {
      //删除收银员
      const _this = this;
      this.form = {
        shopManagerMobile: param.shopManagerMobile,
        shopManagerName: param.shopManagerName,
        shopId: param.shopId,
        refundAuth: param.refundAuth,
        status: 2
      };
      this.currRowObj = param;
      this.chargeStatus = 0;
      this.$confirm("请确认是否删除该店长?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.shopManagerEditRequest();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    shopManagerEditRequest: throttle(function() {
      //编辑收银员信息请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_MANAGER_EDIT, {
          ..._this.form,
          shopmanagerId:_this.currRowObj.shopmanagerId
        })
        .then(res => {
          _this.dialogVisible = false;
          _this.$message({
            message: "操作成功",
            type: "success"
          });
          _this.getshopManagerList();
        });
    }, 2000),
    getshopManagerList() {
      //请求数据列表
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_SHOP_MANAGER_LIST, {
          custId: _this.custId,
          gotoPage: _this.currPage,
          pageSize: 10,
          ...this.searchForm
        })
        .then(res => {
          if (res.resultMsg.list) {
            _this.listData = res.resultMsg.list;
            _this.totalPage = res.resultMsg.totalRecords;
            _this.currPage = res.resultMsg.gotoPage;
          }
        });
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>
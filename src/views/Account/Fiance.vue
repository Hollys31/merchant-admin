<!-- 店长管理 -->
<template>
  <div class="fiance normal">
    <div class="heading">财务管理</div>
    <el-form ref="searchForm" :model="form" label-width="120px" :inline="true">
      <el-form-item label="财务姓名">
        <el-input v-model.trim="searchForm.financeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="searchFianceManager">查询</el-button>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="addFiance">添加财务</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="listData" style="width: 100%;" stripe v-loading="$store.state.loading">
      <el-table-column prop="financeMobile" label="财务手机号"></el-table-column>
      <el-table-column prop="financeName" label="财务姓名"></el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
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
    <el-dialog title="编辑财务信息" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="财务手机号" prop="financeMobile">
          <el-input v-model="form.financeMobile"></el-input>
        </el-form-item>
        <el-form-item label="财务姓名" prop="financeName">
          <el-input v-model="form.financeName"></el-input>
        </el-form-item>
        <el-form-item label="财务状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="不启用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fianceEditSubmit('form')">确认修改</el-button>
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
import {throttle,formatTime1} from "@/lib/util.js";
import {fianceRules} from "@/lib/rules.js";
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
        financeName: ""
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
        financeMobile: "",
        financeName: "",
        status: "",
      },
      rules:fianceRules,
      currRowObj: {}, //选择行信息
      chargeStatus: ""
    };
  },

  components: {},
  mounted() {
    this.getFianceList();
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
          if (res.resultMsg.list) {
            _this.shopData = res.resultMsg.list;
          }
        });
    },
    handleCurrentChange(val) {
      //切换
      this.currPage = val;
      this.getFianceList();
    },
    searchFianceManager() {
      //查询财务
      this.getFianceList();
    },
    addFiance() {
      //添加财务
      this.$router.push({ name: "addFiance" });
    },
    shopManagerEdit(param) {
      //编辑财务
      this.form = {
        financeMobile: param.financeMobile,
        financeName: param.financeName,
        status: param.status,
      };
      this.currRowObj = param;
      this.dialogVisible = true;
    },
    fianceEditSubmit(formName) {
      //提交已编辑的财务信息
      const _this = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          _this.fianceEditRequest();
        } else {
          return false;
        }
      });
    },
    shopManagerDele(param) {
      //删除财务
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
      this.$confirm("请确认是否删除该财务?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          _this.fianceEditRequest();
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    fianceEditRequest: throttle(function() {
      //编辑收银员信息请求
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_FIANCE_EDIT, {
          ..._this.form,
          custId: _this.custId,
          financeId: _this.currRowObj.financeId
        })
        .then(res => {
          _this.dialogVisible = false;
          _this.$message({
            message: "操作成功",
            type: "success"
          });
          _this.getFianceList();
        });
    }, 2000),
    getFianceList() {
      //请求数据列表
      const _this = this;
      _this.$store
        .dispatch(nameSpaced + types.ACCOUNT_FIANCE_LIST, {
          custId: _this.custId,
          gotoPage: _this.currPage,
          pageSize: 10,
        })
        .then(res => {
          if (res.resultMsg.list) {
            _this.listData = res.resultMsg.list;
             _this.listData= _this.listData.map(item=>{
                item.createTime=formatTime1(new Date(item.createTime));
                return item;
             })
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
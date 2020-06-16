<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  created() {
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  computed: {},
  watch: {}
};
</script>

<style lang='stylus' >
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  background: rgb(246, 249, 253);
  min-height: 100vh;
  max-width: 1920px;
  min-width: 1280px;
}

a {
  color: #333;
  text-decoration: none;
}

img {
  border: 0;
  display: inline-block;
}

li {
  list-style: none;
}

.mainColor {
  color: #0289ff;
}

.mianBg {
  background: #0289ff;
}

.main {
  width: 1280px;
  margin: 0 auto;
}

.container {
  width: 100%;
  padding: 20px 100px;
  display: flex;
  min-height: 800px;
  max-width: 1920px;
  min-width: 1280px;
  margin: 0 auto;
}

.content {
  flex: 1;
  background: #fff;
  margin-left: 50px;
  overflow hidden
  .normal{
    padding :30px 20px
  }
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f0f7ff;
  color: #1677ff;
  background-color: rgba(16, 142, 233, 0.1);
  border-right: 6px solid #1677ff;
}

.el-tree-node__expand-icon {
  font-size: 16px !important;
  margin-left: 15px;
}

.el-tree-node__content {
  height: 40px !important;
  line-height: 40px;
}

.el-table thead th {
  color: #666;
  background: #f3f3f3;
}

.el-table td, .el-table th.is-leaf {
  border: none !important;
}

.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: rgb(246, 249, 253) !important;
  border: none !important;
}

.el-step__title.is-process {
  font-weight: 500;
  color: #409eff !important;
}

.el-step__head.is-process {
  color: #409eff !important;
  border-color: #409eff !important;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width :auto !important;
}
.heading {
  height: 48px;
  line-height: 48px;
  border-bottom: 1px solid #e8e8e8;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 10px;
}

.page {
  text-align: center;
  margin: 40px auto;
}

.line {
  text-align: center;
}

.official {
  color: #2b2b2b;
  display: flex;
  padding-top: 15px;
  padding-bottom: 40px;

  &>div {
    box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.1);
  }

  .left {
    width: 260px;
    min-height: 852px;
    border-radius: 4px;
    background: #fff;
    margin-right: 40px;

    li {
      height: 80px;
      line-height: 80px;
      padding-left: 67px;
      margin: 0;
      padding-left: 70px;
      font-size: 16px;
      color: #2b2b2b;

      &:hover {
        cursor: pointer;
      }

      &.active {
        border-left: 3px solid #189efd;
        color: #189efd;
        background: #f6fbff;
        box-shadow: 0 2px 8px 0 rgba(97, 131, 155, 0.1);
      }
    }
  }

  .right {
    flex: auto;
    background: #fff;
    min-height: 852px;
    padding: 40px;
    .section{
       max-width :880px;
    }
    .headline {
      width: 100%;
      text-align: center;
      font-size: 16px;
      line-height: 40px;
      margin-bottom: 50px;
      position: relative;
      color :#333;
      &:after {
        content: '';
        position :absolute;
        width :50px;
        height :3px;
        background :#189efd;
        left :50%;
        transform :translateX(-50%);
        bottom :0
      }
    }
  }
}

@media screen and (max-width: 1480px) {
  .container {
    padding: 20px;
  }
  .content {
    margin-left:30px;
  }
}
</style>

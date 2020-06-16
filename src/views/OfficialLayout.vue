<!--  -->
<template>
  <div>
    <my-header></my-header>
    <keep-alive>
      <router-view />
    </keep-alive>
    <my-footer></my-footer>
  </div>
</template>

<script>
const myHeader = () => import("@/components/header");
const myFooter = () => import("@/components/footer");
export default {
  data() {
    return {};
  },

  components: { myHeader, myFooter },

  computed: {},

  methods: {}
};
</script>
<style lang='stylus' scoped></style>
<!--档案详情及相关信息-->
<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header></el-header>

    <el-main></el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
export default {
  name: "Details",
  data() {
    return {}
  },
  methods: {},
  mounted() {
    console.log(this.$route.params)
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>
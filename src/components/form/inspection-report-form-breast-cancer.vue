<!--乳腺癌 检查报告 表单-->

<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      {{ data.diseaseType }}

    </el-header>

    <el-main></el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
export default {
  name: "inspection-report-form-breast-cancer",
  data() {
    return {
      data: {
        diseaseType: "乳腺癌",
      }
    }
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>
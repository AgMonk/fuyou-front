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
  name: "Operation",
  data() {
    return {}
  },
  methods: {},
  mounted() {
    this.$store.dispatch("operation/findAll", this.recordUuid).then(res => {
      console.log(res)
    })
  },
  watch: {},
  props: {
    recordUuid: {
      required: true,
    }
  },
}

</script>

<style scoped>

</style>
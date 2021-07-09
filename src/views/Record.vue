<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" @click="dialogShow=true"/>
    </el-header>
    <el-main>
      <el-dialog v-model="dialogShow" title="添加" width="80%">
        <record-form @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import RecordForm from "@/components/form/record-form";
import MyButton from "@/components/my/my-button";

export default {
  name: "Record",
  components: {MyButton, RecordForm},
  data() {
    return {
      dialogShow: false,
      params: {
        page: {
          page: 1,
          size: 20,
        }
      }
    }
  },
  methods: {
    submit(e) {
      console.log(e)
    }
  },
  mounted() {
    this.$store.dispatch("record/get", this.params.page)
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>
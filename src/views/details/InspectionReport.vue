<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" tooltip="添加检查报告" @click="formVisible=true;"/>
    </el-header>

    <el-main>
      <el-dialog v-model="formVisible" title="添加检查报告">
        <inspection-report-form-breast-cancer v-if="diseaseType==='乳腺癌'" @submit="submit"/>
        <inspection-report-form-thyroid-cancer v-if="diseaseType==='甲状腺癌'" @submit="submit"/>
        <inspection-report-form-mastitis v-if="diseaseType==='非哺乳期乳腺炎'" @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import InspectionReportFormBreastCancer from "@/components/form/inspection-report-form-breast-cancer";
import InspectionReportFormThyroidCancer from "@/components/form/inspection-report-form-thyroid-cancer";
import InspectionReportFormMastitis from "@/components/form/inspection-report-form-mastitis";
import MyButton from "@/components/my/my-button";

export default {
  name: "inspection-report",
  components: {MyButton, InspectionReportFormMastitis, InspectionReportFormThyroidCancer, InspectionReportFormBreastCancer},
  data() {
    return {
      formVisible: false,
    }
  },
  methods: {
    submit(e) {
      e.recordUuid = this.recordUuid
      this.$store.dispatch("inspectionReport/add", e).then(res => {
        this.$message.success(res.message)
        this.findAll()
        this.formVisible = false;
      }).catch(e => {
        this.$message.error(e.join(","))
      })
    },
    findAll() {
      this.$store.dispatch("inspectionReport/findAll", this.recordUuid).then(res => {
        this.data = res.data;
      })
    },
  },
  mounted() {
  },
  watch: {},
  props: {
    recordUuid: {
      required: true,
    },
    diseaseType: {
      required: true
    }
  },
}

</script>

<style scoped>

</style>
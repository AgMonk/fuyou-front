<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" tooltip="添加检查报告" @click="formVisible=true;"/>
    </el-header>

    <el-main>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item,i) in data" :key="i" :name="i">
          <template #title>{{ item.timestamp.date }} : {{ item.doctorName }}</template>
          <inspection-report-description-mastitis :data="item" :record-uuid="recordUuid"/>
        </el-collapse-item>
      </el-collapse>


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

import MyButton from "@/components/my/my-button";
import InspectionReportDescriptionMastitis from "@/components/descriptions/inspection-report-description-mastitis";
import InspectionReportFormBreastCancer from "@/components/form/inspection-report-form-breast-cancer";
import InspectionReportFormThyroidCancer from "@/components/form/inspection-report-form-thyroid-cancer";
import InspectionReportFormMastitis from "@/components/form/inspection-report-form-mastitis";

export default {
  name: "inspection-report",
  components: {
    InspectionReportFormMastitis,
    InspectionReportFormThyroidCancer,
    InspectionReportFormBreastCancer,
    InspectionReportDescriptionMastitis,
    MyButton
  },
  data() {
    return {
      activeName: "",
      formVisible: false,
      data: [],
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
    this.findAll()
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
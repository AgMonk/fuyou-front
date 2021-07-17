<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header></el-header>

    <el-main>
      <el-descriptions :column="2" border title="基础信息">
        <template #extra>
          <my-button text="修改" @click="formVisible=true;"/>
          <my-button text="删除" type="danger" @click="del"/>
        </template>
        <el-descriptions-item label="1">1</el-descriptions-item>
      </el-descriptions>

      <el-dialog v-model="formVisible" title="手术情况">
        <inspection-report-form-mastitis :importData="data" @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import {functionNotImplement} from "@/assets/js/utils";
import InspectionReportFormMastitis from "@/components/form/inspection-report-form-mastitis";
import MyButton from "@/components/my/my-button";

export default {
  name: "inspection-report-description-mastitis",
  components: {MyButton, InspectionReportFormMastitis},
  data() {
    return {
      formVisible: false,
    }
  },
  methods: {
    functionNotImplement,
    submit(e) {
      e.recordUuid = this.recordUuid
      this.$store.dispatch("inspectionReport/update", e).then(res => {
        this.$message.success(res.message)
        this.$emit("updated", this.data.uuid)
        this.formVisible = false;
      })
    },
    del() {
      if (confirm('确认删除？')) {
        this.$store.dispatch("inspectionReport/del", this.data.uuid).then(res => {
          this.$message.success(res.message)
          this.$emit("updated", this.data.uuid)
        })
      }
    },
  },
  mounted() {
    console.log(this.recordUuid)
  },
  watch: {
    "data": {
      handler(e) {
        console.log(e)
      }
    }
  },
  props: {
    data: {
      required: true
    },
    recordUuid: {required: true,}
  },
}

</script>

<style scoped>

</style>
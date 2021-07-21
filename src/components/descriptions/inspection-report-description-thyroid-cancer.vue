<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-main>
      <el-descriptions :column="2" border title="基础信息">
        <template #extra>
          <my-button text="修改" @click="formVisible=true;"/>
          <my-button text="删除" type="danger" @click="del"/>
        </template>
        <el-descriptions-item label="医生">{{ data.doctorName }}</el-descriptions-item>
        <el-descriptions-item label="日期">{{ new Date(data.timestamp.timestamp * 1000).format("yyyy-MM-dd") }}</el-descriptions-item>
        <el-descriptions-item label="查体">{{ data.description }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="data.detail.treatmentStatus.show" :column="2" border title="治疗情况">
        <el-descriptions-item label="规律服药">
          {{ data.detail.treatmentStatus.medicine.status }}
          <span v-if="data.detail.treatmentStatus.medicine.sideEffect!==``">
           副作用： {{ data.detail.treatmentStatus.medicine.sideEffect }}
          </span>
        </el-descriptions-item>
        <el-descriptions-item label="内分泌治疗">
          {{ data.detail.treatmentStatus.endocrineTherapy.join(',') }}
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" border title="诊断/处理">
        <el-descriptions-item label="诊断">
          {{ data.detail.diagnosis }}
        </el-descriptions-item>
        <el-descriptions-item label="处理">
          {{ data.detail.treatment }}
        </el-descriptions-item>

      </el-descriptions>
      <el-dialog v-model="formVisible" title="手术情况">
        <inspection-report-form-breast-cancer :importData="data" @submit="submit"/>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import InspectionReportFormBreastCancer from "@/components/form/inspection-report-form-breast-cancer";

export default {
  name: "inspection-report-description-thyroid-cancer",
  components: {InspectionReportFormBreastCancer, MyButton},
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
    console.log(this.data)
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
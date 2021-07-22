<!--档案详情及相关信息-->

<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <!--    <el-header></el-header>-->

    <el-main>
      <el-descriptions :column="4" border title="档案信息">
        <template #extra>
          <my-button text="修改" @click="dialogShow=true"/>
          <my-button text="删除" type="danger" @click="del(uuid)"/>
        </template>
        <el-descriptions-item label="住院号">{{ record.uuid }}</el-descriptions-item>
        <el-descriptions-item label="患者姓名">{{ record.patientName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ record.gender }}</el-descriptions-item>
        <el-descriptions-item label="疾病类型">{{ record.diseaseType }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ record.phone }}</el-descriptions-item>
        <el-descriptions-item label="出生年月">{{ record.birthday ? record.birthday.month : "" }}</el-descriptions-item>
        <el-descriptions-item label="主管医生">{{ record.doctorInCharge }}</el-descriptions-item>
        <el-descriptions-item label="入院日期">{{ record.regDate ? record.regDate.date : "" }}</el-descriptions-item>
        <el-descriptions-item label="出院日期">{{ record.leaveHospital ? record.leaveHospital.date : "" }}</el-descriptions-item>
        <el-descriptions-item label="下次复诊">{{ record.nextReview ? record.nextReview.date : "" }}</el-descriptions-item>
        <el-descriptions-item label="复诊间隔（天）">{{ record.reviewInterval }}</el-descriptions-item>
        <el-descriptions-item label="复诊状态">{{ record.reviewStatus }}</el-descriptions-item>
        <el-descriptions-item label="上次通知">{{ record.lastNotice ? record.lastNotice.timeString : "" }}</el-descriptions-item>
        <el-descriptions-item label="入档时间">{{ record.recordTimestamp ? record.recordTimestamp.timeString : "" }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ record.contactName ? record.contactName : "" }}</el-descriptions-item>
        <el-descriptions-item label="联系人电话">{{ record.contactName ? record.contactPhone : "" }}</el-descriptions-item>
        <el-descriptions-item label="病史">{{ record.medicalHistory }}</el-descriptions-item>
      </el-descriptions>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="检查报告" name="检查报告">
          <inspection-report :disease-type="record.diseaseType" :record-uuid="uuid"/>
        </el-tab-pane>
        <el-tab-pane label="手术情况" name="手术情况">
          <operation :disease-type="record.diseaseType" :record-uuid="uuid"/>
        </el-tab-pane>
      </el-tabs>


      <el-dialog v-model="dialogShow" title="修改" width="80%">
        <record-form :importData="record" @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import Operation from "@/views/details/Operation";
import InspectionReport from "@/views/details/InspectionReport";
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import RecordForm from "@/components/form/record-form";

export default {
  name: "Details",
  components: {RecordForm, MyButton, Operation, InspectionReport},
  data() {
    return {
      activeName: "检查报告",
      dialogShow: false,
      uuid: this.$route.params.uuid,
      record: {},
    }
  },
  methods: {
    functionNotImplement,
    del(uuid) {
      if (confirm("删除档案？")) {
        this.$store.dispatch("record/del", uuid).then(res => {
          this.$message.success(res.message)
        })
      }
    },
    submit() {
      this.$store.dispatch("record/update", this.record).then(() => {
        this.dialogShow = false;
        this.importData = undefined;
        this.getDetails();
      })
    },
    getDetails() {
      this.$store.dispatch("record/getById", this.uuid).then(res => {
        if (!res.data.leaveHospital) {
          res.data.leaveHospital = {timestamp: ""}
        }
        this.record = res.data
      })
    },
  },
  mounted() {
    // console.log(this.uuid)

    this.getDetails()
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>
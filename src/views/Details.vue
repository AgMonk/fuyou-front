<!--档案详情及相关信息-->
<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <!--    <el-header></el-header>-->

    <el-main>
      <el-descriptions :column="4" border title="档案信息">
        <template #extra>
          <my-button text="修改" @click="functionNotImplement"/>
          <my-button text="删除" type="danger" @click="del(uuid)"/>
        </template>
        <el-descriptions-item label="住院号">{{ record.uuid }}</el-descriptions-item>
        <el-descriptions-item label="患者姓名">{{ record.patientName }}</el-descriptions-item>
        <el-descriptions-item label="性别">{{ record.gender }}</el-descriptions-item>
        <el-descriptions-item label="疾病类型">{{ record.diseaseType }}</el-descriptions-item>
        <el-descriptions-item label="电话">{{ record.phone }}</el-descriptions-item>
        <el-descriptions-item v-if="record.birthday" label="出生年月">{{ record.birthday.month }}</el-descriptions-item>
        <el-descriptions-item label="主管医生">{{ record.doctorInCharge }}</el-descriptions-item>
        <el-descriptions-item v-if="record.regDate" label="入院日期">{{ record.regDate.date }}</el-descriptions-item>
        <el-descriptions-item v-if="record.leaveHospital" label="出院日期">{{ record.leaveHospital.date }}</el-descriptions-item>
        <el-descriptions-item v-if="record.nextReview" label="下次复诊">{{ record.nextReview.date }}</el-descriptions-item>
        <el-descriptions-item label="复诊间隔（天）">{{ record.reviewInterval }}</el-descriptions-item>
        <el-descriptions-item label="复诊状态">{{ record.reviewStatus }}</el-descriptions-item>
        <el-descriptions-item v-if="record.lastNotice" label="上次通知">{{ record.lastNotice.timeString }}</el-descriptions-item>
        <el-descriptions-item v-if="record.recordTimestamp" label="入档时间">{{
            record.recordTimestamp.timeString
          }}
        </el-descriptions-item>
        <el-descriptions-item v-if="record.contactName" label="联系人">{{ record.contactName }}</el-descriptions-item>
        <el-descriptions-item v-if="record.contactName" label="联系人电话">{{ record.contactPhone }}</el-descriptions-item>
        <el-descriptions-item label="病史">{{ record.medicalHistory }}</el-descriptions-item>
      </el-descriptions>

      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="手术情况" name="手术情况">
          <operation :record-uuid="uuid"/>
        </el-tab-pane>
        <el-tab-pane label="复诊记录" name="复诊记录">复诊记录</el-tab-pane>
      </el-tabs>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import Operation from "@/views/details/Operation";
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";

export default {
  name: "Details",
  components: {MyButton, Operation},
  data() {
    return {
      activeName: "手术情况",
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
  },
  mounted() {
    console.log(this.uuid)

    this.$store.dispatch("record/getById", this.uuid).then(res => {
      this.record = res.data
      console.log(res.data)
    })
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>
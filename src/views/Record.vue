<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" @click="dialogShow=true"/>
    </el-header>
    <el-main>
      <el-table :data="myRecord">
        <el-table-column label="住院号" prop="uuid"/>
        <el-table-column label="姓名" prop="patientName"/>
        <el-table-column label="主管医生" prop="doctorInCharge"/>
        <el-table-column label="性别" prop="gender"/>
        <el-table-column label="出生日期" prop="birthday.month"/>
        <el-table-column label="入院日期" prop="regDate.date"/>
        <el-table-column label="出院日期" prop="leaveHospital.date"/>
        <el-table-column label="上次通知" prop="lastNotice.date"/>
        <el-table-column label="下次复查" prop="nextReview.date"/>
        <el-table-column label="复查间隔（天）" prop="reviewInterval"/>
        <el-table-column label="复查状态" prop="reviewStatus"/>

      </el-table>


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
import {mapState} from "vuex";

export default {
  name: "Record",
  components: {MyButton, RecordForm},
  data() {
    return {
      dialogShow: false,
      importData: undefined,
      params: {
        page: {
          page: 1,
          size: 20,
        },
      },

      myRecord: [],
      total: 0,
    }
  },
  computed: {
    ...mapState({
      records: state => state.record.data
    })
  },
  methods: {
    submit(e) {
      this.$store.dispatch("record/add", e).then(res => {
        this.dialogShow = false;
        this.importData = undefined;
        this.$store.dispatch("record/page", this.params.page).then(res => {
          this.myRecord = res.records
          this.total = res.total
        })

      }).catch(err => {
        if (err) {
          this.$message.error(err.join("\n"))
        }
      })
    },
    getRecord() {
      this.$store.dispatch("record/get", this.params.page).then(res => {
        this.myRecord = res.records
        this.total = res.total
      })
    }
  },
  mounted() {
    this.getRecord()
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>

<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" @click="dialogShow=true"/>
    </el-header>
    <el-main>
      <el-form :model="params.page.condition" inline label-width="100px" size="small">
        <h4>过滤条件</h4>
        <el-form-item label="住院号" prop="uuid">
          <el-input v-model="params.page.condition.uuid" clearable placeholder="住院号" @change="page"/>
        </el-form-item>
        <el-form-item label="患者姓名" prop="uuid">
          <el-input v-model="params.page.condition.patientName" clearable placeholder="患者姓名" @change="page"/>
        </el-form-item>
        <el-form-item label="主管医生" prop="uuid">
          <el-input v-model="params.page.condition.doctorInCharge" clearable placeholder="主管医生" @change="page"/>
        </el-form-item>
        <el-form-item label="下次复诊" prop="uuid">
          <el-date-picker
              v-model="params.page.condition.nextReview.timestamp"
              format="YYYY 年 MM 月 DD 日"
              placeholder="选择日期"
              type="date"
              value-format="X"
              @change="page">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="复查状态" prop="uuid">
          <el-select v-model="params.page.condition.reviewStatus" placeholder="复查状态" style="width:100%" @change="page">
            <el-option label="不选择" value=""/>
            <el-option value="无需通知"/>
            <el-option value="未通知"/>
            <el-option value="已通知"/>
          </el-select>
        </el-form-item>
      </el-form>

      <el-pagination
          :current-page="params.page.page"
          :page-size="params.page.size"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
      </el-pagination>
      <el-table :data="myRecord" stripe
                @cell-click="cellClick"

      >
        <!--        <el-table-column label="详情" type="expand">-->
        <!--          <template #default="props">-->
        <!--            <el-form inline>-->
        <!--              <el-form-item label="入院日期">{{ props.row.regDate.date }}</el-form-item>-->
        <!--              <el-form-item v-if="props.row.leaveHospital" label="出院日期">{{ props.row.leaveHospital.date }}</el-form-item>-->
        <!--            </el-form>-->
        <!--            <el-form inline>-->
        <!--              <el-form-item label="主管医生">{{ props.row.doctorInCharge }}</el-form-item>-->
        <!--              <el-form-item label="病史">{{ props.row.medicalHistory }}</el-form-item>-->
        <!--            </el-form>-->
        <!--            <el-form inline>-->
        <!--              <el-form-item v-if="props.row.lastNotice" label="上次通知">{{ props.row.lastNotice.timeString }}</el-form-item>-->
        <!--              <el-form-item v-if="props.row.lastSignIn" label="上次签到">{{ props.row.lastSignIn.timeString }}</el-form-item>-->
        <!--            </el-form>-->
        <!--            <el-form v-if="props.row.contactName" inline>-->
        <!--              <el-form-item label="联系人">{{ props.row.contactName }}</el-form-item>-->
        <!--              <el-form-item label="联系人电话">-->
        <!--                <my-phone-number :is-link="true" :phone-number="props.row.contactPhone"/>-->
        <!--              </el-form-item>-->
        <!--            </el-form>-->
        <!--            <el-form inline>-->
        <!--              <el-form-item label="入档时间">{{ props.row.recordTimestamp.timeString }}</el-form-item>-->
        <!--            </el-form>-->

        <!--            <my-button v-if="props.row.reviewStatus!=='无需通知'" text="结束随访" type="danger" @click="stopReview(props.row.uuid)"/>-->
        <!--            <my-button text="删除" type="danger" @click="del(props.row.uuid)"/>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
        <el-table-column label="住院号" prop="uuid"/>
        <el-table-column label="疾病类型" prop="diseaseType"/>
        <el-table-column label="姓名" prop="patientName"/>
        <el-table-column label="性别" prop="gender" width="60px"/>
        <el-table-column label="出生年月" prop="birthday.month"/>
        <el-table-column label="上次通知" prop="lastNotice.date"/>
        <el-table-column label="下次复查" prop="nextReview.date"/>
        <el-table-column label="复查间隔（天）" prop="reviewInterval"/>
        <el-table-column label="复查状态" prop="reviewStatus"/>
        <el-table-column label="电话" prop="phone">
          <template #default="props">
            <my-phone-number :is-link="props.row.reviewStatus==='未通知'" :phone-number="props.row.phone"/>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operating">
          <template #default="props">
            <my-button v-if="props.row.reviewStatus==='未通知'" text="通知" tooltip="电话通知后点击" @click="notice(props.row.uuid)"/>
            <my-button v-if="props.row.reviewStatus==='已通知'" text="签到" tooltip="签到后下次复查时间为：当前日期+复查间隔"
                       @click="sign(props.row.uuid)"/>
            <my-button v-if="props.row.reviewStatus==='无需通知'" text="启动随访" @click="startReview(props.row);startReviewShow=true;"/>
          </template>
        </el-table-column>

      </el-table>


      <el-dialog v-model="dialogShow" title="添加" width="80%">
        <record-form @submit="submit"/>
      </el-dialog>
      <el-dialog v-model="startReviewShow" title="添加" width="60%">
        <el-form inline label-width="120px">
          <el-form-item label="住院号">
            {{ params.startReview.uuid }}
          </el-form-item>
          <el-form-item label="姓名">
            {{ params.startReview.patientName }}
          </el-form-item>

          <el-form-item label="下次复查">
            <el-date-picker
                v-model="params.startReview.nextReview"
                format="YYYY 年 MM 月 DD 日"
                placeholder="下次复查"
                type="date">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="复查间隔（天）">
            <el-input v-model="params.startReview.reviewInterval" clearable/>
          </el-form-item>

        </el-form>
        <el-form>
          <el-form-item>
            <my-button text="确认" @click="startReview(false)"/>
          </el-form-item>
        </el-form>
      </el-dialog>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import RecordForm from "@/components/form/record-form";
import MyButton from "@/components/my/my-button";
import {mapState} from "vuex";
import {functionNotImplement} from "@/assets/js/utils";
import MyPhoneNumber from "@/components/my/my-phone-number";

export default {
  name: "Record",
  components: {MyPhoneNumber, MyButton, RecordForm},
  data() {
    return {
      dialogShow: false,
      startReviewShow: false,
      importData: undefined,
      params: {
        page: {
          page: 1,
          size: 10,
          condition: {
            uuid: undefined,
            patientName: undefined,
            doctorInCharge: undefined,
            reviewStatus: undefined,
            nextReview: {timestamp: ""},
          }
        },
        startReview: {
          uuid: 0,
          nextReview: 0,
          reviewInterval: 0,
        }
      },
      myRecord: [],
      total: 0,
    }
  },
  emits: ["click"],
  computed: {
    ...mapState({
      records: state => state.record.data
    })
  },
  methods: {
    functionNotImplement,
    cellClick(row, column, cell, event) {
      if (column.property !== 'operating') {
        this.$router.push("/detail/" + row.uuid)
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.page.size = val;
      this.page()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.page.page = val;
      this.page()
    },
    sign(uuid) {
      this.$store.dispatch("record/sign", uuid).then(res => {
        this.$message.success(res.message)
        this.page();
      })
    },
    notice(uuid) {
      this.$store.dispatch("record/notice", uuid).then(res => {
        this.$message.success(res.message)
        this.page();
      })
    },
    del(uuid) {
      if (confirm("删除档案？")) {
        this.$store.dispatch("record/del", uuid).then(res => {
          this.$message.success(res.message)
          this.page();
        })
      }
    },
    startReview(record) {
      let params = this.params.startReview;
      //复制参数
      if (record) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let day = 1000 * 60 * 60 * 24 * record.reviewInterval;
        params.uuid = record.uuid;
        params.patientName = record.patientName;
        params.nextReview = new Date(today.getTime() + day);
        params.reviewInterval = record.reviewInterval;
      } else {
        params = Object.assign({}, params)
        params.nextReview = params.nextReview.getTime() / 1000;
        // 发送请求
        this.$store.dispatch("record/startReview", params).then(res => {
          this.$message.success(res.message)
          this.startReviewShow = false;
          this.page();
        })
      }
    },
    stopReview(uuid) {
      if (confirm("结束随访？")) {
        this.$store.dispatch("record/stopReview", uuid).then(res => {
          this.$message.success(res.message)
          this.page();
        })
      }
    },
    submit(e) {
      this.$store.dispatch("record/add", e).then(() => {
        this.dialogShow = false;
        this.importData = undefined;
        this.page();

      }).catch(err => {
        if (err) {
          this.$message.error(err.join("\n"))
        }
      })
    },
    page() {
      this.$store.dispatch("record/page", this.params.page).then(res => {
        this.myRecord = res.records
        this.total = res.total
      })
    },
  },
  mounted() {
    this.page()
  },
  watch: {},
  props: {},
}

</script>

<style scoped>

</style>

<template>
  <el-form inline label-width="80px">
    <el-form-item label="住院号" required>
      <el-input v-model="data.uuid" placeholder="住院号"/>
    </el-form-item>
    <el-form-item label="患者姓名" required>
      <el-input v-model="data.patientName" placeholder="患者姓名"/>
    </el-form-item>
  </el-form>
  <el-form inline label-width="80px">
    <el-form-item label="主管医生" required>
      <el-input v-model="data.doctorInCharge" placeholder="主管医生"/>
    </el-form-item>
    <el-form-item label="电话" required>
      <el-input v-model="data.phone" placeholder="电话"/>
    </el-form-item>
  </el-form>
  <el-form inline label-width="80px">
    <!--    复查相关字段-->
    <el-form-item label="疾病类型" required>
      <el-select v-model="data.diseaseType" placeholder="疾病类型" style="width:100%">
        <el-option value="乳腺癌"/>
        <el-option value="甲状腺癌"/>
        <el-option value="非哺乳期乳腺炎"/>
      </el-select>
    </el-form-item>

  </el-form>
  <el-form inline label-width="80px">
    <el-form-item label="性别" required>
      <el-select v-model="data.gender" placeholder="性别" style="width:100%">
        <el-option value="男"/>
        <el-option value="女"/>
      </el-select>
    </el-form-item>
    <el-form-item label="出生日期" required>
      <el-date-picker
          v-model="data.birthday"
          format="YYYY 年 MM 月"
          placeholder="出生日期"
          type="month">
      </el-date-picker>
    </el-form-item>
  </el-form>
  <el-form inline label-width="80px">
    <el-form-item label="入院日期" required>
      <el-date-picker
          v-model="data.regDate"
          format="YYYY 年 MM 月 DD 日"
          placeholder="入院日期"
          type="date">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="出院日期">
      <el-date-picker
          v-model="data.leaveHospital"
          format="YYYY 年 MM 月 DD 日"
          placeholder="出院日期"
          type="date">
      </el-date-picker>
    </el-form-item>
  </el-form>
  <el-form inline label-width="100px">
    <el-form-item label="联系人">
      <el-input v-model="data.contactName" placeholder="联系人"/>
    </el-form-item>
    <el-form-item label="联系人电话">
      <el-input v-model="data.contactPhone" placeholder="联系人电话"/>
    </el-form-item>

  </el-form>
  <el-form inline label-width="80px">
    <!--    复查相关字段-->
    <el-form-item label="复查状态">
      <el-select v-model="data.reviewStatus" placeholder="复查状态" style="width:100%">
        <el-option value="无需通知"/>
        <el-option value="未通知"/>
        <el-option value="已通知"/>
      </el-select>
    </el-form-item>

    <el-form-item label="复诊间隔">
      <el-input v-model="data.reviewInterval" placeholder="复诊间隔" type="number"/>
    </el-form-item>
  </el-form>

  <el-form label-width="100px">
    <el-form-item label="病史" required>
      <el-input v-model="data.medicalHistory" autosize placeholder="病史" type="textarea"/>
    </el-form-item>

    <el-form-item label-width="0">
      <my-button text="提交" @click="submit"/>
      <my-button text="重置" type="danger" @click="reset"/>
    </el-form-item>
  </el-form>
</template>

<script>
import {copyObj} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";

let defaultData = {
  uuid: "",
  patientName: "",
  doctorInCharge: "",
  phone: "",
  gender: "女",
  medicalHistory: "",
  birthday: undefined,
  regDate: new Date(),
  contactName: "",
  contactPhone: "",
  diseaseType: "",

  //  复查相关字段
  reviewStatus: "无需通知",
  leaveHospital: undefined,
  reviewInterval: 15,
}

export default {
  name: "record-form",
  components: {MyButton},
  data() {
    return {
      data: defaultData
    }
  },
  emits: ["submit"],
  methods: {
    reset() {
      if (confirm("重置数据？")) {
        let o = this.importData ? this.importData : defaultData
        this.sync(o)
      }
    },
    submit() {
      let data = Object.assign({}, this.data)
      let date2Time = (data, field) => {
        data[field] = data[field] ? {timestamp: Math.floor(data[field].getTime() / 1000)} : undefined
      }
      date2Time(data, "birthday")
      date2Time(data, "regDate")
      date2Time(data, "leaveHospital")
      this.$emit("submit", data);
      // this.$emit("submit",this.data);
    },
    sync(e) {
      if (!e) {
        this.data = copyObj(defaultData)
        return;
      }
      this.data = copyObj(e)
      let time2Date = (data, field) => {
        data[field] = new Date(data[field].timestamp * 1000)
      }
      time2Date(this.data, "birthday")
      time2Date(this.data, "regDate")
      time2Date(this.data, "leaveHospital")
    }
  },
  mounted() {
  },
  watch: {
    "importData": {
      handler: function (e) {
        this.sync(e)
      }
    }
  },
  props: {
    importData: {}
  },
}

</script>

<style scoped>

</style>
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
        <el-descriptions-item label="体征">{{ data.description }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="3" border title="详细信息">
        <el-descriptions-item label="乳头内陷">
          <span v-if="data.detail.invertedNipples.show">
            <span style="margin-right: 20px">左：{{ data.detail.invertedNipples.left }}</span>
            <span>右：{{ data.detail.invertedNipples.right }}</span>
          </span>
          <span v-else>无</span>
        </el-descriptions-item>
        <el-descriptions-item label="抗核抗体谱">{{ data.detail.antinuclearAntibodyProfile }}</el-descriptions-item>
        <el-descriptions-item label="肝功能">{{ data.detail.liverFunction }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1" border title="影像学检查">
        <el-descriptions-item label="乳腺彩超">
          {{ new Date(data.detail.breastUltrasound.timestamp * 1000).format("yyyy-MM-dd") }}
          &nbsp;{{ data.detail.breastUltrasound.location }}
          &nbsp;{{ data.detail.breastUltrasound.result }}
        </el-descriptions-item>
        <el-descriptions-item label="钼靶">
          {{ new Date(data.detail.mammography.timestamp * 1000).format("yyyy-MM-dd") }}
          &nbsp;{{ data.detail.mammography.location }}
          &nbsp;{{ data.detail.mammography.result }}
        </el-descriptions-item>

      </el-descriptions>
      <el-descriptions :column="3" border title="实验室检查">
        <el-descriptions-item label="WBC">{{ data.detail.laboratoryExamination.WBC }} ×10<sup>9</sup>/L</el-descriptions-item>
        <el-descriptions-item label="N">{{ data.detail.laboratoryExamination.N }} %</el-descriptions-item>
        <el-descriptions-item label="PRL">{{ data.detail.laboratoryExamination.PRL }} ng/ml</el-descriptions-item>
        <el-descriptions-item label="垂体泌乳素">{{ data.detail.laboratoryExamination.pituitaryProlactin }} /ml</el-descriptions-item>
        <el-descriptions-item label="血糖">{{ data.detail.laboratoryExamination.bloodSugar }} mmol/L</el-descriptions-item>
        <el-descriptions-item label="CRP">{{ data.detail.laboratoryExamination.CRP }} mg/L</el-descriptions-item>
      </el-descriptions>
      <el-dialog v-model="formVisible" title="手术情况">
        <inspection-report-form-mastitis :importData="data" @submit="submit"/>
      </el-dialog>
    </el-main>
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
      myData: {
        diseaseType: "非哺乳期乳腺炎",
        uuid: undefined,
        timestamp: {timestamp: undefined},
        doctorName: "",
        description: "",
        detail: {
          //乳头内陷
          invertedNipples: {
            show: false,
            left: "无",
            right: "无",
          },
          //乳腺彩超
          breastUltrasound: {
            timestamp: undefined,
            location: "本院",
            result: "",
          },
          //钼靶
          mammography: {
            timestamp: undefined,
            location: "本院",
            result: "",
          },
          //  实验室检查:
          laboratoryExamination: {
            WBC: undefined,
            N: undefined,
            PRL: undefined,
            pituitaryProlactin: undefined,
            bloodSugar: undefined,
            CRP: undefined,
          },
          //  抗核抗体谱
          antinuclearAntibodyProfile: "",
          //肝功能
          liverFunction: "正常",

          immuneSystemExamination: {
            show: false,
            immunoglobulinA: undefined,
            immunoglobulinG: undefined,
            immunoglobulinM: undefined,
            complementC3: undefined,
            complementC4: undefined,
          },
          treatment: "",
        }
      }
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
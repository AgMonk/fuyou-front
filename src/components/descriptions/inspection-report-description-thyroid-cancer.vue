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
      <el-descriptions v-if="data.detail.thyroidFunctionTest.show" :column="4" border title="甲功测定">
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.T3" label="T3">{{ data.detail.thyroidFunctionTest.T3 }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.T4" label="T4">{{ data.detail.thyroidFunctionTest.T4 }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.FT3" label="FT3">{{ data.detail.thyroidFunctionTest.FT3 }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.FT4" label="FT4">{{ data.detail.thyroidFunctionTest.FT4 }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.TSH" label="TSH">{{ data.detail.thyroidFunctionTest.TSH }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.TSAb" label="TSAb">{{ data.detail.thyroidFunctionTest.TSAb }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.TgAb" label="TgAb">{{ data.detail.thyroidFunctionTest.TgAb }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.TPO" label="TPO">{{ data.detail.thyroidFunctionTest.TPO }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.TPOAb" label="TPOAb">{{ data.detail.thyroidFunctionTest.TPOAb }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.thyroidFunctionTest.PTH" label="PTH">{{ data.detail.thyroidFunctionTest.PTH }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="data.detail.tumorMarkers.show" :column="5" border title="肿瘤标记物">
        <el-descriptions-item v-if="data.detail.tumorMarkers.Tg" label="Tg">{{ data.detail.tumorMarkers.Tg }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.tumorMarkers.CEA" label="CEA">{{ data.detail.tumorMarkers.CEA }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.tumorMarkers.Ct" label="Ct">{{ data.detail.tumorMarkers.Ct }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.tumorMarkers.CA125" label="CA125">{{ data.detail.tumorMarkers.CA125 }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.tumorMarkers.CA199" label="CA199">{{ data.detail.tumorMarkers.CA199 }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="data.detail.ultrasound.show" :column="5" border title="彩超">
        <el-descriptions-item label="甲状腺">
          <div v-if="data.detail.ultrasound.thyroid.left.polarity">{{ ultrasoundThyroidDescription("左", data.detail.ultrasound.thyroid.left) }}</div>
          <div v-if="data.detail.ultrasound.thyroid.right.polarity">{{ ultrasoundThyroidDescription("右", data.detail.ultrasound.thyroid.right) }}</div>
        </el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.breast" label="乳腺">{{ data.detail.ultrasound.breast }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.viscera" label="肝胆胰脾">{{ data.detail.ultrasound.viscera }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.cervicalLymphNodes" label="颈部淋巴结">{{ data.detail.ultrasound.cervicalLymphNodes }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.clavicleLymphNode" label="锁骨上下淋巴结">{{ data.detail.ultrasound.clavicleLymphNode }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.gynecology" label="妇科">{{ data.detail.ultrasound.gynecology }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.heart" label="心脏">{{ data.detail.ultrasound.heart }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.ultrasound.other" label="其他">{{ data.detail.ultrasound.other }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="data.detail.checking.show" :column="5" border title="检查">
        <el-descriptions-item v-if="data.detail.checking.heartRate" label="心率">{{ data.detail.checking.heartRate }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.neckCT" label="颈部CT">{{ data.detail.checking.neckCT }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.bloodRoutine" label="血常规">{{ data.detail.checking.bloodRoutine }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.electrolyte" label="电解质">{{ data.detail.checking.electrolyte }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.chestRadiograph" label="胸片">{{ data.detail.checking.chestRadiograph }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.electrocardiogram" label="心电图">{{ data.detail.checking.electrocardiogram }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.boneDensity" label="骨密度">{{ data.detail.checking.boneDensity }}</el-descriptions-item>
        <el-descriptions-item v-if="data.detail.checking.other" label="其他">{{ data.detail.checking.other }}</el-descriptions-item>
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
      <el-dialog v-model="formVisible" title="修改报告">
        <inspection-report-form-thyroid-cancer :importData="data" @submit="submit"/>
      </el-dialog>
    </el-main>
  </el-container>

</template>

<script>
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import InspectionReportFormThyroidCancer from "@/components/form/inspection-report-form-thyroid-cancer";

export default {
  name: "inspection-report-description-thyroid-cancer",
  components: {InspectionReportFormThyroidCancer, MyButton},
  data() {
    return {
      formVisible: false,
    }
  },
  methods: {
    functionNotImplement,
    ultrasoundThyroidDescription(side, obj) {
      return `${side}叶 ${obj.polarity}极 ${obj.width}mm X ${obj.height}mm ${obj.description} TI-RADS ${obj.level} 级`
    },
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
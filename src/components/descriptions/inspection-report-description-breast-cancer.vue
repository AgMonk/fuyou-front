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
      <el-descriptions v-if="data.detail.breastUltrasound.show" :column="1" border title="乳腺彩超">
        <el-descriptions-item label="情况">
          <div v-for="(item,i) in data.detail.breastUltrasound.data" :key="i">{{
              "{side} 侧 {count} 点距乳头 {distance} mm , 尺寸 {width} mm X {height} mm , {description} BI-RADS {level} 级".format(item)
            }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
      <el-descriptions v-if="data.detail.mammography.show" :column="2" border title="钼靶">
        <el-descriptions-item v-if="data.detail.mammography.left.description" label="左侧">
          {{
            "BI-RADS {level} 级 {description}".format(data.detail.mammography.left)
          }}
        </el-descriptions-item>
        <el-descriptions-item v-if="data.detail.mammography.right.description" label="右侧">
          {{
            "BI-RADS {level} 级 {description}".format(data.detail.mammography.right)
          }}
        </el-descriptions-item>


      </el-descriptions>
      <el-descriptions v-if="data.detail.breastMRI.show" :column="2" border title="乳腺MRI">
        <el-descriptions-item v-if="data.detail.breastMRI.left.description" label="左侧">
          {{
            "BI-RADS {level} 级 {description}".format(data.detail.breastMRI.left)
          }}
        </el-descriptions-item>
        <el-descriptions-item v-if="data.detail.breastMRI.right.description" label="右侧">
          {{
            "BI-RADS {level} 级 {description}".format(data.detail.breastMRI.right)
          }}
        </el-descriptions-item>


      </el-descriptions>
      <el-descriptions v-if="data.detail.pathology.show" :column="3" border title="病理">
        <el-descriptions-item label="ER">{{ data.detail.pathology.ER }}</el-descriptions-item>
        <el-descriptions-item label="PR">{{ data.detail.pathology.PR }}</el-descriptions-item>
        <el-descriptions-item label="her2">{{ data.detail.pathology.her2 }}</el-descriptions-item>
        <el-descriptions-item label="ki67">{{ data.detail.pathology.ki67 }}</el-descriptions-item>
        <el-descriptions-item label="AR">{{ data.detail.pathology.AR }}</el-descriptions-item>
        <el-descriptions-item label="P53">{{ data.detail.pathology.P53 }}</el-descriptions-item>
        <el-descriptions-item label="情况">{{ data.detail.pathology.description }}</el-descriptions-item>
      </el-descriptions>

      <el-descriptions v-if="data.detail.examination.show" :column="3" border title="检验">
        <el-descriptions-item label="血常规">{{ data.detail.examination.bloodRoutine }}</el-descriptions-item>
        <el-descriptions-item label="血生化">{{ data.detail.examination.bloodChemistry }}</el-descriptions-item>
        <el-descriptions-item label="心肌酶">{{ data.detail.examination.myocardialEnzymes }}</el-descriptions-item>
        <el-descriptions-item label="血糖">{{ data.detail.examination.bloodSugar }}</el-descriptions-item>
        <el-descriptions-item label="血脂">{{ data.detail.examination.bloodLipids }}</el-descriptions-item>
        <el-descriptions-item label="碱性磷酸酶">{{ data.detail.examination.alkalinePhosphatase }}</el-descriptions-item>
        <el-descriptions-item label="性激素六项">{{ data.detail.examination.sexHormones }}</el-descriptions-item>
        <el-descriptions-item label="肝肾功电解质">{{ data.detail.examination.electrolyte }}</el-descriptions-item>
        <el-descriptions-item label="其他">{{ data.detail.examination.other }}</el-descriptions-item>
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
  name: "inspection-report-description-breast-cancer",
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
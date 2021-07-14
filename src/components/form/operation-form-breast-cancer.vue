<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <el-divider content-position="left"><b>基础信息</b></el-divider>
    <el-form label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="疾病类型">{{ data.diseaseType }}</el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手术日期">
            <el-date-picker
                v-model="data.timestamp.timestamp"
                placeholder="选择日期"
                style="width:100%"
                type="date"
                value-format="X">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="手术术式">
            <el-input v-model="data.surgicalApproach" placeholder="手术术式"/>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="术后病理">
            <el-input v-model="data.pathology" placeholder="术后病理"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-divider content-position="left"><b>化疗情况</b></el-divider>
    <el-form label-width="80px">
      <el-form-item label="化疗">
        <el-select v-model="data.detail.chemotherapy.data" multiple style="width:100%">
          <el-option value="EC×4-T×4"/>
          <el-option value="EC×4"/>
          <el-option value="dd EC×4-T×4"/>
          <el-option value="FEC×3-T×3"/>
          <el-option value="FEC×6"/>
          <el-option value="TEC×6"/>
          <el-option value="CMF×6"/>
          <el-option value="新辅助"/>
        </el-select>
      </el-form-item>
      <el-form-item label="化疗反应">
        <el-input v-model="data.detail.chemotherapy.result" placeholder="化疗反应"/>
      </el-form-item>
    </el-form>
    <el-divider content-position="left"><b>放疗情况</b></el-divider>
    <el-form inline>
      <el-form-item label="开始日期">
        <el-date-picker
            v-model="data.detail.radiotherapy.start"
            placeholder="开始日期"
            type="date"
            value-format="X">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束日期">
        <el-date-picker
            v-model="data.detail.radiotherapy.end"
            placeholder="结束日期"
            type="date"
            value-format="X">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="照射野">
        <el-input v-model="data.detail.radiotherapy.irradiationField" placeholder="照射野"/>
      </el-form-item>
      <el-form-item label="剂量(次)">
        <el-input v-model="data.detail.radiotherapy.num" placeholder="剂量(次)"/>
      </el-form-item>


      <el-form-item label-width="0">
        <my-button text="提交" @click="$emit(`submit`,data)"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyButton from "@/components/my/my-button";

export default {
  name: "operation-form-breast-cancer",
  components: {MyButton},
  data() {
    return {
      data: {
        //手术时间
        timestamp: {timestamp: "",},
        diseaseType: "乳腺癌",
        //手术术式
        surgicalApproach: "",
        //术后病理
        pathology: "",
        detail: {
          //化疗
          chemotherapy: {
            data: [],
            result: "",
          },
          //放疗
          radiotherapy: {
            start: "",
            end: "",
            irradiationField: "",
            num: "",
          }
        }
      },
    }
  },
  methods: {},
  mounted() {
  },
  watch: {
    "data": {
      handler(e) {
        console.log(e)
      }
    }
  },
  props: {
    recordUuid: {
      required: true,
      type: String,
    }
  },
}

</script>

<style scoped>

</style>
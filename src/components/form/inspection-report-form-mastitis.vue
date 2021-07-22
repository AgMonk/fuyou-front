<!--乳腺炎 检查报告 表单-->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->

    <el-main>
      <my-divider text="基础信息"/>
      <el-form label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="疾病类型">{{ data.diseaseType }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医生">
              <el-input v-model="data.doctorName" placeholder="医生"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="日期">
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
        <el-form-item label="体征">
          <el-input v-model="data.description" :autosize="{ minRows: 2, maxRows: 4}" placeholder="体征" type="textarea"/>
        </el-form-item>
      </el-form>

      <my-divider>
        <b style="font-size: 120%">详细信息</b>
      </my-divider>

      <el-form inline label-width="120px" style="text-align: left">
        <el-form-item label="抗核抗体谱">
          <el-input v-model="data.detail.antinuclearAntibodyProfile"/>
        </el-form-item>
        <el-form-item label="肝功能">
          <el-input v-model="data.detail.liverFunction"/>
        </el-form-item>
      </el-form>

      <divider-form-group :data="data.detail.invertedNipples" label-width="60px" title="乳头内陷">
        <el-form-item style="text-align: left">
          <span v-if="data.detail.invertedNipples.show" style="margin-left: 20px">
            左：<el-select v-model="data.detail.invertedNipples.left" style="width:100px">
            <el-option v-for="(item,i) in options.invertedNipples" :key="i" :value="item"/>
          </el-select></span>
          <span v-if="data.detail.invertedNipples.show" style="margin-left: 20px">
            右：<el-select v-model="data.detail.invertedNipples.right" style="width:100px">
                <el-option v-for="(item,i) in options.invertedNipples" :key="i" :value="item"/>
              </el-select></span>
        </el-form-item>
      </divider-form-group>

      <my-divider>
        <b style="font-size: 120%">影像学检查</b>
      </my-divider>
      <divider-form-group :data="data.detail.breastUltrasound" label-width="80px" title="乳腺彩超">
        <el-form-item label="乳腺彩超">
          <el-row>
            <el-col :span="12" style="text-align: left">
              日期：
              <el-date-picker
                  v-model="data.detail.breastUltrasound.timestamp"
                  placeholder="选择日期"
                  type="date"
                  value-format="X">
              </el-date-picker>
            </el-col>
            <el-col :span="12">
              检查地：
              <el-select v-model="data.detail.breastUltrasound.location" allow-create filterable placeholder="检查地">
                <el-option value="本院"/>
              </el-select>
            </el-col>
            <el-input v-model="data.detail.breastUltrasound.result"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="检查结果" style="margin-top: 10px" type="textarea"/>
          </el-row>
        </el-form-item>
      </divider-form-group>
      <divider-form-group :data="data.detail.mammography" label-width="80px" title="钼靶">
        <el-form-item label="钼靶">
          <el-row>
            <el-col :span="12" style="text-align: left">
              日期：
              <el-date-picker
                  v-model="data.detail.mammography.timestamp"
                  placeholder="选择日期"
                  type="date"
                  value-format="X">
              </el-date-picker>
            </el-col>
            <el-col :span="12">
              检查地：
              <el-select v-model="data.detail.mammography.location" allow-create filterable placeholder="检查地">
                <el-option value="本院"/>
              </el-select>
            </el-col>
            <el-input v-model="data.detail.mammography.result"
                      :autosize="{ minRows: 2, maxRows: 4}"
                      placeholder="检查结果" style="margin-top: 10px" type="textarea"/>
          </el-row>
        </el-form-item>
      </divider-form-group>

      <divider-form-group :data="data.detail.laboratoryExamination" label-width="80px" title="实验室检查">
        <el-form-item label="WBC">
          <el-input v-model="data.detail.laboratoryExamination.WBC" class="numberInput" type="number"/>
          ×10<sup>9</sup>/L
        </el-form-item>
        <el-form-item label="N">
          <el-input v-model="data.detail.laboratoryExamination.N" class="numberInput" type="number"/>
          %
        </el-form-item>
        <el-form-item label="PRL">
          <el-input v-model="data.detail.laboratoryExamination.PRL" class="numberInput" type="number"/>
          ng/ml
        </el-form-item>
        <el-form-item label="垂体泌乳素">
          <el-input v-model="data.detail.laboratoryExamination.pituitaryProlactin" class="numberInput" type="number"/>
          /ml
        </el-form-item>
        <el-form-item label="血糖">
          <el-input v-model="data.detail.laboratoryExamination.bloodSugar" class="numberInput" type="number"/>
          mmol/L
        </el-form-item>
        <el-form-item label="CRP">
          <el-input v-model="data.detail.laboratoryExamination.CRP" class="numberInput"/>
          mg/L
        </el-form-item>

      </divider-form-group>
      <my-divider>
        <b style="font-size: 120%">免疫系统检查</b>
      </my-divider>
      <divider-form-group :data="data.detail.laboratoryExamination" label-width="80px" title="免疫五项">
        <el-form-item label="免疫球蛋白A">
          <el-input v-model="data.detail.immuneSystemExamination.immunoglobulinA" class="numberInput" type="number"/>
          g/L
        </el-form-item>
        <el-form-item label="免疫球蛋白G">
          <el-input v-model="data.detail.immuneSystemExamination.immunoglobulinG" class="numberInput" type="number"/>
          g/L
        </el-form-item>
        <el-form-item label="免疫球蛋白M">
          <el-input v-model="data.detail.immuneSystemExamination.immunoglobulinM" class="numberInput" type="number"/>
          g/L
        </el-form-item>
        <el-form-item label="补体C3">
          <el-input v-model="data.detail.immuneSystemExamination.complementC3" class="numberInput" type="number"/>
          g/L
        </el-form-item>
        <el-form-item label="补体C4">
          <el-input v-model="data.detail.immuneSystemExamination.complementC4" class="numberInput" type="number"/>
          g/L
        </el-form-item>
      </divider-form-group>


      <el-form>
        <el-form-item label="治疗方案">
          <el-input v-model="data.treatment" placeholder="治疗方案"/>
        </el-form-item>
        <el-form-item label-width="0">
          <my-button text="提交" @click="$emit(`submit`,data)"/>
        </el-form-item>
      </el-form>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import {copyObj, nowSecond} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";
import DividerFormGroup from "@/components/form/divider-form-group";

export default {
  name: "inspection-report-form-mastitis",
  components: {DividerFormGroup, MyDivider, MyButton},
  data() {
    return {
      options: {
        invertedNipples: [
          "无", "轻", "中", "重",
        ]
      },
      data: {
        diseaseType: "非哺乳期乳腺炎",
        uuid: undefined,
        timestamp: {timestamp: nowSecond()},
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
            show: false,
            timestamp: undefined,
            location: "本院",
            result: "",
          },
          //钼靶
          mammography: {
            show: false,
            timestamp: undefined,
            location: "本院",
            result: "",
          },
          //  实验室检查:
          laboratoryExamination: {
            show: false,
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
          // 免疫系统检查(免疫五项)
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
    overwrite(e) {
      this.data = e ? copyObj(e) : copyObj(this.data);
    }
  },
  mounted() {
    this.overwrite(this.importData)
  },
  watch: {
    "importData": {
      handler(e) {
        this.overwrite(e)
      }
    },

  },
  props: {
    importData: {},
  },
}

</script>

<style scoped>
.numberInput {
  width: 100px
}
</style>
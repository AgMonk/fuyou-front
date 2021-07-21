<!--甲状腺癌 检查报告 表单-->

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
        <el-form-item label="查体">
          <el-input v-model="data.description" placeholder="查体"/>
        </el-form-item>
      </el-form>
      <my-divider>
        <b style="font-size: 120%">详细信息</b>
      </my-divider>

      <my-divider>
        <el-checkbox v-model="data.detail.thyroidFunctionTest.show"><b>甲功测定</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.thyroidFunctionTest.show" inline label-width="120px" style="text-align: left">
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.tumorMarkers.show"><b>肿瘤标记物</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.tumorMarkers.show" inline label-width="120px" style="text-align: left">
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.treatmentStatus.show"><b>治疗情况</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.treatmentStatus.show" inline label-width="120px" style="text-align: left">
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.ultrasound.show"><b>彩超</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.ultrasound.show" inline label-width="120px" style="text-align: left">
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.checking.show"><b>检查</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.checking.show" inline label-width="120px" style="text-align: left">
      </el-form>
      <el-form>
        <el-form-item label-width="0">
          <my-button text="提交" @click="$emit(`submit`,data)"/>
        </el-form-item>
      </el-form>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import {copyObj} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";

export default {
  name: "inspection-report-form-thyroid-cancer",
  components: {MyDivider, MyButton},
  data() {
    return {
      data: {
        diseaseType: "甲状腺癌",
        uuid: undefined,
        timestamp: {timestamp: undefined},
        doctorName: "",
        description: "",
        detail: {
          //  甲功测定
          thyroidFunctionTest: {
            show: false,
            T3: "",
            T4: "",
            FT3: "",
            FT4: "",
            TSH: "",
            TSAb: "",
            TgAb: "",
            TPO: "",
            TPOAb: "",
            PTH: "",
          },
          // 肿瘤标记物
          tumorMarkers: {
            show: false,
            Tg: "",
            CEA: "",
            Ct: "",
            CA125: "",
            CA199: "",
          },
          //治疗情况
          treatmentStatus: {
            show: false,
            //碘131治疗
            I131: {},
            //内分泌治疗
            endocrineTherapy: {
              medicine: [],
              OFS: "",
            },
            //规律服药
            medicine: {
              status: "",
              sideEffect: "",
            },
          },
          //彩超
          ultrasound: {
            show: false,
            // 乳腺
            breast: "",
            //  甲状腺
            thyroid: {
              left: {
                //  极
                polarity: "",
                //宽
                width: "",
                //高
                height: "",
                //情况
                description: "",
                // 等级
                level: "",
              },
              right: {
                //  极
                polarity: "",
                //宽
                width: "",
                //高
                height: "",
                //情况
                description: "",
                // 等级
                level: "",
              },
            },
            //  肝胆胰脾
            viscera: "",
            //  颈部淋巴结
            cervicalLymphNodes: "",
            //  锁骨上下淋巴结
            clavicleLymphNode: "",
            //  妇科
            gynecology: "",
            //  心脏
            heart: "",
            //  其他
            other: "",
          },
          //检查
          checking: {
            show: false,
            //心率
            heartRate: "",
            //  颈部CT
            neckCT: "",
            //  血常规
            bloodRoutine: "",
            //  电解质
            electrolyte: "",
            //  胸片
            chestRadiograph: "",
            //  心电图
            electrocardiogram: "",
            //骨密度
            boneDensity: "",
            //  其他
            other: "",
          },
          //  诊断
          diagnosis: "",
          //  处理
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

</style>
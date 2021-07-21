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

      <divider-form-group :data="data.detail.thyroidFunctionTest" label-width="80px" title="甲功测定">
        <el-form-item label="T3">
          <el-input v-model="data.detail.thyroidFunctionTest.T3" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="T4">
          <el-input v-model="data.detail.thyroidFunctionTest.T4" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="FT3">
          <el-input v-model="data.detail.thyroidFunctionTest.FT3" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="FT4">
          <el-input v-model="data.detail.thyroidFunctionTest.FT4" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="TSH">
          <el-input v-model="data.detail.thyroidFunctionTest.TSH" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="TSAb">
          <el-input v-model="data.detail.thyroidFunctionTest.TSAb" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="TgAb">
          <el-input v-model="data.detail.thyroidFunctionTest.TgAb" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="TPO">
          <el-input v-model="data.detail.thyroidFunctionTest.TPO" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="TPOAb">
          <el-input v-model="data.detail.thyroidFunctionTest.TPOAb" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="PTH">
          <el-input v-model="data.detail.thyroidFunctionTest.PTH" size="mini" style="width:80px"/>
        </el-form-item>
      </divider-form-group>
      <divider-form-group :data="data.detail.tumorMarkers" title="肿瘤标记物">
        <el-form-item label="Tg">
          <el-input v-model="data.detail.tumorMarkers.Tg" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="CEA">
          <el-input v-model="data.detail.tumorMarkers.CEA" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="Ct">
          <el-input v-model="data.detail.tumorMarkers.Ct" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="CA125">
          <el-input v-model="data.detail.tumorMarkers.CA125" size="mini" style="width:80px"/>
        </el-form-item>
        <el-form-item label="CA199">
          <el-input v-model="data.detail.tumorMarkers.CA199" size="mini" style="width:80px"/>
        </el-form-item>
      </divider-form-group>
      <divider-form-group :data="data.detail.treatmentStatus" title="治疗情况">
        <el-form-item label="碘131治疗">
          <el-input v-model="data.detail.treatmentStatus.I131.status"
                    class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          副作用：
          <el-input v-model="data.detail.treatmentStatus.I131.sideEffect"
                    class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
        </el-form-item>
        <el-form-item label="规律服药">
          <el-input v-model="data.detail.treatmentStatus.medicine.status"
                    class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          副作用：
          <el-input v-model="data.detail.treatmentStatus.medicine.sideEffect"
                    class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
        </el-form-item>
        <el-form-item label="内分泌治疗">
          <el-select v-model="data.detail.treatmentStatus.endocrineTherapy" allow-create filterable multiple>
            <el-option value="甲状腺素片(国产)"/>
            <el-option value="优甲乐(进口)"/>
            <el-option value="钙片"/>
          </el-select>
        </el-form-item>

      </divider-form-group>
      <divider-form-group :data="data.detail.ultrasound" :form-inline="false" title="彩超">
        <el-form-item label="甲状腺">
          <div>
            <span>左叶</span>
            <el-select v-model="data.detail.ultrasound.thyroid.left.polarity" clearable="" size="mini" style="width:80px;margin-left: 5px">
              <el-option value="上"/>
              <el-option value="中"/>
              <el-option value="下"/>
            </el-select>
            极
            <el-input v-model="data.detail.ultrasound.thyroid.left.width" placeholder="宽" size="mini" style="width:60px;margin-left: 5px"/>
            X
            <el-input v-model="data.detail.ultrasound.thyroid.left.height" placeholder="高" size="mini" style="width:60px;margin-left: 5px"/>
            <el-input v-model="data.detail.ultrasound.thyroid.left.description" placeholder="情况" size="mini" style="width:120px;margin-left: 5px"/>
            TI-RADS
            <el-input v-model="data.detail.ultrasound.thyroid.left.level" size="mini" style="width:40px;margin-left: 5px"/>
            级
          </div>
          <div>
            <span>右叶</span>
            <el-select v-model="data.detail.ultrasound.thyroid.right.polarity" clearable="" size="mini" style="width:80px;margin-left: 5px">
              <el-option value="上"/>
              <el-option value="中"/>
              <el-option value="下"/>
            </el-select>
            极
            <el-input v-model="data.detail.ultrasound.thyroid.right.width" placeholder="宽" size="mini" style="width:60px;margin-left: 5px"/>
            X
            <el-input v-model="data.detail.ultrasound.thyroid.right.height" placeholder="高" size="mini" style="width:60px;margin-left: 5px"/>
            <el-input v-model="data.detail.ultrasound.thyroid.right.description" placeholder="情况" size="mini" style="width:120px;margin-left: 5px"/>
            TI-RADS
            <el-input v-model="data.detail.ultrasound.thyroid.right.level" size="mini" style="width:40px;margin-left: 5px"/>
            级
          </div>
        </el-form-item>
        <el-form-item label="乳腺">
          <el-input v-model="data.detail.ultrasound.breast" size="mini"/>
        </el-form-item>
        <el-form-item label="肝胆胰脾">
          <el-input v-model="data.detail.ultrasound.viscera" size="mini"/>
        </el-form-item>
        <el-form-item label="颈部淋巴结">
          <el-input v-model="data.detail.ultrasound.cervicalLymphNodes" size="mini"/>
        </el-form-item>
        <el-form-item label="锁骨上下淋巴结">
          <el-input v-model="data.detail.ultrasound.clavicleLymphNode" size="mini"/>
        </el-form-item>
        <el-form-item label="妇科">
          <el-input v-model="data.detail.ultrasound.gynecology" size="mini"/>
        </el-form-item>
        <el-form-item label="心脏">
          <el-input v-model="data.detail.ultrasound.heart" size="mini"/>
        </el-form-item>
        <el-form-item label="其他">
          <el-input v-model="data.detail.ultrasound.other" size="mini"/>
        </el-form-item>
      </divider-form-group>
      <divider-form-group :data="data.detail.checking" title="检查">
        <el-form-item label="心率">
          <el-input v-model="data.detail.checking.heartRate" size="mini" style="width:60px;"/>
          次/分
        </el-form-item>
        <el-form-item label="颈部CT">
          <el-input v-model="data.detail.checking.neckCT" size="mini"/>
        </el-form-item>
        <el-form-item label="血常规">
          <el-input v-model="data.detail.checking.bloodRoutine" size="mini"/>
        </el-form-item>
        <el-form-item label="电解质">
          <el-input v-model="data.detail.checking.electrolyte" size="mini"/>
        </el-form-item>
        <el-form-item label="胸片">
          <el-input v-model="data.detail.checking.chestRadiograph" size="mini"/>
        </el-form-item>
        <el-form-item label="心电图">
          <el-input v-model="data.detail.checking.electrocardiogram" size="mini"/>
        </el-form-item>
        <el-form-item label="骨密度">
          <el-input v-model="data.detail.checking.boneDensity" size="mini"/>
        </el-form-item>
        <el-form-item label="其他">
          <el-input v-model="data.detail.checking.other" size="mini"/>
        </el-form-item>
      </divider-form-group>

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
import DividerFormGroup from "@/components/form/divider-form-group";

export default {
  name: "inspection-report-form-thyroid-cancer",
  components: {DividerFormGroup, MyDivider, MyButton},
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
            I131: {
              status: "",
              sideEffect: "",
            },
            //规律服药
            medicine: {
              status: "",
              sideEffect: "",
            },
            //内分泌治疗
            endocrineTherapy: [],
          },
          //彩超
          ultrasound: {
            show: false,
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
            // 乳腺
            breast: "",
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
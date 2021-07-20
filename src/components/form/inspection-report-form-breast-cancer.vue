<!--乳腺癌 检查报告 表单-->

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
        <el-checkbox v-model="data.detail.breastUltrasound.show"><b>乳腺彩超</b></el-checkbox>
      </my-divider>
      <div v-if="data.detail.breastUltrasound.show">
        <el-table :data="data.detail.breastUltrasound.data">
          <el-table-column label="侧" prop="side" width="80px"/>
          <el-table-column label="距乳头(mm)" prop="distance" width="100px"/>
          <el-table-column label="宽(mm)" prop="width" width="80px"/>
          <el-table-column label="高(mm)" prop="height" width="80px"/>
          <el-table-column label="情况" prop="description"/>
          <el-table-column label="BI-RADS等级" prop="level" width="80px"/>
        </el-table>
        <el-form inline>
          <el-form-item>
            <el-radio-group v-model="template.breastUltrasound.side" size="mini">
              <el-radio-button label="左"/>
              <el-radio-button label="右"/>
            </el-radio-group>
            侧
          </el-form-item>
          <el-form-item label="距乳头">
            <el-input v-model="template.breastUltrasound.distance" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
            mm
          </el-form-item>
          <el-form-item label="宽">
            <el-input v-model="template.breastUltrasound.width" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
            mm
          </el-form-item>
          <el-form-item label="高">
            <el-input v-model="template.breastUltrasound.height" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
            mm
          </el-form-item>
          <el-form-item label="情况">
            <el-input v-model="template.breastUltrasound.description" :input-style="inputStyle" size="mini"/>
          </el-form-item>
          <el-form-item label="BI-RADS">
            <el-input v-model="template.breastUltrasound.level" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
            级
          </el-form-item>
          <my-button size="mini" text="+" @click="data.detail.breastUltrasound.data.push(template.breastUltrasound);template.breastUltrasound={}"/>
        </el-form>
      </div>
      <my-divider>
        <el-checkbox v-model="data.detail.mammography.show"><b>钼靶</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.mammography.show" inline>
        <el-form-item label="左 BI-RADS">
          <el-input v-model="data.detail.mammography.left.level" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          级
        </el-form-item>
        <el-form-item label="情况">
          <el-input v-model="data.detail.mammography.left.description" :input-style="inputStyle" size="mini"/>
        </el-form-item>
        <el-form-item label="右 BI-RADS">
          <el-input v-model="data.detail.mammography.right.level" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          级
        </el-form-item>
        <el-form-item label="情况">
          <el-input v-model="data.detail.mammography.right.description" :input-style="inputStyle" size="mini"/>
        </el-form-item>
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.breastMRI.show"><b>乳腺MRI</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.breastMRI.show" inline>
        <el-form-item label="左 BI-RADS">
          <el-input v-model="data.detail.breastMRI.left.level" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          级
        </el-form-item>
        <el-form-item label="情况">
          <el-input v-model="data.detail.breastMRI.left.description" :input-style="inputStyle" size="mini"/>
        </el-form-item>
        <el-form-item label="右 BI-RADS">
          <el-input v-model="data.detail.breastMRI.right.level" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          级
        </el-form-item>
        <el-form-item label="情况">
          <el-input v-model="data.detail.breastMRI.right.description" :input-style="inputStyle" size="mini"/>
        </el-form-item>
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.pathology.show"><b>病理</b></el-checkbox>
      </my-divider>
      <el-form v-if="data.detail.pathology.show" inline>
        <el-form-item label="情况">
          <el-input v-model="data.detail.pathology.description" :input-style="inputStyle" size="mini"/>
        </el-form-item>
        <el-form-item label="ER">
          <el-input v-model="data.detail.pathology.ER" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
        <el-form-item label="PR">
          <el-input v-model="data.detail.pathology.PR" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
        <el-form-item label="her2">
          <el-input v-model="data.detail.pathology.her2" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
        <el-form-item label="ki67">
          <el-input v-model="data.detail.pathology.ki67" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
        <el-form-item label="ARR">
          <el-input v-model="data.detail.pathology.AR" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
        <el-form-item label="P53">
          <el-input v-model="data.detail.pathology.P53" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
        </el-form-item>
      </el-form>
      <my-divider>
        <el-checkbox v-model="data.detail.examination.show"><b>检验</b></el-checkbox>
      </my-divider>
      <div v-if="data.detail.examination.show">
        <el-form inline>
          <el-form-item label="血常规">
            <el-input v-model="data.detail.examination.bloodRoutine" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="血生化">
            <el-input v-model="data.detail.examination.bloodChemistry" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="心肌酶">
            <el-input v-model="data.detail.examination.myocardialEnzymes" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="血糖">
            <el-input v-model="data.detail.examination.bloodSugar" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="血脂">
            <el-input v-model="data.detail.examination.bloodLipids" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="碱性磷酸酶">
            <el-input v-model="data.detail.examination.alkalinePhosphatase" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="性激素六项">
            <el-input v-model="data.detail.examination.sexHormones" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="肝肾功电解质">
            <el-input v-model="data.detail.examination.electrolyte" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="data.detail.examination.other" class="breastUltrasoundTemplate" size="mini" style="width: 150px"/>
          </el-form-item>

        </el-form>
        <el-form inline>
          肿瘤标记物
          <el-form-item label="AFP">
            <el-input v-model="data.detail.examination.tumorMarkers.AFP" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          </el-form-item>
          <el-form-item label="CEA">
            <el-input v-model="data.detail.examination.tumorMarkers.CEA" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          </el-form-item>
          <el-form-item label="CA199">
            <el-input v-model="data.detail.examination.tumorMarkers.CA199" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          </el-form-item>
          <el-form-item label="CA125">
            <el-input v-model="data.detail.examination.tumorMarkers.CA125" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          </el-form-item>
          <el-form-item label="CA153">
            <el-input v-model="data.detail.examination.tumorMarkers.CA153" :input-style="inputStyle" class="breastUltrasoundTemplate" size="mini"/>
          </el-form-item>
        </el-form>
      </div>
      <my-divider>
        <el-checkbox v-model="data.detail.checking.show"><b>检查</b></el-checkbox>
      </my-divider>
      <div v-if="data.detail.checking.show">
        <el-form inline>
          <el-form-item label="胸片">
            <el-input v-model="data.detail.checking.chestRadiograph" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="心电图">
            <el-input v-model="data.detail.checking.electrocardiogram" class="breastUltrasoundTemplate" size="mini" style="width: 90px"/>
          </el-form-item>
          <el-form-item label="PETCT/ECT">
            <el-input v-model="data.detail.checking.PETCT_ECT" class="breastUltrasoundTemplate" size="mini" style="width: 150px"/>
          </el-form-item>
        </el-form>
        <el-form inline>
          <el-form-item label="CT">
            <div>
              胸部:
              <el-input v-model="data.detail.checking.CT.chest" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
            <div>
              头颅:
              <el-input v-model="data.detail.checking.CT.head" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
            <div>
              上腹部:
              <el-input v-model="data.detail.checking.CT.upperAbdomen" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
            <div>
              盆腔:
              <el-input v-model="data.detail.checking.CT.pelvicCavity" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
          </el-form-item>
          <el-form-item label="MRI">
            <div>
              胸椎:
              <el-input v-model="data.detail.checking.MRI.thoracic" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
            <div>
              腰椎:
              <el-input v-model="data.detail.checking.MRI.lumbarSpine" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>
            <div>
              骨盆:
              <el-input v-model="data.detail.checking.MRI.pelvis" class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            </div>

          </el-form-item>

        </el-form>
      </div>
      <my-divider>
        <el-checkbox v-model="data.detail.ultrasound.show"><b>彩超</b></el-checkbox>
      </my-divider>
      <div v-if="data.detail.ultrasound.show">
        <el-form inline>
          <el-form-item label="乳腺">
            <el-input v-model="data.detail.ultrasound.breast"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="甲状腺">
            <el-input v-model="data.detail.ultrasound.thyroid"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="肝胆胰脾">
            <el-input v-model="data.detail.ultrasound.viscera"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="颈部淋巴结">
            <el-input v-model="data.detail.ultrasound.cervicalLymphNodes"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="锁骨上下淋巴结">
            <el-input v-model="data.detail.ultrasound.clavicleLymphNode"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="妇科">
            <el-input v-model="data.detail.ultrasound.gynecology"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="心脏">
            <el-input v-model="data.detail.ultrasound.heart"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>
          <el-form-item label="其他">
            <el-input v-model="data.detail.ultrasound.other"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
          </el-form-item>

        </el-form>
      </div>

      <my-divider>
        <el-checkbox v-model="data.detail.treatmentStatus.show"><b>治疗情况</b></el-checkbox>
      </my-divider>
      <div v-if="data.detail.treatmentStatus.show" style="text-align: left">
        <el-form>
          <el-form-item label="乳腺">
            <el-select v-model="data.detail.treatmentStatus.endocrineTherapy.medicine" allow-create filterable multiple
                       size="mini">
              <el-option value="他莫昔芬"/>
              <el-option value="托瑞米芬"/>
              <el-option value="依西美坦"/>
              <el-option value="阿那曲唑"/>
              <el-option value="来曲唑"/>
            </el-select>
            ± OFS：
            <el-input v-model="data.detail.treatmentStatus.endocrineTherapy.OFS"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>

          </el-form-item>
          <el-form-item label="规律服药">
            <el-input v-model="data.detail.treatmentStatus.medicine.status"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            副作用：
            <el-input v-model="data.detail.treatmentStatus.medicine.sideEffect"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>

          </el-form-item>
          <el-form-item label="靶向治疗">
            <el-input v-model="data.detail.treatmentStatus.targetedTherapy.status"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>
            副作用：
            <el-input v-model="data.detail.treatmentStatus.targetedTherapy.sideEffect"
                      class="breastUltrasoundTemplate" size="mini" style="width: 120px"/>

          </el-form-item>

        </el-form>
      </div>


      <el-form>
        <el-form-item label="诊断">
          <el-input v-model="data.detail.diagnosis"
                    class="breastUltrasoundTemplate" size="mini" style="width: 100%"/>
        </el-form-item>
        <el-form-item label="处理">
          <el-input v-model="data.detail.treatment"
                    class="breastUltrasoundTemplate" size="mini" style="width: 100%"/>
        </el-form-item>

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
import {copyObj, nowSecond} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";

export default {
  name: "inspection-report-form-breast-cancer",
  components: {MyDivider, MyButton},
  data() {
    return {
      inputStyle: {
        padding: "0 3px",
      },
      //模板
      template: {
        //乳腺彩超
        breastUltrasound: {
          side: "左",
          //距离
          distance: "",
          //宽
          width: "",
          //高
          height: "",
          //情况
          description: "",
          // 等级
          level: "",
        }
      },
      data: {
        diseaseType: "乳腺癌",
        uuid: undefined,
        timestamp: {timestamp: nowSecond()},
        doctorName: "",
        description: "",
        detail: {
          //乳腺彩超
          breastUltrasound: {
            show: false,
            data: [],
          },
          //钼靶
          mammography: {
            show: false,
            left: {level: "", description: "",},
            right: {level: "", description: "",},
          },
          //乳腺MRI
          breastMRI: {
            show: false,
            left: {level: "", description: "",},
            right: {level: "", description: "",},
          },
          //病理
          pathology: {
            show: false,
            description: "",
            ER: "",
            PR: "",
            her2: "",
            ki67: "",
            AR: "",
            P53: "",
          },
          //检验
          examination: {
            show: false,
            //血常规
            bloodRoutine: "正常",
            //血生化
            bloodChemistry: "正常",
            //  心肌酶
            myocardialEnzymes: "正常",
            //血糖
            bloodSugar: "正常",
            //血脂
            bloodLipids: "正常",
            //碱性磷酸酶
            alkalinePhosphatase: "正常",
            //性激素六项
            sexHormones: "正常",
            //肝肾功电解质
            electrolyte: "正常",
            // 其他
            other: "",
            // 肿瘤标记物
            tumorMarkers: {
              AFP: "",
              CEA: "",
              CA199: "",
              CA125: "",
              CA153: "",
            }
          },
          //检查
          checking: {
            show: false,
            //胸片
            chestRadiograph: "正常",
            // 心电图
            electrocardiogram: "正常",
            PETCT_ECT: "正常",
            CT: {
              chest: "",
              head: "",
              upperAbdomen: "",
              pelvicCavity: "",
            },
            MRI: {
              //胸椎
              thoracic: "",
              //腰椎
              lumbarSpine: "",
              //骨盆
              pelvis: "",
            },
          },
          //彩超
          ultrasound: {
            show: false,
            //乳腺
            breast: "",
            //  甲状腺
            thyroid: "",
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
          //治疗情况
          treatmentStatus: {
            show: false,

            //内分泌治疗
            endocrineTherapy: {
              medicine: [],
              OFS: "",
            },
            medicine: {
              status: "",
              sideEffect: "",
            },
            targetedTherapy: {
              status: "",
              sideEffect: "",
            },

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
.breastUltrasoundTemplate {
  width: 30px;
  margin-right: 2px;
}
</style>
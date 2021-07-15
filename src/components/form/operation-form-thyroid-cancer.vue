<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <my-divider text="基础信息"/>
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
            <el-select
                v-model="data.surgicalApproach"
                allow-create
                filterable
                placeholder="手术术式"
            >

            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="术后病理">
            <el-input v-model="data.pathology" placeholder="术后病理"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <my-divider text="MACIS评分表"/>
    <el-form label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄">
            <el-slider v-model="data.detail.MACIS.age"
                       show-input
                       type="number">
            </el-slider>
            <!--            <el-input type="number"-->
            <!--                      v-model="data.detail.MACIS.age"-->
            <!--                      show-input>-->
            <!--            </el-input>-->
            <!--            -->
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="肿瘤直径(cm)">
            <el-input v-model="data.detail.MACIS.diameter"
                      show-input
                      type="number">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-form inline label-width="120px">
      <el-form-item label="未完整切除">
        <el-checkbox v-model="data.detail.MACIS.notCompletelyCut"/>
      </el-form-item>
      <el-form-item label="甲状腺外侵犯">
        <el-checkbox v-model="data.detail.MACIS.invasion"/>
      </el-form-item>
      <el-form-item label="远处转移">
        <el-checkbox v-model="data.detail.MACIS.transfer"/>
      </el-form-item>
      <el-form-item label="总评分">
        <macis-score :data="data.detail.MACIS"/>
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label-width="0">
        <my-button text="提交" @click="$emit(`submit`,data)"/>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";
import MacisScore from "@/components/macisScore";


export default {
  name: "operation-form-thyroid-cancer",
  components: {MacisScore, MyDivider, MyButton},
  data() {
    return {
      data: {
        //手术时间
        timestamp: {timestamp: new Date().getTime() / 1000,},
        diseaseType: "甲状腺癌",
        //手术术式
        surgicalApproach: "术式",
        //术后病理
        pathology: "",
        detail: {
          MACIS: {
            age: 40,
            diameter: "",
            notCompletelyCut: false,
            invasion: false,
            transfer: false,
          }
        }
      },
    }
  },
  methods: {
    overwrite(e) {
      this.data = e ? e : this.data;
    }
  },
  mounted() {
    this.overwrite(this.importData)
  },
  watch: {
    // "data": {
    //   handler(e) {
    //     console.log(e)
    //   }
    // },
    "importData": {
      handler(e) {
        this.overwrite(e)
      }
    },

  },
  props: {
    importData: {}
  },
}

</script>

<style scoped>

</style>
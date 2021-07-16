<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <h4 style="background-color: #449a737a">手术：{{ data.surgicalApproach[0] + ',' + data.surgicalApproach[3] }}</h4>
    <el-descriptions :column="2" border title="基础信息">
      <template #extra>
        <my-button text="修改" @click="formVisible=true;"/>
        <my-button text="删除" type="danger" @click="del"/>
      </template>
      <el-descriptions-item label="手术时间">{{ data.timestamp ? data.timestamp.date : "" }}</el-descriptions-item>
      <el-descriptions-item label="部位">{{ data.surgicalApproach[0] }}</el-descriptions-item>
      <el-descriptions-item label="峡部">{{ data.surgicalApproach[1] }}</el-descriptions-item>
      <el-descriptions-item label="淋巴结">{{ data.surgicalApproach[2] }}</el-descriptions-item>
      <el-descriptions-item label="入路">{{ data.surgicalApproach[3] }}</el-descriptions-item>
      <el-descriptions-item label="术后病理">{{ data.pathology }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions :column="3" border style="margin-top: 20px" title="MACIS评分">
      <el-descriptions-item label="年龄">{{ data.detail.MACIS.age }}</el-descriptions-item>
      <el-descriptions-item label="肿瘤直径(cm)">{{ data.detail.MACIS.diameter }}</el-descriptions-item>
      <el-descriptions-item label="未完整切除">
        <true-or-false :b="data.detail.MACIS.notCompletelyCut"/>
      </el-descriptions-item>
      <el-descriptions-item label="甲状腺外侵犯">
        <true-or-false :b="data.detail.MACIS.invasion"/>
      </el-descriptions-item>
      <el-descriptions-item label="远处转移">
        <true-or-false :b="data.detail.MACIS.transfer"/>
      </el-descriptions-item>
      <el-descriptions-item label="总评分">
        <macis-score :data="data.detail.MACIS"/>
      </el-descriptions-item>
    </el-descriptions>


    <el-dialog v-model="formVisible" title="手术情况">
      <operation-form-thyroid-cancer :importData="data" @submit="submit"/>
    </el-dialog>
  </div>
</template>

<script>
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";
import MyTag from "@/components/my/my-tag";
import MacisScore from "@/components/macisScore";
import TrueOrFalse from "@/components/descriptions/true-or-false";
import OperationFormThyroidCancer from "@/components/form/operation-form-thyroid-cancer";

export default {
  name: "descriptions-thyroid-cancer",
  components: {OperationFormThyroidCancer, TrueOrFalse, MacisScore, MyTag, MyDivider, MyButton},
  data() {
    return {
      formVisible: false,
    }
  },
  methods: {
    functionNotImplement,
    submit(e) {
      e.recordUuid = this.recordUuid
      this.$store.dispatch("operation/update", e).then(res => {
        this.$message.success(res.message)
        this.$emit("updated", this.data.uuid)
        this.formVisible = false;
      })
    },
    del() {
      if (confirm('确认删除？')) {
        this.$store.dispatch("operation/del", this.data.uuid).then(res => {
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
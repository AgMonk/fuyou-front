<!--suppress HtmlUnknownTag -->
<template>
  <div>
    <h4 style="background-color: #449a737a">手术：{{ data.surgicalApproach[0] }}</h4>
    <el-descriptions :column="2" border title="基础信息">
      <template #extra>
        <my-button text="修改" @click="formVisible=true;"/>
        <my-button text="删除" type="danger" @click="del"/>
      </template>
      <el-descriptions-item label="手术时间">{{ data.timestamp ? data.timestamp.date : "" }}</el-descriptions-item>
      <el-descriptions-item label="手术术式">{{ data.surgicalApproach[0] }}


      </el-descriptions-item>
      <el-descriptions-item label="术后病理">{{ data.pathology }}</el-descriptions-item>


    </el-descriptions>
    <el-descriptions :column="2" border style="margin-top: 20px" title="化疗">
      <el-descriptions-item label="化疗">
        <my-tag v-for="(item,i) in data.detail.chemotherapy.data" :key="i" :text="item"/>
      </el-descriptions-item>
      <el-descriptions-item label="化疗反应">{{ data.detail.chemotherapy.result }}</el-descriptions-item>
    </el-descriptions>

    <el-descriptions :column="2" border style="margin-top: 20px" title="放疗">
      <el-descriptions-item label="开始日期">{{
          data.detail.radiotherapy.start ? new Date(data.detail.radiotherapy.start * 1000).format("yyyy-MM-dd") : ""
        }}
      </el-descriptions-item>
      <el-descriptions-item label="结束日期">{{
          data.detail.radiotherapy.end ? new Date(data.detail.radiotherapy.end * 1000).format("yyyy-MM-dd") : ""
        }}
      </el-descriptions-item>
      <el-descriptions-item label="照射野">{{ data.detail.radiotherapy.irradiationField }}</el-descriptions-item>
      <el-descriptions-item label="剂量(次)">{{ data.detail.radiotherapy.num }}</el-descriptions-item>
    </el-descriptions>

    <el-dialog v-model="formVisible" title="手术情况">
      <operation-form-breast-cancer :importData="data" @submit="submit"/>
    </el-dialog>
  </div>
</template>

<script>
import {functionNotImplement} from "@/assets/js/utils";
import MyButton from "@/components/my/my-button";
import MyDivider from "@/components/my/my-divider";
import MyTag from "@/components/my/my-tag";
import OperationFormBreastCancer from "@/components/form/operation-form-breast-cancer";

export default {
  name: "operation-descriptions-breast-cancer",
  components: {OperationFormBreastCancer, MyTag, MyDivider, MyButton},
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
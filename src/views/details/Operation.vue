<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" tooltip="添加手术记录" @click="formVisible=true;"/>
    </el-header>
    <el-main>
      <descriptions-breast-cancer v-for="(item,i) in data" v-if="diseaseType==='乳腺癌'" :key="i" :data="item"
                                  @updated="findAll"/>
      <el-dialog v-model="formVisible" title="手术情况">
        <operation-form-breast-cancer v-if="diseaseType==='乳腺癌'" @submit="submit"/>
        <operation-form-thyroid-cancer v-if="diseaseType==='甲状腺癌'" @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import MyButton from "@/components/my/my-button";
import OperationFormBreastCancer from "@/components/form/operation-form-breast-cancer";
import DescriptionsBreastCancer from "@/components/descriptions/descriptions-breast-cancer";
import OperationFormThyroidCancer from "@/components/form/operation-form-thyroid-cancer";

export default {
  name: "Operation",
  components: {OperationFormThyroidCancer, DescriptionsBreastCancer, OperationFormBreastCancer, MyButton},
  data() {
    return {
      formVisible: false,
      data: [],
    }
  },
  methods: {
    submit(e) {
      e.recordUuid = this.recordUuid
      this.$store.dispatch("operation/add", e).then(res => {
        this.$message.success(res.message)
        this.findAll()
        this.formVisible = false;
      }).catch(e => {
        this.$message.error(e.join(","))
      })
    },
    findAll() {
      this.$store.dispatch("operation/findAll", this.recordUuid).then(res => {
        this.data = res.data;
      })
    },
  },
  mounted() {
    this.findAll()
  },
  watch: {},
  props: {
    recordUuid: {
      required: true,
    },
    diseaseType: {
      required: true
    }
  },
}

</script>

<style scoped>

</style>
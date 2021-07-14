<!--suppress HtmlUnknownTag -->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->
    <el-header>
      <my-button text="添加" tooltip="添加手术记录" @click="formVisible=true;"/>
    </el-header>
    <el-main>


      <el-dialog v-model="formVisible" title="手术情况">
        <operation-form-breast-cancer v-if="diseaseType==='乳腺癌'" :record-uuid="recordUuid" @submit="submit"/>
      </el-dialog>
    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
import MyButton from "@/components/my/my-button";
import OperationFormBreastCancer from "@/components/form/operation-form-breast-cancer";

export default {
  name: "Operation",
  components: {OperationFormBreastCancer, MyButton},
  data() {
    return {
      formVisible: false,
    }
  },
  methods: {
    submit(e) {
      console.log(e)
    },
  },
  mounted() {
    this.$store.dispatch("operation/findAll", this.recordUuid).then(res => {
      console.log(res.data)
    })
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
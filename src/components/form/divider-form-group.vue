<!--  -->
<template>
  <div>
    <my-divider>
      <el-checkbox v-model="data.show"><b>{{ title }}</b></el-checkbox>
    </my-divider>
    <el-form v-if="data.show" :inline="formInline" :label-width="labelWidth"
             :style="'text-align: '+textAlign">
      <slot/>
    </el-form>
  </div>

</template>

<script>
import MyDivider from "@/components/my/my-divider";

export default {
  name: "divider-form-group",
  components: {MyDivider},
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    data: {required: true},
    title: {required: true, type: String},
    formInline: {type: Boolean, default: true},
    labelWidth: {type: String, default: "120px"},
    textAlign: {type: String, default: "left"},
  },
}

</script>

<style scoped>

</style>
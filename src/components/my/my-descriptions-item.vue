<template>
  <el-descriptions-item
      :label="label?label:field"
  >
    {{ data[field] }}
  </el-descriptions-item>
</template>

<script>
export default {
  name: "my-descriptions-item",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    data: {required: true},
    field: {required: true, type: String},
    label: {type: String},
  },
}

</script>

<style scoped>

</style>
<!--suppress HtmlUnknownTag -->
<template>
  <el-divider content-position="left"><b>{{ text }}</b></el-divider>
</template>

<script>
export default {
  name: "my-divider",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    text: {
      required: true,
      type: String,
    }
  },
}

</script>

<style scoped>

</style>
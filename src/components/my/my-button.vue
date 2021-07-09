<template>
  <!--suppress HtmlUnknownTag -->
  <el-button :type="type" :size="size" >{{ text }}</el-button>
</template>

<script>
export default {
  name: "my-button",
  data() {
    return {
      myData: {}
    }
  },
  methods: {
    copy(obj) {
      this.myData = obj ? copyObj(obj) : [];
    }
  },
  mounted() {
    this.copy(this.data)
  },
  props: {
    type:{
      type:String,
      default:"primary"
    },
    size:{
      type:String,
      default:"medium"
    },
    text:{
      required:true,
      type:String,
    },

  },
}

</script>

<style scoped>

</style>
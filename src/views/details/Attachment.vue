<!--附件模块-->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->

    <el-main>


      <el-upload
          :data="{recordUuid}"
          accept="image/*"
          action="/api/Attachment/upload"
          class="upload-demo"
          drag
          multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <template #tip>
          <div class="el-upload__tip">
            只能上传 jpg/png 文件
          </div>
        </template>
      </el-upload>

    </el-main>
    <el-footer></el-footer>
  </el-container>

</template>

<script>
export default {
  name: "Attachment",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    recordUuid: {required: true, type: String},
  },
}

</script>

<style scoped>

</style>
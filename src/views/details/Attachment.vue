<!--附件模块-->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->

    <el-main>
      <el-image
          :preview-src-list="srcList"
          :src="srcList[0]"
          style="width: 100px; height: 100px">
      </el-image>

      <el-upload
          :data="{reportUuid}"
          accept="image/*"
          action="/api/Attachment/upload"
          drag
          :on-success="list"
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
    return {
      srcList: [],
    }
  },
  methods: {
    list() {
      this.$store.dispatch("attachment/list", this.reportUuid).then(res => {
        this.srcList = res.data.map(name => `/attachment/${this.reportUuid}/${name}`)
        console.log(this.srcList)
      })
    }
  },
  mounted() {
    this.list();
  },
  watch: {},
  props: {
    reportUuid: {required: true, type: String},
  },
}

</script>

<style scoped>

</style>
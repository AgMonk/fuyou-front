<!--附件模块-->
<template>
  <el-container direction="vertical">
    <!--  <el-container direction="horizontal">-->

    <el-main>
      <template v-for="(item,i) in srcList" :key="i">
        <el-badge style="margin-left: 20px;cursor:pointer" type="danger" value="X" @click="del(item)">
          <el-image
              :preview-src-list="srcList"
              :src="item"
              fit="scale-down"
              style="width: 100px; height: 100px">
          </el-image>
        </el-badge>
      </template>

      <el-upload
          :data="{reportUuid}"
          :on-success="list"
          accept="image/*"
          action="/api/Attachment/upload"
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
import MyButton from "@/components/my/my-button";

export default {
  name: "Attachment",
  components: {MyButton},
  data() {
    return {
      srcList: [],
    }
  },
  methods: {
    del(e) {
      const [, , reportUuid, filename] = e.split("/")
      this.$confirm(`将删除文件 ${filename}, 是否继续?`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch("attachment/del", {reportUuid, filename}).then(() => {
          this.list()
        })
      })
    },
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
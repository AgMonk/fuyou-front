<!--suppress HtmlUnknownTag -->
<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      @select="select"
      router
      active-text-color="#ffd04b">
  <my-navigation-item v-for="(route,i) in routes" :key="i" :route="route" parent-path="" />
  </el-menu>
</template>

<script>
import {routes} from "@/router";
import MyNavigationItem from "@/components/my-navigation-item";

export default {
  name: "my-navigation",
  components: {MyNavigationItem},
  data() {
    return {
      routes,
      activeIndex:undefined,
    }
  },
  methods: {
    select(index,indexPath){
      console.log(index)
      console.log(indexPath)
    }
  },
  mounted() {
    console.log(routes)
  },
}

</script>

<style scoped>

</style>
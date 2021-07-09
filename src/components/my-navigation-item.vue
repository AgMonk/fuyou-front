<!--suppress HtmlUnknownTag -->
<template>
  <el-submenu v-if="route.children" :index="route.path">
    <template #title>{{ route.name }}</template>
    <my-navigation-item v-for="(child,i) in route.children" :key="i" :route="child" :parent-path="path"/>
  </el-submenu>
  <el-menu-item v-else :index="path" :route="route">
    {{ route.name }}
  </el-menu-item>
</template>

<script>
export default {
  name: "my-navigation-item",
  data() {
    return {
      path:this.parentPath+(this.route.path.startsWith(`/`)?``:`/`)+this.route.path
    }
  },
  methods: {},
  mounted() {
    console.log(this.path)
  },
  props: {
    route: {
      required: true
    },
    parentPath: {
      type: String,
    }
  },
}

</script>

<style scoped>

</style>
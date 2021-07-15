<!--suppress HtmlUnknownTag -->
<template>
  <b><span v-if="b" :style=" `color: `+trueColor">{{ trueText }}</span>
    <span v-else :style=" `color: `+falseColor">{{ falseText }}</span></b>
</template>

<script>
export default {
  name: "true-or-false",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    trueText: {
      type: String,
      default: "有",
    },
    falseText: {
      type: String,
      default: "无",
    },
    b: {
      type: Boolean,
      required: true,
    },
    trueColor: {
      type: String,
      default: "red",
    },
    falseColor: {
      type: String,
      default: "green",
    },

  },
}

</script>

<style scoped>

</style>
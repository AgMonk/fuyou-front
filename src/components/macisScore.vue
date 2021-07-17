
<template>
  <span>
{{
      Math.floor(
          (
              (data.age < 40 ? 3.1 : data.age * 0.08)
              + (data.diameter ? data.diameter * 0.3 : 0)
              + (data.notCompletelyCut ? 1 : 0)
              + (data.invasion ? 1 : 0)
              + (data.transfer ? 3 : 0)
          ) * 10) / 10
    }}
  </span>

</template>

<script>
export default {
  name: "macisScore",
  data() {
    return {}
  },
  methods: {},
  mounted() {
  },
  watch: {},
  props: {
    data: {},
  },
}

</script>

<style scoped>

</style>
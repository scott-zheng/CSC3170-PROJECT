<template>
  <a-select
    mode="multiple"
    :defaultValue="['a1', 'b2']"
    style="width: 500px"
    @change="handleChange"
    placeholder="Please select"
  >
    <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{
      "tag" + i
    }}</a-select-option>
  </a-select>
</template>
<script>
export default {
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>
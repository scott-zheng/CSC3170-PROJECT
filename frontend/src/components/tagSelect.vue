<template>
  <a-select
    mode="multiple"
    style="width: 500px"
    @change="handleChange"
    placeholder="Please select tags"
  >
    <!--a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{
      "tag" + i
    }}</a-select-option-->
      <a-select-option value="tag0">Comfortable</a-select-option>
      <a-select-option value="tag1">Cosy</a-select-option>
      <a-select-option value="tag2">Famaly</a-select-option>
      <a-select-option value="tag3">Fun</a-select-option>
      <a-select-option value="tag4">Young</a-select-option>
  </a-select>
</template>
<script>
export default {
  data() {
      return {
          
      }
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
  },
};
</script>
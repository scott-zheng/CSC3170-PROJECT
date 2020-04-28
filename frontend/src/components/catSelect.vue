<template>
  <div>
    <a-select defaultValue="Cat1" style="width: 120px" @change="handleChange">
      <a-select-option value="Cat0">Cat0</a-select-option>
      <a-select-option value="Cat1">Cat1</a-select-option>
      <a-select-option value="disabled" disabled>Disabled</a-select-option>
      <a-select-option value="Cat3">Cat3</a-select-option>
    </a-select>
  </div>
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

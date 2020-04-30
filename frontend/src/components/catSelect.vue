<template>
  <div>
    <a-select defaultValue="Cat0" style="width: 120px" @change="handleChange">
      <a-select-option value="Cat0">Consult</a-select-option>
      <a-select-option value="Cat1">Cafe</a-select-option>
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

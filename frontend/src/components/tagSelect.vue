<template>
	<a-select mode="multiple" style="width: 500px" @change="handleChange" placeholder="Please select at least one tag">
		<!--a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{
      "tag" + i
    }}</a-select-option-->
		<a-select-option v-for="item in tags" :key="item.Tag_id">{{item.Tag_name}}</a-select-option>
	</a-select>
</template>
<script>
	export default {
		props: {
			tags: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			handleChange(value) {
				console.log(`selected ${value}`);
				this.$emit("selectedTags", value);
			},
		},
	};
</script>

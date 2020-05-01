<template>
	<a-select mode="multiple" style="width: 500px" @change="handleChange" placeholder="Please select tags">
		<!--a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">{{
      "tag" + i
    }}</a-select-option-->
		<a-select-option v-for="(item, index) in tags" :key="index">{{item}}</a-select-option>
	</a-select>
</template>
<script>
	export default {
		props: {
			tags: {
				type: Array,
				default: () => ["tag1", "tag2", "tag3"]
			}
		},
		methods: {
			handleChange(value) {
				console.log(`selected ${value}`);
			},
		},
	};
</script>
